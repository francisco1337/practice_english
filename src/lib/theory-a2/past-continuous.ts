import type { Theory } from "../theory";

export const theory: Theory = {
  slug: "pasado-continuo",
  title: "Pasado continuo",
  intro:
    "El pasado continuo (was/were + verbo-ing) describe una acción que estaba en progreso en un momento del pasado. Equivale a 'estaba + gerundio' en español: I was working = yo estaba trabajando.",
  sections: [
    {
      title: "Forma afirmativa: was / were + verbo-ing",
      blocks: [
        {
          kind: "table",
          head: ["Sujeto", "Auxiliar", "Ejemplo"],
          rows: [
            ["I / he / she / it", "was", "I was working on a ticket."],
            ["you / we / they", "were", "They were waiting on the login page."],
          ],
        },
        {
          kind: "rules",
          items: [
            { rule: "Verbo + -ing normal", ok: "work → working, read → reading" },
            { rule: "Termina en -e muda: quita la e", ok: "write → writing, use → using", bad: "writeing, useing" },
            { rule: "Consonante-vocal-consonante corta: duplica la última", ok: "run → running, stop → stopping", bad: "runing" },
          ],
        },
      ],
    },
    {
      title: "Negativo, preguntas y respuestas cortas",
      blocks: [
        {
          kind: "table",
          head: ["Tipo", "Estructura", "Ejemplo"],
          rows: [
            ["Negativo", "was/were + not + -ing", "I wasn't listening. / They weren't using it."],
            ["Pregunta", "Was/Were + sujeto + -ing?", "Were you working from home?"],
            ["Pregunta Wh-", "Wh- + was/were + sujeto + -ing?", "What were you doing at eight?"],
            ["Respuesta corta", "Yes/No + sujeto + was/were(n't)", "Yes, he was. / No, they weren't."],
          ],
        },
        {
          kind: "text",
          text: "Aquí el auxiliar es was/were, así que nunca uses did: Was it raining? (no Did it raining?).",
        },
      ],
    },
    {
      title: "While y when: dos acciones en el pasado",
      blocks: [
        {
          kind: "rules",
          items: [
            {
              rule: "Dos acciones largas al mismo tiempo: las dos en continuo, con while",
              ok: "While I was cooking, my brother was washing the dishes.",
            },
            {
              rule: "Acción larga interrumpida por una corta: continuo + when + pasado simple",
              ok: "I was testing the app when it failed.",
              bad: "I was testing the app when it was failing.",
            },
            {
              rule: "También: while + acción larga, pasado simple para la interrupción",
              ok: "While I was writing code, the internet went down.",
            },
            {
              rule: "While va con una oración; during va con un sustantivo",
              ok: "while the build was running / during the meeting",
              bad: "during the build was running",
            },
          ],
        },
      ],
    },
    {
      title: "Continuo vs. pasado simple",
      blocks: [
        {
          kind: "table",
          head: ["Pasado continuo", "Pasado simple"],
          rows: [
            ["Acción en progreso o escena de fondo", "Acción terminada, contada o en secuencia"],
            ["The sun was shining.", "Yesterday I fixed three bugs."],
            ["I was reading the log...", "When the deploy failed, I called Luis."],
          ],
        },
        {
          kind: "text",
          text: "Verbos de estado (know, understand, want, like, need, love) no se usan en continuo: I knew the answer, She wanted a coffee.",
        },
        {
          kind: "warning",
          title: "Error típico: was/were mal concordado o sin -ing",
          text: "En español 'estaba' sirve para todo, pero en inglés cambia: they were (no they was), I was (no I were). Y no olvides el -ing: I was testing, no I was test. Tampoco digas I was knowing: usa I knew.",
        },
      ],
    },
    {
      title: "En el trabajo: contar un incidente",
      blocks: [
        {
          kind: "text",
          text: "En un postmortem o daily, el pasado continuo explica qué estabas haciendo cuando pasó el problema; el pasado simple cuenta lo que pasó y lo que hiciste.",
        },
        {
          kind: "rules",
          items: [
            { rule: "Contexto", ok: "I was doing the deploy when the server went down." },
            { rule: "Lo que pasaba a la vez", ok: "While I was checking the logs, the team was talking to the client." },
            { rule: "Lo que hiciste después", ok: "When the deploy failed, I called Luis and we rolled back." },
          ],
        },
      ],
    },
  ],
};

/** Nombre legible de cada categoría de items. */
export const categoryLabels: Record<string, string> = {
  "pastc-afirmativo": "Afirmativo (was / were + -ing)",
  "pastc-ing": "Ortografía de -ing",
  "pastc-negativo": "Negativo (wasn't / weren't)",
  "pastc-pregunta": "Preguntas y respuestas cortas",
  "pastc-while": "Dos acciones con while",
  "pastc-when": "Acción interrumpida (when)",
  "pastc-contraste": "Contraste con el pasado simple",
  "pastc-estativos": "Verbos que no van en continuo",
};
