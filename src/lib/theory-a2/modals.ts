import type { Theory } from "../theory";

export const theory: Theory = {
  slug: "modales",
  title: "Modales y peticiones",
  intro:
    "Los verbos modales (can, could, may, might, must, should, would, shall) se ponen antes de otro verbo para expresar capacidad, permiso, posibilidad, consejo u obligación. También son la base para pedir cosas con cortesía, algo clave en el trabajo remoto.",
  sections: [
    {
      title: "Las 3 reglas de oro",
      blocks: [
        {
          kind: "text",
          text: "Un modal nunca cambia: es igual para todas las personas y siempre va seguido del verbo base.",
        },
        {
          kind: "rules",
          items: [
            { rule: "Sin \"to\" después del modal.", ok: "I can swim.", bad: "I can to swim." },
            { rule: "Sin -s, ni en el modal ni en el verbo (aunque sea he/she/it).", ok: "She can code. He must sign.", bad: "She cans code. He must signs." },
            { rule: "Sin do/does: en preguntas se invierte y en negativo se agrega not.", ok: "Can you help me? I cannot come.", bad: "Do you can help me? I do not can come." },
          ],
        },
      ],
    },
    {
      title: "Tabla de modales",
      blocks: [
        {
          kind: "table",
          head: ["Modal", "Significado", "Ejemplo"],
          rows: [
            ["can / cannot", "poder / no poder (capacidad, permiso)", "I can swim. I cannot come today."],
            ["could", "pude, podía (pasado); podría (posibilidad, petición)", "I could run fast. Could you help me?"],
            ["may", "poder (permiso formal); puede que", "May I come in? The server may be slow."],
            ["might", "quizá, tal vez", "It might rain."],
            ["must / must not", "deber (obligación) / prohibido", "You must stop here. You must not smoke here."],
            ["have to / don't have to", "tener que / no es necesario", "I have to work. You don't have to come."],
            ["should / should not", "deberías / no deberías (consejo)", "You should rest. You should not smoke."],
            ["would", "-ría (condicional, deseo educado)", "I would like a coffee."],
            ["shall", "sugerencia formal (con I / we)", "Shall we start?"],
          ],
        },
      ],
    },
    {
      title: "Posibilidad: may, might, could",
      blocks: [
        {
          kind: "text",
          text: "Para algo que quizá pase usa might o may (may suena un poco más formal o seguro). Could también sirve para posibilidad: That change might / may / could break the app.",
        },
        {
          kind: "rules",
          items: [
            { rule: "Quizá + verbo en subjuntivo → might + verbo base.", ok: "It might rain.", bad: "It might rains." },
            { rule: "Negativo: might not / may not.", ok: "She might not come.", bad: "She does not might come." },
          ],
        },
      ],
    },
    {
      title: "Obligación: must, have to y la trampa de must not",
      blocks: [
        {
          kind: "text",
          text: "Must y have to significan casi lo mismo (obligación). Have to sí cambia: has to con he/she/it y usa do/does en preguntas: Does she have to work? Should es solo un consejo, más suave.",
        },
        {
          kind: "warning",
          title: "must not ≠ don't have to",
          text: "You must not come = está prohibido venir. You don't have to come = no es necesario venir (pero puedes). En afirmativo son casi iguales; en negativo significan cosas muy distintas.",
        },
      ],
    },
    {
      title: "Peticiones corteses en el trabajo",
      blocks: [
        {
          kind: "text",
          text: "De más directo a más amable: Can you…? → Could you…? → Would you…? → Would you mind + -ing? Para pedir permiso: Can I…? (informal) / May I…? (formal). Para pedir algo que quieres: I would like…",
        },
        {
          kind: "table",
          head: ["Situación", "Frase"],
          rows: [
            ["Aclarar un requisito", "Could you clarify this requirement?"],
            ["Pedir una revisión de código", "Could you review my pull request?"],
            ["Pedir que repitan algo", "Would you mind explaining that again?"],
            ["Pedir información", "Would you send me the logs, please?"],
            ["Pedir la palabra en una junta", "May I ask a question?"],
            ["Proponer empezar", "Shall we start?"],
            ["Expresar un deseo", "I would like to join the call."],
          ],
        },
        {
          kind: "warning",
          title: "Would you mind va con -ing",
          text: "Después de Would you mind el verbo lleva -ing: Would you mind checking the logs? (no \"check\"). Las demás peticiones usan el verbo base: Could you check the logs?",
        },
      ],
    },
  ],
};

/** Nombre legible de cada categoría de items. */
export const categoryLabels: Record<string, string> = {
  "modal-capacidad": "Capacidad",
  "modal-permiso": "Permiso",
  "modal-posibilidad": "Posibilidad",
  "modal-obligacion": "Obligación y prohibición",
  "modal-consejo": "Consejo",
  "modal-peticion": "Peticiones y sugerencias",
};
