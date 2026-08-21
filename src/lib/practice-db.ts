import type { RowDataPacket } from "mysql2";
import { execute, query } from "./db";
import {
  EXERCISE_ITEM_TYPES,
  MASTERY_TARGET_MAX,
  MASTERY_TARGET_MIN,
  SENTENCE_MODES,
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

  const rows = await query<ItemRow[]>(
    `SELECT v.id, ${catalog.columns},
            p.correct_count, p.wrong_count, p.mastered, p.active
       FROM ${catalog.table} v
       JOIN progress p ON p.item_id = v.id AND p.item_type = ? AND p.exercise = ?
      ORDER BY v.id`,
    [itemType, exercise],
  );
  return rows.map((row) => toItem(row, itemType));
}

export async function getSettings(): Promise<Settings> {
  const rows = await query<(RowDataPacket & { mastery_target: number })[]>(
    "SELECT mastery_target FROM settings WHERE id = 1",
  );
  return { masteryTarget: rows[0]?.mastery_target ?? 10 };
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
export async function registerAnswer(
  exercise: ExerciseKey,
  itemType: ItemType,
  itemId: number,
  correct: boolean,
) {
  const { masteryTarget } = await getSettings();

  if (correct) {
    await execute(
      `UPDATE progress
          SET correct_count = correct_count + 1,
              mastered = IF(correct_count + 1 >= ?, 1, 0)
        WHERE exercise = ? AND item_type = ? AND item_id = ?`,
      [masteryTarget, exercise, itemType, itemId],
    );
  } else {
    await execute(
      `UPDATE progress
          SET wrong_count = wrong_count + 1, correct_count = 0, mastered = 0
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
    `UPDATE progress SET correct_count = 0, wrong_count = 0, mastered = 0
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
    "UPDATE progress SET mastered = IF(correct_count >= ?, 1, 0)",
    [clamped],
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
     WHERE s.level = ? AND pp.active = 1 AND pp.mastered = 0
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
  item_id: number;
  item_english: string;
  item_spanish: string;
  item_category: string;
  item_hint: string;
};

const QA_SELECT = `
  SELECT p.id, p.level, p.spanish_question, p.spanish_answer,
         p.english_question, p.english_answer, p.cue, p.form_id AS item_id,
         n.english AS item_english, n.spanish AS item_spanish,
         n.category AS item_category, n.hint AS item_hint
    FROM qa_pairs p
    JOIN qa_forms n ON n.id = p.form_id
`;

/** Lo que se muestra y lo que se espera, según el modo del ejercicio. */
function qaPromptAndAnswers(row: QaRow, exercise: QaExerciseKey) {
  const mode = QA_MODES[exercise];
  if (mode === "en-es") {
    return {
      question: row.english_question,
      answer: row.english_answer,
      expectedQuestion: row.spanish_question,
      expectedAnswer: row.spanish_answer,
    };
  }
  if (mode === "cue") {
    return {
      question: row.cue,
      answer: "",
      expectedQuestion: row.english_question,
      expectedAnswer: row.english_answer,
    };
  }
  return {
    question: row.spanish_question,
    answer: row.spanish_answer,
    expectedQuestion: row.english_question,
    expectedAnswer: row.english_answer,
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
     WHERE p.level = ? AND pp.active = 1 AND pp.mastered = 0
       AND (? IS NULL OR p.id <> ?)
     ORDER BY RAND()
     LIMIT 1`,
    [exercise, level, excludeId ?? null, excludeId ?? 0],
  );

  const row = rows[0];
  if (!row) return null;

  const { question, answer } = qaPromptAndAnswers(row, exercise);
  return { id: row.id, level: row.level, question, answer, itemId: row.item_id };
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
  const check = mode === "en-es" ? "en-es" : "es-en";
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
