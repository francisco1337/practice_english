import { NextResponse } from "next/server";
import { badRequest, parseExercise, parseItemType } from "@/lib/api-helpers";
import { getPracticeState, registerAnswer } from "@/lib/practice-db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ exercise: string }> },
) {
  const exercise = parseExercise((await params).exercise);
  if (!exercise) return badRequest("Ejercicio desconocido");

  const body = await request.json().catch(() => null);
  const itemType = parseItemType(body?.itemType);
  const itemId = Number(body?.itemId);
  const correct = body?.correct;

  if (!itemType || !Number.isInteger(itemId) || typeof correct !== "boolean") {
    return badRequest(
      "Se esperaba { itemType: 'verb' | 'pronoun', itemId: number, correct: boolean }",
    );
  }

  await registerAnswer(exercise, itemType, itemId, correct);
  return NextResponse.json(await getPracticeState(exercise));
}
