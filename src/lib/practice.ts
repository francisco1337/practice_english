/** Tipos, constantes y lógica compartida entre servidor y cliente. */

export type ExerciseKey =
  | "a1-match"
  | "a1-match-rev"
  | "a1-write"
  | "a1-write-rev"
  | "a2-match"
  | "a2-match-rev"
  | "a2-write"
  | "a2-write-rev"
  | "a2-dict"
  | "a2-speak"
  | "pron-match"
  | "pron-match-rev"
  | "translate"
  | "tobe-match"
  | "tobe-match-rev"
  | "tobe-translate"
  | "art-match"
  | "art-match-rev"
  | "art-translate"
  | "ps-translate"
  | "ps-translate-rev"
  | "ps-cloze"
  | "qa-translate"
  | "qa-translate-rev"
  | "qa-ask"
  | "tp-translate"
  | "tp-translate-rev"
  | "tp-fix"
  | "th-translate"
  | "th-translate-rev"
  | "th-fix"
  | "pc-translate"
  | "pc-translate-rev"
  | "pc-fix"
  | "wh-match"
  | "wh-cloze"
  | "wh-translate"
  | "prep-cloze"
  | "prep-translate"
  | "prep-translate-rev"
  | "adv-match"
  | "adv-translate"
  | "adv-fix"
  | "ph-match"
  | "ph-match-rev"
  | "ph-write"
  | "pron-dict"
  | "tobe-dict"
  | "art-dict"
  | "ps-dict"
  | "tp-dict"
  | "th-dict"
  | "pc-dict"
  | "a1-dict"
  | "ph-dict"
  | "qa-dict"
  | "wh-dict"
  | "prep-dict"
  | "adv-dict"
  | "a1-speak"
  | "ph-speak"
  | "qa-speak"
  | "pron-speak"
  | "tobe-speak"
  | "art-speak"
  | "ps-speak"
  | "tp-speak"
  | "th-speak"
  | "pc-speak"
  | "wh-speak"
  | "prep-speak"
  | "adv-speak";

export type ItemType =
  | "verb"
  | "pronoun"
  | "tobe"
  | "article"
  | "present"
  | "qa"
  | "third"
  | "there"
  | "cont"
  | "wh"
  | "prep"
  | "adv"
  | "phrase";

export const EXERCISE_ITEM_TYPES: Record<ExerciseKey, ItemType[]> = {
  "a1-match": ["verb"],
  "a1-match-rev": ["verb"],
  "a1-write": ["verb"],
  "a1-write-rev": ["verb"],
  "a2-match": ["verb"],
  "a2-match-rev": ["verb"],
  "a2-write": ["verb"],
  "a2-write-rev": ["verb"],
  "a2-dict": ["verb"],
  "a2-speak": ["verb"],
  "pron-match": ["pronoun"],
  "pron-match-rev": ["pronoun"],
  translate: ["pronoun", "verb"],
  "tobe-match": ["tobe"],
  "tobe-match-rev": ["tobe"],
  "tobe-translate": ["tobe"],
  "art-match": ["article"],
  "art-match-rev": ["article"],
  "art-translate": ["article"],
  "ps-translate": ["present"],
  "ps-translate-rev": ["present"],
  "ps-cloze": ["present"],
  "qa-translate": ["qa"],
  "qa-translate-rev": ["qa"],
  "qa-ask": ["qa"],
  "tp-translate": ["third"],
  "tp-translate-rev": ["third"],
  "tp-fix": ["third"],
  "th-translate": ["there"],
  "th-translate-rev": ["there"],
  "th-fix": ["there"],
  "pc-translate": ["cont"],
  "pc-translate-rev": ["cont"],
  "pc-fix": ["cont"],
  "wh-match": ["wh"],
  "wh-cloze": ["wh"],
  "wh-translate": ["wh"],
  "prep-cloze": ["prep"],
  "prep-translate": ["prep"],
  "prep-translate-rev": ["prep"],
  "adv-match": ["adv"],
  "adv-translate": ["adv"],
  "adv-fix": ["adv"],
  "ph-match": ["phrase"],
  "ph-match-rev": ["phrase"],
  "ph-write": ["phrase"],
  "pron-dict": ["pronoun"],
  "tobe-dict": ["tobe"],
  "art-dict": ["article"],
  "ps-dict": ["present"],
  "tp-dict": ["third"],
  "th-dict": ["there"],
  "pc-dict": ["cont"],
  "a1-dict": ["verb"],
  "ph-dict": ["phrase"],
  "qa-dict": ["qa"],
  "wh-dict": ["wh"],
  "prep-dict": ["prep"],
  "adv-dict": ["adv"],
  "a1-speak": ["verb"],
  "ph-speak": ["phrase"],
  "qa-speak": ["qa"],
  "pron-speak": ["pronoun"],
  "tobe-speak": ["tobe"],
  "art-speak": ["article"],
  "ps-speak": ["present"],
  "tp-speak": ["third"],
  "th-speak": ["there"],
  "pc-speak": ["cont"],
  "wh-speak": ["wh"],
  "prep-speak": ["prep"],
  "adv-speak": ["adv"],
};

