import Link from "next/link";
import SentenceExercise from "@/components/SentenceExercise";
import { getNextSentence, getPracticeState } from "@/lib/practice-db";

export const metadata = {
  title: "Corregir frase · Tercera persona · Practice Inglés",
};

export const dynamic = "force-dynamic";

const INITIAL_LEVEL = 1;

export default async function Page() {
  const [initialState, initialSentence] = await Promise.all([
    getPracticeState("tp-fix"),
    getNextSentence("tp-fix", INITIAL_LEVEL),
  ]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a1/tercera-persona"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Tercera persona
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Corregir frase · Tercera persona
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Te damos una frase mal escrita en inglés y tú la escribes correctamente. Cada frase practica una regla de la tercera persona; al fallar te
        explicamos esa regla.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <SentenceExercise
          exercise="tp-fix"
          panels={[{ itemType: "third", title: "Reglas y formas" }]}
          initialState={initialState}
          initialSentence={initialSentence}
          initialLevel={INITIAL_LEVEL}
        />
      </div>
    </main>
  );
}
