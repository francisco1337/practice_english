import Link from "next/link";
import QaExercise from "@/components/QaExercise";
import { getNextQaPair, getPracticeState } from "@/lib/practice-db";

export const metadata = {
  title: "Pronunciar · Preguntas y respuestas · Practice Inglés",
};

export const dynamic = "force-dynamic";

const INITIAL_LEVEL = 1;

export default async function Page() {
  const [initialState, initialPair] = await Promise.all([
    getPracticeState("qa-speak"),
    getNextQaPair("qa-speak", INITIAL_LEVEL),
  ]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a1/preguntas-respuestas"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Preguntas y respuestas
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Pronunciar · Preguntas y respuestas
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Di la pregunta y luego la respuesta en voz alta, cada una con su
        micrófono. Cuenta como acierto solo si las dos se entienden bien.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <QaExercise
          exercise="qa-speak"
          initialState={initialState}
          initialPair={initialPair}
          initialLevel={INITIAL_LEVEL}
        />
      </div>
    </main>
  );
}
