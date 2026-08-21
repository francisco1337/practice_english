import { NextResponse } from "next/server";
import { finishAttempt } from "@/lib/exam-db";

export async function POST() {
  return NextResponse.json(await finishAttempt());
}
