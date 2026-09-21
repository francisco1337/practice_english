import { NextResponse } from "next/server";
import { badRequest } from "@/lib/api-helpers";
import { getVerbList, setVerbStudied } from "@/lib/practice-db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const english = body?.english;
  const studied = body?.studied;
  const level = typeof body?.level === "string" ? body.level : "A1";

  if (typeof english !== "string" || typeof studied !== "boolean") {
    return badRequest("Se esperaba { english: string, studied: boolean }");
  }

  await setVerbStudied(english, studied);
  const verbs = await getVerbList(level);
  if (!verbs.some((v) => v.english === english)) {
    return badRequest("Verbo desconocido");
  }

  return NextResponse.json({
    studiedCount: verbs.filter((v) => v.studied).length,
    total: verbs.length,
  });
}