export function isExerciseKey(value: string): value is ExerciseKey {
  return value in EXERCISE_ITEM_TYPES;
}

/**
 * Nivel del catálogo de verbos que usa cada ejercicio de verbos. Los verbos
 * viven en una sola tabla con su columna `level`, así que los ejercicios de A1
 * y A2 comparten tipo de elemento (`verb`) pero se filtran por nivel para no
 * mezclar sus listas ni su progreso. `translate` usa verbos solo como filtro de
 * las frases de pronombres, que son de A1.
 */
export const VERB_EXERCISE_LEVEL: Partial<Record<ExerciseKey, string>> = {
  "a1-match": "A1",
  "a1-match-rev": "A1",
  "a1-write": "A1",
  "a1-write-rev": "A1",
  "a1-dict": "A1",
  "a1-speak": "A1",
  translate: "A1",
  "a2-match": "A2",
  "a2-match-rev": "A2",
  "a2-write": "A2",
  "a2-write-rev": "A2",
  "a2-dict": "A2",
  "a2-speak": "A2",
};

/** Elemento practicable (verbo o pronombre) con su progreso. */
export type PracticeItem = {
  id: number;
  type: ItemType;
  /** Lo que se muestra (español). */
  prompt: string;
  /** La respuesta esperada (inglés). */
  answer: string;
  category?: string;
  hint?: string;
  /** Sinónimos aceptados cuando la respuesta se escribe en español. */
  alternatives?: string[];
  /** Variantes aceptadas cuando la respuesta se escribe en inglés. */
  answerAlternatives?: string[];
  correctCount: number;
  wrongCount: number;
  mastered: boolean;
  active: boolean;
  /** Dominado pero le toca repaso hoy: vuelve a preguntarse. */
  dueForReview: boolean;
  /** Días que faltan para el próximo repaso (null si no está dominado). */
  reviewInDays: number | null;
};

/**
 * Repaso espaciado: al dominar algo se programa a 7 días; cada repaso acertado
 * lo aleja, y un error lo regresa a la práctica normal.
 */
export const REVIEW_INTERVALS = [7, 30, 90, 180, 365];

export type Settings = {
  masteryTarget: number;
  /** Si al acertar se pronuncia el texto en inglés. */
  speechEnabled: boolean;
  /** Velocidad de lectura (0.6 a 1.3). La voz se guarda por dispositivo. */
  speechRate: number;
  /** Si el inicio muestra el plan del día. */
  dailyPlanEnabled: boolean;
  /** Respuestas que busca el plan del día. */
  dailyGoal: number;
};

export const DAILY_GOAL_MIN = 10;
export const DAILY_GOAL_MAX = 200;

export const SPEECH_RATE_MIN = 0.6;
export const SPEECH_RATE_MAX = 1.3;

export type PracticeState = {
  exercise: ExerciseKey;
  /** Elementos por tipo; solo vienen los que usa el ejercicio. */
  items: Partial<Record<ItemType, PracticeItem[]>>;
  settings: Settings;
};

export function itemsOf(
  state: PracticeState,
  itemType: ItemType,
): PracticeItem[] {
  return state.items[itemType] ?? [];
}

