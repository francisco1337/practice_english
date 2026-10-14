/**
 * Temas de gramática y expresiones de A2. A diferencia de A1, todos comparten
 * las tablas `a2_items` y `a2_sentences` (separadas por `topic`, que es el
 * mismo valor que el tipo de elemento) y sus páginas salen de rutas dinámicas
 * `/a2/[tema]/[ejercicio]`. Agregar un tema es sumar una entrada aquí, su
 * contenido en scripts/a2/ y, si es de gramática, su teoría en theory-a2/.
 *
 * Las claves de ejercicio y los tipos deben coincidir con A2_TOPICS de
 * scripts/a2/index.mjs, que siembra la base.
 */
import type { Direction, SentenceMode, TranslateLevel } from "./practice";
import type { Theory } from "./theory";
import * as past from "./theory-a2/past";
import * as pastContinuous from "./theory-a2/past-continuous";
import * as future from "./theory-a2/future";
import * as modals from "./theory-a2/modals";
import * as comparatives from "./theory-a2/comparatives";
import * as quantities from "./theory-a2/quantities";
import * as connectors from "./theory-a2/connectors";

/** Temas con teoría y banco de frases por niveles. */
export const A2_GRAMMAR_TYPES = [
  "a2past",
  "a2pastc",
  "a2fut",
  "a2modal",
  "a2comp",
  "a2quant",
  "a2conn",
] as const;

/** Temas de solo elementos: palabras y frases sueltas. */
export const A2_VOCAB_TYPES = [
  "a2quest",
  "a2prep",
  "a2adv",
  "a2adj",
  "a2work",
] as const;

export type A2GrammarType = (typeof A2_GRAMMAR_TYPES)[number];
export type A2VocabType = (typeof A2_VOCAB_TYPES)[number];
export type A2ItemType = A2GrammarType | A2VocabType;

export const A2_ITEM_TYPES: A2ItemType[] = [
  ...A2_GRAMMAR_TYPES,
  ...A2_VOCAB_TYPES,
];

export function isA2ItemType(value: string): value is A2ItemType {
  return (A2_ITEM_TYPES as string[]).includes(value);
}

/** Un ejercicio dentro de un tema: su sufijo de clave y su segmento de ruta. */
type ExerciseDef<S extends string> = {
  suffix: S;
  path: string;
  name: string;
  description: string;
} & (
  | { component: "match"; direction: Direction }
  | { component: "write"; direction: Direction; dictation?: boolean; speaking?: boolean }
  | { component: "sentence"; mode: SentenceMode }
);

const GRAMMAR_EXERCISES = [
  {
    suffix: "match",
    path: "relacionar",
    name: "Relacionar",
    description: "Te damos la forma en español y eliges cuál es en inglés.",
    component: "match",
    direction: "es-en",
  },
  {
    suffix: "translate",
    path: "traducir",
    name: "Traducir frase",
    description: "Lees la frase en español y la escribes en inglés. Cinco niveles.",
    component: "sentence",
    mode: "es-en",
  },
  {
    suffix: "translate-rev",
    path: "traducir-inverso",
    name: "Traducir frase inverso",
    description: "Lees la frase en inglés y la escribes en español.",
    component: "sentence",
    mode: "en-es",
  },
  {
    suffix: "cloze",
    path: "completar",
    name: "Completar oración",
    description: "La frase viene con un hueco y tú escribes lo que falta.",
    component: "sentence",
    mode: "cloze",
  },
  {
    suffix: "fix",
    path: "corregir",
    name: "Corregir frase",
    description: "Te damos la frase con un error típico y tú la escribes bien.",
    component: "sentence",
    mode: "fix",
  },
  {
    suffix: "dict",
    path: "dictado",
    name: "Dictado",
    description: "Escuchas la frase en inglés y la escribes. Cinco niveles.",
    component: "sentence",
    mode: "dictation",
  },
  {
    suffix: "speak",
    path: "pronunciar",
    name: "Pronunciar",
    description: "Lees la frase en voz alta y el navegador te escucha.",
    component: "sentence",
    mode: "speak",
  },
] as const satisfies readonly ExerciseDef<string>[];

