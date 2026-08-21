# practice_ingles

App para practicar inglés. Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + MySQL (Aiven).

## Desarrollo

```bash
npm run dev
```

Abre http://localhost:3000

## Base de datos

La conexión va en `.env.local` (ignorado por git) como `DATABASE_URL`.
Para crear las tablas y cargar el contenido (idempotente, se puede repetir):

```bash
npm run db:init
```

Tablas:

- `verbs` — 80 verbos del nivel A1 (`english`, `spanish`, `spanish_alt` con sinónimos aceptados)
- `pronouns` — 27 pronombres (`slug`, `english`, `spanish`, `category`, `hint`)
- `tobe_forms` — 53 formas del verbo to be (presente, negativo, preguntas, pasado, futuro, there is/are)
- `tobe_sentences` — 81 frases del verbo to be repartidas en 5 niveles
- `article_forms` — 51 usos de a / an / the (y el caso sin artículo)
- `article_sentences` — 63 frases de artículos repartidas en 5 niveles
- `present_forms` — 36 formas del presente simple (afirmativo, ortografía de la -s, negativo, preguntas, frecuencia)
- `present_sentences` — 60 frases de presente simple en 5 niveles, cada una con su versión para completar (`cloze_text`, `cloze_answer`)
- `qa_forms` — 18 formas de pregunta y respuesta con do / does (respuesta corta afirmativa, negativa y preguntas WH)
- `qa_pairs` — 42 pares pregunta + respuesta en 5 niveles, cada uno con su consigna en español (`cue`)
- `third_forms` — 28 reglas y formas de tercera persona (la -s, ortografía, irregulares y casos que engañan)
- `third_sentences` — 50 frases de tercera persona en 5 niveles, cada una con su versión mal escrita (`wrong_english`)
- `there_forms` — 28 usos de there is / there are (presente, negativo, preguntas, pasado, futuro y errores típicos)
- `there_sentences` — 50 frases de there is/are en 5 niveles, cada una con su versión mal escrita
- `cont_forms` — 28 usos del presente continuo (afirmativo, ortografía del -ing, negativo, preguntas, contraste y trampas)
- `cont_sentences` — 50 frases de presente continuo en 5 niveles, cada una con su versión mal escrita
- `wh_forms` / `wh_sentences` — 11 palabras de pregunta y 30 preguntas con hueco
- `prep_forms` / `prep_sentences` — 14 preposiciones y 40 frases con hueco
- `adv_forms` / `adv_sentences` — 11 adverbios y 30 frases con el adverbio mal puesto
- `phrase_items` — 14 frases útiles con sus variantes aceptadas (`english_alt`)
  El `slug` distingue palabras que se repiten (`you`/`you-obj`, `her-adj`/`her-obj`, `his-adj`/`his-pron`, `it`/`it-obj`)
- `sentences` — 400 frases (80 verbos × 5 niveles) con `spanish`, `english`, `alternatives` (JSON), y el verbo y pronombre que practica
- `progress` — progreso por `(exercise, item_type, item_id)`: `correct_count`, `wrong_count`, `mastered`, `active`
- `settings` — fila única con `mastery_target`

Ejercicios (`exercise` en `progress`):

