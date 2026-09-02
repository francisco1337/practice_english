import type { RowDataPacket } from "mysql2";
import { query } from "./db";
import { EXERCISE_ITEM_TYPES, type ExerciseKey } from "./practice";
import { getSettings, getStatsByExercise } from "./practice-db";
import { EXERCISE_INFO } from "./review-labels";

export type PlanKind = "repaso" | "flojo" | "oido" | "boca";

export type PlanBlock = {
  exercise: ExerciseKey;
  name: string;
  href: string;
  kind: PlanKind;
  /** Respuestas que pide el bloque. */
  target: number;
  /** Respuestas dadas hoy en ese ejercicio. */
  done: number;
};

export type DailyPlan = {
  enabled: boolean;
  goal: number;
  answersToday: number;
  correctToday: number;
  streak: number;
  blocks: PlanBlock[];
};

const KIND_LABEL: Record<PlanKind, string> = {
  repaso: "Repaso vencido",
  flojo: "Lo más flojo",
  oido: "Oído",
  boca: "Boca",
};

export const PLAN_KIND_LABEL = KIND_LABEL;

/** Suma días a una fecha YYYY-MM-DD sin que la zona horaria la corra un día. */
function masDias(dia: string, delta: number): string {
  const d = new Date(`${dia}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

/**
 * Racha de días seguidos con actividad. `hoy` viene del servidor de base de
 * datos para que el corte del día sea el mismo que usa la tabla activity; hoy
 * sin practicar todavía no rompe la racha.
 */
function contarRacha(dias: string[], hoy: string): number {
  if (dias.length === 0) return 0;
  const set = new Set(dias);

  const inicio = set.has(hoy) ? hoy : masDias(hoy, -1);
  if (!set.has(inicio)) return 0;

  let racha = 0;
  let cursor = inicio;
  while (set.has(cursor)) {
    racha++;
    cursor = masDias(cursor, -1);
  }
  return racha;
}

/**
 * Arma el plan del día. Es determinista: el mismo día siempre propone lo mismo,
 * y lo que ya hiciste hoy aparece completado en lugar de cambiarse por otra cosa.
 */
export async function getDailyPlan(): Promise<DailyPlan> {
  const settings = await getSettings();

  const [[{ hoy: diaDeHoy }], porEjercicio, hoy, dias] = await Promise.all([
    query<(RowDataPacket & { hoy: string })[]>(
      "SELECT DATE_FORMAT(CURDATE(), '%Y-%m-%d') AS hoy",
    ),
    getStatsByExercise(),
    query<(RowDataPacket & { exercise: ExerciseKey; answers: number; correct: number })[]>(
      "SELECT exercise, answers, correct FROM activity WHERE day = CURDATE()",
    ),
    query<(RowDataPacket & { day: string })[]>(
      "SELECT DISTINCT DATE_FORMAT(day, '%Y-%m-%d') AS day FROM activity ORDER BY day DESC LIMIT 400",
    ),
  ]);

  const answersToday = hoy.reduce((a, r) => a + Number(r.answers), 0);
  const correctToday = hoy.reduce((a, r) => a + Number(r.correct), 0);
  const hechoPorEjercicio = new Map(
    hoy.map((r) => [r.exercise, Number(r.answers)]),
  );

  const info = (exercise: ExerciseKey) =>
    EXERCISE_INFO[exercise] ?? { name: exercise, href: "/a1" };

  // Rotación estable por día, para no repetir siempre lo mismo.
  const diaDelAño = Math.floor(
    (new Date(`${diaDeHoy}T12:00:00Z`).getTime() -
      new Date(`${diaDeHoy.slice(0, 4)}-01-01T12:00:00Z`).getTime()) /
      86_400_000,
  );
  const elegir = <T,>(lista: T[], cuantos: number): T[] => {
    if (lista.length === 0) return [];
    const inicio = diaDelAño % lista.length;
    return Array.from({ length: Math.min(cuantos, lista.length) }, (_, i) =>
      lista[(inicio + i) % lista.length],
    );
  };

  const usados = new Set<ExerciseKey>();
  const temasUsados = new Set<string>();
  const blocks: PlanBlock[] = [];
  const agregar = (exercise: ExerciseKey, kind: PlanKind, target: number) => {
    if (usados.has(exercise) || target <= 0) return;
    usados.add(exercise);
    const tema = EXERCISE_ITEM_TYPES[exercise]?.[0];
    if (tema) temasUsados.add(tema);
    const { name, href } = info(exercise);
    blocks.push({
      exercise,
      name,
      href,
      kind,
      target,
      done: hechoPorEjercicio.get(exercise) ?? 0,
    });
  };

  // 1. Repasos vencidos: primero y con tope, para que nunca sea una avalancha.
  const conRepaso = [...porEjercicio.entries()]
    .filter(([, s]) => s.due > 0)
    .sort((a, b) => b[1].due - a[1].due);
  let cupoRepaso = 15;
  for (const [exercise, s] of conRepaso.slice(0, 3)) {
    const target = Math.min(s.due, cupoRepaso, 10);
    agregar(exercise, "repaso", target);
    cupoRepaso -= target;
    if (cupoRepaso <= 0) break;
  }

  const restante = Math.max(10, settings.dailyGoal - (15 - cupoRepaso));
  const porBloque = Math.max(5, Math.min(12, Math.round(restante / 4)));

  const pendientes = (exercise: ExerciseKey) =>
    (porEjercicio.get(exercise)?.pending ?? 0) > 0;
  const debilidad = (exercise: ExerciseKey) => {
    const s = porEjercicio.get(exercise);
    if (!s || s.total === 0) return 1;
    return s.mastered / s.total;
  };
  /**
   * Lo más flojo primero, pero sin repetir tema dentro del mismo día: dos
   * bloques de adverbios seguidos aburren y dejan el resto sin tocar. Si no
   * queda otro tema, se acepta el repetido antes que dejar el bloque vacío.
   */
  const candidatos = (filtro: (key: ExerciseKey) => boolean) => {
    const lista = [...porEjercicio.keys()]
      .filter((key) => !usados.has(key) && pendientes(key) && filtro(key))
      .sort((a, b) => debilidad(a) - debilidad(b) || a.localeCompare(b));
    const nuevos = lista.filter(
      (key) => !temasUsados.has(EXERCISE_ITEM_TYPES[key]?.[0] ?? ""),
    );
    return nuevos.length > 0 ? nuevos : lista;
  };

  const esDictado = (key: ExerciseKey) => key.endsWith("-dict");
  const esHablar = (key: ExerciseKey) => key.endsWith("-speak");
  const esEscrito = (key: ExerciseKey) => !esDictado(key) && !esHablar(key);

  // 2. Lo más flojo (dos bloques), 3. oído, 4. boca.
  for (let i = 0; i < 2; i++) {
    const [exercise] = elegir(candidatos(esEscrito).slice(0, 6), 1);
    if (exercise) agregar(exercise, "flojo", porBloque);
  }
  const [dictado] = elegir(candidatos(esDictado).slice(0, 4), 1);
  if (dictado) agregar(dictado, "oido", Math.max(5, porBloque - 2));

  const [hablar] = elegir(candidatos(esHablar).slice(0, 4), 1);
  if (hablar) agregar(hablar, "boca", Math.max(5, porBloque - 4));

  // Los bloques deben sumar la meta del día, si no la barra nunca llega al
  // 100% aunque termines todo. Los repasos no se tocan: su tamaño lo manda
  // cuántos vencieron.
  const ajustables = blocks.filter((b) => b.kind !== "repaso");
  let sobra = settings.dailyGoal - blocks.reduce((a, b) => a + b.target, 0);
  for (let i = 0; ajustables.length > 0 && sobra !== 0; i++) {
    const bloque = ajustables[i % ajustables.length];
    if (sobra > 0) {
      bloque.target++;
      sobra--;
    } else if (bloque.target > 2) {
      bloque.target--;
      sobra++;
    } else if (ajustables.every((b) => b.target <= 2)) {
      break;
    }
  }

  return {
    enabled: settings.dailyPlanEnabled,
    goal: settings.dailyGoal,
    answersToday,
    correctToday,
    streak: contarRacha(dias.map((d) => d.day), diaDeHoy),
    blocks,
  };
}