const VOCAB_EXERCISES = [
  {
    suffix: "match",
    path: "relacionar",
    name: "Relacionar",
    description: "Te damos el español y eliges cuál es en inglés.",
    component: "match",
    direction: "es-en",
  },
  {
    suffix: "match-rev",
    path: "relacionar-inverso",
    name: "Relacionar inverso",
    description: "Te damos el inglés y eliges qué significa en español.",
    component: "match",
    direction: "en-es",
  },
  {
    suffix: "write",
    path: "escribir",
    name: "Escribir",
    description: "Te damos el español y lo escribes en inglés.",
    component: "write",
    direction: "es-en",
  },
  {
    suffix: "dict",
    path: "dictado",
    name: "Dictado",
    description: "Se pronuncia en inglés y tú lo escribes.",
    component: "write",
    direction: "es-en",
    dictation: true,
  },
  {
    suffix: "speak",
    path: "pronunciar",
    name: "Pronunciar",
    description: "Lo dices en voz alta y el navegador compara lo que escuchó.",
    component: "write",
    direction: "es-en",
    speaking: true,
  },
] as const satisfies readonly ExerciseDef<string>[];

type GrammarSuffix = (typeof GRAMMAR_EXERCISES)[number]["suffix"];
type VocabSuffix = (typeof VOCAB_EXERCISES)[number]["suffix"];
type SentenceSuffix = Extract<
  (typeof GRAMMAR_EXERCISES)[number],
  { component: "sentence" }
>["suffix"];

export type A2SentenceKey = `${A2GrammarType}-${SentenceSuffix}`;
export type A2ExerciseKey =
  | `${A2GrammarType}-${GrammarSuffix}`
  | `${A2VocabType}-${VocabSuffix}`;

export type A2Exercise = (
  | (typeof GRAMMAR_EXERCISES)[number]
  | (typeof VOCAB_EXERCISES)[number]
) & { key: A2ExerciseKey };

export type A2Topic = {
  itemType: A2ItemType;
  /** Segmento de la ruta: /a2/<slug> */
  slug: string;
  title: string;
  /** Texto del card en el menú de A2. */
  description: string;
  /** Párrafo bajo el título en la página del tema. */
  intro: string;
  /** Título del panel de progreso. */
  panelTitle: string;
  /** Solo gramática: qué practica cada nivel de frases. */
  levels?: Record<TranslateLevel, string>;
  theory?: Theory;
};

