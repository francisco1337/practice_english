import Link from "next/link";
import ExerciseMenu from "@/components/ExerciseMenu";
import { presentExercises } from "@/lib/exercises";

export const metadata = {
  title: "Presente simple · A1 · Practice Inglés",
};

export default function PresentSimplePage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/a1"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← A1
      </Link>

      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl">
        Presente simple
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-400">
        Hablar de rutinas: <em>I work every day</em>. La -s de tercera persona y
        su ortografía, el negativo y las preguntas con <em>do / does</em>, y los
        adverbios de frecuencia.
      </p>

      <ExerciseMenu exercises={presentExercises} />
    </main>
  );
}
