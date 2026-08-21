"use client";

import { useCallback, useRef, useState } from "react";
import ProgressPanel from "./ProgressPanel";
import { usePracticeState } from "@/lib/use-practice-state";
import {
  CATEGORY_LABELS,
  QA_LEVEL_LABELS,
  QA_MODES,
  QA_MODE_LABELS,
  TRANSLATE_LEVELS,
  itemsOf,
  type ItemFeedback,
  type PracticeState,
  type QaExerciseKey,
  type QaPrompt,
  type TranslateLevel,
} from "@/lib/practice";

type Feedback = {
  questionCorrect: boolean;
  answerCorrect: boolean;
  expectedQuestion: string;
  expectedAnswer: string;
  item: ItemFeedback;
};

export default function QaExercise({
  exercise,
  initialState,
  initialPair,
  initialLevel,
}: {
  exercise: QaExerciseKey;
  initialState: PracticeState;
  initialPair: QaPrompt | null;
  initialLevel: TranslateLevel;
}) {
  const {
    state,
    setState,
    busy,
    error,
    setError,
    setActive,
    resetProgress,
    setMasteryTarget,
  } = usePracticeState(exercise, initialState);

  const [level, setLevel] = useState<TranslateLevel>(initialLevel);
  const [pair, setPair] = useState<QaPrompt | null>(initialPair);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [checking, setChecking] = useState(false);
  const [session, setSession] = useState({ correct: 0, total: 0, streak: 0 });
  const questionRef = useRef<HTMLInputElement>(null);

  const mode = QA_MODES[exercise];
  const labels = QA_MODE_LABELS[mode];

  const loadPair = useCallback(
    async (nextLevel: number, excludeId?: number) => {
      setError(null);
      try {
        const params = new URLSearchParams({ level: String(nextLevel) });
        if (excludeId) params.set("exclude", String(excludeId));
        const res = await fetch(`/api/qa/${exercise}/next?${params}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data: { pair: QaPrompt | null } = await res.json();
        setPair(data.pair);
        setFeedback(null);
        setQuestion("");
        setAnswer("");
        questionRef.current?.focus();
      } catch (e) {
        setError(e instanceof Error ? e.message : "No se pudo cargar el par");
      }
    },
    [exercise, setError],
  );

  const check = useCallback(async () => {
    if (!pair || feedback || !question.trim() || !answer.trim()) return;
    setChecking(true);
    setError(null);
    try {
      const res = await fetch(`/api/qa/${exercise}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pairId: pair.id, question, answer }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setState(data.state as PracticeState);
      setFeedback({
        questionCorrect: data.questionCorrect,
        answerCorrect: data.answerCorrect,
        expectedQuestion: data.expectedQuestion,
        expectedAnswer: data.expectedAnswer,
        item: data.item,
      });
      const both = data.questionCorrect && data.answerCorrect;
      setSession((s) => ({
        correct: s.correct + (both ? 1 : 0),
        total: s.total + 1,
        streak: both ? s.streak + 1 : 0,
      }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo revisar");
    } finally {
      setChecking(false);
    }
  }, [pair, feedback, question, answer, exercise, setError, setState]);

  const changeLevel = useCallback(
    (next: TranslateLevel) => {
      setLevel(next);
      void loadPair(next);
    },
    [loadPair],
  );

  const applyPanelAction = useCallback(
    async (action: Promise<PracticeState | null>) => {
      const data = await action;
      if (data) await loadPair(level);
    },
    [level, loadPair],
  );

  const fieldStyles = (ok: boolean | undefined) =>
    feedback === null
      ? "border-slate-300 focus:border-sky-500 dark:border-slate-700"
      : ok
        ? "border-emerald-500 text-emerald-800 dark:text-emerald-200"
        : "border-rose-500 text-rose-800 dark:text-rose-200";

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap gap-2">
          {TRANSLATE_LEVELS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => changeLevel(value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                value === level
                  ? "bg-sky-600 text-white"
                  : "border border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              }`}
            >
              Nivel {value}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">{QA_LEVEL_LABELS[level]}</p>

        {error && (
          <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
            {error}
          </p>
        )}

        {pair === null ? (
          <div className="py-10 text-center">
            <p className="text-lg font-semibold">
              No hay pares pendientes en este nivel 🎉
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Cambia de nivel, activa más formas o reinicia contadores en el
              panel.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-6 flex justify-end text-xs text-slate-500">
              <span>
                Sesión: {session.correct}/{session.total}
                {session.streak > 1 && ` · racha ${session.streak}`}
              </span>
            </div>

            <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              {labels.title}
            </p>
            <p className="mt-2 text-center text-lg font-bold tracking-tight sm:text-2xl">
              {pair.question}
            </p>
            {pair.answer && (
              <p className="mt-1 text-center text-base font-semibold text-slate-600 sm:text-xl dark:text-slate-300">
                {pair.answer}
              </p>
            )}

            <form
              className="mt-6 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (feedback) void loadPair(level, pair.id);
                else void check();
              }}
            >
              <label className="block">
                <span className="text-xs font-medium text-slate-500">
                  {labels.questionLabel}
                </span>
                <input
                  ref={questionRef}
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  readOnly={feedback !== null}
                  autoFocus
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  placeholder={labels.placeholder}
                  className={`mt-1 w-full rounded-xl border px-4 py-3 text-base outline-none dark:bg-slate-800 ${fieldStyles(feedback?.questionCorrect)}`}
                />
              </label>

              <label className="block">
                <span className="text-xs font-medium text-slate-500">
                  {labels.answerLabel}
                </span>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  readOnly={feedback !== null}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  placeholder={labels.placeholder}
                  className={`mt-1 w-full rounded-xl border px-4 py-3 text-base outline-none dark:bg-slate-800 ${fieldStyles(feedback?.answerCorrect)}`}
                />
              </label>

              <button
                type="submit"
                disabled={
                  checking || (!feedback && (!question.trim() || !answer.trim()))
                }
                className="w-full rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700 disabled:opacity-50 sm:w-auto"
              >
                {feedback ? "Siguiente" : "Revisar"}
              </button>
            </form>

            {feedback && (
              <div className="mt-5 space-y-3">
                {feedback.questionCorrect && feedback.answerCorrect ? (
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                    ¡Correcto! {feedback.expectedQuestion}{" "}
                    {feedback.expectedAnswer}
                  </p>
                ) : (
                  <>
                    <p className="font-semibold text-rose-600 dark:text-rose-400">
                      {feedback.questionCorrect
                        ? "La pregunta está bien, la respuesta no"
                        : feedback.answerCorrect
                          ? "La respuesta está bien, la pregunta no"
                          : "Ninguna de las dos está bien"}{" "}
                      · el contador se reinició
                    </p>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-slate-500">Pregunta: </span>
                        <span
                          className={
                            feedback.questionCorrect
                              ? ""
                              : "font-semibold text-emerald-700 dark:text-emerald-300"
                          }
                        >
                          {feedback.expectedQuestion}
                        </span>
                      </p>
                      <p>
                        <span className="text-slate-500">Respuesta: </span>
                        <span
                          className={
                            feedback.answerCorrect
                              ? ""
                              : "font-semibold text-emerald-700 dark:text-emerald-300"
                          }
                        >
                          {feedback.expectedAnswer}
                        </span>
                      </p>
                    </div>

                    <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900 dark:bg-sky-950">
                      <p className="text-sm font-semibold text-sky-900 dark:text-sky-100">
                        {feedback.item.english}
                      </p>
                      <p className="mt-0.5 text-xs uppercase tracking-wide text-sky-700 dark:text-sky-300">
                        {CATEGORY_LABELS[feedback.item.category] ??
                          feedback.item.category}
                      </p>
                      <p className="mt-2 text-sm text-sky-900 dark:text-sky-100">
                        {feedback.item.hint}
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </section>

      <div className="lg:sticky lg:top-6 lg:self-start">
        <ProgressPanel
          title="Preguntas y respuestas"
          items={itemsOf(state, "qa")}
          masteryTarget={state.settings.masteryTarget}
          busy={busy}
          onToggleActive={(itemIds, active) =>
            void applyPanelAction(setActive("qa", itemIds, active))
          }
          onReset={(itemId) => void applyPanelAction(resetProgress("qa", itemId))}
          onSetMasteryTarget={(target) =>
            void applyPanelAction(setMasteryTarget(target))
          }
        />
      </div>
    </>
  );
}