| Clave | Ejercicio |
|---|---|
| `a1-match` | Verbos · Relacionar (español → elegir inglés) |
| `a1-match-rev` | Verbos · Relacionar inverso (inglés → elegir español) |
| `a1-write` | Verbos · Escribir (español → escribir inglés) |
| `a1-write-rev` | Verbos · Escribir inverso (inglés → escribir español) |
| `pron-match` | Pronombres · Relacionar (español → elegir inglés) |
| `pron-match-rev` | Pronombres · Relacionar inverso (inglés → elegir español) |
| `translate` | Pronombres · Traducir frase (pronombres con progreso, verbos solo como filtro) |
| `tobe-match` | Verbo to be · Relacionar (español → elegir inglés) |
| `tobe-match-rev` | Verbo to be · Relacionar inverso (inglés → elegir español) |
| `tobe-translate` | Verbo to be · Traducir frase por niveles |
| `art-match` | Artículos · Relacionar (español → elegir inglés) |
| `art-match-rev` | Artículos · Relacionar inverso (inglés → elegir español) |
| `art-translate` | Artículos · Traducir frase por niveles |
| `ps-translate` | Presente simple · Traducir frase (español → inglés) |
| `ps-translate-rev` | Presente simple · Traducir frase inverso (inglés → español) |
| `ps-cloze` | Presente simple · Completar oración |
| `qa-translate` | Preguntas y respuestas · Traducir el par (español → inglés) |
| `qa-translate-rev` | Preguntas y respuestas · Traducir inverso (inglés → español) |
| `qa-ask` | Preguntas y respuestas · Preguntar y responder (consigna → inglés) |
| `tp-translate` | Tercera persona · Traducir frase (español → inglés) |
| `tp-translate-rev` | Tercera persona · Traducir frase inverso (inglés → español) |
| `tp-fix` | Tercera persona · Corregir frase mal escrita |
| `th-translate` | There is/are · Traducir frase (español → inglés) |
| `th-translate-rev` | There is/are · Traducir frase inverso (inglés → español) |
| `th-fix` | There is/are · Corregir frase mal escrita |
| `pc-translate` | Presente continuo · Traducir frase (español → inglés) |
| `pc-translate-rev` | Presente continuo · Traducir frase inverso (inglés → español) |
| `pc-fix` | Presente continuo · Corregir frase mal escrita |
| `wh-match` / `wh-cloze` / `wh-translate` | Palabras de pregunta · Relacionar, completar y traducir |
| `prep-cloze` / `prep-translate` / `prep-translate-rev` | Preposiciones · Completar y traducir en los dos sentidos |
| `adv-match` / `adv-translate` / `adv-fix` | Adverbios · Relacionar, traducir y corregir la posición |
| `ph-match` / `ph-match-rev` / `ph-write` | Frases útiles · Relacionar en los dos sentidos y escribir |

Cada ejercicio lleva su propio contador y su propia selección, así que dominar algo en uno
no lo quita del otro. Todo el progreso vive en MySQL, no en el navegador: se puede practicar
en la laptop y seguir en el celular con el mismo avance.

## Expresiones (bloque aparte dentro de A1)

Cuatro temas de vocabulario y uso, cada uno con los ejercicios que ese tema realmente necesita:

- **Palabras de pregunta** (11): *Relacionar*, *Completar pregunta* (el hueco es la palabra WH) y
  *Traducir pregunta*. Niveles: what/who/where → when/why/how → which/whose → how much/many/long → preguntas largas.
- **Preposiciones** (14): *Completar oración*, *Traducir frase* y *Traducir inverso*. Niveles:
  in/on/at de lugar → in/on/at de tiempo → to/from/into → for/with/without/about/of/by → over/under.
  No hay ejercicio de «corregir» a propósito: cambiar una preposición por otra suele dar una frase
  válida con otro significado, y sin el español a la vista no habría manera de saber cuál se pedía.
- **Adverbios** (11): *Relacionar*, *Traducir frase* y *Corregir frase*. Lo que se practica es la
  posición: antes del verbo, después de *be*, o al final. Niveles: frecuencia → sometimes/rarely/never
  → posición con be y negativos → tiempo al final → dos cláusulas.
- **Frases útiles** (14): *Relacionar*, *Relacionar inverso* y *Escribir*. Al escribir se aceptan
  variantes (`You're welcome`, `Thanks a lot`, `Could you repeat that, please?`).

## Examen de cierre de A1

`/a1/examen` — 57 reactivos en 6 secciones que corresponden a los bloques del nivel:

