export type ExerciseCard = {
  href: string;
  name: string;
  description: string;
};

export type ExerciseGroup = {
  id: string;
  title: string;
  items: ExerciseCard[];
};

/** Contenido del nivel A1, agrupado por tema. */
export const a1Groups: ExerciseGroup[] = [
  {
    id: "verbos",
    title: "Verbos",
    items: [
      {
        href: "/a1/relacionar",
        name: "Relacionar",
        description:
          "Te damos el verbo en español y eliges la traducción correcta en inglés.",
      },
      {
        href: "/a1/relacionar-inverso",
        name: "Relacionar inverso",
        description:
          "Te damos el verbo en inglés y eliges qué significa en español.",
      },
      {
        href: "/a1/escribir",
        name: "Escribir",
        description: "Te damos el verbo en español y lo escribes en inglés.",
      },
      {
        href: "/a1/escribir-inverso",
        name: "Escribir inverso",
        description: "Te damos el verbo en inglés y lo escribes en español.",
      },
    ],
  },
  {
    id: "gramatica",
    title: "Gramática",
    items: [
      {
        href: "/a1/pronombres",
        name: "Pronombres",
        description:
          "Los 27 pronombres: sujeto, objeto, adjetivos y pronombres posesivos.",
      },
      {
        href: "/a1/to-be",
        name: "Verbo to be",
        description:
          "Ser y estar en inglés: presente, negativo, preguntas, pasado, futuro y there is/are.",
      },
      {
        href: "/a1/presente-simple",
        name: "Presente simple",
        description:
          "Hablar de rutinas: I work every day. La -s de tercera persona, do/does y la frecuencia.",
      },
      {
        href: "/a1/presente-continuo",
        name: "Presente continuo",
        description:
          "Lo que pasa ahora: be + verbo-ing, la ortografía del -ing y el contraste con el presente simple.",
      },
      {
        href: "/a1/there-is-are",
        name: "There is / there are",
        description:
          "El «hay» del español: singular, plural, incontables, any, how many y el pasado.",
      },
      {
        href: "/a1/tercera-persona",
        name: "Tercera persona",
        description:
          "La -s de he/she/it: ortografía, irregulares y los casos donde no va.",
      },
      {
        href: "/a1/preguntas-respuestas",
        name: "Preguntas y respuestas",
        description:
          "Preguntar con do / does y contestar: Does he work here? — Yes, he does.",
      },
      {
        href: "/a1/articulos",
        name: "Artículos a / an / the",
        description:
          "Cuándo va a, cuándo an, cuándo the y cuándo el inglés no lleva artículo.",
      },
    ],
  },
];

/** Evaluación de cierre del nivel. */
export const examGroup: ExerciseGroup = {
  id: "evaluacion",
  title: "Evaluación",
  items: [
    {
      href: "/a1/examen",
      name: "Examen de cierre A1",
      description:
        "57 reactivos en 6 secciones, con calificación por sección y reporte de errores. Se guarda y se puede retomar.",
    },
  ],
};

/** Bloque de expresiones del nivel A1. */
export const expressionGroup: ExerciseGroup = {
  id: "expresiones",
  title: "Expresiones",
  items: [
    {
      href: "/a1/preguntas",
      name: "Palabras de pregunta",
      description:
        "what, who, where, when, why, how, which, whose, how much / many / long.",
    },
    {
      href: "/a1/preposiciones",
      name: "Preposiciones",
      description:
        "in, on, at, to, from, for, with, without, about, of, by, into, over, under.",
    },
    {
      href: "/a1/adverbios",
      name: "Adverbios",
      description:
        "Frecuencia y tiempo: always, never, sometimes, now, yesterday, soon… y dónde van.",
    },
    {
      href: "/a1/frases-utiles",
      name: "Frases útiles",
      description:
        "Saludos, cortesía y frases para la clase: Nice to meet you, Could you repeat that?",
    },
  ],
};

export const whExercises: ExerciseCard[] = [
  {
    href: "/a1/preguntas/relacionar",
    name: "Relacionar",
    description: "Te damos la palabra en español y eliges cuál es en inglés.",
  },
  {
    href: "/a1/preguntas/completar",
    name: "Completar pregunta",
    description: "La pregunta viene con un hueco y tú pones la palabra que falta.",
  },
  {
    href: "/a1/preguntas/traducir",
    name: "Traducir pregunta",
    description: "Lees la pregunta en español y la escribes completa en inglés.",
  },
];

export const prepExercises: ExerciseCard[] = [
  {
    href: "/a1/preposiciones/completar",
    name: "Completar oración",
    description: "La frase viene con un hueco y tú pones la preposición correcta.",
  },
  {
    href: "/a1/preposiciones/traducir",
    name: "Traducir frase",
    description: "Lees la frase en español y la escribes en inglés.",
  },
  {
    href: "/a1/preposiciones/traducir-inverso",
    name: "Traducir frase inverso",
    description: "Lees la frase en inglés y la escribes en español.",
  },
];

export const advExercises: ExerciseCard[] = [
  {
    href: "/a1/adverbios/relacionar",
    name: "Relacionar",
    description: "Te damos el adverbio en español y eliges cuál es en inglés.",
  },
  {
    href: "/a1/adverbios/traducir",
    name: "Traducir frase",
    description: "Lees la frase en español y la escribes en inglés.",
  },
  {
    href: "/a1/adverbios/corregir",
    name: "Corregir frase",
    description:
      "Te damos la frase con el adverbio mal puesto y tú la escribes bien.",
  },
];

