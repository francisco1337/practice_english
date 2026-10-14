/**
 * Expresiones A2 de la hoja «Expresiones» de «Inglés A2 - Curso completo.xlsx».
 * Cada lista es un tema de solo elementos (relacionar, escribir, dictado y pronunciar).
 * Formato: [slug, english, spanish, category, hint, englishAlt?]
 * Los modales de esa hoja viven en el tema de gramática «Modales» (modals.mjs).
 */

/** Preguntas útiles: palabras de pregunta y arranques de pregunta. */
export const questions = [
  ["how-often", "how often", "con qué frecuencia", "quest-wh", "Se pronuncia «jáu-ófen». Ejemplo: How often do you train? → ¿Con qué frecuencia entrenas?"],
  ["how-old", "how old", "qué edad", "quest-wh", "Se pronuncia «jáu-óuld». Ejemplo: How old are you? → ¿Cuántos años tienes?"],
  ["what-time", "what time", "a qué hora", "quest-wh", "Se pronuncia «uót-táim». Ejemplo: What time is it? → ¿Qué hora es?"],
  ["what-kind-of", "what kind of", "qué tipo de", "quest-wh", "Se pronuncia «uót-káind-ov». Ejemplo: What kind of music? → ¿Qué tipo de música?"],
  ["do-you", "Do you...?", "¿(tú) haces...?", "quest-yesno", "Se pronuncia «du-yu». Ejemplo: Do you speak English? → ¿Hablas inglés?"],
  ["are-you", "Are you...?", "¿estás/eres...?", "quest-yesno", "Se pronuncia «ar-yu». Ejemplo: Are you ready? → ¿Estás listo?"],
  ["can-you", "Can you...?", "¿puedes...?", "quest-yesno", "Se pronuncia «kan-yu». Ejemplo: Can you help me? → ¿Puedes ayudarme?"],
  ["could-you", "Could you...?", "¿podrías...? (cortés)", "quest-yesno", "Se pronuncia «kud-yu». Ejemplo: Could you repeat that? → ¿Podrías repetir eso?"],
  ["is-there", "Is there...?", "¿hay...?", "quest-yesno", "Se pronuncia «is-dér». Ejemplo: Is there a bathroom? → ¿Hay un baño?"],
];

/** Preposiciones de lugar, movimiento y tiempo. */
export const prepositions = [
  ["above", "above", "por encima de", "prep2-lugar", "Se pronuncia «abóv». Ejemplo: The sky above us. → El cielo sobre nosotros."],
  ["below", "below", "por debajo de", "prep2-lugar", "Se pronuncia «bilóu». Ejemplo: Below zero. → Bajo cero."],
  ["between", "between", "entre (dos)", "prep2-lugar", "Se pronuncia «bituín». Ejemplo: Between you and me. → Entre tú y yo."],
  ["through", "through", "a través de", "prep2-movimiento", "Se pronuncia «zru». Ejemplo: Walk through the park. → Camina por el parque."],
  ["across", "across", "al otro lado", "prep2-movimiento", "Se pronuncia «akrós». Ejemplo: Walk across the street. → Cruza la calle."],
  ["behind", "behind", "detrás de", "prep2-lugar", "Se pronuncia «bijáind». Ejemplo: Behind the door. → Detrás de la puerta."],
  ["in-front-of", "in front of", "enfrente de", "prep2-lugar", "Se pronuncia «in-front-ov». Ejemplo: In front of the house. → Enfrente de la casa."],
  ["next-to", "next to", "al lado de", "prep2-lugar", "Se pronuncia «nekst-tu». Ejemplo: Next to the bank. → Al lado del banco."],
  ["near", "near", "cerca de", "prep2-lugar", "Se pronuncia «níar». Ejemplo: Near the station. → Cerca de la estación."],
  ["during", "during", "durante", "prep2-tiempo", "Se pronuncia «diúring». Ejemplo: During the movie. → Durante la película."],
  ["until", "until", "hasta", "prep2-tiempo", "Se pronuncia «antíl». Ejemplo: Wait until Monday. → Espera hasta el lunes."],
  ["since", "since", "desde", "prep2-tiempo", "Se pronuncia «sins». Ejemplo: Since 2020. → Desde 2020."],
  ["before", "before", "antes de", "prep2-tiempo", "Se pronuncia «bifór». Ejemplo: Before lunch. → Antes del almuerzo."],
  ["after", "after", "después de", "prep2-tiempo", "Se pronuncia «áfter». Ejemplo: After work. → Después del trabajo."],
];

