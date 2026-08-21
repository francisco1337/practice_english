/**
 * There is / there are: [slug, english, spanish, category, hint]
 * El «hay» del español: presente, negativo, preguntas con some/any y
 * how many/how much, pasado, futuro, y los errores típicos.
 */
export const thereForms = [
  // Presente afirmativo
  ["is-sing", "there is a book", "hay un libro", "presente", "there is + sustantivo singular: there is a book."],
  ["are-plural", "there are three books", "hay tres libros", "presente", "there are + sustantivo plural: there are three books."],
  ["is-uncountable", "there is water", "hay agua", "presente", "Los incontables (water, time, money) van con there is, aunque en español suenen a mucho."],
  ["is-first-noun", "there is a book and two pens", "hay un libro y dos plumas", "presente", "El verbo concuerda con lo PRIMERO de la lista: there is a book and two pens."],
  ["are-some", "there are some books", "hay algunos libros", "presente", "some para cantidades indefinidas en afirmativo: there are some books."],
  ["is-a-lot-of", "there is a lot of water", "hay mucha agua", "presente", "a lot of vale para contables e incontables; el verbo lo decide el sustantivo."],

  // Negativo
  ["is-not", "there is not a book", "no hay un libro", "negativo", "there is not (there isn't) + singular."],
  ["are-not", "there are not two cars", "no hay dos coches", "negativo", "there are not (there aren't) + plural."],
  ["is-no", "there is no water", "no hay agua", "negativo", "there is no + sustantivo: sin not y sin artículo."],
  ["are-not-any", "there are not any books", "no hay libros", "negativo", "En negativo se usa any, no some: there aren't any books."],
  ["is-not-any", "there is not any water", "no hay agua (nada de)", "negativo", "any también con incontables: there isn't any water."],

  // Preguntas y respuestas cortas
  ["is-there-q", "is there a book?", "¿hay un libro?", "pregunta", "Se invierte el orden: Is there a book?, nunca «There is a book?»."],
  ["are-there-q", "are there two cars?", "¿hay dos coches?", "pregunta", "Are there…? para plural."],
  ["is-there-any-q", "is there any water?", "¿hay agua?", "pregunta", "En preguntas se usa any: Is there any water?"],
  ["yes-there-is", "yes, there is", "sí, hay (uno)", "pregunta", "Respuesta corta: Yes, there is. No se repite el sustantivo."],
  ["no-there-are-not", "no, there are not", "no, no hay (ninguno)", "pregunta", "No, there are not (there aren't), para plural."],
  ["how-many", "how many books are there?", "¿cuántos libros hay?", "pregunta", "How many + plural + are there? Para lo que se cuenta."],
  ["how-much", "how much water is there?", "¿cuánta agua hay?", "pregunta", "How much + incontable + is there?"],

  // Pasado
  ["was", "there was a party", "había una fiesta", "pasado", "there was + singular: había."],
  ["were", "there were many people", "había muchas personas", "pasado", "there were + plural."],
  ["was-not", "there was not a problem", "no había un problema", "pasado", "there was not (there wasn't)."],
  ["were-not", "there were not many cars", "no había muchos coches", "pasado", "there were not (there weren't)."],
  ["was-there-q", "was there a problem?", "¿había un problema?", "pasado", "Was there…? en singular, Were there…? en plural."],

  // Futuro
  ["will-be", "there will be a party", "habrá una fiesta", "futuro", "there will be, igual para singular y plural. Nunca «there will is»."],
  ["going-to-be", "there is going to be a party", "va a haber una fiesta", "futuro", "there is going to be…, no «there is going to have»."],

  // Errores típicos
  ["trap-it-has", "there is (nunca «it has»)", "hay (nunca «it has» ni «have»)", "trampa", "«Hay» se traduce there is / there are, jamás con have: There is a book, no «It has a book»."],
  ["trap-people", "there are people", "hay gente", "trampa", "people es plural en inglés: there are people y how many people, no «there is people»."],
  ["trap-there-their", "there is (no «their is»)", "hay (ojo: there, no their)", "trampa", "there = hay, their = su (de ellos), they're = they are."],
];
