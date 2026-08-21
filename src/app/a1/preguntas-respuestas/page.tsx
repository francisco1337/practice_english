import Link from "next/link";
import ExerciseMenu from "@/components/ExerciseMenu";
import { qaExercises } from "@/lib/exercises";

export const metadata = {
  title: "Preguntas y respuestas · A1 · Practice Inglés",
};

export default function QaPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/a1"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← A1
      </Link>

      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl">
        Preguntas y respuestas con do / does
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-400">
        Preguntar y contestar: <em>Does he work here? — Yes, he does.</em> La
        respuesta corta repite el auxiliar, nunca el verbo, y con <em>Do I…?</em>{" "}
        la respuesta cambia de persona.
      </p>

      <ExerciseMenu exercises={qaExercises} />
    </main>
  );
}
