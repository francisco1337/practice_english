import Link from "next/link";
import ExamRunner from "@/components/ExamRunner";
import { getAttemptHistory, getExamState } from "@/lib/exam-db";
import { getSettings } from "@/lib/practice-db";

export const metadata = {
  title: "Examen de A1 · Practice Inglés",
};

export const dynamic = "force-dynamic";

export default async function ExamPage() {
  const [state, history, settings] = await Promise.all([
    getExamState(),
    getAttemptHistory(),
    getSettings(),
  ]);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a1"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← A1
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Examen de cierre · A1
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Para sellar el nivel: pronombres y to be, do/does, presente simple,
        presente continuo, there is/are con preposiciones, una conversación de
        cierre y una sección de dictado. Está diseñado para que solo lo pases si de verdad entendiste las
        reglas, no si adivinas.
      </p>

      <div className="mt-6">
        <ExamRunner
          initialState={state}
          history={history}
          speechRate={settings.speechRate}
        />
      </div>
    </main>
  );
}
