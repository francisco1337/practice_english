import Link from "next/link";
import { notFound } from "next/navigation";
import ExerciseMenu from "@/components/ExerciseMenu";
import { findA2Topic } from "@/lib/a2";
import { a2TopicExercises } from "@/lib/exercises";

export async function generateMetadata({ params }: PageProps<"/a2/[tema]">) {
  const topic = findA2Topic((await params).tema);
  return { title: `${topic?.title ?? "A2"} · A2 · Practice Inglés` };
}

export default async function A2TopicPage({ params }: PageProps<"/a2/[tema]">) {
  const topic = findA2Topic((await params).tema);
  if (!topic) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/a2"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← A2
      </Link>

      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl">
        {topic.title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-400">
        {topic.intro}
      </p>

      <ExerciseMenu exercises={a2TopicExercises(topic)} level="A2" />
    </main>
  );
}
