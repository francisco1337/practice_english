import { NextResponse } from "next/server";
import { badRequest } from "@/lib/api-helpers";
import { answerQuestion } from "@/lib/exam-db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const questionId = Number(body?.questionId);
  const given = body?.given;

  if (!Number.isInteger(questionId) || typeof given !== "string") {
    return badRequest("Se esperaba { questionId: number, given: string }");
  }

  const state = await answerQuestion(questionId, given);
  if (!state) return badRequest("No hay examen en curso o el reactivo no existe");
  return NextResponse.json(state);
}
