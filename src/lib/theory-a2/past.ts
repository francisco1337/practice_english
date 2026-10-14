import type { Theory } from "../theory";

export const theory: Theory = {
  slug: "pasado-simple",
  title: "Pasado simple",
  intro:
    "El pasado simple sirve para acciones terminadas en un momento del pasado: ayer, la semana pasada, hace dos días, en 2020. La forma del verbo es la misma para todas las personas (I, you, she, they...).",
  sections: [
    {
      title: "Afirmativo: verbos regulares e irregulares",
      blocks: [
        { kind: "text", text: "Los verbos regulares agregan -ed. Los irregulares tienen su propia forma y hay que memorizarla. No hay -s para he/she/it." },
        {
          kind: "table",
          head: ["Sujeto", "Regular (work)", "Irregular (go)"],
          rows: [
            ["I / you", "worked", "went"],
            ["he / she / it", "worked", "went"],
            ["we / they", "worked", "went"],
          ],
        },
        {
          kind: "table",
          head: ["Base", "Pasado", "Base", "Pasado"],
          rows: [
            ["be", "was / were", "make", "made"],
            ["have", "had", "take", "took"],
            ["go", "went", "get", "got"],
            ["see", "saw", "come", "came"],
            ["know", "knew", "say", "said"],
            ["pay", "paid", "write", "wrote"],
            ["find", "found", "leave", "left"],
            ["send", "sent", "break", "broke"],
            ["run", "ran", "begin", "began"],
            ["let", "let", "stand", "stood"],
          ],
        },
        { kind: "text", text: "Be es especial: was con I/he/she/it y were con you/we/they. Ej.: I was tired. They were busy." },
      ],
    },
    {
      title: "Ortografía del -ed",
      blocks: [
        {
          kind: "rules",
          items: [
            { rule: "Termina en -e: solo agrega -d.", ok: "use → used, like → liked", bad: "useed" },
            { rule: "Consonante + y: cambia y por -ied.", ok: "study → studied, try → tried", bad: "studyed" },
            { rule: "Vocal + y: solo agrega -ed.", ok: "play → played, stay → stayed", bad: "plaied" },
            { rule: "Verbo corto consonante-vocal-consonante: duplica la última letra.", ok: "stop → stopped, plan → planned", bad: "stoped" },
            { rule: "Los demás: agrega -ed.", ok: "work → worked, fix → fixed" },
          ],
        },
      ],
    },
    {
      title: "Negativo y preguntas con did",
      blocks: [
        { kind: "text", text: "En negativo y en preguntas el pasado lo lleva did. Por eso el verbo principal regresa a su forma base (sin -ed y sin forma irregular)." },
        {
          kind: "table",
          head: ["Forma", "Estructura", "Ejemplo"],
          rows: [
            ["Negativo", "sujeto + did not (didn't) + base", "I did not see your message."],
            ["Pregunta", "Did + sujeto + base?", "Did you push the changes?"],
            ["Respuesta corta (sí)", "Yes, + sujeto + did.", "Yes, I did."],
            ["Respuesta corta (no)", "No, + sujeto + did not.", "No, she didn't."],
          ],
        },
        {
          kind: "warning",
          title: "Error más común: doble pasado",
          text: "Después de did / did not el verbo NO va en pasado. Di \"She did not come\" (no \"did not came\") y \"Did you check it?\" (no \"Did you checked it?\"). En las respuestas cortas no repitas el verbo: \"Yes, I did\", no \"Yes, I saw\".",
        },
      ],
    },
    {
      title: "Preguntas con wh-",
      blocks: [
        {
          kind: "rules",
          items: [
            { rule: "Wh- + did + sujeto + verbo base.", ok: "When did the problem start?", bad: "When the problem started?" },
            { rule: "Why / Where / What también usan did.", ok: "Why did you leave early?", bad: "Why you left early?" },
            { rule: "Si who o what es el sujeto, NO uses did: el verbo va en pasado.", ok: "Who fixed the bug? What happened?", bad: "Who did fix the bug?" },
          ],
        },
      ],
    },
    {
      title: "Expresiones de tiempo y dos cláusulas",
      blocks: [
        {
          kind: "table",
          head: ["Expresión", "Ejemplo"],
          rows: [
            ["yesterday", "I worked from home yesterday."],
            ["last night / week / month", "We installed it last week."],
            ["... ago", "I sent the link five minutes ago."],
            ["in + año", "She wrote the docs in 2020."],
            ["on + día", "They fixed the bug on Monday."],
          ],
        },
        { kind: "text", text: "Con when y because, las dos partes van en pasado simple: When I saw the error, I wrote to my boss. / We restarted the server because it crashed." },
      ],
    },
    {
      title: "En el trabajo: reportes y línea de tiempo",
      blocks: [
        { kind: "text", text: "En un postmortem o en el standup se cuenta lo que pasó en pasado simple, en orden:" },
        {
          kind: "table",
          head: ["Hora", "Qué pasó"],
          rows: [
            ["02:10", "The server stopped responding."],
            ["02:15", "The alerts started. I checked the logs."],
            ["02:30", "We found the bug: a deploy broke the config."],
            ["02:45", "Luis fixed it and we restarted the server."],
            ["Standup", "Yesterday I worked on ticket 42. I did not finish the tests."],
          ],
        },
      ],
    },
  ],
};

/** Nombre legible de cada categoría de items. */
export const categoryLabels: Record<string, string> = {
  "past-regular": "Pasado regular (-ed)",
  "past-ortografia": "Ortografía del -ed",
  "past-irregular": "Verbos irregulares",
  "past-negativo": "Negativo con did not",
  "past-pregunta": "Preguntas con did y respuestas cortas",
  "past-wh": "Preguntas con wh-",
  "past-clausulas": "Oraciones con when / because",
};
