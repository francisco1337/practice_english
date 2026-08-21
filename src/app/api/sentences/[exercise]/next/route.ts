import { NextResponse } from "next/server";
import { badRequest, parseSentenceExercise } from "@/lib/api-helpers";
import { getNextSentence } from "@/lib/practice-db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ exercise: string }> },
) {
  const exercise = parseSentenceExercise((await params).exercise);
  if (!exercise) return badRequest("Ejercicio de frases desconocido");

  const url = new URL(request.url);
  const level = Number(url.searchParams.get("level"));
  const excludeParam = url.searchParams.get("exclude");
  const exclude = excludeParam === null ? undefined : Number(excludeParam);

  if (!Number.isInteger(level) || level < 1 || level > 5) {
    return badRequest("Nivel inválido (1-5)");
  }
  if (exclude !== undefined && !Number.isInteger(exclude)) {
    return badRequest("exclude inválido");
  }

  return NextResponse.json({
    sentence: await getNextSentence(exercise, level, exclude),
  });
}
