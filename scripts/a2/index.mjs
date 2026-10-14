/**
 * Temas de gramática y expresiones de A2 para init-db. Deben coincidir con
 * A2_TOPICS y los sufijos de ejercicio de src/lib/a2.ts.
 * - grammar: elementos + banco de frases (traducir, completar, corregir…).
 * - vocab: solo elementos (relacionar, escribir, dictado, pronunciar).
 */
import * as past from "./past.mjs";
import * as pastContinuous from "./past-continuous.mjs";
import * as future from "./future.mjs";
import * as modals from "./modals.mjs";
import * as comparatives from "./comparatives.mjs";
import * as quantities from "./quantities.mjs";
import * as connectors from "./connectors.mjs";
import { questions, prepositions, adverbs, adjectives } from "./expressions.mjs";
import * as work from "./work.mjs";

export const A2_GRAMMAR_SUFFIXES = [
  "match",
  "translate",
  "translate-rev",
  "cloze",
  "fix",
  "dict",
  "speak",
];
export const A2_VOCAB_SUFFIXES = ["match", "match-rev", "write", "dict", "speak"];

export const a2Topics = [
  { topic: "a2past", kind: "grammar", items: past.items, sentences: past.sentences },
  { topic: "a2pastc", kind: "grammar", items: pastContinuous.items, sentences: pastContinuous.sentences },
  { topic: "a2fut", kind: "grammar", items: future.items, sentences: future.sentences },
  { topic: "a2modal", kind: "grammar", items: modals.items, sentences: modals.sentences },
  { topic: "a2comp", kind: "grammar", items: comparatives.items, sentences: comparatives.sentences },
  { topic: "a2quant", kind: "grammar", items: quantities.items, sentences: quantities.sentences },
  { topic: "a2conn", kind: "grammar", items: connectors.items, sentences: connectors.sentences },
  { topic: "a2quest", kind: "vocab", items: questions, sentences: [] },
  { topic: "a2prep", kind: "vocab", items: prepositions, sentences: [] },
  { topic: "a2adv", kind: "vocab", items: adverbs, sentences: [] },
  { topic: "a2adj", kind: "vocab", items: adjectives, sentences: [] },
  { topic: "a2work", kind: "vocab", items: work.items, sentences: [] },
];

/** [clave de ejercicio, [tipo de elemento]] de cada ejercicio de A2. */
export const a2Exercises = a2Topics.flatMap(({ topic, kind }) =>
  (kind === "grammar" ? A2_GRAMMAR_SUFFIXES : A2_VOCAB_SUFFIXES).map((suffix) => [
    `${topic}-${suffix}`,
    [topic],
  ]),
);
