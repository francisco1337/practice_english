/**
 * Frases de there is / there are por nivel.
 * Formato: [nivel, slug, español, inglés correcto, inglés CON EL ERROR]
 */
export const thereSentences = [
  // Nivel 1 — presente afirmativo
  [1, "is-sing", "Hay un libro en la mesa.", "There is a book on the table.", "There are a book on the table."],
  [1, "are-plural", "Hay tres libros en la mesa.", "There are three books on the table.", "There is three books on the table."],
  [1, "is-uncountable", "Hay agua en la botella.", "There is water in the bottle.", "There are water in the bottle."],
  [1, "is-first-noun", "Hay un libro y dos plumas en la mesa.", "There is a book and two pens on the table.", "There are a book and two pens on the table."],
  [1, "are-some", "Hay algunos niños en el parque.", "There are some children in the park.", "There is some children in the park."],
  [1, "is-a-lot-of", "Hay mucha agua en el vaso.", "There is a lot of water in the glass.", "There are a lot of water in the glass."],
  [1, "is-sing", "Hay un hospital en la ciudad.", "There is a hospital in the city.", "There are a hospital in the city."],
  [1, "are-plural", "Hay dos maestros en la oficina.", "There are two teachers at the office.", "There is two teachers at the office."],
  [1, "is-uncountable", "Hay tiempo.", "There is time.", "There are time."],
  [1, "are-some", "Hay algunas sillas aquí.", "There are some chairs here.", "There is some chairs here."],

  // Nivel 2 — negativo
  [2, "is-not", "No hay un libro en la mesa.", "There is not a book on the table.", "There are not a book on the table."],
  [2, "are-not", "No hay dos coches afuera.", "There are not two cars outside.", "There is not two cars outside."],
  [2, "is-no", "No hay agua en la botella.", "There is no water in the bottle.", "There are no water in the bottle."],
  [2, "are-not-any", "No hay libros aquí.", "There are not any books here.", "There is not any books here."],
  [2, "is-not-any", "No hay agua aquí.", "There is not any water here.", "There are not any water here."],
  [2, "is-not", "No hay un problema.", "There is not a problem.", "There are not a problem."],
  [2, "are-not", "No hay muchas personas en la fiesta.", "There are not many people at the party.", "There is not many people at the party."],
  [2, "is-no", "No hay tiempo.", "There is no time.", "There are no time."],
  [2, "are-not-any", "No hay sillas en el cuarto.", "There are not any chairs in the room.", "There are not some chairs in the room."],
  [2, "is-not-any", "No hay dinero en la mesa.", "There is not any money on the table.", "There is not some money on the table."],

  // Nivel 3 — preguntas y respuestas cortas
  [3, "is-there-q", "¿Hay un libro en la mesa?", "Is there a book on the table?", "There is a book on the table?"],
  [3, "are-there-q", "¿Hay dos coches afuera?", "Are there two cars outside?", "Is there two cars outside?"],
  [3, "is-there-any-q", "¿Hay agua en la botella?", "Is there any water in the bottle?", "Are there any water in the bottle?"],
  [3, "yes-there-is", "Sí, hay uno.", "Yes, there is.", "Yes, there are."],
  [3, "no-there-are-not", "No, no hay ninguno.", "No, there are not.", "No, there is not."],
  [3, "how-many", "¿Cuántos libros hay en la mesa?", "How many books are there on the table?", "How many books there are on the table?"],
  [3, "how-much", "¿Cuánta agua hay en el vaso?", "How much water is there in the glass?", "How many water is there in the glass?"],
  [3, "is-there-q", "¿Hay un problema?", "Is there a problem?", "There is a problem?"],
  [3, "are-there-q", "¿Hay niños en el parque?", "Are there children in the park?", "Is there children in the park?"],
  [3, "how-many", "¿Cuántas sillas hay en el cuarto?", "How many chairs are there in the room?", "How many chairs is there in the room?"],

  // Nivel 4 — pasado y futuro
  [4, "was", "Había una fiesta ayer.", "There was a party yesterday.", "There were a party yesterday."],
  [4, "were", "Había muchas personas ahí.", "There were many people there.", "There was many people there."],
  [4, "was-not", "No había un problema.", "There was not a problem.", "There were not a problem."],
  [4, "were-not", "No había muchos coches.", "There were not many cars.", "There was not many cars."],
  [4, "was-there-q", "¿Había un problema?", "Was there a problem?", "Were there a problem?"],
  [4, "will-be", "Habrá una fiesta el sábado.", "There will be a party on Saturday.", "There will is a party on Saturday."],
  [4, "will-be", "Habrá muchas personas.", "There will be many people.", "There will are many people."],
  [4, "going-to-be", "Va a haber una fiesta.", "There is going to be a party.", "There is going to have a party."],
  [4, "was", "Había agua en el piso.", "There was water on the floor.", "There were water on the floor."],
  [4, "was-there-q", "¿Había sillas en el cuarto?", "Were there chairs in the room?", "Was there chairs in the room?"],

  // Nivel 5 — errores típicos y dos cláusulas
  [5, "trap-it-has", "Hay un libro en mi mochila.", "There is a book in my backpack.", "It has a book in my backpack."],
  [5, "trap-it-has", "Hay mucha gente aquí.", "There are a lot of people here.", "Have a lot of people here."],
  [5, "trap-people", "Hay gente en la oficina.", "There are people at the office.", "There is people at the office."],
  [5, "trap-there-their", "Hay un problema con su coche.", "There is a problem with their car.", "Their is a problem with there car."],
  [5, "is-first-noun", "Hay una mesa y cuatro sillas en el cuarto.", "There is a table and four chairs in the room.", "There are a table and four chairs in the room."],
  [5, "are-plural", "Hay tres libros en la mesa pero no hay plumas.", "There are three books on the table but there are not any pens.", "There is three books on the table but there is not any pens."],
  [5, "trap-people", "¿Cuánta gente hay?", "How many people are there?", "How much people is there?"],
  [5, "will-be", "Habrá una fiesta cuando ella regrese.", "There will be a party when she returns.", "There will be a party when she return."],
  [5, "was", "Había un problema cuando nosotros empezamos.", "There was a problem when we started.", "There were a problem when we started."],
  [5, "is-uncountable", "Hay tiempo pero no hay dinero.", "There is time but there is not any money.", "There are time but there are not any money."],
];
