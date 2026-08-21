import Link from "next/link";
import SentenceExercise from "@/components/SentenceExercise";
import { getNextSentence, getPracticeState } from "@/lib/practice-db";

export const metadata = {
  title: "Pronunciar · Pronombres · Practice Inglés",
};

export const dynamic = "force-dynamic";

const INITIAL_LEVEL = 1;

export default async function Page() {
  const [initialState, initialSentence] = await Promise.all([
    getPracticeState("pron-speak"),
    getNextSentence("pron-speak", INITIAL_LEVEL),
  ]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a1/pronombres"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Pronombres
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Pronunciar · Pronombres
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Lee la frase en voz alta: el navegador te escucha y compara lo que dijo
        con lo que debía sonar. Puedes oír el modelo antes de intentarlo. Cinco
        niveles, los mismos del tema.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <SentenceExercise
          exercise="pron-speak"
          panels={[{ itemType: "pronoun", title: "Pronombres" }]}
          initialState={initialState}
          initialSentence={initialSentence}
          initialLevel={INITIAL_LEVEL}
        />
      </div>
    </main>
  );
}
