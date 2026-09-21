import { connection } from "next/server";
import { cache } from "react";
import type { RowDataPacket } from "mysql2";
import { query } from "./db";
import type { ExerciseKey } from "./practice";
import { getStatsByExercise, getVerbStudiedCount } from "./practice-db";
import { EXERCISE_INFO } from "./review-labels";

export type CardProgress = {
  /** 0–100, redondeado. */
  percent: number;
  done: number;
  total: number;
  /** Texto que explica qué se cuenta, ya armado. */
  caption: string;
};

export type MenuProgress = {
  /** Avance del card: el del ejercicio, o el del tema si el enlace es un tema. */
  forHref: (href: string) => CardProgress | null;
  /** Avance de todo A1: los 66 ejercicios juntos. */
  overall: CardProgress;
};

const RUTAS = Object.entries(EXERCISE_INFO).map(
  ([key, info]) => [key as ExerciseKey, info.href] as const,
);

/** Ejercicios que cuelgan de un enlace: el mismo, o los del tema. */
function ejerciciosDe(href: string): ExerciseKey[] {
  const exacto = RUTAS.filter(([, ruta]) => ruta === href);
  if (exacto.length > 0) return exacto.map(([key]) => key);
  // `/a1/preguntas/` no debe atrapar `/a1/preguntas-respuestas/...`.
  const prefijo = `${href}/`;
  return RUTAS.filter(([, ruta]) => ruta.startsWith(prefijo)).map(
    ([key]) => key,
  );
}

function porcentaje(
  done: number,
  total: number,
  caption = `${done} de ${total} dominados`,
): CardProgress {
  return {
    done,
    total,
    caption,
    percent: total > 0 ? Math.round((done / total) * 100) : 0,
  };
}

const cargar = cache(async (level: string) => {
  // El avance se lee en cada visita; si no, el build lo congelaría.
  await connection();

  const [stats, verbos, examen] = await Promise.all([
    getStatsByExercise(),
    getVerbStudiedCount(level),
    query<(RowDataPacket & { correct_count: number; total: number })[]>(
      `SELECT correct_count, total FROM exam_attempts
        WHERE finished_at IS NOT NULL AND total > 0
        ORDER BY correct_count / total DESC
        LIMIT 1`,
    ),
  ]);

  return { stats, verbos, mejorExamen: examen[0] ?? null };
});

/**
 * Avance para pintarlo en el menú del nivel. Se calcula una vez por petición
 * aunque lo pidan varios grupos de cards. Solo cuenta los ejercicios del nivel:
 * su ruta empieza por `/a1`, `/a2`, etc.
 */
export async function getMenuProgress(level = "A1"): Promise<MenuProgress> {
  const { stats, verbos, mejorExamen } = await cargar(level);
  const prefijo = `/${level.toLowerCase()}`;
  const esDelNivel = (clave: ExerciseKey) =>
    (EXERCISE_INFO[clave]?.href ?? "").startsWith(prefijo);

  const forHref = (href: string): CardProgress | null => {
    // La lista de verbos y el examen no llevan «dominado», pero sí avance.
    if (href === `${prefijo}/verbos`) {
      return verbos.total > 0
        ? porcentaje(
            verbos.studied,
            verbos.total,
            `${verbos.studied} de ${verbos.total} estudiados`,
          )
        : null;
    }
    if (href === `${prefijo}/examen`) {
      if (!mejorExamen) return null;
      const aciertos = Number(mejorExamen.correct_count);
      const total = Number(mejorExamen.total);
      return porcentaje(
        aciertos,
        total,
        `mejor intento: ${aciertos} de ${total}`,
      );
    }

    const claves = ejerciciosDe(href);
    if (claves.length === 0) return null;

    let done = 0;
    let total = 0;
    for (const clave of claves) {
      const s = stats.get(clave);
      if (!s) continue;
      done += s.mastered;
      total += s.total;
    }
    return total > 0 ? porcentaje(done, total) : null;
  };

  let done = 0;
  let total = 0;
  for (const [clave, s] of stats) {
    if (!esDelNivel(clave)) continue;
    done += s.mastered;
    total += s.total;
  }

  return { forHref, overall: porcentaje(done, total) };
}
