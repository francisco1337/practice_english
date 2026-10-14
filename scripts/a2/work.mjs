/**
 * Inglés de trabajo (A2): frases y vocabulario para bugs, planes y colaboración remota.
 * Las 15 primeras salen del «Banco profesional» de «Inglés A2 - Curso completo.xlsx».
 * items: [slug, english, spanish, category, hint, englishAlt?]
 */
export const items = [
  // --- Banco profesional (hoja de cálculo) ---
  ["fixed-bug-added-test", "I fixed the bug and added a test.", "Arreglé el error y agregué una prueba.", "work-bugs", "Para reportar en el standup o en el ticket que ya resolviste un bug. «Fixed» y «added» van en pasado simple."],
  ["check-the-logs", "I am going to check the logs.", "Voy a revisar los registros.", "work-bugs", "Para decir qué harás para diagnosticar un problema. «Going to» expresa un plan inmediato."],
  ["deployment-failed-migration", "The deployment failed during the migration.", "El despliegue falló durante la migración.", "work-bugs", "Para explicar en qué momento falló un despliegue. «During» = durante."],
  ["clarify-requirement", "Could you clarify this requirement?", "¿Podrías aclarar este requisito?", "work-colaboracion", "Para pedir de forma amable que te expliquen mejor un requisito antes de empezar.", ["Can you clarify this requirement?"]],
  ["when-need-production", "When do you need this in production?", "¿Cuándo necesitas esto en producción?", "work-planes", "Para preguntar la fecha de entrega real de una tarea. Fíjate en el auxiliar «do»."],
  ["which-option-use", "Which option should I use?", "¿Qué opción debería usar?", "work-planes", "Para pedir una decisión cuando hay varias soluciones. «Should» = debería."],
  ["tried-restarting-still-fails", "I tried restarting it, but it still fails.", "Intenté reiniciarlo, pero sigue fallando.", "work-bugs", "Para contar qué intentaste y que no funcionó. Después de «tried» puedes usar verbo con -ing."],
  ["worked-before-update", "It worked before the update.", "Funcionaba antes de la actualización.", "work-bugs", "Para dar historial de un bug: antes funcionaba. «Worked» es pasado simple."],
  ["send-update-afternoon", "I will send an update this afternoon.", "Enviaré una actualización esta tarde.", "work-colaboracion", "Para comprometerte a informar el avance más tarde. «Will» expresa una promesa."],
  ["issue-started-yesterday", "The issue started yesterday after the release.", "El problema comenzó ayer después del lanzamiento.", "work-bugs", "Para indicar cuándo empezó un incidente. «Issue» es la palabra común para problema en tickets."],
  ["review-my-changes", "Please review my changes.", "Por favor revisa mis cambios.", "work-colaboracion", "Para pedir una revisión de código (code review) en un pull request o en Slack.", ["Can you review my changes?"]],
  ["one-more-day-tests", "I need one more day to complete the tests.", "Necesito un día más para completar las pruebas.", "work-planes", "Para negociar tiempo de forma clara. «One more day» = un día más.", ["I need one more day to finish the tests."]],
  ["available-at-three", "I am available at three, Mexico City time.", "Estoy disponible a las tres, hora de Ciudad de México.", "work-colaboracion", "Para coordinar llamadas entre zonas horarias. Siempre indica tu zona horaria."],
  ["schedule-short-call", "Let's schedule a short call.", "Programemos una llamada corta.", "work-colaboracion", "Para proponer una llamada cuando un tema es difícil de resolver por chat. «Let's» = hagamos."],
  ["steps-reproduce-issue", "These steps reproduce the issue.", "Estos pasos reproducen el problema.", "work-bugs", "Para presentar los pasos para reproducir un bug en un ticket."],

  // --- Bugs e incidentes ---
  ["blocked-by-api-team", "I am blocked by the API team.", "Estoy bloqueado por el equipo de la API.", "work-bugs", "Para decir en el standup que no puedes avanzar porque dependes de otro equipo."],
  ["expected-result-success", "The expected result is a success message.", "El resultado esperado es un mensaje de éxito.", "work-bugs", "Parte clásica de un reporte de bug: lo que debería pasar."],
  ["actual-result-error-page", "The actual result is an error page.", "El resultado real es una página de error.", "work-bugs", "Parte clásica de un reporte de bug: lo que realmente pasa. Ojo: «actual» significa real, no actual."],
  ["works-on-my-machine", "It works on my machine.", "Funciona en mi máquina.", "work-bugs", "Frase famosa cuando algo falla en otro entorno pero no en el tuyo. Úsala con humor y luego investiga."],
  ["cannot-reproduce-issue", "I cannot reproduce the issue.", "No puedo reproducir el problema.", "work-bugs", "Para avisar que no logras ver el bug y necesitas más detalles o pasos.", ["I can not reproduce the issue."]],
  ["server-is-down", "The server is down.", "El servidor está caído.", "work-bugs", "Para reportar que un servicio no responde. «Down» = caído; «up» = funcionando."],
  ["found-root-cause", "I found the root cause.", "Encontré la causa raíz.", "work-bugs", "Para anunciar que ya sabes por qué ocurre el problema. «Found» es el pasado de «find»."],
  ["roll-back-release", "We need to roll back the release.", "Necesitamos revertir el lanzamiento.", "work-bugs", "Para proponer volver a la versión anterior cuando una entrega causa errores.", ["We have to roll back the release."]],

  // --- Planes y decisiones ---
  ["what-is-deadline", "What is the deadline?", "¿Cuál es la fecha límite?", "work-planes", "Para preguntar cuándo debe estar lista una tarea. Pregunta básica antes de estimar."],
  ["agree-with-approach", "I agree with this approach.", "Estoy de acuerdo con este enfoque.", "work-planes", "Para apoyar una propuesta en una reunión o code review. No digas «I am agree»."],
  ["option-safer-slower", "This option is safer, but slower.", "Esta opción es más segura, pero más lenta.", "work-planes", "Para comparar soluciones con comparativos: safe → safer, slow → slower."],
  ["first-option-faster", "I think the first option is faster.", "Creo que la primera opción es más rápida.", "work-planes", "Para dar tu opinión al comparar soluciones. «I think» suaviza la opinión."],
  ["my-estimate-two-days", "My estimate is two days.", "Mi estimación es de dos días.", "work-planes", "Para dar una estimación de tiempo en la planeación del sprint.", ["I estimate two days."]],
  ["next-update-documentation", "Next, I will update the documentation.", "Después, actualizaré la documentación.", "work-planes", "Para explicar el siguiente paso de tu plan. «Next» ordena los pasos."],
  ["suggest-fix-this-first", "I suggest we fix this first.", "Sugiero que arreglemos esto primero.", "work-planes", "Para proponer prioridades de forma educada.", ["I suggest that we fix this first."]],
  ["finish-by-friday", "I will finish it by Friday.", "Lo terminaré para el viernes.", "work-planes", "Para comprometer una fecha. «By Friday» = a más tardar el viernes."],

  // --- Colaboración remota ---
  ["keep-you-posted", "I will keep you posted.", "Te mantendré informado.", "work-colaboracion", "Para prometer que seguirás avisando del avance. Muy común en Slack."],
  ["could-you-repeat-that", "Sorry, could you repeat that?", "Perdón, ¿podrías repetir eso?", "work-colaboracion", "Para pedir que repitan algo en una llamada sin sonar descortés.", ["Sorry, can you repeat that?"]],
  ["check-and-get-back", "Let me check and get back to you.", "Déjame revisar y te respondo.", "work-colaboracion", "Para ganar tiempo cuando no sabes la respuesta en ese momento."],
  ["share-your-screen", "Can you share your screen?", "¿Puedes compartir tu pantalla?", "work-colaboracion", "Para pedir que muestren su pantalla durante una llamada.", ["Could you share your screen?"]],
  ["can-you-hear-me", "Can you hear me?", "¿Me escuchas?", "work-colaboracion", "Para comprobar el audio al iniciar una llamada."],
  ["question-about-ticket", "I have a question about this ticket.", "Tengo una pregunta sobre este ticket.", "work-colaboracion", "Para abrir una conversación en Slack sobre una tarea concreta."],
  ["yesterday-worked-login", "Yesterday I worked on the login page.", "Ayer trabajé en la página de inicio de sesión.", "work-colaboracion", "Estructura típica del standup: qué hiciste ayer, en pasado simple.", ["Yesterday, I worked on the login page."]],
  ["today-fix-tests", "Today I am going to fix the tests.", "Hoy voy a arreglar las pruebas.", "work-colaboracion", "Estructura típica del standup: qué harás hoy, con «going to».", ["Today, I am going to fix the tests."]],
  ["thanks-for-feedback", "Thanks for the feedback.", "Gracias por los comentarios.", "work-colaboracion", "Para agradecer comentarios en un code review o en una reunión.", ["Thank you for the feedback."]],
  ["what-time-works", "What time works for you?", "¿Qué hora te funciona?", "work-colaboracion", "Para coordinar una reunión con alguien de otra zona horaria."],

  // --- Vocabulario clave ---
  ["vocab-issue", "issue", "problema (issue)", "work-vocabulario", "Problema o tarea en un ticket. Ej.: «I opened an issue on GitHub.»"],
  ["vocab-reproduce", "reproduce", "reproducir (un error)", "work-vocabulario", "Hacer que el bug vuelva a ocurrir. Ej.: «I can reproduce it every time.»"],
  ["vocab-expected-result", "expected result", "resultado esperado", "work-vocabulario", "Lo que debería pasar. Ej.: «The expected result is a green page.»"],
  ["vocab-actual-result", "actual result", "resultado real (obtenido)", "work-vocabulario", "Lo que realmente pasa. Ej.: «The actual result is a blank page.»"],
  ["vocab-logs", "logs", "registros (logs)", "work-vocabulario", "Mensajes que guarda el sistema. Ej.: «The logs show a timeout.»"],
  ["vocab-restart", "restart", "reiniciar", "work-vocabulario", "Apagar y volver a encender un servicio. Ej.: «Please restart the server.»"],
  ["vocab-deadline", "deadline", "fecha límite", "work-vocabulario", "Fecha máxima de entrega. Ej.: «The deadline is next Monday.»"],
  ["vocab-estimate", "estimate", "estimación (de tiempo)", "work-vocabulario", "Cálculo aproximado de tiempo o esfuerzo. Ej.: «Can you give me an estimate?»"],
  ["vocab-update", "update", "actualización (de avance o de software)", "work-vocabulario", "Aviso de avance o nueva versión. Ej.: «Any update on this ticket?»"],
  ["vocab-requirement", "requirement", "requisito", "work-vocabulario", "Lo que el sistema debe cumplir. Ej.: «This requirement is not clear.»"],
  ["vocab-review", "review", "revisar (en un code review)", "work-vocabulario", "Revisar cambios de otra persona. Ej.: «Can you review my pull request?»"],
  ["vocab-available", "available", "disponible", "work-vocabulario", "Libre para hablar o trabajar. Ej.: «Are you available tomorrow?»"],
  ["vocab-schedule", "schedule", "programar (una reunión)", "work-vocabulario", "Poner algo en el calendario. Ej.: «I will schedule the meeting for Tuesday.»"],
  ["vocab-dependency", "dependency", "dependencia", "work-vocabulario", "Algo de lo que depende tu trabajo o tu código. Ej.: «This task has a dependency on the API.»"],
  ["vocab-release", "release", "lanzamiento (versión publicada)", "work-vocabulario", "Versión que se publica a los usuarios. Ej.: «The release is on Friday.»"],
  ["vocab-rollback", "rollback", "reversión (rollback)", "work-vocabulario", "Volver a la versión anterior. Ej.: «We did a rollback after the error.»", ["roll back"]],
  ["vocab-environment", "environment", "entorno (de pruebas, producción)", "work-vocabulario", "Lugar donde corre el sistema. Ej.: «It fails in the test environment.»"],
  ["vocab-pull-request", "pull request", "solicitud de cambios (pull request)", "work-vocabulario", "Petición para integrar tu código. Ej.: «I opened a pull request.»"],
];

/** Nombre legible de cada categoría. */
export const categoryLabels = {
  "work-bugs": "Bugs e incidentes",
  "work-planes": "Planes y decisiones",
  "work-colaboracion": "Colaboración remota",
  "work-vocabulario": "Vocabulario clave",
};
