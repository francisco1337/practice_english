import { NextResponse } from "next/server";
import { badRequest, parseExercise, parseItemType } from "@/lib/api-helpers";
import { getPracticeState, resetProgress } from "@/lib/practice-db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ exercise: string }> },
) {
  const exercise = parseExercise((await params).exercise);
  if (!exercise) return badRequest("Ejercicio desconocido");

  const body = await request.json().catch(() => null);
  const itemType =
    body?.itemType === undefined ? undefined : parseItemType(body.itemType);
  const itemId = body?.itemId === undefined ? undefined : Number(body.itemId);

  if (itemType === null) return badRequest("itemType inválido");
  if (itemId !== undefined && !Number.isInteger(itemId)) {
    return badRequest("itemId inválido");
  }

  await resetProgress(exercise, itemType, itemId);
  return NextResponse.json(await getPracticeState(exercise));
}
