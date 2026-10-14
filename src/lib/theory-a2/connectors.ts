import type { Theory } from "../theory";

export const theory: Theory = {
  slug: "conectores",
  title: "Conectores",
  intro:
    "Los conectores unen ideas: suman (and), dan opciones (or), explican causas (because), resultados (so), contrastes (but, although), propósitos (to + verbo) y el orden de los pasos (first, then, finally). Son clave para explicar en el trabajo qué pasó, por qué y qué hiciste.",
  sections: [
    {
      title: "Los conectores principales",
      blocks: [
        {
          kind: "table",
          head: ["Conector", "Para qué", "Ejemplo"],
          rows: [
            ["and / or", "sumar / dar opciones", "You can restart the service or clear the cache."],
            ["but", "contraste (entre dos ideas)", "The code works, but it is very slow."],
            ["because", "causa + oración", "I stayed home because I was sick."],
            ["because of", "causa + sustantivo", "We arrived late because of the traffic."],
            ["so", "resultado", "The build failed, so I checked the logs."],
            ["although / even though", "contraste (al inicio)", "Although I was tired, I finished the report."],
            ["to / in order to", "propósito (para qué)", "We added a cache to improve performance."],
            ["first, then, next, after that, finally", "secuencia de pasos", "First restart the service; then check the logs."],
            ["when / before / after", "tiempo", "Before merging, run the tests."],
          ],
        },
      ],
    },
    {
      title: "Causa y resultado: because, because of y so",
      blocks: [
        {
          kind: "text",
          text: "because introduce la causa; so introduce el resultado. Son la misma relación vista desde lados opuestos.",
        },
        {
          kind: "rules",
          items: [
            { rule: "because + sujeto + verbo", ok: "I could not connect because the server was down.", bad: "I could not connect because of the server was down." },
            { rule: "because of + sustantivo", ok: "The page is slow because of the size of the images.", bad: "The page is slow because the size of the images." },
            { rule: "causa, so + resultado", ok: "The build failed, so I checked the logs.", bad: "The build failed, because I checked the logs." },
          ],
        },
      ],
    },
    {
      title: "Contraste: although vs but",
      blocks: [
        {
          kind: "text",
          text: "although y even though (aunque, aun cuando) van al inicio de una de las ideas; but va en medio. Even though es más enfático y siempre son dos palabras.",
        },
        {
          kind: "rules",
          items: [
            { rule: "although + idea, idea principal", ok: "Although I was tired, I finished the report.", bad: "Although I was tired, but I finished the report." },
            { rule: "idea, but + idea", ok: "I studied a lot, but I did not pass the exam." },
            { rule: "even though = dos palabras", ok: "Even though we restarted the server, the error continued.", bad: "Even we restarted the server, the error continued." },
          ],
        },
        {
          kind: "warning",
          title: "Nunca although + but",
          text: "En español a veces decimos \"aunque..., pero...\". En inglés usa solo uno: although o but, nunca los dos en la misma oración.",
        },
      ],
    },
    {
      title: "Propósito: to + verbo",
      blocks: [
        {
          kind: "text",
          text: "Para decir para qué haces algo, usa to + verbo en forma base. In order to significa lo mismo y suena un poco más formal.",
        },
        {
          kind: "rules",
          items: [
            { rule: "to + verbo", ok: "We added a cache to improve performance.", bad: "We added a cache for improve performance." },
            { rule: "in order to + verbo", ok: "We changed the query in order to reduce the response time.", bad: "We changed the query in order for reduce the response time." },
            { rule: "sin \"for to\"", ok: "I study English to get a remote job.", bad: "I study English for to get a remote job." },
          ],
        },
        {
          kind: "warning",
          title: "\"para\" + verbo = to, no for",
          text: "El error más común de hispanohablantes: traducir \"para\" como for. Con verbo siempre es to: \"to fix the bug\", nunca \"for fix the bug\". For va con sustantivos: \"a fix for the bug\".",
        },
      ],
    },
    {
      title: "Secuencia y tiempo",
      blocks: [
        {
          kind: "text",
          text: "Para ordenar pasos usa first → then / next → after that → finally. Con before y after usa un sustantivo, verbo en -ing u oración completa, nunca el verbo solo y nunca con of.",
        },
        {
          kind: "rules",
          items: [
            { rule: "then (luego), no than", ok: "First restart the service; then check the logs.", bad: "First restart the service; than check the logs." },
            { rule: "after that, sin of", ok: "Open the terminal. After that, run the script.", bad: "Open the terminal. After of that, run the script." },
            { rule: "before + -ing", ok: "Before merging, run the tests.", bad: "Before merge, run the tests." },
            { rule: "when + oración", ok: "When I got home, I had dinner." },
          ],
        },
      ],
    },
    {
      title: "En el trabajo: explicar un problema",
      blocks: [
        {
          kind: "text",
          text: "En un reporte o en un standup, combina conectores: qué pasó (causa), qué hiciste (secuencia), para qué (propósito) y el resultado.",
        },
        {
          kind: "table",
          head: ["Parte", "Ejemplo"],
          rows: [
            ["Causa", "The API was slow because of a heavy query."],
            ["Pasos", "First I checked the logs. Then I added an index. After that, I ran the tests."],
            ["Propósito", "I added a cache to improve performance."],
            ["Resultado", "The tests passed, so we deployed to production."],
            ["Contraste", "Although the fix works, we need more tests."],
          ],
        },
      ],
    },
  ],
};

/** Nombre legible de cada categoría de items. */
export const categoryLabels: Record<string, string> = {
  "conn-basico": "Básicos (and, or)",
  "conn-contraste": "Contraste",
  "conn-causa": "Causa",
  "conn-resultado": "Resultado",
  "conn-proposito": "Propósito",
  "conn-secuencia": "Secuencia",
  "conn-tiempo": "Tiempo",
};
