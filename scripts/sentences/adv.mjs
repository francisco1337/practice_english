/**
 * Frases con adverbios: lo que se practica es la POSICIÓN.
 * Formato: [nivel, slug, español, inglés correcto, inglés CON EL ERROR]
 */
export const advSentences = [
  // Nivel 1 — frecuencia antes del verbo
  [1, "always", "Ella siempre trabaja los lunes.", "She always works on Mondays.", "She works always on Mondays."],
  [1, "usually", "Yo normalmente estudio en la mañana.", "I usually study in the morning.", "I study usually in the morning."],
  [1, "often", "Ellos seguido visitan a sus padres.", "They often visit their parents.", "They visit often their parents."],
  [1, "always", "Él siempre ayuda en la casa.", "He always helps at home.", "He helps always at home."],
  [1, "usually", "Nosotros normalmente cocinamos juntos.", "We usually cook together.", "We cook usually together."],
  [1, "often", "Ella seguido camina al trabajo.", "She often walks to work.", "She walks often to work."],

  // Nivel 2 — sometimes, rarely, never
  [2, "sometimes", "A veces ella observa el partido.", "She sometimes watches the game.", "She watches sometimes the game."],
  [2, "rarely", "Él rara vez estudia en la noche.", "He rarely studies at night.", "He rarely doesn't study at night."],
  [2, "never", "Él nunca trabaja los domingos.", "He never works on Sundays.", "He doesn't never work on Sundays."],
  [2, "never", "Ella nunca estudia en la noche.", "She never studies at night.", "She doesn't never study at night."],
  [2, "sometimes", "A veces nosotros preparamos la cena juntos.", "Sometimes we prepare dinner together.", "We prepare sometimes dinner together."],
  [2, "rarely", "Ella rara vez usa el coche.", "She rarely uses the car.", "She uses rarely the car."],

  // Nivel 3 — posición con be y en negativos
  [3, "always", "Él siempre está cansado.", "He is always tired.", "He always is tired."],
  [3, "usually", "Ella normalmente está en la oficina.", "She is usually at the office.", "She usually is at the office."],
  [3, "never", "Yo nunca estoy tarde.", "I am never late.", "I never am late."],
  [3, "often", "Ellos seguido están ocupados.", "They are often busy.", "They often are busy."],
  [3, "always", "Ella no siempre trabaja los sábados.", "She does not always work on Saturdays.", "She always does not work on Saturdays."],
  [3, "sometimes", "A veces ella está cansada.", "She is sometimes tired.", "She sometimes is tired."],

  // Nivel 4 — adverbios de tiempo al final
  [4, "now", "Yo estoy trabajando ahora.", "I am working now.", "I now am working."],
  [4, "today", "Ella no está trabajando hoy.", "She is not working today.", "She is not today working."],
  [4, "tomorrow", "Yo estaré aquí mañana.", "I will be here tomorrow.", "I will tomorrow be here."],
  [4, "yesterday", "Yo estaba cansado ayer.", "I was tired yesterday.", "I yesterday was tired."],
  [4, "soon", "Ellos regresarán pronto.", "They will return soon.", "They soon will return."],
  [4, "now", "Ella está cocinando ahora.", "She is cooking now.", "She now is cooking."],

  // Nivel 5 — dos cláusulas
  [5, "always", "Ella siempre trabaja los lunes pero hoy no está trabajando.", "She always works on Mondays but today she is not working.", "She always works on Mondays but she is not today working."],
  [5, "never", "Él nunca cocina pero ahora está cocinando.", "He never cooks but now he is cooking.", "He cooks never but now he is cooking."],
  [5, "yesterday", "Ayer había una fiesta en la casa.", "There was a party at the house yesterday.", "There was yesterday a party at the house."],
  [5, "usually", "Normalmente ella estudia en la tarde pero hoy estudia en la mañana.", "She usually studies in the afternoon but today she studies in the morning.", "She studies usually in the afternoon but today she studies in the morning."],
  [5, "soon", "El autobús pasará pronto.", "The bus will pass soon.", "The bus soon will pass."],
  [5, "often", "Ellos seguido ayudan pero él nunca ayuda.", "They often help but he never helps.", "They help often but he helps never."],
];