export const MASTERY_TARGET_MIN = 1;
export const MASTERY_TARGET_MAX = 50;

export const TRANSLATE_LEVELS = [1, 2, 3, 4, 5] as const;
export type TranslateLevel = (typeof TRANSLATE_LEVELS)[number];

/**
 * Modo de un ejercicio de frases: traducir al inglés, traducir al español o
 * completar el hueco de una oración en inglés.
 */
export type SentenceMode =
  | "es-en"
  | "en-es"
  | "cloze"
  | "fix"
  | "dictation"
  | "speak";

export type SentenceExerciseKey =
  | "translate"
  | "tobe-translate"
  | "art-translate"
  | "ps-translate"
  | "ps-translate-rev"
  | "ps-cloze"
  | "tp-translate"
  | "tp-translate-rev"
  | "tp-fix"
  | "th-translate"
  | "th-translate-rev"
  | "th-fix"
  | "pc-translate"
  | "pc-translate-rev"
  | "pc-fix"
  | "wh-cloze"
  | "wh-translate"
  | "prep-cloze"
  | "prep-translate"
  | "prep-translate-rev"
  | "adv-translate"
  | "adv-fix"
  | "pron-dict"
  | "tobe-dict"
  | "art-dict"
  | "ps-dict"
  | "tp-dict"
  | "th-dict"
  | "pc-dict"
  | "wh-dict"
  | "prep-dict"
  | "adv-dict"
  | "pron-speak"
  | "tobe-speak"
  | "art-speak"
  | "ps-speak"
  | "tp-speak"
  | "th-speak"
  | "pc-speak"
  | "wh-speak"
  | "prep-speak"
  | "adv-speak";

export const SENTENCE_MODES: Record<SentenceExerciseKey, SentenceMode> = {
  translate: "es-en",
  "tobe-translate": "es-en",
  "art-translate": "es-en",
  "ps-translate": "es-en",
  "ps-translate-rev": "en-es",
  "ps-cloze": "cloze",
  "tp-translate": "es-en",
  "tp-translate-rev": "en-es",
  "tp-fix": "fix",
  "th-translate": "es-en",
  "th-translate-rev": "en-es",
  "th-fix": "fix",
  "pc-translate": "es-en",
  "pc-translate-rev": "en-es",
  "pc-fix": "fix",
  "wh-cloze": "cloze",
  "wh-translate": "es-en",
  "prep-cloze": "cloze",
  "prep-translate": "es-en",
  "prep-translate-rev": "en-es",
  "adv-translate": "es-en",
  "adv-fix": "fix",
  "pron-dict": "dictation",
  "tobe-dict": "dictation",
  "art-dict": "dictation",
  "ps-dict": "dictation",
  "tp-dict": "dictation",
  "th-dict": "dictation",
  "pc-dict": "dictation",
  "wh-dict": "dictation",
  "prep-dict": "dictation",
  "adv-dict": "dictation",
  "pron-speak": "speak",
  "tobe-speak": "speak",
  "art-speak": "speak",
  "ps-speak": "speak",
  "tp-speak": "speak",
  "th-speak": "speak",
  "pc-speak": "speak",
  "wh-speak": "speak",
  "prep-speak": "speak",
  "adv-speak": "speak",
};

export function isSentenceExerciseKey(
  value: string,
): value is SentenceExerciseKey {
  return value in SENTENCE_MODES;
}

export const SENTENCE_MODE_LABELS: Record<
  SentenceMode,
  { title: string; placeholder: string }
> = {
  "es-en": { title: "Escríbelo en inglés", placeholder: "Your answer in English…" },
  "en-es": { title: "Escríbelo en español", placeholder: "Tu respuesta en español…" },
  cloze: { title: "Completa la oración", placeholder: "Lo que falta…" },
  fix: {
    title: "Esta oración está mal: escríbela bien",
    placeholder: "La versión correcta…",
  },
  dictation: {
    title: "Escucha y escríbelo en inglés",
    placeholder: "What you hear…",
  },
  speak: {
    title: "Dilo en voz alta en inglés",
    placeholder: "Lo que se oyó…",
  },
};

