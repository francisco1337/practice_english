import { NextResponse } from "next/server";
import { badRequest, parseExercise } from "@/lib/api-helpers";
import { getPracticeState } from "@/lib/practice-db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ exercise: string }> },
) {
  const exercise = parseExercise((await params).exercise);
  if (!exercise) return badRequest("Ejercicio desconocido");
  return NextResponse.json(await getPracticeState(exercise));
}
