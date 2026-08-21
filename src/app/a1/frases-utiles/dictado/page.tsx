import Link from "next/link";
import WriteExercise from "@/components/WriteExercise";
import { itemsOf, pickItem } from "@/lib/practice";
import { getPracticeState } from "@/lib/practice-db";

export const metadata = {
  title: "Dictado · Frases útiles · Practice Inglés",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const initialState = await getPracticeState("ph-dict");
  const initialItem = pickItem(itemsOf(initialState, "phrase"), null);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a1/frases-utiles"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Frases útiles
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Dictado · Frases útiles
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Se pronuncia la frase completa en inglés y tú la escribes. Se aceptan las variantes comunes.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <WriteExercise
          exercise="ph-dict"
          itemType="phrase"
          panelTitle="Frases útiles"
          direction="es-en"
          dictation
          initialState={initialState}
          initialItem={initialItem}
        />
      </div>
    </main>
  );
}
