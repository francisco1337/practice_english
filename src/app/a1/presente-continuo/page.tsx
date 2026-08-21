import Link from "next/link";
import ExerciseMenu from "@/components/ExerciseMenu";
import { contExercises } from "@/lib/exercises";

export const metadata = {
  title: "Presente continuo · A1 · Practice Inglés",
};

export default function PresentContinuousPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/a1"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← A1
      </Link>

      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl">
        Presente continuo
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-400">
        Lo que pasa ahora: <em>I am working now</em>. El verbo <em>be</em> + el
        verbo en <em>-ing</em>, la ortografía de ese <em>-ing</em>, el negativo y
        las preguntas sin <em>do</em>, y cuándo va continuo y cuándo presente
        simple.
      </p>

      <ExerciseMenu exercises={contExercises} />
    </main>
  );
}
