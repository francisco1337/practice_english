"use client";

import { useCallback, useRef, useState } from "react";
import ProgressPanel from "./ProgressPanel";
import { usePracticeState } from "@/lib/use-practice-state";
import {
  expectedSide,
  itemsOf,
  isWrittenAnswerCorrect,
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
  initialState,
  initialItem,
}: {
  exercise: ExerciseKey;
  itemType: ItemType;
  panelTitle: string;
  /** es-en: se muestra el español y se escribe en inglés. en-es: al revés. */
  direction: Direction;
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
  const expected = item ? expectedSide(item, direction) : "";
  const accepted = direction === "en-es" ? (item?.alternatives ?? []) : [];

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

    const [data] = await Promise.all([
      registerAnswer(itemType, item.id, correct),
      correct ? delay(AUTO_NEXT_MS) : Promise.resolve(),
    ]);

    // Tras un acierto se avanza solo; tras un error el usuario da "Continuar".
    if (correct) {
      const fresh = data ? itemsOf(data, itemType) : items;
      advance(fresh, item.id);
    }
  }, [item, result, answer, direction, registerAnswer, itemType, items, advance]);

  const applyPanelAction = useCallback(
    async (action: Promise<PracticeState | null>) => {
      const data = await action;
      if (!data) return;

      const fresh = itemsOf(data, itemType);
      const stillValid = fresh.some(
        (v) => v.id === item?.id && v.active && !v.mastered,
      );
      if (!stillValid) advance(fresh, item?.id ?? null);
    },
    [itemType, item, advance],
  );

  const pending = items.filter((v) => v.active && !v.mastered).length;

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
                Aciertos de este elemento: {item.correctCount} /{" "}
                {state.settings.masteryTarget}
              </span>
              <span>
                Sesión: {session.correct}/{session.total}
                {session.streak > 1 && ` · racha ${session.streak}`}
              </span>
            </div>

            <p className="mt-6 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              {direction === "es-en"
                ? "Escríbelo en inglés"
                : "Escríbelo en español"}
            </p>
            <p className="mt-1 text-center text-2xl font-bold tracking-tight sm:text-4xl">
              {shownSide(item, direction)}
            </p>

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
                  direction === "es-en" ? "In English…" : "En español…"
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
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                  ¡Correcto! {expected}
                </p>
              )}
              {result && !result.correct && (
                <div className="space-y-2">
                  <p className="font-semibold text-rose-600 dark:text-rose-400">
                    Era <span className="underline">{expected}</span> · el
                    contador se reinició
                  </p>
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