| # | Sección | Tema | Contexto |
|---|---|---|---|
| 1 | Construir oraciones básicas | Pronombres y to be | Presentarte |
| 2 | Preguntar y negar | Do / does | Rutinas |
| 3 | Describir hábitos | Presente simple | Trabajo y vida diaria |
| 4 | Hablar de acciones actuales | Presente continuo | Qué haces ahora |
| 5 | Ubicar personas y objetos | There is/are y preposiciones | Casa y oficina |
| 6 | Consolidar A1 | Repaso general | Conversación de 8 minutos |

Cinco formatos: opción múltiple, escribir en inglés, escribir en español, completar el hueco y
corregir una oración mal escrita. La sección 6 termina con cinco turnos de una conversación.

- **Sin retroalimentación durante el examen.** Al calificar se muestra el porcentaje global, el de
  cada sección, y la lista de errores con la respuesta correcta y la regla que se falló.
- **Para aprobar se piden 80% global y 70% en cada sección**, así que no se puede compensar una
  sección floja con las demás.
- Cada respuesta se guarda en `exam_answers`, así que se puede cerrar y continuar en otro
  dispositivo; los intentos terminados quedan en `exam_attempts` como historial.

Tablas: `exam_questions` (banco, identificado por sección y posición), `exam_attempts`, `exam_answers`.

## Reglas del progreso

- Cada acierto suma 1 al contador del verbo o pronombre.
- Al llegar a `mastery_target` (configurable en el panel, 1–50) queda **dominado** y deja de preguntarse.
- **Un error reinicia ese contador a 0** y le quita el estado de dominado.
- El umbral es global: se cambia desde cualquier panel y aplica a todos los ejercicios.
- Todo se puede activar/desactivar para elegir qué practicar, y reiniciar (uno o todos).

## Secciones

Todo el contenido vive dentro del nivel (`/a1`), agrupado por tema: **Verbos** y **Gramática**.

- **A1 → Verbos**: cuatro ejercicios con los 80 verbos —
  *Relacionar* (español → elegir inglés), *Relacionar inverso* (inglés → elegir español),
  *Escribir* (español → escribir inglés) y *Escribir inverso* (inglés → escribir español).
  Al escribir se ignoran mayúsculas, acentos y el «to» del infinitivo, y en español se
  aceptan los sinónimos de `verbs.spanish_alt` (por ejemplo `add` → agregar, añadir o sumar).
- **A1 → Gramática → Pronombres → *Relacionar* y *Relacionar inverso***: en los dos sentidos con los
  27 pronombres; al fallar se explica el uso del pronombre. Con los que se escriben igual
  (`you`, `her`, `his`, `it`) nunca se ofrecen dos opciones válidas en la misma pregunta.
- **A1 → Gramática → Pronombres → *Traducir frase***: 5 niveles, se lee la frase en español y se escribe en inglés.
  - Nivel 1: presente simple, frases cortas (pronombres de sujeto)
  - Nivel 2: negativo e interrogativo (pronombres de objeto)
  - Nivel 3: pasado simple (adjetivos posesivos)
  - Nivel 4: futuro y presente continuo (pronombres posesivos)
  - Nivel 5: dos cláusulas con conectores (todos los pronombres)
  - Las frases solo usan verbos de la lista A1 (más el verbo *be*). Se filtra por pronombre y por verbo.
  - Al fallar: se marca la respuesta correcta resaltando lo que faltó y se explica el pronombre de la frase.
- **A1 → Gramática → Verbo to be**: las 53 formas (ser y estar en inglés), con *Relacionar*,
  *Relacionar inverso* y *Traducir frase* en 5 niveles:
  - Nivel 1: presente afirmativo (am, is, are)
  - Nivel 2: presente negativo y preguntas
  - Nivel 3: pasado (was, were), afirmativo y negativo
  - Nivel 4: preguntas en pasado, futuro con *will be* y *there is / there are*
  - Nivel 5: dos cláusulas y presente continuo
  - Se filtra por forma, y al fallar se explica la forma de la frase.
