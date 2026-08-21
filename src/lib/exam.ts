/** Tipos y reglas del examen de cierre de A1 (compartido servidor/cliente). */

export type ExamQuestionType = "choice" | "write-en" | "write-es" | "cloze" | "fix";

export type ExamSection = {
  number: number;
  title: string;
  topic: string;
  context: string;
};

export const EXAM_SECTIONS: ExamSection[] = [
  {
    number: 1,
    title: "Construir oraciones básicas",
    topic: "Pronombres y to be",
    context: "Presentarte",
  },
  {
    number: 2,
    title: "Preguntar y negar",
    topic: "Do / does",
    context: "Rutinas",
  },
  {
    number: 3,
    title: "Describir hábitos",
    topic: "Presente simple",
    context: "Trabajo y vida diaria",
  },
  {
    number: 4,
    title: "Hablar de acciones actuales",
    topic: "Presente continuo",
    context: "Qué haces ahora",
  },
  {
    number: 5,
    title: "Ubicar personas y objetos",
    topic: "There is/are y preposiciones",
    context: "Casa y oficina",
  },
  {
    number: 6,
    title: "Consolidar A1",
    topic: "Repaso general",
    context: "Conversación de 8 minutos",
  },
];

/** Para sellar A1 no basta el global: cada sección tiene su propio mínimo. */
export const EXAM_PASS_GLOBAL = 0.8;
export const EXAM_PASS_SECTION = 0.7;

export const EXAM_TYPE_LABELS: Record<
  ExamQuestionType,
  { title: string; placeholder: string }
> = {
  choice: { title: "Elige la opción correcta", placeholder: "" },
  "write-en": { title: "Escríbelo en inglés", placeholder: "In English…" },
  "write-es": { title: "Escríbelo en español", placeholder: "En español…" },
  cloze: { title: "Completa el hueco", placeholder: "Lo que falta…" },
  fix: { title: "Esta oración está mal: escríbela bien", placeholder: "La versión correcta…" },
};

/** Lo que ve el cliente mientras contesta: nunca incluye la respuesta. */
export type ExamQuestion = {
  id: number;
  section: number;
  position: number;
  type: ExamQuestionType;
  prompt: string;
  context: string | null;
  options: string[] | null;
};

export type ExamAnswerRecord = { questionId: number; given: string };

export type ExamSectionResult = {
  section: number;
  correct: number;
  total: number;
  passed: boolean;
};

export type ExamMistake = {
  section: number;
  position: number;
  type: ExamQuestionType;
  prompt: string;
  context: string | null;
  given: string;
  expected: string;
  hint: string;
};

export type ExamResult = {
  attemptId: number;
  correct: number;
  total: number;
  passed: boolean;
  sections: ExamSectionResult[];
  mistakes: ExamMistake[];
  finishedAt: string | null;
};

/** Estado del examen en curso: preguntas, respuestas dadas y resultado si terminó. */
export type ExamState = {
  attemptId: number | null;
  questions: ExamQuestion[];
  answered: ExamAnswerRecord[];
  result: ExamResult | null;
};

export function examProgress(state: ExamState) {
  const total = state.questions.length;
  const done = state.answered.length;
  return { done, total, ratio: total ? done / total : 0 };
}

/** Primera pregunta sin contestar, en orden de sección y posición. */
export function nextExamQuestion(state: ExamState): ExamQuestion | null {
  const answered = new Set(state.answered.map((a) => a.questionId));
  return state.questions.find((q) => !answered.has(q.id)) ?? null;
}
