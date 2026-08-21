import Link from "next/link";
import WriteExercise from "@/components/WriteExercise";
import { itemsOf, pickItem } from "@/lib/practice";
import { getPracticeState } from "@/lib/practice-db";

export const metadata = {
  title: "Escribir · Frases útiles · Practice Inglés",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const initialState = await getPracticeState("ph-write");
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
        Escribir · Frases útiles
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Te damos la frase en español y la escribes completa en inglés. Se aceptan las variantes comunes y no importan mayúsculas ni puntuación.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <WriteExercise
          exercise="ph-write"
          itemType="phrase"
          panelTitle="Frases útiles"
          direction="es-en"
          initialState={initialState}
          initialItem={initialItem}
        />
      </div>
    </main>
  );
}
