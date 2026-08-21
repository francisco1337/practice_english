"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  EXAM_PASS_GLOBAL,
  EXAM_PASS_SECTION,
  EXAM_SECTIONS,
  EXAM_TYPE_LABELS,
  examProgress,
  nextExamQuestion,
  type ExamState,
} from "@/lib/exam";

type History = {
  id: number;
  finishedAt: string;
  correct: number;
  total: number;
  passed: boolean;
}[];

const percent = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);

export default function ExamRunner({
  initialState,
  history,
}: {
  initialState: ExamState;
  history: History;
}) {
  const [state, setState] = useState(initialState);
  const [given, setGiven] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const question = useMemo(() => nextExamQuestion(state), [state]);
  const progress = examProgress(state);
  const section = question
    ? EXAM_SECTIONS.find((s) => s.number === question.section)
    : null;

  const post = useCallback(async (path: string, body?: unknown) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/exam${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body ?? {}),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data: ExamState = await res.json();
      setState(data);
      setGiven("");
      inputRef.current?.focus();
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar la respuesta");
      return null;
    } finally {
      setBusy(false);
    }
  }, []);

  // --- Resultado -----------------------------------------------------------
  if (state.result) {
    const r = state.result;
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <div
          className={`rounded-xl p-5 ${
            r.passed
              ? "bg-emerald-50 dark:bg-emerald-950"
              : "bg-amber-50 dark:bg-amber-950"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Resultado
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            {r.correct} / {r.total} · {percent(r.correct, r.total)}%
          </p>
          <p
            className={`mt-2 font-semibold ${
              r.passed
                ? "text-emerald-700 dark:text-emerald-300"
                : "text-amber-800 dark:text-amber-200"
            }`}
          >
            {r.passed
              ? "A1 sellado: pasaste el global y todas las secciones."
              : "Todavía no. Falta el mínimo global o alguna sección."}
          </p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            Para aprobar se piden {Math.round(EXAM_PASS_GLOBAL * 100)}% global y{" "}
            {Math.round(EXAM_PASS_SECTION * 100)}% en cada sección.
          </p>
        </div>

        <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Por sección
        </h2>
        <ul className="mt-3 space-y-2">
          {r.sections.map((s) => {
            const meta = EXAM_SECTIONS.find((x) => x.number === s.section);
            return (
              <li
                key={s.section}
                className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800"
              >
                <span
                  className={`text-sm font-semibold ${
                    s.passed
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {s.passed ? "✓" : "✗"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {s.section}. {meta?.title}
                  </span>
                  <span className="block truncate text-xs text-slate-500">
                    {meta?.topic} · {meta?.context}
                  </span>
                </span>
                <span className="shrink-0 text-sm tabular-nums text-slate-500">
                  {s.correct}/{s.total} · {percent(s.correct, s.total)}%
                </span>
              </li>
            );
          })}
        </ul>

        {r.mistakes.length > 0 && (
          <>
            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Lo que falló ({r.mistakes.length})
            </h2>
            <ul className="mt-3 space-y-3">
              {r.mistakes.map((m) => (
                <li
                  key={`${m.section}-${m.position}`}
                  className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                >
                  <p className="text-xs text-slate-500">
                    Sección {m.section} · reactivo {m.position} ·{" "}
                    {EXAM_TYPE_LABELS[m.type].title}
                  </p>
                  {m.context && (
                    <p className="mt-1 text-sm italic text-slate-500">{m.context}</p>
                  )}
                  <p className="mt-1 text-sm font-medium">{m.prompt}</p>
                  <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">
                    Tu respuesta: {m.given || "(vacía)"}
                  </p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    Correcta: {m.expected}
                  </p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {m.hint}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={busy}
            onClick={() => void post("/start", { fresh: true })}
            className="rounded-xl bg-sky-600 px-5 py-2.5 font-medium text-white transition hover:bg-sky-700 disabled:opacity-50"
          >
            Volver a presentarlo
          </button>
          <Link
            href="/a1"
            className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Ir a practicar
          </Link>
        </div>
      </section>
    );
  }

  // --- Antes de empezar ----------------------------------------------------
  if (state.attemptId === null) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {state.questions.length} reactivos en 6 secciones. No hay
          retroalimentación durante el examen: al terminar te decimos qué falló y
          por qué. Se guarda cada respuesta, así que puedes salir y seguir en otro
          dispositivo.
        </p>

        <ul className="mt-5 space-y-2">
          {EXAM_SECTIONS.map((s) => (
            <li
              key={s.number}
              className="rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800"
            >
              <p className="text-sm font-medium">
                {s.number}. {s.title}
              </p>
              <p className="text-xs text-slate-500">
                {s.topic} · {s.context} ·{" "}
                {state.questions.filter((q) => q.section === s.number).length}{" "}
                reactivos
              </p>
            </li>
          ))}
        </ul>

        {history.length > 0 && (
          <>
            <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Intentos anteriores
            </h2>
            <ul className="mt-2 space-y-1 text-sm">
              {history.map((h) => (
                <li key={h.id} className="flex gap-3 text-slate-600 dark:text-slate-400">
                  <span className="tabular-nums">
                    {new Date(h.finishedAt).toLocaleDateString("es-MX")}
                  </span>
                  <span className="tabular-nums">
                    {h.correct}/{h.total} · {percent(h.correct, h.total)}%
                  </span>
                  <span
                    className={
                      h.passed
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-amber-700 dark:text-amber-300"
                    }
                  >
                    {h.passed ? "aprobado" : "no aprobado"}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
            {error}
          </p>
        )}

        <button
          type="button"
          disabled={busy}
          onClick={() => void post("/start")}
          className="mt-6 rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700 disabled:opacity-50"
        >
          Empezar el examen
        </button>
      </section>
    );
  }

  // --- Examen en curso -----------------------------------------------------
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
        <span>
          {section
            ? `Sección ${section.number} · ${section.title} · ${section.topic}`
            : "Examen"}
        </span>
        <span className="tabular-nums">
          {progress.done} / {progress.total}
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-sky-600 transition-all"
          style={{ width: `${progress.ratio * 100}%` }}
        />
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
          {error}
        </p>
      )}

      {question === null ? (
        <div className="py-10 text-center">
          <p className="text-lg font-semibold">Terminaste los reactivos</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Al calificar ya no se puede cambiar ninguna respuesta.
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={() => void post("/finish")}
            className="mt-6 rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700 disabled:opacity-50"
          >
            Calificar el examen
          </button>
        </div>
      ) : (
        <>
          <p className="mt-6 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
            {EXAM_TYPE_LABELS[question.type].title}
          </p>
          {question.context && (
            <p className="mt-3 text-center text-sm italic text-slate-500">
              {question.context}
            </p>
          )}
          <p
            className={`mt-2 text-center tracking-tight ${
              question.type === "fix"
                ? "text-lg font-semibold text-rose-700 sm:text-2xl dark:text-rose-300"
                : "text-lg font-bold sm:text-2xl"
            }`}
          >
            {question.prompt}
          </p>

          {question.options ? (
            <div className="mt-7 grid grid-cols-1 gap-3">
              {question.options.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  disabled={busy}
                  onClick={() => void post("/answer", { questionId: question.id, given: option })}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-base font-medium transition hover:border-sky-400 hover:bg-sky-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-500"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                    {index + 1}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <form
              className="mt-7 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (given.trim())
                  void post("/answer", { questionId: question.id, given });
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={given}
                onChange={(e) => setGiven(e.target.value)}
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder={EXAM_TYPE_LABELS[question.type].placeholder}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:border-sky-500 sm:text-lg dark:border-slate-700 dark:bg-slate-800"
              />
              <button
                type="submit"
                disabled={busy || !given.trim()}
                className="rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700 disabled:opacity-50"
              >
                Siguiente
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-xs text-slate-500">
            Sin retroalimentación hasta el final. Puedes cerrar y continuar
            después: las respuestas quedan guardadas.
          </p>
        </>
      )}
    </section>
  );
}
