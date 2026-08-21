"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProgressPanel from "./ProgressPanel";
import MicButton from "./MicButton";
import SpeakButton from "./SpeakButton";
import { useRecognition } from "@/lib/use-recognition";
import { useSpeech } from "@/lib/use-speech";
import { usePracticeState } from "@/lib/use-practice-state";
import {
  CATEGORY_LABELS,
  SENTENCE_MODES,
  SENTENCE_MODE_LABELS,
  SENTENCE_LEVEL_LABELS,
  TRANSLATE_LEVELS,
  diffWords,
  itemsOf,
  type ItemFeedback,
  type ItemType,
  type PracticeState,
  type SentenceExerciseKey,
  type SentencePrompt,
  type TranslateLevel,
} from "@/lib/practice";

/** Un panel de progreso o de filtro a la derecha del ejercicio. */
export type PanelConfig = {
  itemType: ItemType;
  title: string;
  /** false para paneles que solo filtran (los verbos en pronombres). */
  showCounters?: boolean;
};

type Feedback = {
  correct: boolean;
  expected: string;
  item: ItemFeedback;
  given: string;
};

export default function SentenceExercise({
  exercise,
  panels,
  initialState,
  initialSentence,
  initialLevel,
}: {
  exercise: SentenceExerciseKey;
  panels: PanelConfig[];
  initialState: PracticeState;
  initialSentence: SentencePrompt | null;
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
  const [sentence, setSentence] = useState<SentencePrompt | null>(
    initialSentence,
  );
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [checking, setChecking] = useState(false);
  const [session, setSession] = useState({ correct: 0, total: 0, streak: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const mode = SENTENCE_MODES[exercise];
  const modeLabels = SENTENCE_MODE_LABELS[mode];
  const isDictation = mode === "dictation";
  const isSpeaking = mode === "speak";
  // En dictado el audio ES el ejercicio, así que suena aunque la pronunciación
  // automática esté apagada en la configuración.
  const speak = useSpeech({
    enabled: isDictation || state.settings.speechEnabled,
    rate: state.settings.speechRate,
  });
  const speakSlow = useSpeech({
    enabled: true,
    rate: Math.max(0.5, state.settings.speechRate - 0.25),
  });

  /**
   * El texto que se pronuncia es siempre la frase completa en inglés: la
   * respuesta esperada, o la frase mostrada cuando se responde en español.
   * En «completar» se rellena el hueco para escuchar la oración entera.
   */
  const englishOf = useCallback(
    (expected: string) => {
      if (!sentence) return expected;
      if (mode === "en-es") return sentence.spanish;
      if (mode === "cloze") return sentence.spanish.replace("___", expected);
      return expected;
    },
    [sentence, mode],
  );

  const loadSentence = useCallback(
    async (nextLevel: number, excludeId?: number) => {
      setError(null);
      try {
        const params = new URLSearchParams({ level: String(nextLevel) });
        if (excludeId) params.set("exclude", String(excludeId));
        const res = await fetch(`/api/sentences/${exercise}/next?${params}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data: { sentence: SentencePrompt | null } = await res.json();
        setSentence(data.sentence);
        setFeedback(null);
        setAnswer("");
        inputRef.current?.focus();
      } catch (e) {
        setError(e instanceof Error ? e.message : "No se pudo cargar la frase");
      }
    },
    [exercise, setError],
  );

  // Al llegar una frase nueva se reproduce sola; si el navegador lo bloquea
  // (iOS pide un gesto la primera vez), queda el botón «Escuchar».
  useEffect(() => {
    if (!isDictation || !sentence) return;
    speak(sentence.spanish);
  }, [isDictation, sentence, speak]);

  const revisar = useCallback(
    async (texto: string) => {
      if (!sentence || feedback || !texto.trim()) return;
      setChecking(true);
      setError(null);
      try {
        const res = await fetch(`/api/sentences/${exercise}/check`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sentenceId: sentence.id, answer: texto }),
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setState(data.state as PracticeState);
        setAnswer(texto);
        setFeedback({
          correct: data.correct,
          expected: data.expected,
          item: data.item,
          given: texto,
        });
        if (data.correct) speak(englishOf(data.expected));
        setSession((s) => ({
          correct: s.correct + (data.correct ? 1 : 0),
          total: s.total + 1,
          streak: data.correct ? s.streak + 1 : 0,
        }));
      } catch (e) {
        setError(e instanceof Error ? e.message : "No se pudo revisar la frase");
      } finally {
        setChecking(false);
      }
    },
    [sentence, feedback, exercise, setError, setState, speak, englishOf],
  );

  const { status, interim, listen, stop } = useRecognition();

  const check = useCallback(async () => {
    if (!sentence || feedback || !answer.trim()) return;
    setChecking(true);
    setError(null);
    try {
      const res = await fetch(`/api/sentences/${exercise}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentenceId: sentence.id, answer }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setState(data.state as PracticeState);
      setFeedback({
        correct: data.correct,
        expected: data.expected,
        item: data.item,
        given: answer,
      });
      if (data.correct) speak(englishOf(data.expected));
      setSession((s) => ({
        correct: s.correct + (data.correct ? 1 : 0),
        total: s.total + 1,
        streak: data.correct ? s.streak + 1 : 0,
      }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo revisar la frase");
    } finally {
      setChecking(false);
    }
  }, [sentence, feedback, answer, exercise, setError, setState, speak, englishOf]);

  const changeLevel = useCallback(
    (next: TranslateLevel) => {
      setLevel(next);
      void loadSentence(next);
    },
    [loadSentence],
  );

  /** Tras filtrar o reiniciar, se pide una frase nueva con los filtros al día. */
  const applyPanelAction = useCallback(
    async (action: Promise<PracticeState | null>) => {
      const data = await action;
      if (data) await loadSentence(level);
    },
    [level, loadSentence],
  );

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
        <p className="mt-2 text-xs text-slate-500">
          {SENTENCE_LEVEL_LABELS[exercise][level]}
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
            {error}
          </p>
        )}

        {sentence === null ? (
          <div className="py-10 text-center">
            <p className="text-lg font-semibold">
              No hay frases pendientes en este nivel 🎉
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Cambia de nivel, activa más pronombres o verbos, o reinicia
              contadores en los paneles.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span>
                {sentence.label && (
                  <>
                    Verbo:{" "}
                    <span className="font-medium">{sentence.label}</span>
                  </>
                )}
              </span>
              <span>
                Sesión: {session.correct}/{session.total}
                {session.streak > 1 && ` · racha ${session.streak}`}
              </span>
            </div>

            <p className="mt-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              {modeLabels.title}
            </p>
            {isSpeaking ? (
              <>
                <p className="mt-2 text-center text-xl font-bold tracking-tight sm:text-3xl">
                  {sentence.spanish}
                </p>
                <div className="mt-3 flex justify-center">
                  <SpeakButton
                    onSpeak={() => speak(sentence.spanish)}
                    label="Escuchar el modelo"
                  />
                </div>
                <div className="mt-5">
                  <MicButton
                    status={status}
                    interim={interim}
                    disabled={checking || feedback !== null}
                    onListen={() => listen((texto) => void revisar(texto))}
                    onStop={stop}
                  />
                </div>
              </>
            ) : isDictation ? (
              <div className="mt-4 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => speak(sentence.spanish)}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-600 text-3xl text-white transition hover:bg-sky-700"
                  aria-label="Escuchar la oración"
                  title="Escuchar la oración"
                >
                  🔊
                </button>
                <button
                  type="button"
                  onClick={() => speakSlow(sentence.spanish)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Más despacio
                </button>
                <p className="text-xs text-slate-500">
                  {feedback
                    ? sentence.spanish
                    : "Escucha las veces que quieras y escribe lo que oyes."}
                </p>
              </div>
            ) : (
              <p
                className={`mt-2 text-center tracking-tight ${
                  mode === "cloze"
                    ? "text-lg font-semibold sm:text-2xl"
                    : mode === "fix"
                      ? "text-lg font-semibold text-rose-700 sm:text-2xl dark:text-rose-300"
                      : "text-xl font-bold sm:text-3xl"
                }`}
              >
                {sentence.spanish}
              </p>
            )}

            {isSpeaking ? (
              <div className="mt-6 flex justify-center">
                {feedback && (
                  <button
                    type="button"
                    onClick={() => void loadSentence(level, sentence.id)}
                    className="rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700"
                  >
                    Siguiente
                  </button>
                )}
              </div>
            ) : (
            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (feedback) void loadSentence(level, sentence.id);
                else void check();
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                readOnly={feedback !== null}
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder={modeLabels.placeholder}
                className={`flex-1 rounded-xl border px-4 py-3 text-base outline-none sm:text-lg dark:bg-slate-800 ${
                  feedback === null
                    ? "border-slate-300 focus:border-sky-500 dark:border-slate-700"
                    : feedback.correct
                      ? "border-emerald-500 text-emerald-800 dark:text-emerald-200"
                      : "border-rose-500 text-rose-800 dark:text-rose-200"
                }`}
              />
              <button
                type="submit"
                disabled={checking || (!feedback && !answer.trim())}
                className="rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700 disabled:opacity-50"
              >
                {feedback ? "Siguiente" : "Revisar"}
              </button>
            </form>
            )}

            {feedback && (
              <div className="mt-5">
                {feedback.correct ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                      ¡Correcto! {feedback.expected}
                    </p>
                    <SpeakButton
                      onSpeak={() => speak(englishOf(feedback.expected))}
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="font-semibold text-rose-600 dark:text-rose-400">
                      No es correcto · el contador de{" "}
                      <span className="underline">{feedback.item.english}</span>{" "}
                      se reinició
                    </p>
                    <p className="flex flex-wrap items-center gap-2 text-sm">
                      <SpeakButton
                        onSpeak={() => speak(englishOf(feedback.expected))}
                      />
                      <span className="text-slate-500">
                        {mode === "cloze" ? "Va: " : "Correcta: "}
                      </span>
                      {diffWords(feedback.given, feedback.expected).map(
                        (part, index) => (
                          <span
                            key={`${part.word}-${index}`}
                            className={
                              part.missing
                                ? "font-semibold text-emerald-700 underline decoration-emerald-400 dark:text-emerald-300"
                                : ""
                            }
                          >
                            {part.word}{" "}
                          </span>
                        ),
                      )}
                    </p>

                    <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900 dark:bg-sky-950">
                      <p className="text-sm font-semibold text-sky-900 dark:text-sky-100">
                        {feedback.item.english} — {feedback.item.spanish}
                      </p>
                      <p className="mt-0.5 text-xs uppercase tracking-wide text-sky-700 dark:text-sky-300">
                        {CATEGORY_LABELS[feedback.item.category] ??
                          feedback.item.category}
                      </p>
                      <p className="mt-2 text-sm text-sky-900 dark:text-sky-100">
                        {feedback.item.hint}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </section>

      <div className="flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">
        {panels.map((panel) => (
          <ProgressPanel
            key={panel.itemType}
            title={panel.title}
            items={itemsOf(state, panel.itemType)}
            masteryTarget={state.settings.masteryTarget}
            busy={busy}
            showCounters={panel.showCounters ?? true}
            onToggleActive={(itemIds, active) =>
              void applyPanelAction(setActive(panel.itemType, itemIds, active))
            }
            onReset={
              panel.showCounters === false
                ? undefined
                : (itemId) =>
                    void applyPanelAction(resetProgress(panel.itemType, itemId))
            }
            onSetMasteryTarget={
              panel.showCounters === false
                ? undefined
                : (target) => void applyPanelAction(setMasteryTarget(target))
            }
          />
        ))}
      </div>
    </>
  );
}