export const A2_TOPICS: A2Topic[] = [
  {
    itemType: "a2past",
    slug: "pasado-simple",
    title: "Pasado simple",
    description:
      "Narrar lo que ya pasó: I fixed the bug yesterday. El -ed, los irregulares y did.",
    intro:
      "Para contar hechos terminados: el -ed y su ortografía, los verbos irregulares, el negativo con did not y las preguntas con did y con wh-.",
    panelTitle: "Formas del pasado",
    levels: {
      1: "Afirmativo regular: -ed",
      2: "Ortografía del -ed e irregulares",
      3: "Negativo con did not",
      4: "Preguntas con did y respuestas cortas",
      5: "Preguntas con wh- y dos cláusulas",
    },
    theory: past.theory,
  },
  {
    itemType: "a2pastc",
    slug: "pasado-continuo",
    title: "Pasado continuo",
    description:
      "Lo que estaba pasando: I was testing when it failed. was / were + -ing.",
    intro:
      "Para describir lo que estaba en progreso en un momento del pasado: was / were + verbo-ing, while, y la acción interrumpida con when + pasado simple.",
    panelTitle: "Formas del pasado continuo",
    levels: {
      1: "Afirmativo: was / were + verbo-ing",
      2: "Negativo, preguntas y respuestas cortas",
      3: "Dos acciones a la vez con while",
      4: "Acción interrumpida: when + pasado simple",
      5: "Contraste con el pasado simple y dos cláusulas",
    },
    theory: pastContinuous.theory,
  },
  {
    itemType: "a2fut",
    slug: "futuro",
    title: "Futuro: will y going to",
    description:
      "Decisiones, promesas y planes: I will check the logs. We are going to migrate.",
    intro:
      "will para decidir en el momento, prometer y predecir; going to para planes ya decididos y predicciones con evidencia. Negativo, preguntas y preguntas con wh-.",
    panelTitle: "Formas del futuro",
    levels: {
      1: "will: decisiones, promesas y ofrecimientos",
      2: "will not y preguntas con will",
      3: "going to: planes e intenciones",
      4: "going to: negativo, preguntas y predicciones con evidencia",
      5: "will o going to, preguntas wh- y dos cláusulas",
    },
    theory: future.theory,
  },
  {
    itemType: "a2modal",
    slug: "modales",
    title: "Modales y peticiones",
    description:
      "can, could, should, must, may, might, would… y pedir las cosas con cortesía.",
    intro:
      "Los modales van con el verbo base, sin to y sin -s: capacidad, consejo, obligación, posibilidad y peticiones corteses como Could you clarify this requirement?",
    panelTitle: "Modales",
    levels: {
      1: "can y cannot: capacidad y permiso",
      2: "should y must: consejo y obligación",
      3: "may y might: posibilidad y permiso",
      4: "Peticiones corteses: could, would, can I, may I",
      5: "have to, must not y frases con dos cláusulas",
    },
    theory: modals.theory,
  },
  {
    itemType: "a2comp",
    slug: "comparativos",
    title: "Comparativos y superlativos",
    description:
      "Comparar opciones: This option is safer. -er / more, the best, as … as.",
    intro:
      "Comparar dos cosas con -er o more … than, elegir la mejor con the -est o the most, y los irregulares good, bad, far.",
    panelTitle: "Comparativos",
    levels: {
      1: "Adjetivos cortos: -er than",
      2: "Ortografía: bigger, easier, safer",
      3: "Adjetivos largos (more) e irregulares",
      4: "Superlativos: the -est y the most",
      5: "as … as, not as … as y comparaciones largas",
    },
    theory: comparatives.theory,
  },
  {
    itemType: "a2quant",
    slug: "cantidades",
    title: "Cantidades: much, many, too, enough",
    description:
      "Contables e incontables, some / any, much / many, a few / a little, too y enough.",
    intro:
      "Cuánto hay y si alcanza: sustantivos contables e incontables, some y any, much y many, a few y a little, y los límites con too y enough.",
    panelTitle: "Cantidades",
    levels: {
      1: "Contables e incontables: some y any",
      2: "much, many y a lot of",
      3: "a few, a little, how much y how many",
      4: "too, too much y too many",
      5: "enough y frases que mezclan todo",
    },
    theory: quantities.theory,
  },
  {
    itemType: "a2conn",
    slug: "conectores",
    title: "Conectores",
    description:
      "because, so, although, to + verbo y first / then / finally para explicar pasos.",
    intro:
      "Para unir ideas: causa (because), resultado (so), contraste (although), propósito (to + verbo) y secuencia (first, then, after that, finally).",
    panelTitle: "Conectores",
    levels: {
      1: "and, but y because",
      2: "so: causa y resultado",
      3: "although y but: contraste",
      4: "to + verbo: para qué",
      5: "Secuencia: first, then, after that, finally",
    },
    theory: connectors.theory,
  },
  {
    itemType: "a2quest",
    slug: "preguntas",
    title: "Preguntas útiles",
    description:
      "how often, what time, what kind of y arranques como Could you…? o Is there…?",
    intro:
      "Palabras y arranques de pregunta para la conversación del día a día.",
    panelTitle: "Preguntas",
  },
  {
    itemType: "a2prep",
    slug: "preposiciones",
    title: "Preposiciones",
    description:
      "above, below, between, through, behind, next to, during, until, since…",
    intro:
      "Preposiciones de lugar, movimiento y tiempo que se suman a las de A1.",
    panelTitle: "Preposiciones",
  },
  {
    itemType: "a2adv",
    slug: "adverbios",
    title: "Adverbios",
    description:
      "already, yet, still, just, really, too, a lot, well, here, there…",
    intro: "Adverbios de tiempo, grado, modo y lugar.",
    panelTitle: "Adverbios",
  },
  {
    itemType: "a2adj",
    slug: "adjetivos",
    title: "Adjetivos",
    description:
      "Los básicos para describir: big, cheap, slow, difficult, early, full…",
    intro: "Adjetivos básicos para describir cosas, personas y situaciones.",
    panelTitle: "Adjetivos",
  },
  {
    itemType: "a2work",
    slug: "trabajo",
    title: "Inglés de trabajo",
    description:
      "Frases y vocabulario para bugs, planes, revisiones y reuniones remotas.",
    intro:
      "Lo que vas a decir en un standup, un ticket o un mensaje de Slack: reportar un bug, comprometer una fecha, pedir una revisión o coordinar una llamada.",
    panelTitle: "Inglés de trabajo",
  },
];

