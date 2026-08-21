/**
 * Frases de tercera persona por nivel.
 * Formato: [nivel, slug, español, inglés correcto, inglés CON EL ERROR]
 * La versión con error es la que se muestra en «corregir la oración»: siempre
 * falla justo en lo que enseña la forma.
 */
export const thirdSentences = [
  // Nivel 1 — la -s simple
  [1, "s-works", "Él trabaja en un hospital.", "He works at a hospital.", "He work at a hospital."],
  [1, "s-needs", "Ella necesita un libro.", "She needs a book.", "She need a book."],
  [1, "s-uses", "Él usa mi teléfono.", "He uses my phone.", "He use my phone."],
  [1, "s-lives", "Ella vive en una ciudad grande.", "She lives in a big city.", "She live in a big city."],
  [1, "s-helps", "Él ayuda en la casa.", "He helps at home.", "He help at home."],
  [1, "s-walks", "Ella camina al parque.", "She walks to the park.", "She walk to the park."],
  [1, "s-works", "Ella trabaja los lunes.", "She works on Mondays.", "She work on Mondays."],
  [1, "s-needs", "Él necesita ayuda.", "He needs help.", "He need help."],

  // Nivel 2 — ortografía: -es, y → ies, vocal + y
  [2, "es-watches", "Él observa el partido.", "He watches the game.", "He watchs the game."],
  [2, "es-pushes", "Ella empuja la puerta.", "She pushes the door.", "She pushs the door."],
  [2, "es-touches", "Él toca la pared.", "He touches the wall.", "He touchs the wall."],
  [2, "es-passes", "El autobús pasa a las ocho.", "The bus passes at eight.", "The bus pass at eight."],
  [2, "ies-studies", "Ella estudia inglés.", "She studies English.", "She studys English."],
  [2, "ies-carries", "Él carga la caja.", "He carries the box.", "He carrys the box."],
  [2, "ies-tries", "Ella intenta otra vez.", "She tries again.", "She trys again."],
  [2, "ies-applies", "Él aplica la regla.", "He applies the rule.", "He applys the rule."],
  [2, "y-plays", "Ella juega fútbol.", "She plays soccer.", "She plaies soccer."],
  [2, "y-stays", "Él se queda en casa.", "He stays at home.", "He staies at home."],
  [2, "ies-studies", "Mi hermana estudia en una universidad.", "My sister studies at a university.", "My sister study at a university."],
  [2, "es-watches", "Ella observa a los niños.", "She watches the children.", "She watch the children."],

  // Nivel 3 — irregulares
  [3, "irr-has", "Él tiene un coche.", "He has a car.", "He have a car."],
  [3, "irr-has", "Ella tiene dos hermanos.", "She has two brothers.", "She haves two brothers."],
  [3, "irr-goes", "Ella va a la escuela todos los días.", "She goes to school every day.", "She go to school every day."],
  [3, "irr-goes", "Él va al trabajo en la mañana.", "He goes to work in the morning.", "He gos to work in the morning."],
  [3, "irr-does", "Ella hace su trabajo bien.", "She does her work well.", "She do her work well."],
  [3, "irr-does", "Él hace su trabajo temprano.", "He does his work early.", "He dos his work early."],
  [3, "irr-is", "Él es maestro.", "He is a teacher.", "He are a teacher."],
  [3, "irr-is", "Ella está cansada.", "She is tired.", "She are tired."],

  // Nivel 4 — sin -s tras does y en plural
  [4, "t-does-not", "Él no trabaja aquí.", "He does not work here.", "He does not works here."],
  [4, "t-does-not", "Ella no estudia en la mañana.", "She does not study in the morning.", "She does not studies in the morning."],
  [4, "t-does-q", "¿Trabaja él en un hospital?", "Does he work at a hospital?", "Does he works at a hospital?"],
  [4, "t-does-q", "¿Estudia ella inglés?", "Does she study English?", "Does she studies English?"],
  [4, "t-plural", "Ellos trabajan todos los días.", "They work every day.", "They works every day."],
  [4, "t-plural", "Nosotros estudiamos en la tarde.", "We study in the afternoon.", "We studies in the afternoon."],
  [4, "t-does-not", "Eso no funciona.", "It does not work.", "It does not works."],
  [4, "t-does-q", "¿Funciona el coche?", "Does the car work?", "Does the car works?"],
  [4, "t-plural", "Los niños juegan en el parque.", "The children play in the park.", "The children plays in the park."],
  [4, "t-does-not", "Ella no ayuda en la casa.", "She does not help at home.", "She does not helps at home."],

  // Nivel 5 — sujetos que engañan y dos cláusulas
  [5, "t-noun-subject", "Mi hermano trabaja en una oficina.", "My brother works at an office.", "My brother work at an office."],
  [5, "t-everybody", "Todos trabajan aquí.", "Everybody works here.", "Everybody work here."],
  [5, "t-two-subjects", "Ella y él trabajan juntos.", "She and he work together.", "She and he works together."],
  [5, "t-thing", "El coche funciona bien.", "The car works well.", "The car work well."],
  [5, "t-never", "Él nunca trabaja los domingos.", "He never works on Sundays.", "He never work on Sundays."],
  [5, "t-never", "Ella nunca estudia en la noche.", "She never studies at night.", "She never study at night."],
  [5, "t-noun-subject", "Mi hermana ayuda cuando tiene tiempo.", "My sister helps when she has time.", "My sister help when she has time."],
  [5, "t-everybody", "Todos estudian porque quieren un trabajo mejor.", "Everybody studies because they want a better job.", "Everybody study because they want a better job."],
  [5, "ies-studies", "Él estudia inglés y ella estudia música.", "He studies English and she studies music.", "He study English and she studies music."],
  [5, "t-thing", "El coche pasa y el autobús espera.", "The car passes and the bus waits.", "The car pass and the bus waits."],
  [5, "t-two-subjects", "Mi hermano y yo trabajamos los sábados.", "My brother and I work on Saturdays.", "My brother and I works on Saturdays."],
  [5, "t-does-q", "¿Por qué trabaja ella los domingos?", "Why does she work on Sundays?", "Why does she works on Sundays?"],
];
