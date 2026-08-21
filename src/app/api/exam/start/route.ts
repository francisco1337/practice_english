import { NextResponse } from "next/server";
import { startAttempt } from "@/lib/exam-db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const fresh = body?.fresh === true;
  return NextResponse.json(await startAttempt(fresh));
}
