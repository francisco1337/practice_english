"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProgressPanel from "./ProgressPanel";
import SpeakButton from "./SpeakButton";
import { useSpeech } from "@/lib/use-speech";
import { usePracticeState } from "@/lib/use-practice-state";
import {
  expectedSide,
  isPracticable,
  isWrittenAnswerCorrect,
  itemsOf,
  pickItem,
  shownSide,
  type Direction,
  type ExerciseKey,
  type ItemType,
  type PracticeItem,
  type PracticeState,
} from "@/lib/practice";

const AUTO_NEXT_MS = 900;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function WriteExercise({
  exercise,
  itemType,
  panelTitle,
  direction,
  dictation = false,
  initialState,
  initialItem,
}: {
  exercise: ExerciseKey;
  itemType: ItemType;
  panelTitle: string;
  /** es-en: se muestra el español y se escribe en inglés. en-es: al revés. */
  direction: Direction;
  /** En dictado no se muestra nada: se escucha el inglés y se escribe. */
  dictation?: boolean;
  initialState: PracticeState;
  initialItem: PracticeItem | null;
}) {
  const {
    state,
    busy,
    error,
    registerAnswer,
    setActive,
    resetProgress,
    setMasteryTarget,
  } = usePracticeState(exercise, initialState);

  const [item, setItem] = useState<PracticeItem | null>(initialItem);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<{ correct: boolean } | null>(null);
  const [session, setSession] = useState({ correct: 0, total: 0, streak: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const items = itemsOf(state, itemType);
  // En dictado el audio ES el ejercicio: suena aunque la pronunciación
  // automática esté apagada en la configuración.
  const speak = useSpeech({
    enabled: dictation || state.settings.speechEnabled,
    rate: state.settings.speechRate,
  });
  const speakSlow = useSpeech({
    enabled: true,
    rate: Math.max(0.5, state.settings.speechRate - 0.25),
  });
  const expected = item ? expectedSide(item, direction) : "";
  const accepted = direction === "en-es" ? (item?.alternatives ?? []) : [];

  // Cada elemento nuevo se reproduce solo.
  useEffect(() => {
    if (!dictation || !item) return;
    speak(item.answer);
  }, [dictation, item, speak]);

  const advance = useCallback(
    (from: PracticeItem[], previousId: number | null) => {
      setResult(null);
      setAnswer("");
      setItem(pickItem(from, previousId));
      inputRef.current?.focus();
    },
    [],
  );

  const check = useCallback(async () => {
    if (!item || result || !answer.trim()) return;
    const correct = isWrittenAnswerCorrect(answer, item, direction);

    setResult({ correct });
    setSession((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      total: s.total + 1,
      streak: correct ? s.streak + 1 : 0,
    }));

    // Se pronuncia el inglés, sea el que se escribió o el que se mostró.
    if (correct) speak(item.answer);

    const [data] = await Promise.all([
      registerAnswer(itemType, item.id, correct),
      correct ? delay(AUTO_NEXT_MS) : Promise.resolve(),
    ]);

    // Tras un acierto se avanza solo; tras un error el usuario da "Continuar".
    if (correct) {
      const fresh = data ? itemsOf(data, itemType) : items;
      advance(fresh, item.id);
    }
  }, [item, result, answer, direction, registerAnswer, itemType, items, advance, speak]);

  const applyPanelAction = useCallback(
    async (action: Promise<PracticeState | null>) => {
      const data = await action;
      if (!data) return;

      const fresh = itemsOf(data, itemType);
      const stillValid = fresh.some(
        (v) => v.id === item?.id && isPracticable(v),
      );
      if (!stillValid) advance(fresh, item?.id ?? null);
    },
    [itemType, item, advance],
  );

  const pending = items.filter(isPracticable).length;

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        {error && (
          <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
            {error}
          </p>
        )}

        {item === null ? (
          <div className="py-10 text-center">
            {pending === 0 ? (
              <>
                <p className="text-lg font-semibold">
                  ¡No hay nada pendiente! 🎉
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Selecciona más verbos o reinicia contadores en el panel de
                  progreso.
                </p>
              </>
            ) : (
              <p className="text-sm text-slate-500">Cargando…</p>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span>
                {item.dueForReview ? (
                  <span className="font-medium text-amber-700 dark:text-amber-300">
                    Repaso: lo dominaste antes, toca confirmarlo
                  </span>
                ) : (
                  <>
                    Aciertos de este elemento: {item.correctCount} /{" "}
                    {state.settings.masteryTarget}
                  </>
                )}
              </span>
              <span>
                Sesión: {session.correct}/{session.total}
                {session.streak > 1 && ` · racha ${session.streak}`}
              </span>
            </div>

            <p className="mt-6 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              {dictation
                ? "Escucha y escríbelo en inglés"
                : direction === "es-en"
                  ? "Escríbelo en inglés"
                  : "Escríbelo en español"}
            </p>

            {dictation ? (
              <div className="mt-4 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => speak(item.answer)}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-600 text-3xl text-white transition hover:bg-sky-700"
                  aria-label="Escuchar"
                  title="Escuchar"
                >
                  🔊
                </button>
                <button
                  type="button"
                  onClick={() => speakSlow(item.answer)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Más despacio
                </button>
                <p className="text-xs text-slate-500">
                  {result ? item.answer : "Escucha y escribe lo que oyes."}
                </p>
              </div>
            ) : (
              <p className="mt-1 text-center text-2xl font-bold tracking-tight sm:text-4xl">
                {shownSide(item, direction)}
              </p>
            )}

            <form
              className="mt-7 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (result) advance(items, item.id);
                else void check();
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                readOnly={result !== null}
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder={
                  dictation
                    ? "What you hear…"
                    : direction === "es-en"
                      ? "In English…"
                      : "En español…"
                }
                className={`flex-1 rounded-xl border px-4 py-3 text-base outline-none sm:text-lg dark:bg-slate-800 ${
                  result === null
                    ? "border-slate-300 focus:border-sky-500 dark:border-slate-700"
                    : result.correct
                      ? "border-emerald-500 text-emerald-800 dark:text-emerald-200"
                      : "border-rose-500 text-rose-800 dark:text-rose-200"
                }`}
              />
              <button
                type="submit"
                disabled={!result && !answer.trim()}
                className="rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700 disabled:opacity-50"
              >
                {result ? "Siguiente" : "Revisar"}
              </button>
            </form>

            <div className="mt-5 min-h-16">
              {result?.correct && (
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                    ¡Correcto! {expected}
                  </p>
                  <SpeakButton onSpeak={() => speak(item.answer)} />
                </div>
              )}
              {result && !result.correct && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-rose-600 dark:text-rose-400">
                      Era <span className="underline">{expected}</span> · el
                      contador se reinició
                    </p>
                    <SpeakButton onSpeak={() => speak(item.answer)} />
                  </div>
                  {accepted.length > 0 && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      También se acepta: {accepted.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </section>

      <div className="lg:sticky lg:top-6 lg:self-start">
        <ProgressPanel
          title={panelTitle}
          items={items}
          masteryTarget={state.settings.masteryTarget}
          busy={busy}
          primary={direction === "es-en" ? "answer" : "prompt"}
          onToggleActive={(itemIds, active) =>
            void applyPanelAction(setActive(itemType, itemIds, active))
          }
          onReset={(itemId) =>
            void applyPanelAction(resetProgress(itemType, itemId))
          }
          onSetMasteryTarget={(target) =>
            void applyPanelAction(setMasteryTarget(target))
          }
        />
      </div>
    </>
  );
}
