import type { RowDataPacket } from "mysql2";
import { execute, query } from "./db";
import {
  EXERCISE_ITEM_TYPES,
  DAILY_GOAL_MAX,
  DAILY_GOAL_MIN,
  MASTERY_TARGET_MAX,
  MASTERY_TARGET_MIN,
  REVIEW_INTERVALS,
  SPEECH_RATE_MAX,
  SPEECH_RATE_MIN,
  SENTENCE_MODES,
  VERB_EXERCISE_LEVEL,
  isSentenceCorrect,
  type ExerciseKey,
  type ItemType,
  type PracticeItem,
  type PracticeState,
  type SentencePrompt,
  type SentenceExerciseKey,
  type SentenceMode,
  type Settings,
  QA_MODES,
  type QaExerciseKey,
  type QaPrompt,
} from "./practice";

type ItemRow = RowDataPacket & {
  id: number;
  english: string;
  spanish: string;
  spanish_alt: string[] | string | null;
  english_alt: string[] | string | null;
  category: string | null;
  hint: string | null;
  correct_count: number;
  wrong_count: number;
  mastered: number;
  active: number;
  review_due: string | Date | null;
  days_to_review: number | null;
};

function parseJson<T>(value: string | T | null): T | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

function parseJsonArray(value: string[] | string | null): string[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function toItem(row: ItemRow, type: ItemType): PracticeItem {
  return {
    id: row.id,
    type,
    prompt: row.spanish,
    answer: row.english,
    category: row.category ?? undefined,
    hint: row.hint ?? undefined,
    alternatives: parseJsonArray(row.spanish_alt),
    answerAlternatives: parseJsonArray(row.english_alt),
    correctCount: row.correct_count,
    wrongCount: row.wrong_count,
    mastered: row.mastered === 1,
    active: row.active === 1,
    dueForReview: row.mastered === 1 && (row.days_to_review ?? 1) <= 0,
    reviewInDays: row.days_to_review,
  };
}

async function getItems(
  exercise: ExerciseKey,
  itemType: ItemType,
): Promise<PracticeItem[]> {
  const catalog = {
    verb: {
      table: "verbs",
      columns:
        "v.english, v.spanish, v.spanish_alt, NULL AS english_alt, NULL AS category, NULL AS hint",
    },
    pronoun: {
      table: "pronouns",
      columns:
        "v.english, v.spanish, NULL AS spanish_alt, NULL AS english_alt, v.category, v.hint",
    },
    tobe: {
      table: "tobe_forms",
      columns:
        "v.english, v.spanish, NULL AS spanish_alt, NULL AS english_alt, v.category, v.hint",
    },
    article: {
      table: "article_forms",
      columns:
        "v.english, v.spanish, NULL AS spanish_alt, NULL AS english_alt, v.category, v.hint",
    },
    present: {
      table: "present_forms",
      columns:
        "v.english, v.spanish, NULL AS spanish_alt, NULL AS english_alt, v.category, v.hint",
    },
    qa: {
      table: "qa_forms",
      columns:
        "v.english, v.spanish, NULL AS spanish_alt, NULL AS english_alt, v.category, v.hint",
    },
    third: {
      table: "third_forms",
      columns:
        "v.english, v.spanish, NULL AS spanish_alt, NULL AS english_alt, v.category, v.hint",
    },
    there: {
      table: "there_forms",
      columns:
        "v.english, v.spanish, NULL AS spanish_alt, NULL AS english_alt, v.category, v.hint",
    },
    cont: {
      table: "cont_forms",
      columns:
        "v.english, v.spanish, NULL AS spanish_alt, NULL AS english_alt, v.category, v.hint",
    },
    wh: {
      table: "wh_forms",
      columns:
        "v.english, v.spanish, NULL AS spanish_alt, v.english_alt, v.category, v.hint",
    },
    prep: {
      table: "prep_forms",
      columns:
        "v.english, v.spanish, NULL AS spanish_alt, v.english_alt, v.category, v.hint",
    },
    adv: {
      table: "adv_forms",
      columns:
        "v.english, v.spanish, NULL AS spanish_alt, v.english_alt, v.category, v.hint",
    },
    phrase: {
      table: "phrase_items",
      columns:
        "v.english, v.spanish, NULL AS spanish_alt, v.english_alt, v.category, v.hint",
    },
  }[itemType];

  // Los verbos de A1 y A2 comparten tabla; cada ejercicio ve solo los de su nivel.
  const level = itemType === "verb" ? VERB_EXERCISE_LEVEL[exercise] : undefined;

  const rows = await query<ItemRow[]>(
    `SELECT v.id, ${catalog.columns},
            p.correct_count, p.wrong_count, p.mastered, p.active, p.review_due,
            DATEDIFF(p.review_due, CURDATE()) AS days_to_review
       FROM ${catalog.table} v
       JOIN progress p ON p.item_id = v.id AND p.item_type = ? AND p.exercise = ?
      ${level ? "WHERE v.level = ?" : ""}
      ORDER BY v.id`,
    level ? [itemType, exercise, level] : [itemType, exercise],
  );
  return rows.map((row) => toItem(row, itemType));
}

export async function getSettings(): Promise<Settings> {
  const rows = await query<
    (RowDataPacket & {
      mastery_target: number;
      speech_enabled: number;
      speech_rate: string | number;
      daily_plan_enabled: number;
      daily_goal: number;
    })[]
  >(
    `SELECT mastery_target, speech_enabled, speech_rate, daily_plan_enabled, daily_goal
       FROM settings WHERE id = 1`,
  );
  return {
    masteryTarget: rows[0]?.mastery_target ?? 10,
    speechEnabled: rows[0]?.speech_enabled !== 0,
    speechRate: Number(rows[0]?.speech_rate ?? 0.95),
    dailyPlanEnabled: rows[0]?.daily_plan_enabled !== 0,
    dailyGoal: Number(rows[0]?.daily_goal ?? 40),
  };
}

/** Enciende o apaga la pronunciación (vale para todos los dispositivos). */
export async function setSpeechEnabled(enabled: boolean) {
  await execute("UPDATE settings SET speech_enabled = ? WHERE id = 1", [
    enabled ? 1 : 0,
  ]);
}

export async function setDailyPlanEnabled(enabled: boolean) {
  await execute("UPDATE settings SET daily_plan_enabled = ? WHERE id = 1", [
    enabled ? 1 : 0,
  ]);
}

export async function setDailyGoal(goal: number) {
  const clamped = Math.min(
    DAILY_GOAL_MAX,
    Math.max(DAILY_GOAL_MIN, Math.round(goal)),
  );
  await execute("UPDATE settings SET daily_goal = ? WHERE id = 1", [clamped]);
}

export async function setSpeechRate(rate: number) {
  const clamped = Math.min(
    SPEECH_RATE_MAX,
    Math.max(SPEECH_RATE_MIN, Math.round(rate * 100) / 100),
  );
  await execute("UPDATE settings SET speech_rate = ? WHERE id = 1", [clamped]);
}

export async function getPracticeState(
  exercise: ExerciseKey,
): Promise<PracticeState> {
  const types = EXERCISE_ITEM_TYPES[exercise];
  const [settings, ...lists] = await Promise.all([
    getSettings(),
    ...types.map((itemType) => getItems(exercise, itemType)),
  ]);

  const items: PracticeState["items"] = {};
  types.forEach((itemType, index) => {
    items[itemType] = lists[index] as PracticeItem[];
  });

  return { exercise, items, settings };
}

/**
 * Registra una respuesta: el acierto suma y marca como dominado al llegar al
 * umbral; el error reinicia el contador de ese elemento a cero.
 */
/**
 * Suma una respuesta al registro del día (para el plan y la racha). El examen
 * no tiene progreso por elemento, pero sus respuestas también cuentan.
 */
export async function logActivity(
  exercise: ExerciseKey | "exam",
  correct: boolean,
) {
  await execute(
    `INSERT INTO activity (day, exercise, answers, correct) VALUES (CURDATE(), ?, 1, ?)
       ON DUPLICATE KEY UPDATE answers = answers + 1, correct = correct + VALUES(correct)`,
    [exercise, correct ? 1 : 0],
  );
}

export async function registerAnswer(
  exercise: ExerciseKey,
  itemType: ItemType,
  itemId: number,
  correct: boolean,
) {
  await logActivity(exercise, correct);
  const { masteryTarget } = await getSettings();

  const rows = await query<
    (RowDataPacket & {
      mastered: number;
      review_stage: number;
      days_to_review: number | null;
    })[]
  >(
    `SELECT mastered, review_stage, DATEDIFF(review_due, CURDATE()) AS days_to_review
       FROM progress
      WHERE exercise = ? AND item_type = ? AND item_id = ?`,
    [exercise, itemType, itemId],
  );
  const row = rows[0];
  const enRepaso =
    row?.mastered === 1 && (row.days_to_review ?? 1) <= 0;

  if (enRepaso) {
    if (correct) {
      // Repaso superado: se aleja al siguiente intervalo.
      const etapa = Math.min(
        (row.review_stage ?? 1) + 1,
        REVIEW_INTERVALS.length,
      );
      const dias = REVIEW_INTERVALS[etapa - 1];
      await execute(
        `UPDATE progress
            SET review_stage = ?, review_due = DATE_ADD(CURDATE(), INTERVAL ? DAY)
          WHERE exercise = ? AND item_type = ? AND item_id = ?`,
        [etapa, dias, exercise, itemType, itemId],
      );
    } else {
      // Se olvidó: vuelve a la práctica normal desde cero.
      await execute(
        `UPDATE progress
            SET wrong_count = wrong_count + 1, correct_count = 0, mastered = 0,
                mastered_at = NULL, review_stage = 0, review_due = NULL
          WHERE exercise = ? AND item_type = ? AND item_id = ?`,
        [exercise, itemType, itemId],
      );
    }
    return;
  }

  if (correct) {
    // Al llegar al umbral queda dominado y se programa el primer repaso.
    await execute(
      `UPDATE progress
          SET correct_count = correct_count + 1,
              mastered = IF(correct_count + 1 >= ?, 1, 0),
              mastered_at = IF(correct_count + 1 >= ?, CURRENT_TIMESTAMP, mastered_at),
              review_stage = IF(correct_count + 1 >= ?, 1, review_stage),
              review_due = IF(
                correct_count + 1 >= ?,
                DATE_ADD(CURDATE(), INTERVAL ? DAY),
                review_due
              )
        WHERE exercise = ? AND item_type = ? AND item_id = ?`,
      [
        masteryTarget,
        masteryTarget,
        masteryTarget,
        masteryTarget,
        REVIEW_INTERVALS[0],
        exercise,
        itemType,
        itemId,
      ],
    );
  } else {
    await execute(
      `UPDATE progress
          SET wrong_count = wrong_count + 1, correct_count = 0, mastered = 0,
              mastered_at = NULL, review_stage = 0, review_due = NULL
        WHERE exercise = ? AND item_type = ? AND item_id = ?`,
      [exercise, itemType, itemId],
    );
  }
}

/** Reinicia contadores: de un elemento, de un tipo o de todo el ejercicio. */
export async function resetProgress(
  exercise: ExerciseKey,
  itemType?: ItemType,
  itemId?: number,
) {
  const conditions = ["exercise = ?"];
  const params: (string | number)[] = [exercise];
  if (itemType) {
    conditions.push("item_type = ?");
    params.push(itemType);
  }
  if (itemId !== undefined) {
    conditions.push("item_id = ?");
    params.push(itemId);
  }

  await execute(
    `UPDATE progress
        SET correct_count = 0, wrong_count = 0, mastered = 0,
            mastered_at = NULL, review_stage = 0, review_due = NULL
      WHERE ${conditions.join(" AND ")}`,
    params,
  );
}

/** Activa o desactiva elementos para la práctica. */
export async function setActive(
  exercise: ExerciseKey,
  itemType: ItemType,
  itemIds: number[],
  active: boolean,
) {
  if (itemIds.length === 0) return;
  await query(
    `UPDATE progress SET active = ?
      WHERE exercise = ? AND item_type = ? AND item_id IN (?)`,
    [active ? 1 : 0, exercise, itemType, itemIds],
  );
}

/** Cambia el umbral de aciertos y recalcula qué elementos quedan dominados. */
export async function setMasteryTarget(target: number) {
  const clamped = Math.min(
    MASTERY_TARGET_MAX,
    Math.max(MASTERY_TARGET_MIN, Math.round(target)),
  );

  await execute("UPDATE settings SET mastery_target = ? WHERE id = 1", [
    clamped,
  ]);
  await execute(
    `UPDATE progress
        SET mastered = IF(correct_count >= ?, 1, 0),
            review_stage = IF(correct_count >= ?, GREATEST(review_stage, 1), 0),
            review_due = IF(
              correct_count >= ?,
              COALESCE(review_due, DATE_ADD(CURDATE(), INTERVAL ? DAY)),
              NULL
            )`,
    [clamped, clamped, clamped, REVIEW_INTERVALS[0]],
  );

  return clamped;
}

// --- Ejercicios de frases -------------------------------------------------

/** Cada ejercicio de frases dice de dónde salen sus frases y qué practica. */
const SENTENCE_EXERCISES = {
  translate: {
    itemType: "pronoun" as ItemType,
    table: "sentences",
    itemTable: "pronouns",
    itemColumn: "pronoun_id",
    /** Solo el tema de pronombres filtra por verbo y muestra cuál es. */
    withVerbs: true,
  },
  "tobe-translate": {
    itemType: "tobe" as ItemType,
    table: "tobe_sentences",
    itemTable: "tobe_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "art-translate": {
    itemType: "article" as ItemType,
    table: "article_sentences",
    itemTable: "article_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "ps-translate": {
    itemType: "present" as ItemType,
    table: "present_sentences",
    itemTable: "present_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "ps-translate-rev": {
    itemType: "present" as ItemType,
    table: "present_sentences",
    itemTable: "present_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "ps-cloze": {
    itemType: "present" as ItemType,
    table: "present_sentences",
    itemTable: "present_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "tp-translate": {
    itemType: "third" as ItemType,
    table: "third_sentences",
    itemTable: "third_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "tp-translate-rev": {
    itemType: "third" as ItemType,
    table: "third_sentences",
    itemTable: "third_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "tp-fix": {
    itemType: "third" as ItemType,
    table: "third_sentences",
    itemTable: "third_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "th-translate": {
    itemType: "there" as ItemType,
    table: "there_sentences",
    itemTable: "there_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "th-translate-rev": {
    itemType: "there" as ItemType,
    table: "there_sentences",
    itemTable: "there_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "th-fix": {
    itemType: "there" as ItemType,
    table: "there_sentences",
    itemTable: "there_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "pc-translate": {
    itemType: "cont" as ItemType,
    table: "cont_sentences",
    itemTable: "cont_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "pc-translate-rev": {
    itemType: "cont" as ItemType,
    table: "cont_sentences",
    itemTable: "cont_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "pc-fix": {
    itemType: "cont" as ItemType,
    table: "cont_sentences",
    itemTable: "cont_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "wh-cloze": {
    itemType: "wh" as ItemType,
    table: "wh_sentences",
    itemTable: "wh_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "wh-translate": {
    itemType: "wh" as ItemType,
    table: "wh_sentences",
    itemTable: "wh_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "prep-cloze": {
    itemType: "prep" as ItemType,
    table: "prep_sentences",
    itemTable: "prep_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "prep-translate": {
    itemType: "prep" as ItemType,
    table: "prep_sentences",
    itemTable: "prep_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "prep-translate-rev": {
    itemType: "prep" as ItemType,
    table: "prep_sentences",
    itemTable: "prep_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "adv-translate": {
    itemType: "adv" as ItemType,
    table: "adv_sentences",
    itemTable: "adv_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "adv-fix": {
    itemType: "adv" as ItemType,
    table: "adv_sentences",
    itemTable: "adv_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  // Dictado: mismas frases, pero se escuchan en lugar de leerse.
  "pron-dict": {
    itemType: "pronoun" as ItemType,
    table: "sentences",
    itemTable: "pronouns",
    itemColumn: "pronoun_id",
    // Sin filtro por verbo: en dictado no hay panel de verbos y, sobre todo,
    // mostrar el verbo de la frase sería darle la mitad de la respuesta.
    withVerbs: false,
  },
  "tobe-dict": {
    itemType: "tobe" as ItemType,
    table: "tobe_sentences",
    itemTable: "tobe_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "art-dict": {
    itemType: "article" as ItemType,
    table: "article_sentences",
    itemTable: "article_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "ps-dict": {
    itemType: "present" as ItemType,
    table: "present_sentences",
    itemTable: "present_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "tp-dict": {
    itemType: "third" as ItemType,
    table: "third_sentences",
    itemTable: "third_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "th-dict": {
    itemType: "there" as ItemType,
    table: "there_sentences",
    itemTable: "there_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "pc-dict": {
    itemType: "cont" as ItemType,
    table: "cont_sentences",
    itemTable: "cont_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "wh-dict": {
    itemType: "wh" as ItemType,
    table: "wh_sentences",
    itemTable: "wh_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "prep-dict": {
    itemType: "prep" as ItemType,
    table: "prep_sentences",
    itemTable: "prep_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "adv-dict": {
    itemType: "adv" as ItemType,
    table: "adv_sentences",
    itemTable: "adv_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "pron-speak": {
    itemType: "pronoun" as ItemType,
    table: "sentences",
    itemTable: "pronouns",
    itemColumn: "pronoun_id",
    withVerbs: false,
  },
  "tobe-speak": {
    itemType: "tobe" as ItemType,
    table: "tobe_sentences",
    itemTable: "tobe_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "art-speak": {
    itemType: "article" as ItemType,
    table: "article_sentences",
    itemTable: "article_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "ps-speak": {
    itemType: "present" as ItemType,
    table: "present_sentences",
    itemTable: "present_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "tp-speak": {
    itemType: "third" as ItemType,
    table: "third_sentences",
    itemTable: "third_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "th-speak": {
    itemType: "there" as ItemType,
    table: "there_sentences",
    itemTable: "there_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "pc-speak": {
    itemType: "cont" as ItemType,
    table: "cont_sentences",
    itemTable: "cont_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "wh-speak": {
    itemType: "wh" as ItemType,
    table: "wh_sentences",
    itemTable: "wh_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "prep-speak": {
    itemType: "prep" as ItemType,
    table: "prep_sentences",
    itemTable: "prep_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
  "adv-speak": {
    itemType: "adv" as ItemType,
    table: "adv_sentences",
    itemTable: "adv_forms",
    itemColumn: "form_id",
    withVerbs: false,
  },
} satisfies Record<SentenceExerciseKey, unknown>;

type SentenceRow = RowDataPacket & {
  id: number;
  level: number;
  spanish: string;
  english: string;
  cloze_text: string | null;
  cloze_answer: string | null;
  wrong_english: string | null;
  alternatives: string[] | string | null;
  item_id: number;
  item_english: string;
  item_spanish: string;
  item_category: string;
  item_hint: string;
  label: string | null;
};

/**
 * Las tablas viejas guardan un arreglo de variantes en inglés; las de presente
 * simple guardan { en: [...], es: [...] } porque se responden en los dos idiomas.
 */
function parseAlternatives(
  value: SentenceRow["alternatives"],
  mode: SentenceMode,
): string[] {
  if (mode === "cloze") return [];
  if (mode === "fix") return [];
  if (mode === "dictation") return [];
  if (mode === "speak") return [];
  const parsed = parseJson<string[] | { en?: string[]; es?: string[] }>(
    value ?? null,
  );
  if (!parsed) return [];
  if (Array.isArray(parsed)) return mode === "en-es" ? [] : parsed;
  return (mode === "en-es" ? parsed.es : parsed.en) ?? [];
}

function sentenceSelect(exercise: SentenceExerciseKey) {
  const t = SENTENCE_EXERCISES[exercise];
  const hasCloze = ["present_sentences", "wh_sentences", "prep_sentences"].includes(
    t.table,
  );
  const hasWrong = [
    "third_sentences",
    "there_sentences",
    "cont_sentences",
    "adv_sentences",
  ].includes(t.table);
  return `
    SELECT s.id, s.level, s.spanish, s.english,
           ${hasCloze ? "s.cloze_text, s.cloze_answer" : "NULL AS cloze_text, NULL AS cloze_answer"},
           ${hasWrong ? "s.wrong_english" : "NULL AS wrong_english"},
           s.alternatives, s.${t.itemColumn} AS item_id,
           n.english AS item_english, n.spanish AS item_spanish,
           n.category AS item_category, n.hint AS item_hint,
           ${t.withVerbs ? "v.english" : "NULL"} AS label
      FROM ${t.table} s
      JOIN ${t.itemTable} n ON n.id = s.${t.itemColumn}
      ${t.withVerbs ? "JOIN verbs v ON v.id = s.verb_id" : ""}
  `;
}

/** Lo que se muestra y lo que se espera, según el modo del ejercicio. */
function promptAndAnswer(row: SentenceRow, exercise: SentenceExerciseKey) {
  const mode = SENTENCE_MODES[exercise];
  if (mode === "cloze") {
    return { prompt: row.cloze_text ?? "", expected: row.cloze_answer ?? "" };
  }
  if (mode === "fix") {
    return { prompt: row.wrong_english ?? "", expected: row.english };
  }
  // En dictado el «prompt» viaja al cliente solo para poder pronunciarlo: la
  // interfaz no lo muestra hasta que se responde.
  if (mode === "dictation" || mode === "speak") {
    return { prompt: row.english, expected: row.english };
  }
  if (mode === "en-es") return { prompt: row.english, expected: row.spanish };
  return { prompt: row.spanish, expected: row.english };
}

/**
 * Siguiente frase del nivel pedido según los filtros: elementos activos y no
 * dominados (y, en pronombres, solo verbos activos).
 */
export async function getNextSentence(
  exercise: SentenceExerciseKey,
  level: number,
  excludeId?: number,
): Promise<SentencePrompt | null> {
  const t = SENTENCE_EXERCISES[exercise];
  const rows = await query<SentenceRow[]>(
    `${sentenceSelect(exercise)}
      JOIN progress pp ON pp.exercise = ? AND pp.item_type = ?
                      AND pp.item_id = s.${t.itemColumn}
      ${
        t.withVerbs
          ? `JOIN progress vp ON vp.exercise = ? AND vp.item_type = 'verb'
                             AND vp.item_id = s.verb_id`
          : ""
      }
     WHERE s.level = ? AND pp.active = 1
       AND (pp.mastered = 0 OR pp.review_due <= CURDATE())
       ${t.withVerbs ? "AND vp.active = 1" : ""}
       AND (? IS NULL OR s.id <> ?)
     ORDER BY RAND()
     LIMIT 1`,
    t.withVerbs
      ? [exercise, t.itemType, exercise, level, excludeId ?? null, excludeId ?? 0]
      : [exercise, t.itemType, level, excludeId ?? null, excludeId ?? 0],
  );

  const row = rows[0];
  if (!row) return null;

  return {
    id: row.id,
    level: row.level,
    spanish: promptAndAnswer(row, exercise).prompt,
    label: row.label ?? undefined,
    itemId: row.item_id,
  };
}

/** Revisa la respuesta escrita y actualiza el progreso del elemento. */
export async function checkSentence(
  exercise: SentenceExerciseKey,
  sentenceId: number,
  answer: string,
) {
  const t = SENTENCE_EXERCISES[exercise];
  const rows = await query<SentenceRow[]>(
    `${sentenceSelect(exercise)} WHERE s.id = ?`,
    [sentenceId],
  );
  const row = rows[0];
  if (!row) return null;

  const mode = SENTENCE_MODES[exercise];
  const { expected } = promptAndAnswer(row, exercise);
  const alternatives = parseAlternatives(row.alternatives, mode);
  const correct = isSentenceCorrect(answer, expected, alternatives, mode);

  await registerAnswer(exercise, t.itemType, row.item_id, correct);

  return {
    correct,
    expected,
    item: {
      english: row.item_english,
      spanish: row.item_spanish,
      category: row.item_category,
      hint: row.item_hint,
    },
  };
}

// --- Preguntar y responder ------------------------------------------------

type QaRow = RowDataPacket & {
  id: number;
  level: number;
  spanish_question: string;
  spanish_answer: string;
  english_question: string;
  english_answer: string;
  cue: string;
  question_subject: string;
  answer_subject: string;
  item_id: number;
  item_english: string;
  item_spanish: string;
  item_category: string;
  item_hint: string;
};

const QA_SELECT = `
  SELECT p.id, p.level, p.spanish_question, p.spanish_answer,
         p.english_question, p.english_answer, p.cue,
         p.question_subject, p.answer_subject, p.form_id AS item_id,
         n.english AS item_english, n.spanish AS item_spanish,
         n.category AS item_category, n.hint AS item_hint
    FROM qa_pairs p
    JOIN qa_forms n ON n.id = p.form_id
`;

/** Lo que se muestra y lo que se espera, según el modo del ejercicio. */
function qaPromptAndAnswers(row: QaRow, exercise: QaExerciseKey) {
  const mode = QA_MODES[exercise];
  // Solo hace falta la pista cuando el inglés no está a la vista.
  const subject =
    (mode === "es-en" || mode === "cue") && row.question_subject
      ? { question: row.question_subject, answer: row.answer_subject }
      : undefined;
  if (mode === "en-es") {
    return {
      question: row.english_question,
      answer: row.english_answer,
      expectedQuestion: row.spanish_question,
      expectedAnswer: row.spanish_answer,
      subject,
    };
  }
  if (mode === "cue") {
    return {
      question: row.cue,
      answer: "",
      expectedQuestion: row.english_question,
      expectedAnswer: row.english_answer,
      subject,
    };
  }
  // En dictado el texto viaja para poder pronunciarlo; la interfaz lo oculta.
  if (mode === "dictation" || mode === "speak") {
    return {
      question: row.english_question,
      answer: row.english_answer,
      expectedQuestion: row.english_question,
      expectedAnswer: row.english_answer,
      subject,
    };
  }
  return {
    question: row.spanish_question,
    answer: row.spanish_answer,
    expectedQuestion: row.english_question,
    expectedAnswer: row.english_answer,
    subject,
  };
}

/** Siguiente par del nivel pedido, respetando los filtros del ejercicio. */
export async function getNextQaPair(
  exercise: QaExerciseKey,
  level: number,
  excludeId?: number,
): Promise<QaPrompt | null> {
  const rows = await query<QaRow[]>(
    `${QA_SELECT}
      JOIN progress pp ON pp.exercise = ? AND pp.item_type = 'qa'
                      AND pp.item_id = p.form_id
     WHERE p.level = ? AND pp.active = 1
       AND (pp.mastered = 0 OR pp.review_due <= CURDATE())
       AND (? IS NULL OR p.id <> ?)
     ORDER BY RAND()
     LIMIT 1`,
    [exercise, level, excludeId ?? null, excludeId ?? 0],
  );

  const row = rows[0];
  if (!row) return null;

  const { question, answer, subject } = qaPromptAndAnswers(row, exercise);
  return {
    id: row.id,
    level: row.level,
    question,
    answer,
    itemId: row.item_id,
    subject,
  };
}

/**
 * Revisa pregunta y respuesta. El progreso solo avanza si las dos están bien;
 * si falla cualquiera de las dos, el contador se reinicia.
 */
export async function checkQaPair(
  exercise: QaExerciseKey,
  pairId: number,
  givenQuestion: string,
  givenAnswer: string,
) {
  const rows = await query<QaRow[]>(`${QA_SELECT} WHERE p.id = ?`, [pairId]);
  const row = rows[0];
  if (!row) return null;

  const mode = QA_MODES[exercise];
  const check: SentenceMode = mode === "en-es" ? "en-es" : "es-en";
  const { expectedQuestion, expectedAnswer } = qaPromptAndAnswers(row, exercise);

  const questionCorrect = isSentenceCorrect(
    givenQuestion,
    expectedQuestion,
    [],
    check,
  );
  const answerCorrect = isSentenceCorrect(givenAnswer, expectedAnswer, [], check);

  await registerAnswer(
    exercise,
    "qa",
    row.item_id,
    questionCorrect && answerCorrect,
  );

  return {
    questionCorrect,
    answerCorrect,
    expectedQuestion,
    expectedAnswer,
    item: {
      english: row.item_english,
      spanish: row.item_spanish,
      category: row.item_category,
      hint: row.item_hint,
    },
  };
}

// --- Lista de consulta de verbos -------------------------------------------

export type VerbEntry = {
  english: string;
  spanish: string;
  /** Sinónimos en español, para buscar y consultar. */
  synonyms: string[];
  thirdPerson: string;
  gerund: string;
  past: string;
  participle: string;
  irregular: boolean;
  note: string | null;
  /** Marca personal de «ya lo estudié». */
  studied: boolean;
};

/** Todos los verbos del nivel con su conjugación, en orden alfabético. */
export async function getVerbList(level = "A1"): Promise<VerbEntry[]> {
  const rows = await query<
    (RowDataPacket & {
      english: string;
      spanish: string;
      spanish_alt: string[] | string | null;
      third_person: string | null;
      gerund: string | null;
      past: string | null;
      participle: string | null;
      irregular: number;
      form_note: string | null;
      studied: number;
    })[]
  >(
    `SELECT english, spanish, spanish_alt, third_person, gerund, past, participle,
            irregular, form_note, studied
       FROM verbs
      WHERE level = ?
      ORDER BY english`,
    [level],
  );

  return rows.map((r) => ({
    english: r.english,
    spanish: r.spanish,
    synonyms: parseJsonArray(r.spanish_alt) ?? [],
    thirdPerson: r.third_person ?? "",
    gerund: r.gerund ?? "",
    past: r.past ?? "",
    participle: r.participle ?? "",
    irregular: r.irregular === 1,
    note: r.form_note,
    studied: r.studied === 1,
  }));
}

/** Marca o desmarca un verbo como estudiado (se guarda en la base). */
export async function setVerbStudied(english: string, studied: boolean) {
  await execute("UPDATE verbs SET studied = ? WHERE english = ?", [
    studied ? 1 : 0,
    english,
  ]);
}

// --- Repaso espaciado ------------------------------------------------------

export type ReviewRow = {
  exercise: ExerciseKey;
  itemType: ItemType;
  /** Dominados a los que ya toca repaso. */
  due: number;
  /** Repasos programados de aquí al domingo próximo. */
  thisWeek: number;
  /** Total dominado en ese ejercicio. */
  mastered: number;
  /** Días para el repaso más cercano que aún no vence. */
  nextInDays: number | null;
};

export type ExerciseStats = {
  /** Elementos del catálogo de ese ejercicio. */
  total: number;
  mastered: number;
  /** Dominados con el repaso ya vencido. */
  due: number;
  /** Activos que todavía no se dominan. */
  pending: number;
};

/**
 * Conteos por ejercicio, contando solo su tipo de elemento principal: en
 * «traducir frase», por ejemplo, los verbos son filtro y no progreso.
 */
export async function getStatsByExercise(): Promise<
  Map<ExerciseKey, ExerciseStats>
> {
  const rows = await query<
    (RowDataPacket & {
      exercise: ExerciseKey;
      item_type: ItemType;
      total: number;
      mastered: number;
      due: number;
      pending: number;
    })[]
  >(
    `SELECT exercise, item_type, COUNT(*) total, SUM(mastered) mastered,
            SUM(mastered = 1 AND review_due <= CURDATE()) due,
            SUM(active = 1 AND mastered = 0) pending
       FROM progress
      GROUP BY exercise, item_type`,
  );

  const porEjercicio = new Map<ExerciseKey, ExerciseStats>();
  for (const row of rows) {
    if (EXERCISE_ITEM_TYPES[row.exercise]?.[0] !== row.item_type) continue;
    porEjercicio.set(row.exercise, {
      total: Number(row.total),
      mastered: Number(row.mastered),
      due: Number(row.due),
      pending: Number(row.pending),
    });
  }
  return porEjercicio;
}

/** Cuántos verbos llevas marcados como estudiados en la lista del nivel. */
export async function getVerbStudiedCount(level = "A1"): Promise<{
  studied: number;
  total: number;
}> {
  const rows = await query<
    (RowDataPacket & { studied: number; total: number })[]
  >("SELECT SUM(studied) studied, COUNT(*) total FROM verbs WHERE level = ?", [
    level,
  ]);
  return {
    studied: Number(rows[0]?.studied ?? 0),
    total: Number(rows[0]?.total ?? 0),
  };
}

/** Qué toca repasar, por ejercicio. */
export async function getReviewSummary(): Promise<ReviewRow[]> {
  const rows = await query<
    (RowDataPacket & {
      exercise: ExerciseKey;
      item_type: ItemType;
      due: number;
      this_week: number;
      mastered: number;
      next_in_days: number | null;
    })[]
  >(
    `SELECT exercise, item_type,
            SUM(review_due <= CURDATE()) AS due,
            SUM(review_due > CURDATE() AND review_due <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)) AS this_week,
            COUNT(*) AS mastered,
            MIN(CASE WHEN review_due > CURDATE() THEN DATEDIFF(review_due, CURDATE()) END) AS next_in_days
       FROM progress
      WHERE mastered = 1 AND review_due IS NOT NULL AND active = 1
      GROUP BY exercise, item_type
      ORDER BY due DESC, exercise`,
  );

  return rows.map((r) => ({
    exercise: r.exercise,
    itemType: r.item_type,
    due: Number(r.due),
    thisWeek: Number(r.this_week),
    mastered: Number(r.mastered),
    nextInDays: r.next_in_days === null ? null : Number(r.next_in_days),
  }));
}