- **A1 → Gramática → Artículos a / an / the**: 51 usos, con *Relacionar*, *Relacionar inverso*
  y *Traducir frase* en 5 niveles:
  - Nivel 1: `a` + sonido de consonante
  - Nivel 2: `an` + sonido de vocal y los casos que engañan (a university, an hour, a used car)
  - Nivel 3: `the` en singular y plural
  - Nivel 4: sin artículo, donde el español sí lo lleva (music, English, breakfast, Monday)
  - Nivel 5: dos cláusulas mezclando los cuatro casos
  - Lo que decide entre `a` y `an` es el sonido, no la letra; cada uso trae su explicación.
- **A1 → Gramática → Presente simple**: rutinas (*I work every day*), con *Traducir frase*,
  *Traducir frase inverso* y *Completar oración*, los tres en 5 niveles:
  - Nivel 1: afirmativo, rutinas cortas
  - Nivel 2: tercera persona, la -s y su ortografía (studies, watches, passes)
  - Nivel 3: negativo con do / does
  - Nivel 4: preguntas con do / does
  - Nivel 5: adverbios de frecuencia y dos cláusulas
  - Las 60 frases sirven para los tres ejercicios: la misma frase se traduce en un sentido,
    en el otro, o se completa el hueco (`He ___ (not / work) here.`).
- **A1 → Gramática → Presente continuo**: lo que pasa ahora, con *Traducir frase*,
  *Traducir frase inverso* y *Corregir frase*, en 5 niveles:
  - Nivel 1: afirmativo con am / is / are + verbo-ing y marcadores (now, right now)
  - Nivel 2: ortografía del -ing (using, stopping, planning, dying, studying, carrying)
  - Nivel 3: negativo, preguntas sin do/does y respuestas cortas
  - Nivel 4: continuo contra presente simple (ahora vs rutina, verbos de estado)
  - Nivel 5: errores típicos (quitar el be, usar do/does, olvidar el -ing) y dos cláusulas
- **A1 → Gramática → There is / there are**: el «hay» del español, con *Traducir frase*,
  *Traducir frase inverso* y *Corregir frase*, en 5 niveles:
  - Nivel 1: presente, singular, plural e incontables (there is water)
  - Nivel 2: negativo con isn't / aren't / no / any
  - Nivel 3: preguntas, respuestas cortas y how many / how much
  - Nivel 4: pasado (there was / were) y futuro (there will be, there is going to be)
  - Nivel 5: errores típicos (there is people, it has a book, their/there) y dos cláusulas
- **A1 → Gramática → Tercera persona**: la -s de he/she/it, con *Traducir frase*,
  *Traducir frase inverso* y *Corregir frase*, en 5 niveles:
  - Nivel 1: la -s simple (works, needs, lives)
  - Nivel 2: ortografía (watches, studies, carries, plays)
  - Nivel 3: irregulares (has, goes, does, is)
  - Nivel 4: sin -s tras *does* y en plural
  - Nivel 5: sujetos que engañan (my brother, everybody, she and he, the car) y dos cláusulas
  - En *Corregir frase* se muestra la oración mal escrita y hay que escribirla bien; copiarla
    tal cual siempre se marca mal, y la corrección resalta la palabra que cambió.
- **A1 → Gramática → Preguntas y respuestas**: do / does para preguntar y contestar, con
  *Traducir pregunta y respuesta*, *Traducir inverso* y *Preguntar y responder*, en 5 niveles:
  - Nivel 1: Do you / Do I con respuesta corta afirmativa
  - Nivel 2: Does he / she / it con respuesta corta
  - Nivel 3: respuestas cortas negativas
  - Nivel 4: mezcla con frecuencia y complementos más largos
  - Nivel 5: preguntas con What, Where, When y Why
  - Son dos campos (pregunta y respuesta) y **cuenta como acierto solo si las dos están bien**;
    la retroalimentación dice cuál falló. En *Preguntar y responder* solo se ve la consigna en
    español («Pregunta si él trabaja aquí. Contesta que no.») y hay que armar las dos frases.

