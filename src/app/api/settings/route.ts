import { NextResponse } from "next/server";
import { badRequest, parseExercise } from "@/lib/api-helpers";
import { getPracticeState, setMasteryTarget } from "@/lib/practice-db";

/** El umbral es global; se devuelve el estado del ejercicio que lo pidió. */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const masteryTarget = Number(body?.masteryTarget);
  const exercise = parseExercise(String(body?.exercise ?? ""));

  if (!Number.isFinite(masteryTarget)) {
    return badRequest("Se esperaba { masteryTarget: number }");
  }
  if (!exercise) return badRequest("Ejercicio desconocido");

  await setMasteryTarget(masteryTarget);
  return NextResponse.json(await getPracticeState(exercise));
}
