import { NextResponse } from "next/server";
import { badRequest, parseExercise } from "@/lib/api-helpers";
import { getSettings } from "@/lib/practice-db";
import {
  getPracticeState,
  setDailyGoal,
  setDailyPlanEnabled,
  setMasteryTarget,
  setSpeechEnabled,
  setSpeechRate,
} from "@/lib/practice-db";

/**
 * Ajustes globales (umbral de dominado y pronunciación). Se devuelve el estado
 * del ejercicio que hizo el cambio.
 */
export async function GET() {
  return NextResponse.json({ settings: await getSettings() });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  // Los paneles mandan su ejercicio para recibir el estado completo de vuelta;
  // la pantalla de configuración no manda ninguno.
  const exercise =
    body?.exercise === undefined
      ? null
      : parseExercise(String(body.exercise));
  if (body?.exercise !== undefined && !exercise) {
    return badRequest("Ejercicio desconocido");
  }

  const { masteryTarget, speechEnabled, speechRate, dailyPlanEnabled, dailyGoal } =
    body ?? {};

  if (
    masteryTarget === undefined &&
    speechEnabled === undefined &&
    speechRate === undefined &&
    dailyPlanEnabled === undefined &&
    dailyGoal === undefined
  ) {
    return badRequest(
      "Se esperaba masteryTarget, speechEnabled, speechRate, dailyPlanEnabled o dailyGoal",
    );
  }
  if (masteryTarget !== undefined && !Number.isFinite(Number(masteryTarget))) {
    return badRequest("masteryTarget inválido");
  }
  if (speechEnabled !== undefined && typeof speechEnabled !== "boolean") {
    return badRequest("speechEnabled inválido");
  }
  if (speechRate !== undefined && !Number.isFinite(Number(speechRate))) {
    return badRequest("speechRate inválido");
  }
  if (dailyPlanEnabled !== undefined && typeof dailyPlanEnabled !== "boolean") {
    return badRequest("dailyPlanEnabled inválido");
  }
  if (dailyGoal !== undefined && !Number.isFinite(Number(dailyGoal))) {
    return badRequest("dailyGoal inválido");
  }

  if (masteryTarget !== undefined) await setMasteryTarget(Number(masteryTarget));
  if (speechEnabled !== undefined) await setSpeechEnabled(speechEnabled);
  if (speechRate !== undefined) await setSpeechRate(Number(speechRate));
  if (dailyPlanEnabled !== undefined) await setDailyPlanEnabled(dailyPlanEnabled);
  if (dailyGoal !== undefined) await setDailyGoal(Number(dailyGoal));

  if (!exercise) return NextResponse.json({ settings: await getSettings() });
  return NextResponse.json(await getPracticeState(exercise));
}
