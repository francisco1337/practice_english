import Link from "next/link";
import { notFound } from "next/navigation";
import MatchExercise from "@/components/MatchExercise";
import SentenceExercise from "@/components/SentenceExercise";
import WriteExercise from "@/components/WriteExercise";
import { a2ExercisesOf, findA2Topic, type A2SentenceKey } from "@/lib/a2";
import { buildQuestion, itemsOf, pickItem } from "@/lib/practice";
import { getNextSentence, getPracticeState } from "@/lib/practice-db";

export const dynamic = "force-dynamic";

const INITIAL_LEVEL = 1;

async function resolve(params: PageProps<"/a2/[tema]/[ejercicio]">["params"]) {
  const { tema, ejercicio } = await params;
  const topic = findA2Topic(tema);
  const exercise = topic
    ? a2ExercisesOf(topic).find((e) => e.path === ejercicio)
    : undefined;
  return { topic, exercise };
}

export async function generateMetadata({
  params,
}: PageProps<"/a2/[tema]/[ejercicio]">) {
  const { topic, exercise } = await resolve(params);
  return {
    title: `${exercise?.name ?? "Ejercicio"} · ${topic?.title ?? "A2"} · Practice Inglés`,
  };
}

/**
 * Todos los ejercicios de los temas de A2: el tema y el ejercicio salen de la
 * ruta, y la configuración de src/lib/a2.ts decide qué componente se monta.
 */
export default async function Page({
  params,
}: PageProps<"/a2/[tema]/[ejercicio]">) {
  const { topic, exercise } = await resolve(params);
  if (!topic || !exercise) notFound();

  const initialState = await getPracticeState(exercise.key);
  const items = itemsOf(initialState, topic.itemType);

  let body: React.ReactNode;
  if (exercise.component === "match") {
    body = (
      <MatchExercise
        exercise={exercise.key}
        itemType={topic.itemType}
        panelTitle={topic.panelTitle}
        direction={exercise.direction}
        initialState={initialState}
        initialQuestion={buildQuestion(items, null, exercise.direction)}
      />
    );
  } else if (exercise.component === "write") {
    body = (
      <WriteExercise
        exercise={exercise.key}
        itemType={topic.itemType}
        panelTitle={topic.panelTitle}
        direction={exercise.direction}
        dictation={"dictation" in exercise && exercise.dictation}
        speaking={"speaking" in exercise && exercise.speaking}
        initialState={initialState}
        initialItem={pickItem(items, null)}
      />
    );
  } else {
    const key = exercise.key as A2SentenceKey;
    body = (
      <SentenceExercise
        exercise={key}
        panels={[{ itemType: topic.itemType, title: topic.panelTitle }]}
        initialState={initialState}
        initialSentence={await getNextSentence(key, INITIAL_LEVEL)}
        initialLevel={INITIAL_LEVEL}
      />
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href={`/a2/${topic.slug}`}
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← {topic.title}
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        {exercise.name} · {topic.title}
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        {exercise.description}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        {body}
      </div>
    </main>
  );
}
