import Link from "next/link";
import SentenceExercise from "@/components/SentenceExercise";
import { getNextSentence, getPracticeState } from "@/lib/practice-db";

export const metadata = {
  title: "Traducir frase · Presente simple · Practice Inglés",
};

export const dynamic = "force-dynamic";

const INITIAL_LEVEL = 1;

export default async function Page() {
  const [initialState, initialSentence] = await Promise.all([
    getPracticeState("ps-translate"),
    getNextSentence("ps-translate", INITIAL_LEVEL),
  ]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a1/presente-simple"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Presente simple
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Traducir frase · Presente simple
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Lee la frase en español y escríbela en inglés. Cada frase practica una forma del presente simple; al fallar te
        explicamos esa forma.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <SentenceExercise
          exercise="ps-translate"
          panels={[{ itemType: "present", title: "Formas del presente" }]}
          initialState={initialState}
          initialSentence={initialSentence}
          initialLevel={INITIAL_LEVEL}
        />
      </div>
    </main>
  );
}
