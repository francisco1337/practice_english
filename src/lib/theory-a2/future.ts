import type { Theory } from "../theory";

export const theory: Theory = {
  slug: "futuro",
  title: "Futuro: will y going to",
  intro:
    "En inglés hay dos formas principales de hablar del futuro: will (decisiones del momento, promesas, ofrecimientos y opiniones) y be going to (planes ya decididos y predicciones con evidencia). Las dos van seguidas del verbo en forma base.",
  sections: [
    {
      title: "will + verbo base",
      blocks: [
        { kind: "text", text: "Will es igual para todas las personas y el verbo nunca lleva -s ni 'to'. Se usa para decisiones que tomas en ese momento, promesas, ofrecimientos y predicciones según tu opinión (I think...)." },
        {
          kind: "table",
          head: ["Forma", "Estructura", "Ejemplo"],
          rows: [
            ["Afirmativa", "sujeto + will + verbo", "I will call you tomorrow."],
            ["Negativa", "sujeto + will not (won't) + verbo", "The meeting won't take long."],
            ["Pregunta", "Will + sujeto + verbo?", "Will you review my code?"],
            ["Respuesta corta", "Yes, I will. / No, I won't.", "Will you come? Yes, I will."],
          ],
        },
        {
          kind: "rules",
          items: [
            { rule: "Decisión en el momento", ok: "It is cold. I will close the window." },
            { rule: "Promesa", ok: "I promise I will fix the bug today." },
            { rule: "Ofrecimiento", ok: "That box is heavy. I will help you." },
            { rule: "Opinión sobre el futuro", ok: "I think it will work.", bad: "I think it is work." },
          ],
        },
      ],
    },
    {
      title: "be going to + verbo base",
      blocks: [
        { kind: "text", text: "Equivale a 'voy a / vas a / vamos a'. Necesita am / is / are antes de going to. Se usa para planes que ya decidiste antes y para predicciones cuando ves evidencia ahora." },
        {
          kind: "table",
          head: ["Forma", "Estructura", "Ejemplo"],
          rows: [
            ["Afirmativa", "sujeto + am/is/are + going to + verbo", "We are going to migrate the database."],
            ["Negativa", "sujeto + am/is/are + not + going to + verbo", "He is not going to come."],
            ["Pregunta", "Am/Is/Are + sujeto + going to + verbo?", "Are you going to deploy today?"],
            ["Evidencia", "lo que ves ahora → going to", "Look at those clouds. It is going to rain."],
          ],
        },
      ],
    },
    {
      title: "will vs going to",
      blocks: [
        {
          kind: "table",
          head: ["Situación", "will", "going to"],
          rows: [
            ["¿Cuándo decidiste?", "Ahora mismo", "Antes (ya es un plan)"],
            ["Ejemplo", "The phone is ringing. I will answer it.", "I am going to learn Docker this year."],
            ["Predicción", "Opinión: I think it will be hot.", "Evidencia: The build is going to fail."],
            ["Promesas y ofrecimientos", "I will help you.", "—"],
          ],
        },
        { kind: "text", text: "Preguntas wh-: palabra wh- + will + sujeto (When will it be ready?) o palabra wh- + am/is/are + sujeto + going to (What are you going to do?). Con if: la parte del if va en presente y la otra en futuro: If the tests pass, we will deploy." },
      ],
    },
    {
      title: "Errores comunes",
      blocks: [
        {
          kind: "warning",
          title: "Ni 'to' después de will ni going to sin 'be'",
          text: "En español decimos 'voy a', así que es fácil olvidar am/is/are: 'We going to migrate' ✗ → 'We are going to migrate' ✓. Y con will no va 'to' ni -s: 'I will to call' / 'She will calls' ✗ → 'I will call' / 'She will call' ✓.",
        },
        {
          kind: "rules",
          items: [
            { rule: "Negativo con will: no uses don't", ok: "I will not tell anyone.", bad: "I don't will tell anyone." },
            { rule: "Pregunta con will: no uses do", ok: "Will you review my code?", bad: "Do you will review my code?" },
            { rule: "Después de going to, verbo base", ok: "I am going to buy a laptop.", bad: "I am going to buying a laptop." },
            { rule: "Con if, presente (no will)", ok: "If it rains, I will stay home.", bad: "If it will rain, I will stay home." },
            { rule: "Pregunta wh-: el auxiliar antes del sujeto", ok: "When will the bug be fixed?", bad: "When the bug will be fixed?" },
          ],
        },
      ],
    },
    {
      title: "En el trabajo",
      blocks: [
        { kind: "text", text: "En juntas de planeación y dailies usa going to para el plan del sprint y will para compromisos y siguientes pasos que acuerdas en el momento." },
        {
          kind: "rules",
          items: [
            { rule: "Plan del equipo", ok: "We are going to migrate the database next week." },
            { rule: "Compromiso / siguiente paso", ok: "I will review your pull request tonight." },
            { rule: "Ofrecer ayuda en un ticket", ok: "I will send you the logs." },
            { rule: "Estimar o preguntar fechas", ok: "When will it be ready? — I think it will be ready on Friday." },
            { rule: "Riesgo visible", ok: "There are a lot of errors. The build is going to fail." },
          ],
        },
      ],
    },
  ],
};

/** Nombre legible de cada categoría de items. */
export const categoryLabels: Record<string, string> = {
  "fut-will": "will (afirmativo)",
  "fut-will-neg": "will not (won't)",
  "fut-will-pregunta": "Preguntas y respuestas cortas con will",
  "fut-going": "going to (planes)",
  "fut-going-neg": "going to (negativo)",
  "fut-going-pregunta": "Preguntas con going to",
  "fut-prediccion": "Predicciones (opinión o evidencia)",
  "fut-wh": "Preguntas wh- en futuro",
  "fut-if": "if + presente, will",
};
