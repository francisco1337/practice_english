"use client";

import { useMemo, useState } from "react";
import type { VerbEntry } from "@/lib/practice-db";
import SpeakButton from "./SpeakButton";
import { useSpeech } from "@/lib/use-speech";

type Filter = "todos" | "regulares" | "irregulares" | "por estudiar";

/** Las cinco formas de uso diario, armadas con la conjugación del verbo. */
function tenses(verb: VerbEntry) {
  return [
    { label: "Presente", value: `I ${verb.english} · he ${verb.thirdPerson}` },
    { label: "Presente continuo", value: `I am ${verb.gerund}` },
    { label: "Pasado simple", value: `I ${verb.past}` },
    { label: "Futuro", value: `I will ${verb.english}` },
    {
      label: "Presente perfecto",
      value: `I have ${verb.participle} · he has ${verb.participle}`,
    },
  ];
}

export default function VerbList({
  verbs,
  level = "A1",
  speechEnabled,
  speechRate,
}: {
  verbs: VerbEntry[];
  level?: string;
  speechEnabled: boolean;
  speechRate: number;
}) {
  const [filter, setFilter] = useState<Filter>("todos");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [studied, setStudied] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(verbs.map((v) => [v.english, v.studied])),
  );
  const [saving, setSaving] = useState<string | null>(null);
  // En la lista la voz se puede usar aunque la pronunciación automática esté
  // apagada: aquí siempre se pide con un clic.
  const speak = useSpeech({ enabled: true, rate: speechRate });

  const irregular = verbs.filter((v) => v.irregular);
  const regular = verbs.filter((v) => !v.irregular);
  const studiedCount = verbs.filter((v) => studied[v.english]).length;

  /** La marca se guarda en la base, así que vale en cualquier dispositivo. */
  async function toggleStudied(english: string, value: boolean) {
    setStudied((prev) => ({ ...prev, [english]: value }));
    setSaving(english);
    try {
      const res = await fetch("/api/verbs/studied", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ english, studied: value, level }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
    } catch {
      // Si falla se revierte para no mentir sobre lo guardado.
      setStudied((prev) => ({ ...prev, [english]: !value }));
    } finally {
      setSaving(null);
    }
  }

  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    const match = (v: VerbEntry) => {
      if (filter === "por estudiar" && studied[v.english]) return false;
      if (!q) return true;
      return (
        v.english.includes(q) ||
        v.spanish.toLowerCase().includes(q) ||
        v.synonyms.some((sinonimo) => sinonimo.toLowerCase().includes(q)) ||
        v.past.includes(q) ||
        v.participle.includes(q) ||
        v.gerund.includes(q) ||
        v.thirdPerson.includes(q)
      );
    };

    const lists: { title: string; hint: string; items: VerbEntry[] }[] = [];
    if (filter !== "regulares") {
      lists.push({
        title: `Irregulares (${irregular.length})`,
        hint: "El pasado o el participio no se forman con -ed.",
        items: irregular.filter(match),
      });
    }
    if (filter !== "irregulares") {
      lists.push({
        title: `Regulares (${regular.length})`,
        hint: "Pasado y participio con -ed; ojo con las reglas de ortografía.",
        items: regular.filter(match),
      });
    }
    return lists;
  }, [filter, search, irregular, regular, studied]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {(
          ["todos", "regulares", "irregulares", "por estudiar"] as Filter[]
        ).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition ${
              filter === value
                ? "bg-sky-600 text-white"
                : "border border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            }`}
          >
            {value}
          </button>
        ))}
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar en español o inglés…"
          className="ml-auto w-full rounded-lg border border-slate-300 px-3 py-2 text-sm sm:w-64 dark:border-slate-700 dark:bg-slate-800"
        />
      </div>

      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
        Estudiados: <span className="font-semibold">{studiedCount}</span> de{" "}
        {verbs.length}. La marca se guarda en la base, así que la ves igual en la
        laptop y en el celular.
      </p>

      {!speechEnabled && (
        <p className="mt-3 text-xs text-slate-500">
          La pronunciación automática está apagada, pero aquí puedes escuchar
          cualquier verbo con su botón 🔊.
        </p>
      )}

      {groups.map((group) => (
        <section key={group.title} className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {group.title}
          </h2>
          <p className="mt-1 text-xs text-slate-500">{group.hint}</p>

          {group.items.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">Sin resultados.</p>
          ) : (
            <>
              {/* Encabezado de la tabla, solo en pantallas anchas */}
              <div className="mt-4 hidden gap-3 px-4 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid sm:grid-cols-[1.1fr_1.1fr_1fr_1fr_1fr_1fr]">
                <span>Verbo</span>
                <span>Español</span>
                <span>3ª persona</span>
                <span>-ing</span>
                <span>Pasado</span>
                <span>Participio</span>
              </div>

              <ul className="mt-2 space-y-2">
                {group.items.map((verb) => {
                  const isOpen = open === verb.english;
                  return (
                    <li
                      key={verb.english}
                      className={`rounded-xl border dark:border-slate-800 ${
                        studied[verb.english]
                          ? "border-emerald-300 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20"
                          : "border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3 px-4 py-3">
                        <input
                          type="checkbox"
                          checked={studied[verb.english] ?? false}
                          disabled={saving === verb.english}
                          onChange={(e) =>
                            void toggleStudied(verb.english, e.target.checked)
                          }
                          className="size-4 shrink-0 accent-emerald-600"
                          aria-label={`Marcar ${verb.english} como estudiado`}
                        />

                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : verb.english)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm sm:grid-cols-[1.1fr_1.1fr_1fr_1fr_1fr_1fr] sm:items-center">
                          <span className="font-semibold">{verb.english}</span>
                          <span className="text-slate-600 dark:text-slate-400">
                            {verb.spanish}
                          </span>
                          <span className="text-slate-600 dark:text-slate-400">
                            <span className="text-xs text-slate-500 sm:hidden">
                              3ª:{" "}
                            </span>
                            {verb.thirdPerson}
                          </span>
                          <span className="text-slate-600 dark:text-slate-400">
                            <span className="text-xs text-slate-500 sm:hidden">
                              -ing:{" "}
                            </span>
                            {verb.gerund}
                          </span>
                          <span
                            className={
                              verb.irregular
                                ? "font-semibold text-amber-700 dark:text-amber-300"
                                : "text-slate-600 dark:text-slate-400"
                            }
                          >
                            <span className="text-xs text-slate-500 sm:hidden">
                              pasado:{" "}
                            </span>
                            {verb.past}
                          </span>
                          <span
                            className={
                              verb.irregular
                                ? "font-semibold text-amber-700 dark:text-amber-300"
                                : "text-slate-600 dark:text-slate-400"
                            }
                          >
                            <span className="text-xs text-slate-500 sm:hidden">
                              participio:{" "}
                            </span>
                            {verb.participle}
                          </span>
                        </div>
                      </button>
                      </div>

                      {isOpen && (
                        <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-800">
                          <div className="flex flex-wrap items-center gap-2">
                            <SpeakButton
                              onSpeak={() =>
                                speak(
                                  `${verb.english}. ${verb.past}. ${verb.participle}.`,
                                )
                              }
                              label={`Escuchar ${verb.english}`}
                            />
                            <span className="text-xs text-slate-500">
                              base · pasado · participio
                            </span>
                          </div>

                          <dl className="mt-3 space-y-1 text-sm">
                            {tenses(verb).map((t) => (
                              <div key={t.label} className="flex flex-wrap gap-2">
                                <dt className="w-40 shrink-0 text-slate-500">
                                  {t.label}
                                </dt>
                                <dd className="flex items-center gap-2 font-medium">
                                  {t.value}
                                  <SpeakButton
                                    onSpeak={() => speak(t.value.replace(/·/g, ","))}
                                    label={`Escuchar ${t.label}`}
                                  />
                                </dd>
                              </div>
                            ))}
                          </dl>

                          {verb.synonyms.length > 0 && (
                            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                              También: {verb.synonyms.join(", ")}
                            </p>
                          )}

                          {verb.note && (
                            <p className="mt-3 rounded-lg bg-sky-50 px-3 py-2 text-sm text-sky-900 dark:bg-sky-950 dark:text-sky-100">
                              {verb.note}
                            </p>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </section>
      ))}
    </div>
  );
}
