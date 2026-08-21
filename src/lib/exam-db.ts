import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { execute, pool, query } from "./db";
import { isAnswerCorrect, isSentenceCorrect } from "./practice";
import {
  EXAM_PASS_GLOBAL,
  EXAM_PASS_SECTION,
  EXAM_SECTIONS,
  type ExamQuestion,
  type ExamQuestionType,
  type ExamResult,
  type ExamState,
} from "./exam";

type QuestionRow = RowDataPacket & {
  id: number;
  section: number;
  position: number;
  type: ExamQuestionType;
  prompt: string;
  context: string | null;
  options: string[] | string | null;
  expected: string;
  alternatives: string[] | string | null;
  hint: string;
};

function parseJsonArray(value: string[] | string | null): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function getQuestions(): Promise<QuestionRow[]> {
  return query<QuestionRow[]>(
    `SELECT id, section, position, type, prompt, context, options, expected, alternatives, hint
       FROM exam_questions
      ORDER BY section, position`,
  );
}

function toClientQuestion(row: QuestionRow): ExamQuestion {
  return {
    id: row.id,
    section: row.section,
    position: row.position,
    type: row.type,
    prompt: row.prompt,
    context: row.context,
    options: row.type === "choice" ? parseJsonArray(row.options) : null,
  };
}

/** Califica una respuesta con las mismas reglas que los ejercicios. */
export function gradeAnswer(row: QuestionRow, given: string): boolean {
  const alternatives = parseJsonArray(row.alternatives);
  if (row.type === "choice") {
    return given.trim() === row.expected;
  }
  if (row.type === "write-es") {
    return isSentenceCorrect(given, row.expected, alternatives, "en-es");
  }
  return isAnswerCorrect(given, row.expected, alternatives);
}

async function buildResult(attemptId: number): Promise<ExamResult> {
  const rows = await getQuestions();
  const answers = await query<
    (RowDataPacket & { question_id: number; given: string; correct: number })[]
  >("SELECT question_id, given, correct FROM exam_answers WHERE attempt_id = ?", [
    attemptId,
  ]);
  const byQuestion = new Map(answers.map((a) => [a.question_id, a]));

  const sections = EXAM_SECTIONS.map((section) => {
    const ofSection = rows.filter((r) => r.section === section.number);
    const correct = ofSection.filter(
      (r) => byQuestion.get(r.id)?.correct === 1,
    ).length;
    return {
      section: section.number,
      correct,
      total: ofSection.length,
      passed: ofSection.length
        ? correct / ofSection.length >= EXAM_PASS_SECTION
        : true,
    };
  });

  const correct = sections.reduce((a, s) => a + s.correct, 0);
  const total = rows.length;
  const passed =
    total > 0 &&
    correct / total >= EXAM_PASS_GLOBAL &&
    sections.every((s) => s.passed);

  const mistakes = rows
    .filter((r) => byQuestion.get(r.id)?.correct !== 1)
    .map((r) => ({
      section: r.section,
      position: r.position,
      type: r.type,
      prompt: r.prompt,
      context: r.context,
      given: byQuestion.get(r.id)?.given ?? "",
      expected: r.expected,
      hint: r.hint,
    }));

  const [attempt] = await query<(RowDataPacket & { finished_at: Date | null })[]>(
    "SELECT finished_at FROM exam_attempts WHERE id = ?",
    [attemptId],
  );

  return {
    attemptId,
    correct,
    total,
    passed,
    sections,
    mistakes,
    finishedAt: attempt?.finished_at ? attempt.finished_at.toISOString() : null,
  };
}

/** Intento abierto (sin terminar), si hay uno. */
async function getOpenAttempt(): Promise<number | null> {
  const rows = await query<(RowDataPacket & { id: number })[]>(
    "SELECT id FROM exam_attempts WHERE finished_at IS NULL ORDER BY id DESC LIMIT 1",
  );
  return rows[0]?.id ?? null;
}

export async function getExamState(): Promise<ExamState> {
  const rows = await getQuestions();
  const attemptId = await getOpenAttempt();

  if (attemptId === null) {
    // Sin intento abierto: se muestra el resultado del último terminado.
    const last = await query<(RowDataPacket & { id: number })[]>(
      "SELECT id FROM exam_attempts WHERE finished_at IS NOT NULL ORDER BY id DESC LIMIT 1",
    );
    return {
      attemptId: null,
      questions: rows.map(toClientQuestion),
      answered: [],
      result: last[0] ? await buildResult(last[0].id) : null,
    };
  }

  const answers = await query<
    (RowDataPacket & { question_id: number; given: string })[]
  >(
    "SELECT question_id, given FROM exam_answers WHERE attempt_id = ? ORDER BY answered_at",
    [attemptId],
  );

  return {
    attemptId,
    questions: rows.map(toClientQuestion),
    answered: answers.map((a) => ({ questionId: a.question_id, given: a.given })),
    result: null,
  };
}

/** Empieza un intento. Con fresh se abandona el que estuviera a medias. */
export async function startAttempt(fresh = false): Promise<ExamState> {
  const open = await getOpenAttempt();
  if (open !== null) {
    if (!fresh) return getExamState();
    await execute("DELETE FROM exam_attempts WHERE id = ?", [open]);
  }

  await pool.query<ResultSetHeader>(
    "INSERT INTO exam_attempts (total) VALUES (?)",
    [(await getQuestions()).length],
  );
  return getExamState();
}

export async function answerQuestion(questionId: number, given: string) {
  const attemptId = await getOpenAttempt();
  if (attemptId === null) return null;

  const rows = await getQuestions();
  const row = rows.find((r) => r.id === questionId);
  if (!row) return null;

  const correct = gradeAnswer(row, given);
  await execute(
    `INSERT INTO exam_answers (attempt_id, question_id, given, correct) VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE given = VALUES(given), correct = VALUES(correct)`,
    [attemptId, questionId, given.slice(0, 400), correct ? 1 : 0],
  );

  return getExamState();
}

export async function finishAttempt(): Promise<ExamState> {
  const attemptId = await getOpenAttempt();
  if (attemptId === null) return getExamState();

  const result = await buildResult(attemptId);
  await execute(
    `UPDATE exam_attempts
        SET finished_at = CURRENT_TIMESTAMP, correct_count = ?, total = ?, passed = ?
      WHERE id = ?`,
    [result.correct, result.total, result.passed ? 1 : 0, attemptId],
  );

  return getExamState();
}

/** Historial corto para la pantalla de inicio del examen. */
export async function getAttemptHistory() {
  const rows = await query<
    (RowDataPacket & {
      id: number;
      finished_at: Date;
      correct_count: number;
      total: number;
      passed: number;
    })[]
  >(
    `SELECT id, finished_at, correct_count, total, passed
       FROM exam_attempts
      WHERE finished_at IS NOT NULL
      ORDER BY finished_at DESC
      LIMIT 5`,
  );

  return rows.map((r) => ({
    id: r.id,
    finishedAt: r.finished_at.toISOString(),
    correct: r.correct_count,
    total: r.total,
    passed: r.passed === 1,
  }));
}
