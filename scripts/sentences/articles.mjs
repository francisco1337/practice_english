/**
 * Frases de artículos por nivel.
 * Formato: [nivel, slug de la forma, español, inglés, alternativas?]
 * Solo se usan verbos de la lista A1 (más el verbo be).
 */
export const articleSentences = [
  // Nivel 1 — a + sonido de consonante, frases cortas
  [1, "a-book", "Yo necesito un libro.", "I need a book."],
  [1, "a-car", "Ella quiere un coche.", "She wants a car."],
  [1, "a-house", "Nosotros alquilamos una casa.", "We rent a house."],
  [1, "a-table", "Él mueve una mesa.", "He moves a table."],
  [1, "a-friend", "Yo visito a un amigo.", "I visit a friend."],
  [1, "a-dog", "Ellos quieren un perro.", "They want a dog."],
  [1, "a-teacher", "Ella es maestra.", "She is a teacher."],
  [1, "a-problem", "Eso causa un problema.", "It causes a problem."],
  [1, "a-job", "Él busca un trabajo.", "He looks for a job."],
  [1, "a-city", "Nosotros visitamos una ciudad.", "We visit a city."],
  [1, "a-hotel", "Nosotros esperamos en un hotel.", "We wait at a hotel."],
  [1, "a-hospital", "Ella trabaja en un hospital.", "She works at a hospital."],

  // Nivel 2 — an + sonido de vocal y casos que engañan
  [2, "an-apple", "Yo quiero una manzana.", "I want an apple."],
  [2, "an-orange", "Ella prefiere una naranja.", "She prefers an orange."],
  [2, "an-egg", "Él cocina un huevo.", "He cooks an egg."],
  [2, "an-umbrella", "Yo necesito un paraguas.", "I need an umbrella."],
  [2, "an-idea", "Ella sugiere una idea.", "She suggests an idea."],
  [2, "an-office", "Nosotros alquilamos una oficina.", "We rent an office."],
  [2, "an-animal", "Ellos observan un animal.", "They watch an animal."],
  [2, "an-hour", "Yo espero una hora.", "I wait an hour.", ["I wait for an hour."]],
  [2, "an-answer", "Él quiere una respuesta.", "He wants an answer."],
  [2, "an-old-car", "Ella usa un coche viejo.", "She uses an old car."],
  [2, "an-honest-man", "Él es un hombre honesto.", "He is an honest man."],
  [2, "an-english-book", "Yo estudio con un libro en inglés.", "I study with an English book."],
  [2, "a-university", "Ella estudia en una universidad.", "She studies at a university."],
  [2, "a-uniform", "Nosotros usamos un uniforme.", "We use a uniform."],
  [2, "a-european", "Ellos visitan un país europeo.", "They visit a European country."],
  [2, "a-used-car", "Yo alquilo un coche usado.", "I rent a used car."],
  [2, "a-big-house", "Ellos alquilan una casa grande.", "They rent a big house."],

  // Nivel 3 — the en singular y plural
  [3, "the-book", "El libro está en la mesa.", "The book is on the table."],
  [3, "the-car", "El coche no funciona.", "The car does not work."],
  [3, "the-house", "La casa es grande.", "The house is big."],
  [3, "the-man", "El hombre espera afuera.", "The man waits outside."],
  [3, "the-water", "El agua está fría.", "The water is cold."],
  [3, "the-sun", "El sol aparece temprano.", "The sun appears early."],
  [3, "the-door", "Ella empuja la puerta.", "She pushes the door."],
  [3, "the-same-problem", "Ellos mencionan el mismo problema.", "They mention the same problem."],
  [3, "the-books", "Los libros están aquí.", "The books are here."],
  [3, "the-cars", "Los coches están afuera.", "The cars are outside."],
  [3, "the-houses", "Las casas son nuevas.", "The houses are new."],
  [3, "the-children", "Los niños juegan en el parque.", "The children play in the park."],
  [3, "the-keys", "Las llaves están en la mesa.", "The keys are on the table."],
  [3, "the-students", "Los estudiantes estudian inglés.", "The students study English."],

  // Nivel 4 — sin artículo
  [4, "no-music", "Yo prefiero la música.", "I prefer music."],
  [4, "no-water", "Los niños necesitan agua.", "Children need water."],
  [4, "no-dogs", "Los perros son leales.", "Dogs are loyal."],
  [4, "no-english", "Nosotros estudiamos inglés.", "We study English."],
  [4, "no-breakfast", "Yo preparo el desayuno.", "I prepare breakfast."],
  [4, "no-monday", "Ella regresa el lunes.", "She returns on Monday."],
  [4, "no-mexico", "Ellos visitan México.", "They visit Mexico."],
  [4, "no-love", "El amor cambia a la gente.", "Love changes people."],

  // Nivel 5 — mezcla, dos cláusulas
  [5, "a-book", "Yo necesito un libro porque el mío está en la oficina.", "I need a book because mine is at the office."],
  [5, "an-apple", "Ella quiere una manzana pero yo prefiero una naranja.", "She wants an apple but I prefer an orange."],
  [5, "the-car", "El coche no funciona y nosotros esperamos un taxi.", "The car does not work and we wait for a taxi."],
  [5, "no-music", "Ella estudia música y yo estudio inglés.", "She studies music and I study English."],
  [5, "the-children", "Los niños juegan mientras los maestros trabajan.", "The children play while the teachers work."],
  [5, "an-hour", "Nosotros esperamos una hora porque el maestro no aparece.", "We wait an hour because the teacher does not appear.", ["We wait for an hour because the teacher does not appear."]],
  [5, "a-job", "Él quiere un trabajo en una oficina.", "He wants a job at an office."],
  [5, "the-water", "El agua está fría porque el sol no aparece.", "The water is cold because the sun does not appear."],
  [5, "no-breakfast", "Yo preparo el desayuno cuando ella regresa.", "I prepare breakfast when she returns."],
  [5, "a-teacher", "Ella es maestra y trabaja en una escuela.", "She is a teacher and she works at a school."],
  [5, "the-students", "Los estudiantes estudian inglés porque quieren un trabajo mejor.", "The students study English because they want a better job."],
  [5, "no-monday", "Ellos regresan el lunes y nosotros empezamos el trabajo.", "They return on Monday and we start the work."],
];
