/**
 * Frases con preposición.
 * Formato: [nivel, slug, español, inglés, clozeText, clozeAnswer]
 */
export const prepSentences = [
  // Nivel 1 — in / on / at de lugar
  [1, "in", "El libro está en la mochila.", "The book is in the backpack.", "The book is ___ the backpack.", "in"],
  [1, "on", "El libro está en la mesa.", "The book is on the table.", "The book is ___ the table.", "on"],
  [1, "at", "Ella está en casa.", "She is at home.", "She is ___ home.", "at"],
  [1, "in", "Los niños están en el parque.", "The children are in the park.", "The children are ___ the park.", "in"],
  [1, "on", "Las llaves están en el piso.", "The keys are on the floor.", "The keys are ___ the floor.", "on"],
  [1, "at", "Nosotros estamos en el hospital.", "We are at the hospital.", "We are ___ the hospital.", "at"],
  [1, "in", "Ella vive en México.", "She lives in Mexico.", "She lives ___ Mexico.", "in"],
  [1, "on", "La foto está en la pared.", "The picture is on the wall.", "The picture is ___ the wall.", "on"],

  // Nivel 2 — in / on / at de tiempo
  [2, "at", "La clase empieza a las ocho.", "The class starts at eight.", "The class starts ___ eight.", "at"],
  [2, "on", "Ella trabaja los lunes.", "She works on Mondays.", "She works ___ Mondays.", "on"],
  [2, "in", "La fiesta es en mayo.", "The party is in May.", "The party is ___ May.", "in"],
  [2, "in", "Yo estudio en la mañana.", "I study in the morning.", "I study ___ the morning.", "in"],
  [2, "at", "Él trabaja en la noche.", "He works at night.", "He works ___ night.", "at"],
  [2, "on", "Nosotros regresamos el sábado.", "We return on Saturday.", "We return ___ Saturday.", "on"],
  [2, "in", "Ellos van a México en 2027.", "They go to Mexico in 2027.", "They go to Mexico ___ 2027.", "in"],
  [2, "at", "Nos vemos al mediodía.", "See you at noon.", "See you ___ noon.", "at"],

  // Nivel 3 — movimiento: to / from / into
  [3, "to", "Yo voy al trabajo.", "I go to work.", "I go ___ work.", "to"],
  [3, "from", "Yo soy de México.", "I am from Mexico.", "I am ___ Mexico.", "from"],
  [3, "to", "Ellos caminan a la escuela.", "They walk to school.", "They walk ___ school.", "to"],
  [3, "from", "El autobús va de aquí a la ciudad.", "The bus goes from here to the city.", "The bus goes ___ here to the city.", "from"],
  [3, "into", "Ella pone el agua en el vaso.", "She puts the water into the glass.", "She puts the water ___ the glass.", "into"],
  [3, "into", "Ellos entran a la oficina.", "They walk into the office.", "They walk ___ the office.", "into"],
  [3, "to", "Ella va a la fiesta.", "She goes to the party.", "She goes ___ the party.", "to"],
  [3, "from", "Nosotros trabajamos de nueve a cinco.", "We work from nine to five.", "We work ___ nine to five.", "from"],

  // Nivel 4 — for, with, without, about, of, by
  [4, "for", "Este libro es para ti.", "This book is for you.", "This book is ___ you.", "for"],
  [4, "with", "Yo estudio con mi hermano.", "I study with my brother.", "I study ___ my brother.", "with"],
  [4, "without", "Yo prefiero el café sin azúcar.", "I prefer coffee without sugar.", "I prefer coffee ___ sugar.", "without"],
  [4, "about", "Es un libro sobre música.", "It is a book about music.", "It is a book ___ music.", "about"],
  [4, "of", "Yo quiero un vaso de agua.", "I want a glass of water.", "I want a glass ___ water.", "of"],
  [4, "by", "Ellos van al trabajo en coche.", "They go to work by car.", "They go to work ___ car.", "by"],
  [4, "for", "Ella estudia por dos horas.", "She studies for two hours.", "She studies ___ two hours.", "for"],
  [4, "of", "El color del coche es azul.", "The color of the car is blue.", "The color ___ the car is blue.", "of"],

  // Nivel 5 — over, under y frases más largas
  [5, "over", "La lámpara está sobre la mesa.", "The lamp is over the table.", "The lamp is ___ the table.", "over"],
  [5, "under", "El perro está debajo de la mesa.", "The dog is under the table.", "The dog is ___ the table.", "under"],
  [5, "over", "Hay más de veinte personas en la fiesta.", "There are over twenty people at the party.", "There are ___ twenty people at the party.", "over"],
  [5, "under", "Los libros están debajo de la silla.", "The books are under the chair.", "The books are ___ the chair.", "under"],
  [5, "in", "Yo trabajo en una oficina en el centro.", "I work in an office in the center.", "I work ___ an office in the center.", "in"],
  [5, "with", "Ella camina al parque con sus hijos.", "She walks to the park with her children.", "She walks to the park ___ her children.", "with"],
  [5, "about", "Nosotros hablamos sobre el trabajo.", "We talk about work.", "We talk ___ work.", "about"],
  [5, "from", "Ella regresa del trabajo a las seis.", "She returns from work at six.", "She returns ___ work at six.", "from"],
];
