import { NextResponse } from "next/server";
import { A2_ITEM_TYPES } from "./a2";
import {
  isExerciseKey,
  isQaExerciseKey,
  isSentenceExerciseKey,
  type ExerciseKey,
  type ItemType,
  type QaExerciseKey,
  type SentenceExerciseKey,
} from "./practice";

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

/** Valida el segmento dinámico [exercise] de las rutas de práctica. */
export function parseExercise(value: string): ExerciseKey | null {
  return isExerciseKey(value) ? value : null;
}

const ITEM_TYPES: ItemType[] = [
  "verb",
  "pronoun",
  "tobe",
  "article",
  "present",
  "qa",
  "third",
  "there",
  "cont",
  "wh",
  "prep",
  "adv",
  "phrase",
  ...A2_ITEM_TYPES,
];

export function parseItemType(value: unknown): ItemType | null {
  return ITEM_TYPES.includes(value as ItemType) ? (value as ItemType) : null;
}

/** Valida el segmento dinámico [exercise] de las rutas de frases. */
export function parseSentenceExercise(
  value: string,
): SentenceExerciseKey | null {
  return isSentenceExerciseKey(value) ? value : null;
}

/** Valida el segmento dinámico [exercise] de las rutas de preguntas. */
export function parseQaExercise(value: string): QaExerciseKey | null {
  return isQaExerciseKey(value) ? value : null;
}
