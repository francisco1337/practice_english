import { NextResponse } from "next/server";
import { badRequest, parseQaExercise } from "@/lib/api-helpers";
import { checkQaPair, getPracticeState } from "@/lib/practice-db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ exercise: string }> },
) {
  const exercise = parseQaExercise((await params).exercise);
  if (!exercise) return badRequest("Ejercicio de preguntas desconocido");

  const body = await request.json().catch(() => null);
  const pairId = Number(body?.pairId);
  const question = body?.question;
  const answer = body?.answer;

  if (
    !Number.isInteger(pairId) ||
    typeof question !== "string" ||
    typeof answer !== "string"
  ) {
    return badRequest(
      "Se esperaba { pairId: number, question: string, answer: string }",
    );
  }

  const result = await checkQaPair(exercise, pairId, question, answer);
  if (!result) return badRequest("Par no encontrado");

  return NextResponse.json({
    ...result,
    state: await getPracticeState(exercise),
  });
}