const WH_LEVEL_LABELS: Record<TranslateLevel, string> = {
  1: "what, who, where",
  2: "when, why, how",
  3: "which y whose",
  4: "how much, how many, how long",
  5: "Preguntas más largas, con todas",
};

const PREP_LEVEL_LABELS: Record<TranslateLevel, string> = {
  1: "in / on / at de lugar",
  2: "in / on / at de tiempo",
  3: "Movimiento: to, from, into",
  4: "for, with, without, about, of, by",
  5: "over, under y frases más largas",
};

const ADV_LEVEL_LABELS: Record<TranslateLevel, string> = {
  1: "Frecuencia antes del verbo: always, usually, often",
  2: "sometimes, rarely y never (sin doesn't)",
  3: "Posición con el verbo be y en negativos",
  4: "Tiempo al final: now, today, tomorrow, yesterday, soon",
  5: "Dos cláusulas",
};

const CONT_LEVEL_LABELS: Record<TranslateLevel, string> = {
  1: "Afirmativo: am / is / are + verbo-ing",
  2: "Ortografía del -ing",
  3: "Negativo, preguntas y respuestas cortas",
  4: "Continuo contra presente simple",
  5: "Errores típicos y dos cláusulas",
};

const THERE_LEVEL_LABELS: Record<TranslateLevel, string> = {
  1: "Presente: there is / there are e incontables",
  2: "Negativo: isn't, aren't, no y any",
  3: "Preguntas, respuestas cortas y how many / how much",
  4: "Pasado (was / were) y futuro (will be)",
  5: "Errores típicos y dos cláusulas",
};

const THIRD_LEVEL_LABELS: Record<TranslateLevel, string> = {
  1: "La -s simple: works, needs, lives",
  2: "Ortografía: -es, y → ies, vocal + y",
  3: "Irregulares: has, goes, does, is",
  4: "Sin -s tras does y en plural",
  5: "Sujetos que engañan y dos cláusulas",
};

const PRESENT_LEVEL_LABELS: Record<TranslateLevel, string> = {
  1: "Afirmativo: rutinas cortas",
  2: "Tercera persona: la -s y su ortografía",
  3: "Negativo con do / does",
  4: "Preguntas con do / does",
  5: "Frecuencia y dos cláusulas",
};

export const SENTENCE_LEVEL_LABELS: Record<
  SentenceExerciseKey,
  Record<TranslateLevel, string>