export const phraseExercises: ExerciseCard[] = [
  {
    href: "/a1/frases-utiles/relacionar",
    name: "Relacionar",
    description: "Te damos la frase en español y eliges cuál es en inglés.",
  },
  {
    href: "/a1/frases-utiles/relacionar-inverso",
    name: "Relacionar inverso",
    description: "Te damos la frase en inglés y eliges qué significa en español.",
  },
  {
    href: "/a1/frases-utiles/escribir",
    name: "Escribir",
    description: "Te damos la frase en español y la escribes completa en inglés.",
  },
];

export const pronounExercises: ExerciseCard[] = [
  {
    href: "/a1/pronombres/relacionar",
    name: "Relacionar",
    description:
      "Te damos el pronombre en español y eliges la forma correcta en inglés.",
  },
  {
    href: "/a1/pronombres/relacionar-inverso",
    name: "Relacionar inverso",
    description:
      "Te damos el pronombre en inglés y eliges cuál es en español.",
  },
  {
    href: "/a1/pronombres/traducir",
    name: "Traducir frase",
    description:
      "Cinco niveles de dificultad: lees la frase en español y la escribes en inglés.",
  },
];

export const tobeExercises: ExerciseCard[] = [
  {
    href: "/a1/to-be/relacionar",
    name: "Relacionar",
    description:
      "Te damos la forma en español y eliges cómo se dice en inglés.",
  },
  {
    href: "/a1/to-be/relacionar-inverso",
    name: "Relacionar inverso",
    description: "Te damos la forma en inglés y eliges qué significa en español.",
  },
  {
    href: "/a1/to-be/traducir",
    name: "Traducir frase",
    description:
      "Cinco niveles: lees la frase en español y la escribes en inglés.",
  },
];

export const articleExercises: ExerciseCard[] = [
  {
    href: "/a1/articulos/relacionar",
    name: "Relacionar",
    description:
      "Te damos la frase en español y eliges cómo va en inglés, con su artículo.",
  },
  {
    href: "/a1/articulos/relacionar-inverso",
    name: "Relacionar inverso",
    description: "Te damos la frase en inglés y eliges qué significa en español.",
  },
  {
    href: "/a1/articulos/traducir",
    name: "Traducir frase",
    description:
      "Cinco niveles: lees la frase en español y la escribes en inglés.",
  },
];

export const presentExercises: ExerciseCard[] = [
  {
    href: "/a1/presente-simple/traducir",
    name: "Traducir frase",
    description:
      "Cinco niveles: lees la frase en español y la escribes en inglés.",
  },
  {
    href: "/a1/presente-simple/traducir-inverso",
    name: "Traducir frase inverso",
    description: "Lees la frase en inglés y la escribes en español.",
  },
  {
    href: "/a1/presente-simple/completar",
    name: "Completar oración",
    description:
      "La oración viene con un hueco y tú escribes la forma que falta.",
  },
];

export const qaExercises: ExerciseCard[] = [
  {
    href: "/a1/preguntas-respuestas/traducir",
    name: "Traducir pregunta y respuesta",
    description:
      "Te damos el par completo en español y lo escribes en inglés, las dos frases.",
  },
  {
    href: "/a1/preguntas-respuestas/traducir-inverso",
    name: "Traducir inverso",
    description: "Te damos el par en inglés y lo escribes en español.",
  },
  {
    href: "/a1/preguntas-respuestas/preguntar-responder",
    name: "Preguntar y responder",
    description:
      "Te decimos qué preguntar y qué contestar; tú armas la pregunta y la respuesta en inglés.",
  },
];

export const thirdExercises: ExerciseCard[] = [
  {
    href: "/a1/tercera-persona/traducir",
    name: "Traducir frase",
    description:
      "Cinco niveles: lees la frase en español y la escribes en inglés.",
  },
  {
    href: "/a1/tercera-persona/traducir-inverso",
    name: "Traducir frase inverso",
    description: "Lees la frase en inglés y la escribes en español.",
  },
  {
    href: "/a1/tercera-persona/corregir",
    name: "Corregir frase",
    description:
      "Te damos la frase mal escrita en inglés y tú la escribes correctamente.",
  },
];

export const thereExercises: ExerciseCard[] = [
  {
    href: "/a1/there-is-are/traducir",
    name: "Traducir frase",
    description:
      "Cinco niveles: lees la frase en español y la escribes en inglés.",
  },
  {
    href: "/a1/there-is-are/traducir-inverso",
    name: "Traducir frase inverso",
    description: "Lees la frase en inglés y la escribes en español.",
  },
  {
    href: "/a1/there-is-are/corregir",
    name: "Corregir frase",
    description:
      "Te damos la frase mal escrita en inglés y tú la escribes correctamente.",
  },
];

export const contExercises: ExerciseCard[] = [
  {
    href: "/a1/presente-continuo/traducir",
    name: "Traducir frase",
    description:
      "Cinco niveles: lees la frase en español y la escribes en inglés.",
  },
  {
    href: "/a1/presente-continuo/traducir-inverso",
    name: "Traducir frase inverso",
    description: "Lees la frase en inglés y la escribes en español.",
  },
  {
    href: "/a1/presente-continuo/corregir",
    name: "Corregir frase",
    description:
      "Te damos la frase mal escrita en inglés y tú la escribes correctamente.",
  },
];
