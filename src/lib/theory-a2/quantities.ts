import type { Theory } from "../theory";

export const theory: Theory = {
  slug: "cantidades",
  title: "Cantidades",
  intro:
    "Para decir cuánto hay de algo, en inglés primero hay que saber si el sustantivo es contable (se puede contar: 1 user, 2 users) o incontable (no se cuenta: time, money, memory). De eso depende si usas much o many, a few o a little, too much o too many.",
  sections: [
    {
      title: "Contables e incontables",
      blocks: [
        {
          kind: "text",
          text: "Los incontables no llevan plural ni \"a/an\". Ojo: varias palabras son contables en español pero incontables en inglés.",
        },
        {
          kind: "table",
          head: ["Inglés (incontable)", "Español", "Correcto", "Incorrecto"],
          rows: [
            ["information", "información / informes", "some information", "informations, an information"],
            ["advice", "consejo(s)", "some good advice", "an advice, advices"],
            ["news", "noticia(s)", "good news", "a news"],
            ["feedback", "comentarios", "some feedback", "feedbacks"],
            ["software", "software / programas", "new software", "a software, softwares"],
            ["equipment", "equipo (aparatos)", "some equipment", "equipments"],
            ["data", "datos", "enough data", "datas"],
            ["money, time, water", "dinero, tiempo, agua", "much money", "moneys, times (como cantidad)"],
          ],
        },
        {
          kind: "rules",
          items: [
            { rule: "some: oraciones afirmativas, ofrecimientos y peticiones.", ok: "I have some questions. / Would you like some coffee?", bad: "I have any questions." },
            { rule: "any: oraciones negativas y preguntas.", ok: "We don't have any tests. / Are there any errors?", bad: "We don't have some tests." },
          ],
        },
      ],
    },
    {
      title: "Cuantificadores: much, many, a lot of, a few, a little",
      blocks: [
        {
          kind: "table",
          head: ["Significado", "Contable (users, bugs)", "Incontable (time, memory)"],
          rows: [
            ["mucho / muchos", "many users", "much time"],
            ["mucho (en ambos)", "a lot of users", "a lot of time"],
            ["unos pocos / un poco de", "a few bugs", "a little memory"],
            ["¿cuánto? / ¿cuántos?", "How many tests?", "How much money?"],
            ["demasiado(s)", "too many requests", "too much memory"],
            ["suficiente(s)", "enough chairs", "enough data"],
          ],
        },
        {
          kind: "text",
          text: "Much se usa sobre todo en negativas y preguntas (I don't have much time). En afirmativas suena más natural a lot of (We have a lot of work).",
        },
      ],
    },
    {
      title: "too y enough: orden de las palabras",
      blocks: [
        {
          kind: "rules",
          items: [
            { rule: "too + adjetivo (demasiado).", ok: "The timeout is too short.", bad: "The timeout is too much short." },
            { rule: "too much / too many + sustantivo.", ok: "too much memory / too many requests", bad: "too much requests" },
            { rule: "adjetivo + enough (lo bastante).", ok: "Your computer is fast enough.", bad: "Your computer is enough fast." },
            { rule: "enough + sustantivo (suficiente), sin \"of\".", ok: "We have enough memory.", bad: "We have enough of memory." },
            { rule: "Negativo: not + adjetivo + enough / not enough + sustantivo.", ok: "It isn't big enough. / I don't have enough money." },
          ],
        },
      ],
    },
    {
      title: "Errores comunes",
      blocks: [
        {
          kind: "warning",
          title: "No traduzcas \"mucho\" siempre como much",
          text: "Con contables usa many o a lot of: many users, no \"much users\". Y \"demasiado grande\" es too big, nunca \"too much big\". Recuerda: information, advice y feedback nunca llevan -s.",
        },
      ],
    },
    {
      title: "En el trabajo",
      blocks: [
        {
          kind: "table",
          head: ["Inglés", "Español"],
          rows: [
            ["The timeout is too short; we have enough memory.", "El tiempo de espera es demasiado corto; tenemos suficiente memoria."],
            ["The server gets too many requests.", "El servidor recibe demasiadas peticiones."],
            ["How many tests failed? Only a few.", "¿Cuántas pruebas fallaron? Solo unas pocas."],
            ["We don't have much budget, but we have some time.", "No tenemos mucho presupuesto, pero tenemos algo de tiempo."],
            ["Do you have any feedback?", "¿Tienes algún comentario?"],
          ],
        },
      ],
    },
  ],
};

/** Nombre legible de cada categoría de items. */
export const categoryLabels: Record<string, string> = {
  "quant-contable": "Contables e incontables",
  "quant-some-any": "some y any",
  "quant-much-many": "much, many y a lot of",
  "quant-few-little": "a few, a little, how much y how many",
  "quant-too": "too, too much y too many",
  "quant-enough": "enough",
};