> = {
  translate: {
    1: "Presente simple, frases cortas",
    2: "Negativo e interrogativo, pronombres de objeto",
    3: "Pasado simple, adjetivos posesivos",
    4: "Futuro y presente continuo, pronombres posesivos",
    5: "Dos cláusulas con conectores, todos los pronombres",
  },
  "tobe-translate": {
    1: "Presente afirmativo: am, is, are",
    2: "Presente negativo y preguntas",
    3: "Pasado: was, were, afirmativo y negativo",
    4: "Preguntas en pasado, futuro (will be) y there is/are",
    5: "Dos cláusulas y presente continuo",
  },
  "art-translate": {
    1: "a + sonido de consonante, frases cortas",
    2: "an + sonido de vocal y casos que engañan",
    3: "the en singular y plural",
    4: "Sin artículo: cosas en general, idiomas, comidas, días",
    5: "Dos cláusulas mezclando a, an, the y sin artículo",
  },
  "ps-translate": PRESENT_LEVEL_LABELS,
  "ps-translate-rev": PRESENT_LEVEL_LABELS,
  "ps-cloze": PRESENT_LEVEL_LABELS,
  "tp-translate": THIRD_LEVEL_LABELS,
  "tp-translate-rev": THIRD_LEVEL_LABELS,
  "tp-fix": THIRD_LEVEL_LABELS,
  "th-translate": THERE_LEVEL_LABELS,
  "th-translate-rev": THERE_LEVEL_LABELS,
  "th-fix": THERE_LEVEL_LABELS,
  "pc-translate": CONT_LEVEL_LABELS,
  "pc-translate-rev": CONT_LEVEL_LABELS,
  "pc-fix": CONT_LEVEL_LABELS,
  "wh-cloze": WH_LEVEL_LABELS,
  "wh-translate": WH_LEVEL_LABELS,
  "prep-cloze": PREP_LEVEL_LABELS,
  "prep-translate": PREP_LEVEL_LABELS,
  "prep-translate-rev": PREP_LEVEL_LABELS,
  "adv-translate": ADV_LEVEL_LABELS,
  "adv-fix": ADV_LEVEL_LABELS,
  "pron-dict": {
    1: "Presente simple, frases cortas",
    2: "Negativo e interrogativo, pronombres de objeto",
    3: "Pasado simple, adjetivos posesivos",
    4: "Futuro y presente continuo, pronombres posesivos",
    5: "Dos cláusulas con conectores",
  },
  "tobe-dict": {
    1: "Presente afirmativo: am, is, are",
    2: "Presente negativo y preguntas",
    3: "Pasado: was, were",
    4: "Preguntas en pasado, futuro y there is/are",
    5: "Dos cláusulas y presente continuo",
  },
  "art-dict": {
    1: "a + sonido de consonante",
    2: "an + sonido de vocal",
    3: "the en singular y plural",
    4: "Sin artículo",
    5: "Dos cláusulas mezclando todo",
  },
  "ps-dict": PRESENT_LEVEL_LABELS,
  "tp-dict": THIRD_LEVEL_LABELS,
  "th-dict": THERE_LEVEL_LABELS,
  "pc-dict": CONT_LEVEL_LABELS,
  "wh-dict": WH_LEVEL_LABELS,
  "prep-dict": PREP_LEVEL_LABELS,
  "adv-dict": ADV_LEVEL_LABELS,
  "pron-speak": {
    1: "Presente simple, frases cortas",
    2: "Negativo e interrogativo, pronombres de objeto",
    3: "Pasado simple, adjetivos posesivos",
    4: "Futuro y presente continuo, pronombres posesivos",
    5: "Dos cláusulas con conectores",
  },
  "tobe-speak": {
    1: "Presente afirmativo: am, is, are",
    2: "Presente negativo y preguntas",
    3: "Pasado: was, were",
    4: "Preguntas en pasado, futuro y there is/are",
    5: "Dos cláusulas y presente continuo",
  },
  "art-speak": {
    1: "a + sonido de consonante",
    2: "an + sonido de vocal",
    3: "the en singular y plural",
    4: "Sin artículo",
    5: "Dos cláusulas mezclando todo",
  },
  "ps-speak": PRESENT_LEVEL_LABELS,
  "tp-speak": THIRD_LEVEL_LABELS,
  "th-speak": THERE_LEVEL_LABELS,
  "pc-speak": CONT_LEVEL_LABELS,
  "wh-speak": WH_LEVEL_LABELS,
  "prep-speak": PREP_LEVEL_LABELS,
  "adv-speak": ADV_LEVEL_LABELS,
};

export const CATEGORY_LABELS: Record<string, string> = {
  sujeto: "Pronombre de sujeto",
  objeto: "Pronombre de objeto",
  "posesivo-adj": "Adjetivo posesivo",
  "posesivo-pron": "Pronombre posesivo",
  presente: "Presente afirmativo",
  "presente-neg": "Presente negativo",
  "pregunta-presente": "Pregunta en presente",
  pasado: "Pasado afirmativo",
  "pasado-neg": "Pasado negativo",
  "pregunta-pasado": "Pregunta en pasado",
  futuro: "Futuro con will be",
  hay: "There is / there are",
  a: "Artículo a",
  an: "Artículo an",
  the: "Artículo the",
  "the-plural": "Artículo the en plural",
  "sin-articulo": "Sin artículo",
  afirmativo: "Presente afirmativo",
  ortografia: "Ortografía de la tercera persona",
  negativo: "Presente negativo",
  pregunta: "Pregunta en presente",
  frecuencia: "Adverbio o expresión de frecuencia",
  afirmativa: "Respuesta corta afirmativa",
  negativa: "Respuesta corta negativa",
  wh: "Pregunta con palabra interrogativa",
  "regla-s": "La -s de tercera persona",
  "regla-es": "Verbos que llevan -es",
  "regla-ies": "Consonante + y → ies",
  "regla-y": "Vocal + y → solo -s",
  irregular: "Verbo irregular",
  trampa: "Caso que engaña",
  contraste: "Contraste con el presente simple",
  info: "Pregunta por información",
  eleccion: "Pregunta de elección o posesión",
  cantidad: "Pregunta por cantidad o duración",
  "lugar-tiempo": "Preposición de lugar y tiempo",
  movimiento: "Preposición de movimiento",
  posicion: "Preposición de posición",
  otras: "Otras preposiciones",
  saludo: "Saludo y despedida",
  cortesia: "Cortesía",
  clase: "Frases para la clase",
  peticion: "Pedir algo",
};

