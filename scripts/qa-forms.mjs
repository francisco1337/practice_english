/**
 * Preguntas y respuestas con do / does: [slug, english, spanish, category, hint]
 * La clave del tema: la respuesta corta repite el AUXILIAR, no el verbo,
 * y cuando la pregunta es con I la respuesta cambia de persona.
 */
export const qaForms = [
  // Respuesta corta afirmativa
  ["q-i-yes", "Do I …? — Yes, you do.", "pregunta con I, respuesta afirmativa", "afirmativa", "Si preguntas Do I…?, la respuesta cambia de persona: Yes, you do."],
  ["q-you-yes", "Do you …? — Yes, I do.", "pregunta con you, respuesta afirmativa", "afirmativa", "A Do you…? se contesta Yes, I do: se repite el auxiliar do, nunca el verbo."],
  ["q-he-yes", "Does he …? — Yes, he does.", "pregunta con he, respuesta afirmativa", "afirmativa", "Yes, he does. Nunca «Yes, he works» ni «Yes, he do»."],
  ["q-she-yes", "Does she …? — Yes, she does.", "pregunta con she, respuesta afirmativa", "afirmativa", "Yes, she does: el does de la pregunta se repite en la respuesta."],
  ["q-it-yes", "Does it …? — Yes, it does.", "pregunta con it, respuesta afirmativa", "afirmativa", "Yes, it does, para cosas y animales."],
  ["q-we-yes", "Do we …? — Yes, we do.", "pregunta con we, respuesta afirmativa", "afirmativa", "Yes, we do (también vale Yes, you do según quién contesta)."],
  ["q-they-yes", "Do they …? — Yes, they do.", "pregunta con they, respuesta afirmativa", "afirmativa", "Yes, they do."],

  // Respuesta corta negativa
  ["q-i-no", "Do I …? — No, you do not.", "pregunta con I, respuesta negativa", "negativa", "No, you do not (No, you don't). La persona cambia respecto a la pregunta."],
  ["q-you-no", "Do you …? — No, I do not.", "pregunta con you, respuesta negativa", "negativa", "No, I do not (No, I don't). No se repite el verbo."],
  ["q-he-no", "Does he …? — No, he does not.", "pregunta con he, respuesta negativa", "negativa", "No, he does not (No, he doesn't). Nunca «No, he doesn't works»."],
  ["q-she-no", "Does she …? — No, she does not.", "pregunta con she, respuesta negativa", "negativa", "No, she does not (No, she doesn't)."],
  ["q-it-no", "Does it …? — No, it does not.", "pregunta con it, respuesta negativa", "negativa", "No, it does not (No, it doesn't)."],
  ["q-we-no", "Do we …? — No, we do not.", "pregunta con we, respuesta negativa", "negativa", "No, we do not (No, we don't)."],
  ["q-they-no", "Do they …? — No, they do not.", "pregunta con they, respuesta negativa", "negativa", "No, they do not (No, they don't)."],

  // Preguntas con palabra interrogativa
  ["wh-what-do", "What do you …?", "pregunta con What + do", "wh", "Después de la palabra WH va el auxiliar: What do you need? El verbo va sin to."],
  ["wh-where-does", "Where does he …?", "pregunta con Where + does", "wh", "Where does he work? Con does el verbo va sin -s."],
  ["wh-when-do", "When do they …?", "pregunta con When + do", "wh", "When do they study? El auxiliar va antes del sujeto."],
  ["wh-why-does", "Why does she …?", "pregunta con Why + does", "wh", "Why does she work here? Se contesta con because…"],
];
