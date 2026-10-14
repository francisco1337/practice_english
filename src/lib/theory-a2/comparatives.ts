import type { Theory } from "../theory";

export const theory: Theory = {
  slug: "comparativos",
  title: "Comparativos y superlativos",
  intro:
    "Para comparar dos cosas se usa el comparativo (faster than, more expensive than). Para decir que algo es el número uno de un grupo se usa el superlativo (the fastest, the most expensive). La forma depende de qué tan largo es el adjetivo.",
  sections: [
    {
      title: "La regla según el largo del adjetivo",
      blocks: [
        {
          kind: "table",
          head: ["Adjetivo", "Comparativo", "Superlativo", "Ejemplo"],
          rows: [
            ["Corto (1 sílaba): fast", "fast + -er + than", "the + -est", "This server is faster than the old one."],
            ["2 sílabas en -y: easy", "-y → -ier", "the -iest", "This tool is easier to use."],
            ["Largo (2–3+ sílabas): expensive", "more + adj + than", "the most + adj", "The cloud is more expensive than our server."],
          ],
        },
        {
          kind: "text",
          text: "\"Que\" en una comparación es than (no that ni then). El superlativo lleva the y normalmente in (lugares, grupos: in the team) u of (periodos: of the week).",
        },
      ],
    },
    {
      title: "Ortografía de -er / -est",
      blocks: [
        {
          kind: "rules",
          items: [
            { rule: "Termina en -e: solo agrega -r / -st.", ok: "safe → safer → the safest", bad: "saffer" },
            { rule: "Consonante + vocal + consonante: duplica la última consonante.", ok: "big → bigger, hot → hotter", bad: "biger, hoter" },
            { rule: "Consonante + y: la y cambia a i.", ok: "easy → easier, busy → busier", bad: "easyer, busyer" },
            { rule: "Los demás: solo -er / -est.", ok: "cheap → cheaper, slow → slower" },
          ],
        },
      ],
    },
    {
      title: "Irregulares",
      blocks: [
        {
          kind: "table",
          head: ["Adjetivo", "Comparativo", "Superlativo", "Ejemplo"],
          rows: [
            ["good (bueno)", "better", "the best", "Ana is the best programmer on the team."],
            ["bad (malo)", "worse", "the worst", "Today's bug is worse than yesterday's."],
            ["far (lejos)", "farther / further", "the farthest", "My office is farther than yours."],
            ["much / many (mucho)", "more", "the most", "I have more work than last year."],
            ["little (poco)", "less", "the least", "This program uses less memory."],
          ],
        },
        {
          kind: "warning",
          title: "Nunca \"more faster\" ni \"more better\"",
          text: "El comparativo se forma con -er o con more, nunca con los dos. Tampoco existe \"gooder\", \"badder\" ni \"the most big\". Correcto: faster, better, the biggest.",
        },
      ],
    },
    {
      title: "Igualdad y comparaciones hacia abajo",
      blocks: [
        {
          kind: "rules",
          items: [
            { rule: "as + adjetivo normal + as = tan … como.", ok: "This laptop is as fast as mine.", bad: "as fast than / as faster as" },
            { rule: "not as … as = no tan … como.", ok: "The movie is not as good as the book.", bad: "not as good than" },
            { rule: "less + adjetivo normal + than = menos … que.", ok: "The train is less expensive than the plane.", bad: "less expensiver" },
          ],
        },
      ],
    },
    {
      title: "Comparar opciones en el trabajo",
      blocks: [
        {
          kind: "text",
          text: "En reuniones técnicas comparas herramientas, servidores y servicios todo el tiempo. Frases útiles:",
        },
        {
          kind: "table",
          head: ["Idea", "En inglés"],
          rows: [
            ["más rápido / más barato", "Option A is faster and cheaper than option B."],
            ["más seguro / más confiable", "A managed database is safer and more reliable."],
            ["el mejor para nosotros", "I think PostgreSQL is the best option for us."],
            ["no tan bueno como", "The free plan is not as good as the paid one."],
            ["menos caro que", "Our own server is less expensive than the cloud."],
          ],
        },
      ],
    },
  ],
};

/** Nombre legible de cada categoría de items. */
export const categoryLabels: Record<string, string> = {
  "comp-er": "Adjetivos cortos (-er than)",
  "comp-ortografia": "Ortografía (bigger, easier, safer)",
  "comp-more": "Adjetivos largos (more … than)",
  "comp-irregular": "Irregulares (better, worse, more)",
  "comp-superlativo": "Superlativos (the -est, the most)",
  "comp-igualdad": "Igualdad (as … as, less … than)",
};