/**
 * Dirección del ejercicio: `es-en` muestra el español y se responde en inglés;
 * `en-es` es al revés.
 */
export type Direction = "es-en" | "en-es";

export function shownSide(item: PracticeItem, direction: Direction): string {
  return direction === "es-en" ? item.prompt : item.answer;
}

export function expectedSide(item: PracticeItem, direction: Direction): string {
  return direction === "es-en" ? item.answer : item.prompt;
}

/** Elige un elemento activo y no dominado, evitando repetir el anterior. */
/** Lo practicable: lo pendiente y lo dominado que ya toca repasar. */
export function isPracticable(item: PracticeItem): boolean {
  return item.active && (!item.mastered || item.dueForReview);
}

export function pickItem(
  items: PracticeItem[],
  previousId: number | null,
): PracticeItem | null {
  const pool = items.filter(isPracticable);
  if (pool.length === 0) return null;
  const candidates =
    pool.length > 1 ? pool.filter((v) => v.id !== previousId) : pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

// --- Ejercicio de relacionar ----------------------------------------------

export type Question = { item: PracticeItem; options: string[] };

export const OPTION_COUNT = 4;

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Elige un elemento activo y no dominado (evitando repetir el anterior) y arma
 * las opciones en inglés. Los distractores nunca repiten el texto de la
 * respuesta correcta: hay pronombres distintos que se escriben igual
 * (you, her, his, it).
 */
export function buildQuestion(
  items: PracticeItem[],
  previousId: number | null,
  direction: Direction = "es-en",
): Question | null {
  const item = pickItem(items, previousId);
  if (!item) return null;

  const shown = shownSide(item, direction);
  const answer = expectedSide(item, direction);

  // Hay pronombres distintos que se escriben igual (you, her, his, it). Se
  // descartan como distractores los que comparten el lado que se muestra —si no,
  // habría dos opciones válidas— y los que repiten el texto de la respuesta.
  const distractors = shuffle([
    ...new Set(
      items
        .filter((v) => shownSide(v, direction) !== shown)
        .map((v) => expectedSide(v, direction))
        .filter((option) => option !== answer),
    ),
  ]).slice(0, OPTION_COUNT - 1);

  return { item, options: shuffle([answer, ...distractors]) };
}

// --- Ejercicio de escribir ------------------------------------------------

/** Sin mayúsculas, acentos, puntuación ni espacios de más. */
export function normalizeWord(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,!¡?¿;:"'()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Quita el «to» del infinitivo inglés y los artículos sueltos del español. */
function bareVerb(text: string): string {
  // canonical expande contracciones (I'm → I am), luego se quitan los acentos.
  return canonical(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^(to|a|el|la|los|las) /, "");
}

/**
 * Califica una palabra escrita: ignora mayúsculas, acentos y el «to» del
 * infinitivo, y acepta los sinónimos del verbo cuando se responde en español.
 */
export function isWrittenAnswerCorrect(
  given: string,
  item: PracticeItem,
  direction: Direction,
): boolean {
  const answer = bareVerb(given);
  if (!answer) return false;

  const accepted = [expectedSide(item, direction)];
  if (direction === "en-es" && item.alternatives) {
    accepted.push(...item.alternatives);
  }
  if (direction === "es-en" && item.answerAlternatives) {
    accepted.push(...item.answerAlternatives);
  }
  return accepted.some((option) => bareVerb(option) === answer);
}

// --- Ejercicio de traducir ------------------------------------------------

export type SentencePrompt = {
  id: number;
  level: number;
  spanish: string;
  /** Pista breve arriba de la frase (el verbo, en el tema de pronombres). */
  label?: string;
  itemId: number;
};

/** Lo que se explica al equivocarse: el pronombre o la forma de to be. */
export type ItemFeedback = {
  english: string;
  spanish: string;
  category: string;
  hint: string;
};

export type CheckResult = {
  correct: boolean;
  expected: string;
  item: ItemFeedback;
  state: PracticeState;
};

const CONTRACTIONS: [RegExp, string][] = [
  [/\bdon't\b/g, "do not"],
  [/\bdoesn't\b/g, "does not"],
  [/\bdidn't\b/g, "did not"],
  [/\bisn't\b/g, "is not"],
  [/\baren't\b/g, "are not"],
  [/\bwasn't\b/g, "was not"],
  [/\bweren't\b/g, "were not"],
  [/\bwon't\b/g, "will not"],
  [/\bcan't\b/g, "cannot"],
  [/\bcan not\b/g, "cannot"],
  [/\bi'm\b/g, "i am"],
  [/\bit's\b/g, "it is"],
  [/\bhe's\b/g, "he is"],
  [/\bshe's\b/g, "she is"],
  [/\bthat's\b/g, "that is"],
  [/\bwe're\b/g, "we are"],
  [/\bthey're\b/g, "they are"],
  [/\byou're\b/g, "you are"],
  [/\bi'll\b/g, "i will"],
  [/\byou'll\b/g, "you will"],
  [/\bhe'll\b/g, "he will"],
  [/\bshe'll\b/g, "she will"],
  [/\bit'll\b/g, "it will"],
  [/\bwe'll\b/g, "we will"],
  [/\bthey'll\b/g, "they will"],
  [/\bgonna\b/g, "going to"],
  [/\bno one\b/g, "nobody"],
];

/**
 * El reconocimiento de voz devuelve «3» donde el texto dice «three», así que
 * los números se llevan siempre a palabra antes de comparar.
 */
const NUMBER_WORDS: Record<string, string> = {
  "0": "zero", "1": "one", "2": "two", "3": "three", "4": "four", "5": "five",
  "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten",
  "11": "eleven", "12": "twelve", "13": "thirteen", "14": "fourteen",
  "15": "fifteen", "16": "sixteen", "17": "seventeen", "18": "eighteen",
  "19": "nineteen", "20": "twenty", "30": "thirty", "40": "forty",
  "50": "fifty", "60": "sixty", "100": "one hundred",
};

/** Deja la frase comparable: sin mayúsculas, puntuación ni contracciones. */
export function canonical(text: string): string {
  let out = text
    .toLowerCase()
    .replace(/[‘’`´]/g, "'")
    .replace(/[¿¡.,!?;:"()]/g, " ");
  for (const [pattern, replacement] of CONTRACTIONS) {
    out = out.replace(pattern, replacement);
  }
  out = out.replace(
    /\b\d+\b/g,
    (digits) => NUMBER_WORDS[digits] ?? digits,
  );
  return out.replace(/\s+/g, " ").trim();
}

/** Variantes aceptadas de una respuesta (going to ↔ will). */
function acceptedForms(expected: string): string[] {
  const base = canonical(expected);
  const forms = new Set([base]);
  forms.add(base.replace(/\b(am|is|are) going to\b/g, "will"));
  return [...forms];
}

/** Como canonical, pero además sin acentos: para revisar español. */
export function canonicalEs(text: string): string {
  return canonical(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** En español el sujeto se puede omitir: «yo trabajo» = «trabajo». */
const ES_SUBJECT =
  /^(yo|tu|usted|ustedes|el|ella|ellos|ellas|nosotros|nosotras)\s+/;

function esForms(text: string): string[] {
  const base = canonicalEs(text);
  return [...new Set([base, base.replace(ES_SUBJECT, "")])];
}

export function isAnswerCorrect(
  given: string,
  expected: string,
  alternatives: string[] = [],
): boolean {
  const answer = canonical(given);
  if (!answer) return false;
  return [expected, ...alternatives].some((option) =>
    acceptedForms(option).includes(answer),
  );
}

/**
 * Compara palabra por palabra para resaltar diferencias en la retroalimentación.
 * Devuelve las palabras de la respuesta esperada marcando las que faltaron.
 */
/**
 * Revisa una respuesta según el modo del ejercicio. Para el español se ignoran
 * los acentos y se acepta con o sin el pronombre sujeto.
 */
export function isSentenceCorrect(
  given: string,
  expected: string,
  alternatives: string[],
  mode: SentenceMode,
): boolean {
  if (mode !== "en-es") return isAnswerCorrect(given, expected, alternatives);

  const answers = new Set(esForms(given));
  if (!canonicalEs(given)) return false;
  return [expected, ...alternatives].some((option) =>
    esForms(option).some((form) => answers.has(form)),
  );
}

export function diffWords(given: string, expected: string) {
  const givenWords = new Set(canonical(given).split(" "));
  return expected.split(/\s+/).map((word) => ({
    word,
    missing: !givenWords.has(canonical(word)),
  }));
}

// --- Preguntar y responder ------------------------------------------------

/**
 * Modo de un ejercicio de preguntas y respuestas: traducir el par al inglés,
 * traducirlo al español, o armar la pregunta y la respuesta a partir de una
 * consigna en español.
 */
export type QaMode = "es-en" | "en-es" | "cue" | "dictation" | "speak";

export type QaExerciseKey =
  | "qa-translate"
  | "qa-translate-rev"
  | "qa-ask"
  | "qa-dict"
  | "qa-speak";

export const QA_MODES: Record<QaExerciseKey, QaMode> = {
  "qa-translate": "es-en",
  "qa-translate-rev": "en-es",
  "qa-ask": "cue",
  "qa-dict": "dictation",
  "qa-speak": "speak",
};

export function isQaExerciseKey(value: string): value is QaExerciseKey {
  return value in QA_MODES;
}

export const QA_MODE_LABELS: Record<
  QaMode,
  { title: string; questionLabel: string; answerLabel: string; placeholder: string }
> = {
  "es-en": {
    title: "Traduce la pregunta y la respuesta al inglés",
    questionLabel: "Pregunta en inglés",
    answerLabel: "Respuesta en inglés",
    placeholder: "In English…",
  },
  "en-es": {
    title: "Traduce la pregunta y la respuesta al español",
    questionLabel: "Pregunta en español",
    answerLabel: "Respuesta en español",
    placeholder: "En español…",
  },
  cue: {
    title: "Escribe la pregunta y la respuesta en inglés",
    questionLabel: "Pregunta",
    answerLabel: "Respuesta",
    placeholder: "In English…",
  },
  dictation: {
    title: "Escucha la pregunta y la respuesta, y escríbelas",
    questionLabel: "Pregunta que oíste",
    answerLabel: "Respuesta que oíste",
    placeholder: "What you hear…",
  },
  speak: {
    title: "Di en voz alta la pregunta y la respuesta",
    questionLabel: "Pregunta que se oyó",
    answerLabel: "Respuesta que se oyó",
    placeholder: "Lo que se oyó…",
  },
};

export const QA_LEVEL_LABELS: Record<TranslateLevel, string> = {
  1: "Do you / Do I con respuesta corta afirmativa",
  2: "Does he / she / it con respuesta corta",
  3: "Respuestas cortas negativas",
  4: "Mezcla con frecuencia y complementos más largos",
  5: "Preguntas con What, Where, When y Why",
};

export type QaPrompt = {
  id: number;
  level: number;
  /** Lo que se muestra arriba: la pregunta (o la consigna en modo cue). */
  question: string;
  /** La respuesta que se muestra; vacía en modo cue. */
  answer: string;
  itemId: number;
  /**
   * Sujeto que toca usar en cada parte, cuando hay que escribir el inglés: el
   * español no siempre dice quién es («¿Trabaja aquí?» puede ser él o usted) y
   * el reto del ejercicio es elegir do o does, no adivinar el pronombre.
   */
  subject?: { question: string; answer: string };
};

export type QaResult = {
  questionCorrect: boolean;
  answerCorrect: boolean;
  expectedQuestion: string;
  expectedAnswer: string;
  item: ItemFeedback;
  state: PracticeState;
};