export function isGrammarTopic(topic: A2Topic): boolean {
  return (A2_GRAMMAR_TYPES as readonly string[]).includes(topic.itemType);
}

/** Ejercicios de un tema, ya con su clave. */
export function a2ExercisesOf(topic: A2Topic): A2Exercise[] {
  const defs = isGrammarTopic(topic) ? GRAMMAR_EXERCISES : VOCAB_EXERCISES;
  return defs.map((def) => ({
    ...def,
    key: `${topic.itemType}-${def.suffix}` as A2ExerciseKey,
  }));
}

export function findA2Topic(slug: string): A2Topic | undefined {
  return A2_TOPICS.find((topic) => topic.slug === slug);
}

const ALL = A2_TOPICS.flatMap((topic) =>
  a2ExercisesOf(topic).map((exercise) => ({ topic, exercise })),
);

/** Tipo de elemento de cada ejercicio de A2. */
export const A2_EXERCISE_ITEM_TYPES = Object.fromEntries(
  ALL.map(({ topic, exercise }) => [exercise.key, [topic.itemType]]),
) as Record<A2ExerciseKey, A2ItemType[]>;

/** Nombre y ruta de cada ejercicio, para el repaso y el plan del día. */
export const A2_EXERCISE_INFO = Object.fromEntries(
  ALL.map(({ topic, exercise }) => [
    exercise.key,
    { name: `${topic.title} · ${exercise.name}`, href: `/a2/${topic.slug}/${exercise.path}` },
  ]),
) as Record<A2ExerciseKey, { name: string; href: string }>;

const SENTENCE_EXERCISES = ALL.flatMap(({ topic, exercise }) =>
  exercise.component === "sentence"
    ? [{ key: exercise.key as A2SentenceKey, mode: exercise.mode, topic }]
    : [],
);

export const A2_SENTENCE_KEYS = SENTENCE_EXERCISES.map((s) => s.key);

export const A2_SENTENCE_MODES = Object.fromEntries(
  SENTENCE_EXERCISES.map((s) => [s.key, s.mode]),
) as Record<A2SentenceKey, SentenceMode>;

export const A2_SENTENCE_LEVEL_LABELS = Object.fromEntries(
  SENTENCE_EXERCISES.map((s) => [s.key, s.topic.levels!]),
) as Record<A2SentenceKey, Record<TranslateLevel, string>>;

/** Nombres de las categorías de los elementos de A2. */
export const A2_CATEGORY_LABELS: Record<string, string> = {
  ...past.categoryLabels,
  ...pastContinuous.categoryLabels,
  ...future.categoryLabels,
  ...modals.categoryLabels,
  ...comparatives.categoryLabels,
  ...quantities.categoryLabels,
  ...connectors.categoryLabels,
  "quest-wh": "Palabra de pregunta",
  "quest-yesno": "Arranque de pregunta",
  "prep2-lugar": "Preposición de lugar",
  "prep2-movimiento": "Preposición de movimiento",
  "prep2-tiempo": "Preposición de tiempo",
  "adv2-tiempo": "Adverbio de tiempo",
  "adv2-grado": "Adverbio de grado",
  "adv2-modo": "Adverbio de modo",
  "adv2-lugar": "Adverbio de lugar",
  "adj-tamano": "Tamaño",
  "adj-cualidad": "Cualidad",
  "adj-temperatura": "Temperatura",
  "adj-estado": "Estado de ánimo",
  "adj-tiempo": "Tiempo",
  "work-bugs": "Bugs e incidentes",
  "work-planes": "Planes y decisiones",
  "work-colaboracion": "Colaboración remota",
  "work-vocabulario": "Vocabulario de trabajo",
};
