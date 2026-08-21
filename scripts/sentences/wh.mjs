/**
 * Preguntas con palabra interrogativa.
 * Formato: [nivel, slug, español, inglés, clozeText, clozeAnswer]
 */
export const whSentences = [
  // Nivel 1 — what, who, where
  [1, "what", "¿Qué necesitas?", "What do you need?", "___ do you need?", "What"],
  [1, "what", "¿Qué estudias?", "What do you study?", "___ do you study?", "What"],
  [1, "who", "¿Quién es ella?", "Who is she?", "___ is she?", "Who"],
  [1, "who", "¿Quién trabaja aquí?", "Who works here?", "___ works here?", "Who"],
  [1, "where", "¿Dónde vives?", "Where do you live?", "___ do you live?", "Where"],
  [1, "where", "¿Dónde está el libro?", "Where is the book?", "___ is the book?", "Where"],

  // Nivel 2 — when, why, how
  [2, "when", "¿Cuándo empiezas el trabajo?", "When do you start work?", "___ do you start work?", "When"],
  [2, "when", "¿Cuándo es la fiesta?", "When is the party?", "___ is the party?", "When"],
  [2, "why", "¿Por qué estudias inglés?", "Why do you study English?", "___ do you study English?", "Why"],
  [2, "why", "¿Por qué está ella cansada?", "Why is she tired?", "___ is she tired?", "Why"],
  [2, "how", "¿Cómo estás?", "How are you?", "___ are you?", "How"],
  [2, "how", "¿Cómo vas al trabajo?", "How do you go to work?", "___ do you go to work?", "How"],

  // Nivel 3 — which, whose
  [3, "which", "¿Cuál libro quieres?", "Which book do you want?", "___ book do you want?", "Which"],
  [3, "which", "¿Cuál coche es tuyo?", "Which car is yours?", "___ car is yours?", "Which"],
  [3, "which", "¿Cuál prefieres?", "Which one do you prefer?", "___ one do you prefer?", "Which"],
  [3, "whose", "¿De quién es este coche?", "Whose car is this?", "___ car is this?", "Whose"],
  [3, "whose", "¿De quién son estas llaves?", "Whose keys are these?", "___ keys are these?", "Whose"],
  [3, "whose", "¿De quién es la mochila?", "Whose backpack is it?", "___ backpack is it?", "Whose"],

  // Nivel 4 — how much, how many, how long
  [4, "how-much", "¿Cuánta agua hay?", "How much water is there?", "___ water is there?", "How much"],
  [4, "how-much", "¿Cuánto cuesta?", "How much is it?", "___ is it?", "How much"],
  [4, "how-many", "¿Cuántos libros necesitas?", "How many books do you need?", "___ books do you need?", "How many"],
  [4, "how-many", "¿Cuántas personas hay?", "How many people are there?", "___ people are there?", "How many"],
  [4, "how-long", "¿Cuánto tiempo estudias?", "How long do you study?", "___ do you study?", "How long"],
  [4, "how-long", "¿Cuánto dura la clase?", "How long is the class?", "___ is the class?", "How long"],

  // Nivel 5 — preguntas más largas
  [5, "what", "¿Qué está haciendo ella ahora?", "What is she doing now?", "___ is she doing now?", "What"],
  [5, "why", "¿Por qué no está él trabajando hoy?", "Why is he not working today?", "___ is he not working today?", "Why"],
  [5, "who", "¿Quién está esperando afuera?", "Who is waiting outside?", "___ is waiting outside?", "Who"],
  [5, "how-many", "¿Cuántos niños están jugando en el parque?", "How many children are playing in the park?", "___ children are playing in the park?", "How many"],
  [5, "where", "¿Dónde estudia ella los sábados?", "Where does she study on Saturdays?", "___ does she study on Saturdays?", "Where"],
  [5, "how", "¿Cómo se dice esto en inglés?", "How do you say this in English?", "___ do you say this in English?", "How"],
];
