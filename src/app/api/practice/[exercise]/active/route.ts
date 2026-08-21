import { NextResponse } from "next/server";
import { badRequest, parseExercise, parseItemType } from "@/lib/api-helpers";
import { getPracticeState, setActive } from "@/lib/practice-db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ exercise: string }> },
) {
  const exercise = parseExercise((await params).exercise);
  if (!exercise) return badRequest("Ejercicio desconocido");

  const body = await request.json().catch(() => null);
  const itemType = parseItemType(body?.itemType);
  const itemIds = Array.isArray(body?.itemIds) ? body.itemIds.map(Number) : null;
  const active = body?.active;

  if (
    !itemType ||
    !itemIds ||
    itemIds.some((id: number) => !Number.isInteger(id)) ||
    typeof active !== "boolean"
  ) {
    return badRequest(
      "Se esperaba { itemType: 'verb' | 'pronoun', itemIds: number[], active: boolean }",
    );
  }

  await setActive(exercise, itemType, itemIds, active);
  return NextResponse.json(await getPracticeState(exercise));
}
