/**
 * Artículos a / an / the (y el caso sin artículo).
 * Formato: [slug, english, spanish, category, hint]
 * Lo que decide entre a y an es el SONIDO de la palabra que sigue, no la letra.
 */
export const articleForms = [
  // a + sonido de consonante
  ["a-book", "a book", "un libro", "a", "a antes de sonido de consonante: a book."],
  ["a-car", "a car", "un coche", "a", "a antes de sonido de consonante: a car."],
  ["a-house", "a house", "una casa", "a", "a house: la h de house se pronuncia, así que va a."],
  ["a-table", "a table", "una mesa", "a", "a antes de sonido de consonante: a table."],
  ["a-friend", "a friend", "un amigo", "a", "a antes de sonido de consonante: a friend."],
  ["a-dog", "a dog", "un perro", "a", "a antes de sonido de consonante: a dog."],
  ["a-teacher", "a teacher", "un maestro (ser maestro)", "a", "Con profesiones el inglés sí lleva artículo: she is a teacher, aunque en español se diga «es maestra»."],
  ["a-problem", "a problem", "un problema", "a", "a antes de sonido de consonante: a problem."],
  ["a-job", "a job", "un trabajo", "a", "a antes de sonido de consonante: a job."],
  ["a-city", "a city", "una ciudad", "a", "a antes de sonido de consonante: a city."],
  ["a-hotel", "a hotel", "un hotel", "a", "En hotel la h se pronuncia: a hotel."],
  ["a-hospital", "a hospital", "un hospital", "a", "En hospital la h se pronuncia, por eso a (distinto de an hour)."],
  ["a-university", "a university", "una universidad", "a", "Manda el sonido: university suena «yuniversity», por eso a."],
  ["a-uniform", "a uniform", "un uniforme", "a", "uniform suena «yuniform», por eso a y no an."],
  ["a-european", "a European country", "un país europeo", "a", "European suena «yuropean», por eso a."],
  ["a-used-car", "a used car", "un coche usado", "a", "El artículo va por la palabra que sigue: used suena «yusd», por eso a used car."],
  ["a-big-house", "a big house", "una casa grande", "a", "El artículo mira al adjetivo, no al sustantivo: a big house."],

  // an + sonido de vocal
  ["an-apple", "an apple", "una manzana", "an", "an antes de sonido de vocal: an apple."],
  ["an-orange", "an orange", "una naranja", "an", "an antes de sonido de vocal: an orange."],
  ["an-egg", "an egg", "un huevo", "an", "an antes de sonido de vocal: an egg."],
  ["an-umbrella", "an umbrella", "un paraguas", "an", "an antes de sonido de vocal: an umbrella."],
  ["an-idea", "an idea", "una idea", "an", "an antes de sonido de vocal: an idea."],
  ["an-office", "an office", "una oficina", "an", "an antes de sonido de vocal: an office."],
  ["an-animal", "an animal", "un animal", "an", "an antes de sonido de vocal: an animal."],
  ["an-hour", "an hour", "una hora", "an", "La h de hour es muda, suena «auer», por eso an."],
  ["an-answer", "an answer", "una respuesta", "an", "an antes de sonido de vocal: an answer."],
  ["an-old-car", "an old car", "un coche viejo", "an", "El artículo va por el adjetivo: an old car, pero a car."],
  ["an-honest-man", "an honest man", "un hombre honesto", "an", "La h de honest es muda: an honest man."],
  ["an-english-book", "an English book", "un libro en inglés", "an", "English empieza con sonido de vocal: an English book."],

  // the en singular
  ["the-book", "the book", "el libro", "the", "the para algo específico que ya se sabe cuál es: the book."],
  ["the-car", "the car", "el coche", "the", "the no cambia por género ni número: the car."],
  ["the-house", "the house", "la casa", "the", "the sirve para el, la, los y las: the house."],
  ["the-man", "the man", "el hombre", "the", "the man: un hombre en concreto, no cualquiera."],
  ["the-water", "the water", "el agua (esa, específica)", "the", "the water es un agua concreta; hablando en general va sin artículo: water."],
  ["the-sun", "the sun", "el sol", "the", "Cosas únicas llevan the: the sun, the moon."],
  ["the-door", "the door", "la puerta", "the", "the door: esa puerta de la que hablas."],
  ["the-same-problem", "the same problem", "el mismo problema", "the", "same siempre va con the: the same problem."],

  // the en plural
  ["the-books", "the books", "los libros", "the-plural", "the no cambia en plural: the books."],
  ["the-cars", "the cars", "los coches", "the-plural", "the cars, igual que the car."],
  ["the-houses", "the houses", "las casas", "the-plural", "the houses: no existe «thes»."],
  ["the-children", "the children", "los niños", "the-plural", "the children: plural irregular de child."],
  ["the-keys", "the keys", "las llaves", "the-plural", "the keys: esas llaves en concreto."],
  ["the-students", "the students", "los estudiantes", "the-plural", "the students del grupo del que hablas; en general sería students."],

  // sin artículo (el español lo lleva y el inglés no)
  ["no-music", "music", "la música (en general)", "sin-articulo", "Las cosas en general van sin artículo: I prefer music, no «the music»."],
  ["no-water", "water", "agua (en general)", "sin-articulo", "Sustantivos incontables en general van sin artículo: children need water."],
  ["no-dogs", "dogs", "los perros (en general)", "sin-articulo", "Generalizaciones en plural van sin artículo: dogs are loyal."],
  ["no-english", "English", "el inglés (el idioma)", "sin-articulo", "Los idiomas van sin artículo y con mayúscula: I study English."],
  ["no-breakfast", "breakfast", "el desayuno (la comida)", "sin-articulo", "Las comidas van sin artículo: breakfast, lunch, dinner."],
  ["no-monday", "Monday", "el lunes (el día)", "sin-articulo", "Los días van sin artículo y con mayúscula: on Monday."],
  ["no-mexico", "Mexico", "México (el país)", "sin-articulo", "Los nombres de países van sin artículo (excepto casos como the United States)."],
  ["no-love", "love", "el amor (en general)", "sin-articulo", "Los conceptos abstractos van sin artículo: love, peace, time."],
];