/** Adverbios de tiempo, grado, modo y lugar. */
export const adverbs = [
  ["later", "later", "más tarde", "adv2-tiempo", "Se pronuncia «léiter». Ejemplo: Talk to you later. → Hablamos más tarde."],
  ["already", "already", "ya", "adv2-tiempo", "Se pronuncia «olrédi». Ejemplo: I already ate. → Ya comí."],
  ["yet", "yet", "todavía (neg./preg.)", "adv2-tiempo", "Se pronuncia «yet». Ejemplo: Not yet. → Todavía no."],
  ["still", "still", "todavía / aún", "adv2-tiempo", "Se pronuncia «stil». Ejemplo: I still love it. → Todavía me encanta."],
  ["just", "just", "recién / justo", "adv2-tiempo", "Se pronuncia «yast». Ejemplo: I just arrived. → Recién llegué."],
  ["very", "very", "muy", "adv2-grado", "Se pronuncia «véri». Ejemplo: Very good. → Muy bien."],
  ["really", "really", "realmente", "adv2-grado", "Se pronuncia «ríali». Ejemplo: I really like it. → Realmente me gusta."],
  ["too", "too", "demasiado", "adv2-grado", "Se pronuncia «tu». Ejemplo: It is too hot. → Hace demasiado calor."],
  ["a-lot", "a lot", "mucho", "adv2-grado", "Se pronuncia «a-lót». Ejemplo: I read a lot. → Leo mucho."],
  ["a-little", "a little", "un poco", "adv2-grado", "Se pronuncia «a-lítel». Ejemplo: I am a little tired. → Estoy un poco cansado."],
  ["well", "well", "bien", "adv2-modo", "Se pronuncia «uél». Ejemplo: She speaks well. → Ella habla bien."],
  ["fast", "fast", "rápido", "adv2-modo", "Se pronuncia «fast». Ejemplo: Do not drive fast. → No manejes rápido."],
  ["here", "here", "aquí", "adv2-lugar", "Se pronuncia «jíar». Ejemplo: Come here. → Ven aquí."],
  ["there", "there", "ahí / allá", "adv2-lugar", "Se pronuncia «déar». Ejemplo: Put it there. → Ponlo ahí."],
];

/** Adjetivos básicos para describir. */
export const adjectives = [
  ["big", "big", "grande", "adj-tamano", "Se pronuncia «big». Ejemplo: A big house. → Una casa grande."],
  ["small", "small", "pequeño", "adj-tamano", "Se pronuncia «smol». Ejemplo: A small dog. → Un perro pequeño."],
  ["good", "good", "bueno", "adj-cualidad", "Se pronuncia «gud». Ejemplo: A good idea. → Una buena idea."],
  ["bad", "bad", "malo", "adj-cualidad", "Se pronuncia «bad». Ejemplo: Bad weather. → Mal clima."],
  ["new", "new", "nuevo", "adj-cualidad", "Se pronuncia «niú». Ejemplo: A new phone. → Un teléfono nuevo."],
  ["old", "old", "viejo / antiguo", "adj-cualidad", "Se pronuncia «óuld». Ejemplo: An old car. → Un coche viejo."],
  ["young", "young", "joven", "adj-cualidad", "Se pronuncia «yang». Ejemplo: A young man. → Un hombre joven."],
  ["hot", "hot", "caliente / calor", "adj-temperatura", "Se pronuncia «jot». Ejemplo: The soup is hot. → La sopa está caliente."],
  ["cold", "cold", "frío", "adj-temperatura", "Se pronuncia «kóuld». Ejemplo: Cold water. → Agua fría."],
  ["long", "long", "largo", "adj-tamano", "Se pronuncia «long». Ejemplo: A long day. → Un día largo."],
  ["short", "short", "corto / bajo", "adj-tamano", "Se pronuncia «short». Ejemplo: A short break. → Un descanso corto."],
  ["fast", "fast", "rápido", "adj-cualidad", "Se pronuncia «fast». Ejemplo: A fast car. → Un coche rápido."],
  ["slow", "slow", "lento", "adj-cualidad", "Se pronuncia «slóu». Ejemplo: A slow computer. → Una computadora lenta."],
  ["easy", "easy", "fácil", "adj-cualidad", "Se pronuncia «ísi». Ejemplo: An easy question. → Una pregunta fácil."],
  ["difficult", "difficult", "difícil", "adj-cualidad", "Se pronuncia «dífikolt». Ejemplo: A difficult task. → Una tarea difícil."],
  ["happy", "happy", "feliz / contento", "adj-estado", "Se pronuncia «jápi». Ejemplo: I am happy. → Estoy feliz."],
  ["sad", "sad", "triste", "adj-estado", "Se pronuncia «sad». Ejemplo: She looks sad. → Ella se ve triste."],
  ["early", "early", "temprano", "adj-tiempo", "Se pronuncia «érli». Ejemplo: An early meeting. → Una reunión temprano."],
  ["late", "late", "tarde", "adj-tiempo", "Se pronuncia «léit». Ejemplo: I am late. → Llego tarde."],
  ["cheap", "cheap", "barato", "adj-cualidad", "Se pronuncia «chip». Ejemplo: A cheap hotel. → Un hotel barato."],
  ["expensive", "expensive", "caro", "adj-cualidad", "Se pronuncia «ekspénsiv». Ejemplo: An expensive car. → Un coche caro."],
  ["clean", "clean", "limpio", "adj-cualidad", "Se pronuncia «klin». Ejemplo: A clean room. → Un cuarto limpio."],
  ["dirty", "dirty", "sucio", "adj-cualidad", "Se pronuncia «dérti». Ejemplo: Dirty shoes. → Zapatos sucios."],
  ["full", "full", "lleno", "adj-cualidad", "Se pronuncia «ful». Ejemplo: The cup is full. → La taza está llena."],
];
