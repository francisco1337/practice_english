/**
 * Formas del verbo to be: [slug, english, spanish, category, hint]
 * En español be se reparte entre ser y estar, así que el lado español menciona
 * las dos formas. El hint es la retroalimentación al equivocarse.
 */
export const tobeForms = [
  // Presente afirmativo
  ["pres-i", "I am", "yo soy, yo estoy", "presente", "Con I siempre va am, nunca is: I am. Contracción: I'm."],
  ["pres-you", "you are", "tú eres, tú estás (o ustedes son)", "presente", "you lleva are en singular y en plural: you are (you're)."],
  ["pres-he", "he is", "él es, él está", "presente", "he, she e it llevan is: he is (he's)."],
  ["pres-she", "she is", "ella es, ella está", "presente", "he, she e it llevan is: she is (she's)."],
  ["pres-it", "it is", "eso es, eso está", "presente", "it is (it's) para cosas, animales y clima. Ojo: it's = it is, its = posesivo."],
  ["pres-we", "we are", "nosotros somos, nosotros estamos", "presente", "we are (we're)."],
  ["pres-they", "they are", "ellos son, ellos están", "presente", "they are (they're)."],

  // Presente negativo
  ["neg-i", "I am not", "yo no soy, yo no estoy", "presente-neg", "El not va después de be, sin do: I am not (I'm not)."],
  ["neg-you", "you are not", "tú no eres, tú no estás", "presente-neg", "you are not (you aren't). Nunca «you do not be»."],
  ["neg-he", "he is not", "él no es, él no está", "presente-neg", "he is not (he isn't)."],
  ["neg-she", "she is not", "ella no es, ella no está", "presente-neg", "she is not (she isn't)."],
  ["neg-it", "it is not", "eso no es, eso no está", "presente-neg", "it is not (it isn't)."],
  ["neg-we", "we are not", "nosotros no somos, no estamos", "presente-neg", "we are not (we aren't)."],
  ["neg-they", "they are not", "ellos no son, no están", "presente-neg", "they are not (they aren't)."],

  // Preguntas en presente
  ["q-i", "am I?", "¿soy yo?, ¿estoy yo?", "pregunta-presente", "En preguntas be va antes del sujeto: Am I…? Sin do."],
  ["q-you", "are you?", "¿eres tú?, ¿estás tú?", "pregunta-presente", "Are you…? El verbo primero, luego el sujeto."],
  ["q-he", "is he?", "¿es él?, ¿está él?", "pregunta-presente", "Is he…? Sin does."],
  ["q-she", "is she?", "¿es ella?, ¿está ella?", "pregunta-presente", "Is she…? Sin does."],
  ["q-it", "is it?", "¿es eso?, ¿está eso?", "pregunta-presente", "Is it…? Sin does."],
  ["q-we", "are we?", "¿somos nosotros?, ¿estamos?", "pregunta-presente", "Are we…?"],
  ["q-they", "are they?", "¿son ellos?, ¿están ellos?", "pregunta-presente", "Are they…?"],

  // Pasado afirmativo
  ["past-i", "I was", "yo era, yo estaba, yo fui, yo estuve", "pasado", "I, he, she e it llevan was: I was."],
  ["past-you", "you were", "tú eras, tú estabas, tú fuiste", "pasado", "you, we y they llevan were: you were."],
  ["past-he", "he was", "él era, él estaba, él fue", "pasado", "he was."],
  ["past-she", "she was", "ella era, ella estaba, ella fue", "pasado", "she was."],
  ["past-it", "it was", "eso era, eso estaba, eso fue", "pasado", "it was."],
  ["past-we", "we were", "nosotros éramos, estábamos, fuimos", "pasado", "we were, nunca «we was»."],
  ["past-they", "they were", "ellos eran, estaban, fueron", "pasado", "they were, nunca «they was»."],

  // Pasado negativo
  ["pastneg-i", "I was not", "yo no era, no estaba, no fui", "pasado-neg", "was not = wasn't: I wasn't."],
  ["pastneg-you", "you were not", "tú no eras, no estabas", "pasado-neg", "were not = weren't: you weren't."],
  ["pastneg-he", "he was not", "él no era, no estaba", "pasado-neg", "he wasn't."],
  ["pastneg-she", "she was not", "ella no era, no estaba", "pasado-neg", "she wasn't."],
  ["pastneg-it", "it was not", "eso no era, no estaba", "pasado-neg", "it wasn't."],
  ["pastneg-we", "we were not", "nosotros no éramos, no estábamos", "pasado-neg", "we weren't."],
  ["pastneg-they", "they were not", "ellos no eran, no estaban", "pasado-neg", "they weren't."],

  // Preguntas en pasado
  ["qpast-i", "was I?", "¿era yo?, ¿estaba yo?", "pregunta-pasado", "Was/Were antes del sujeto: Was I…?"],
  ["qpast-you", "were you?", "¿eras tú?, ¿estabas tú?", "pregunta-pasado", "Were you…?"],
  ["qpast-he", "was he?", "¿era él?, ¿estaba él?", "pregunta-pasado", "Was he…?"],
  ["qpast-she", "was she?", "¿era ella?, ¿estaba ella?", "pregunta-pasado", "Was she…?"],
  ["qpast-it", "was it?", "¿era eso?, ¿estaba eso?", "pregunta-pasado", "Was it…?"],
  ["qpast-we", "were we?", "¿éramos nosotros?, ¿estábamos?", "pregunta-pasado", "Were we…?"],
  ["qpast-they", "were they?", "¿eran ellos?, ¿estaban ellos?", "pregunta-pasado", "Were they…?"],

  // Futuro
  ["fut-i", "I will be", "yo seré, yo estaré", "futuro", "will + be es igual para todas las personas: I will be (I'll be)."],
  ["fut-you", "you will be", "tú serás, tú estarás", "futuro", "you will be (you'll be)."],
  ["fut-he", "he will be", "él será, él estará", "futuro", "he will be, nunca «he wills be»."],
  ["fut-she", "she will be", "ella será, ella estará", "futuro", "she will be."],
  ["fut-it", "it will be", "eso será, eso estará", "futuro", "it will be."],
  ["fut-we", "we will be", "nosotros seremos, estaremos", "futuro", "we will be (we'll be)."],
  ["fut-they", "they will be", "ellos serán, estarán", "futuro", "they will be (they'll be)."],

  // Hay / había
  ["there-is", "there is", "hay (una cosa)", "hay", "there is + singular: there is a book."],
  ["there-are", "there are", "hay (varias cosas)", "hay", "there are + plural: there are two books."],
  ["there-was", "there was", "había (una cosa)", "hay", "there was + singular: there was a party."],
  ["there-were", "there were", "había (varias cosas)", "hay", "there were + plural: there were many people."],
];
