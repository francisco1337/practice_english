import Link from "next/link";
import ExerciseMenu from "@/components/ExerciseMenu";
import { phraseExercises } from "@/lib/exercises";

export const metadata = {
  title: "Frases útiles · A1 · Practice Inglés",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/a1"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← A1
      </Link>

      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl">
        Frases útiles
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-400">
        Las frases que se dicen completas: saludos, cortesía y lo que se necesita en una clase o una conversación.
      </p>

      <ExerciseMenu exercises={phraseExercises} />
    </main>
  );
}
