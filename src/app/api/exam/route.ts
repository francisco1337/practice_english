import { NextResponse } from "next/server";
import { getAttemptHistory, getExamState } from "@/lib/exam-db";

export async function GET() {
  const [state, history] = await Promise.all([
    getExamState(),
    getAttemptHistory(),
  ]);
  return NextResponse.json({ ...state, history });
}