La revisión de la respuesta escrita ignora mayúsculas, puntuación y espacios extra, y acepta
contracciones (`doesn't` = `does not`, `I'm` = `I am`…) y `will` donde la frase usa `going to`.
Cuando la respuesta va **en español** además se ignoran los acentos y se acepta con o sin el
pronombre sujeto (`trabajo todos los días` = `yo trabajo todos los días`).

Los ejercicios de frases comparten un solo motor con tres modos (`src/lib/practice.ts`):
`es-en` (escribir en inglés), `en-es` (escribir en español), `cloze` (completar el hueco) y
`fix` (corregir una oración mal escrita).
Los de pregunta y respuesta usan otro motor de dos campos con sus propios modos:
`es-en`, `en-es` y `cue` (a partir de la consigna).

## Estructura

- `src/app/page.tsx` — inicio (niveles)
- `src/app/a1/` — menú del nivel, ejercicios de verbos y `a1/pronombres/` con los de gramática
- `src/components/MatchExercise.tsx` — ejercicio de relacionar (verbos y pronombres, en los dos sentidos)
- `src/components/WriteExercise.tsx` — ejercicio de escribir (en los dos sentidos)
- `src/components/SentenceExercise.tsx` — ejercicios de frases (traducir en los dos sentidos y completar)
- `src/components/QaExercise.tsx` — ejercicios de pregunta y respuesta (dos campos)
- `src/components/ProgressPanel.tsx` — panel de progreso y filtros
- `src/lib/practice.ts` — tipos, armado de preguntas y verificación de respuestas (compartido)
- `src/lib/practice-db.ts` — consultas a MySQL
- `src/lib/use-practice-state.ts` — estado del ejercicio en el cliente
- `src/app/api/practice/[exercise]/…` — estado, `answer`, `reset`, `active`
- `src/app/api/settings` — umbral de dominado
- `src/app/api/sentences/[exercise]/next`, `…/check` — frases y revisión
- `src/app/api/qa/[exercise]/next`, `…/check` — pares de pregunta y respuesta
- `scripts/` — datos (`verbs-a1.mjs`, `pronouns.mjs`, `sentences/level1-5.mjs`) y `init-db.mjs`

## Atajos de teclado

- Relacionar: `1`–`4` para responder, `Enter` para continuar tras un error
- Traducir: `Enter` revisa, y `Enter` otra vez pasa a la siguiente frase

## Conexión a la base

`src/lib/db.ts` mantiene un pool con expiración de conexiones ociosas y reintenta una vez
cuando la conexión guardada ya estaba cerrada (Aiven corta las inactivas). Si la base no está
accesible, las páginas muestran una pantalla con botón «Reintentar» en lugar de un error 500.

Si de pronto nada conecta (`ETIMEDOUT` al conectar), revisa en la consola de Aiven que el
servicio esté encendido y que tu IP pública esté en «Allowed IP addresses»: en redes con
CGNAT la IP cambia sola y el servicio deja de aceptar conexiones sin dar más señal.

## Practicar desde el celular

El progreso está en la base, así que cualquier dispositivo que abra la app comparte el avance.
Para llegar a la app desde el teléfono hay dos caminos:

1. **Misma red Wi-Fi** (rápido, para probar): con `npm run dev` corriendo en la laptop, abre
   en el celular `http://<IP-de-la-laptop>:3000` (por ejemplo `http://192.168.100.21:3000`).
   La IP cambia según la red; en macOS se consulta con `ipconfig getifaddr en0`.
2. **Publicarla** (para usarla en cualquier lugar): desplegar en Vercel y poner `DATABASE_URL`
   como variable de entorno del proyecto. La base sigue siendo la misma de Aiven.
