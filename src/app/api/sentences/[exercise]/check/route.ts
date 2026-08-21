import { NextResponse } from "next/server";
import { badRequest, parseSentenceExercise } from "@/lib/api-helpers";
import { checkSentence, getPracticeState } from "@/lib/practice-db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ exercise: string }> },
) {
  const exercise = parseSentenceExercise((await params).exercise);
  if (!exercise) return badRequest("Ejercicio de frases desconocido");

  const body = await request.json().catch(() => null);
  const sentenceId = Number(body?.sentenceId);
  const answer = body?.answer;

  if (!Number.isInteger(sentenceId) || typeof answer !== "string") {
    return badRequest("Se esperaba { sentenceId: number, answer: string }");
  }

  const result = await checkSentence(exercise, sentenceId, answer);
  if (!result) return badRequest("Frase no encontrada");

  return NextResponse.json({
    ...result,
    state: await getPracticeState(exercise),
  });
}
