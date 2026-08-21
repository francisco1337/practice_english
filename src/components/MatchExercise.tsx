"use client";

import { useCallback, useEffect, useState } from "react";
import ProgressPanel from "./ProgressPanel";
import { usePracticeState } from "@/lib/use-practice-state";
import {
  buildQuestion,
  expectedSide,
  itemsOf,
  shownSide,
  type Direction,
  type ExerciseKey,
  type ItemType,
  type PracticeState,
  type Question,
} from "@/lib/practice";

const AUTO_NEXT_MS = 800;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function MatchExercise({
  exercise,
  itemType,
  panelTitle,
  direction = "es-en",
  initialState,
  initialQuestion,
}: {
  exercise: ExerciseKey;
  itemType: ItemType;
  panelTitle: string;
  /** es-en: se muestra el español y se elige el inglés. en-es: al revés. */
  direction?: Direction;
  initialState: PracticeState;
  initialQuestion: Question | null;
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
  const [question, setQuestion] = useState<Question | null>(initialQuestion);
  const [picked, setPicked] = useState<string | null>(null);
  const [session, setSession] = useState({ correct: 0, total: 0, streak: 0 });

  const items = itemsOf(state, itemType);

  const nextQuestion = useCallback(() => {
    setPicked(null);
    setQuestion(buildQuestion(items, question?.item.id ?? null, direction));
  }, [items, question, direction]);

  const answer = useCallback(
    async (option: string) => {
      if (!question || picked) return;
      const correct = option === expectedSide(question.item, direction);

      setPicked(option);
      setSession((s) => ({
        correct: s.correct + (correct ? 1 : 0),
        total: s.total + 1,
        streak: correct ? s.streak + 1 : 0,
      }));

      const [data] = await Promise.all([
        registerAnswer(itemType, question.item.id, correct),
        correct ? delay(AUTO_NEXT_MS) : Promise.resolve(),
      ]);

      // Tras un acierto se avanza solo; tras un error el usuario da "Continuar".
      if (correct) {
        const fresh = data ? itemsOf(data, itemType) : items;
        setPicked(null);
        setQuestion(buildQuestion(fresh, question.item.id, direction));
      }
    },
    [question, picked, registerAnswer, itemType, items, direction],
  );

  /**
   * Acciones del panel: si el elemento en pantalla dejó de ser válido (se
   * desactivó o se dominó) o no había pregunta, arma una nueva.
   */
  const applyPanelAction = useCallback(
    async (action: Promise<PracticeState | null>) => {
      const data = await action;
      if (!data) return;

      const fresh = itemsOf(data, itemType);
      const currentId = question?.item.id ?? null;
      const stillValid = fresh.some(
        (v) => v.id === currentId && v.active && !v.mastered,
      );
      if (!stillValid) {
        setPicked(null);
        setQuestion(buildQuestion(fresh, currentId, direction));
      }
    },
    [itemType, question, direction],
  );

  // Atajos: 1-4 para responder, Enter para continuar tras un error.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!question) return;
      if (picked) {
        if (event.key === "Enter") nextQuestion();
        return;
      }
      const index = Number(event.key) - 1;
      if (
        Number.isInteger(index) &&
        index >= 0 &&
        index < question.options.length
      ) {
        void answer(question.options[index]);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [question, picked, answer, nextQuestion]);

  const answerText = question ? expectedSide(question.item, direction) : "";
  const isCorrect = picked !== null && picked === answerText;
  const pending = items.filter((v) => v.active && !v.mastered).length;

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        {error && (
          <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
            {error}
          </p>
        )}

        {question === null ? (
          <div className="py-10 text-center">
            {pending === 0 ? (
              <>
                <p className="text-lg font-semibold">
                  ¡No hay nada pendiente! 🎉
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Selecciona más elementos o reinicia contadores en el panel de
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
                Aciertos de este elemento: {question.item.correctCount} /{" "}
                {state.settings.masteryTarget}
              </span>
              <span>
                Sesión: {session.correct}/{session.total}
                {session.streak > 1 && ` · racha ${session.streak}`}
              </span>
            </div>

            <p className="mt-6 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              {direction === "es-en" ? "¿Cómo se dice en inglés?" : "¿Qué significa?"}
            </p>
            <p className="mt-1 text-center text-2xl font-bold tracking-tight sm:text-4xl">
              {shownSide(question.item, direction)}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {question.options.map((option, index) => {
                const isAnswer = option === answerText;
                const chosen = option === picked;

                let styles =
                  "border-slate-200 bg-white hover:border-sky-400 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-500 dark:hover:bg-slate-700";
                if (picked) {
                  if (isAnswer)
                    styles =
                      "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100";
                  else if (chosen)
                    styles =
                      "border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950 dark:text-rose-100";
                  else
                    styles =
                      "border-slate-200 bg-white opacity-50 dark:border-slate-700 dark:bg-slate-800";
                }

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => void answer(option)}
                    disabled={picked !== null}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-base font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:text-lg ${styles}`}
                  >
                    <span className="hidden h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-500 sm:flex dark:bg-slate-700 dark:text-slate-300">
                      {index + 1}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex min-h-12 flex-col items-center gap-3">
              {picked && isCorrect && (
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                  ¡Correcto!
                </p>
              )}
              {picked && !isCorrect && (
                <>
                  <p className="text-center font-semibold text-rose-600 dark:text-rose-400">
                    Era <span className="underline">{answerText}</span> · el
                    contador se reinició
                  </p>
                  {question.item.hint && (
                    <p className="max-w-prose text-center text-sm text-slate-600 dark:text-slate-400">
                      {question.item.hint}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={nextQuestion}
                    autoFocus
                    className="rounded-xl bg-sky-600 px-5 py-2.5 font-medium text-white transition hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                  >
                    Continuar
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </section>

      <div className="lg:sticky lg:top-6 lg:self-start">
        <ProgressPanel
          title={panelTitle}
          items={items}
          primary={direction === "es-en" ? "answer" : "prompt"}
          masteryTarget={state.settings.masteryTarget}
          busy={busy}
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
