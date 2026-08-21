import mysql from "mysql2/promise";
import { verbsA1 } from "./verbs-a1.mjs";
import { verbForms } from "./verb-forms.mjs";
import { pronouns } from "./pronouns.mjs";
import { tobeForms } from "./tobe-forms.mjs";
import { tobeSentences } from "./sentences/tobe.mjs";
import { articleForms } from "./article-forms.mjs";
import { articleSentences } from "./sentences/articles.mjs";
import { presentForms } from "./present-forms.mjs";
import { presentSentences } from "./sentences/present.mjs";
import { qaForms } from "./qa-forms.mjs";
import { qaPairs } from "./sentences/qa.mjs";
import { thirdForms } from "./third-forms.mjs";
import { thirdSentences } from "./sentences/third.mjs";
import { thereForms } from "./there-forms.mjs";
import { thereSentences } from "./sentences/there.mjs";
import { contForms } from "./cont-forms.mjs";
import { contSentences } from "./sentences/cont.mjs";
import { whForms } from "./wh-forms.mjs";
import { whSentences } from "./sentences/wh.mjs";
import { prepForms } from "./prep-forms.mjs";
import { prepSentences } from "./sentences/prep.mjs";
import { advForms } from "./adv-forms.mjs";
import { advSentences } from "./sentences/adv.mjs";
import { phraseItems } from "./phrase-items.mjs";
import { examQuestions, examSections } from "./exam.mjs";
import { level1 } from "./sentences/level1.mjs";
import { level2 } from "./sentences/level2.mjs";
import { level3 } from "./sentences/level3.mjs";
import { level4 } from "./sentences/level4.mjs";
import { level5 } from "./sentences/level5.mjs";

const sentences = [
  ...level1.map((s) => [1, ...s]),
  ...level2.map((s) => [2, ...s]),
  ...level3.map((s) => [3, ...s]),
  ...level4.map((s) => [4, ...s]),
  ...level5.map((s) => [5, ...s]),
];

/** Ejercicios y qué tipo de elemento registran progreso en cada uno. */
const EXERCISES = [
  ["a1-match", ["verb"]],
  ["a1-match-rev", ["verb"]],
  ["a1-write", ["verb"]],
  ["a1-write-rev", ["verb"]],
  ["pron-match", ["pronoun"]],
  ["pron-match-rev", ["pronoun"]],
  ["translate", ["pronoun", "verb"]],
  ["tobe-match", ["tobe"]],
  ["tobe-match-rev", ["tobe"]],
  ["tobe-translate", ["tobe"]],
  ["art-match", ["article"]],
  ["art-match-rev", ["article"]],
  ["art-translate", ["article"]],
  ["ps-translate", ["present"]],
  ["ps-translate-rev", ["present"]],
  ["ps-cloze", ["present"]],
  ["qa-translate", ["qa"]],
  ["qa-translate-rev", ["qa"]],
  ["qa-ask", ["qa"]],
  ["tp-translate", ["third"]],
  ["tp-translate-rev", ["third"]],
  ["tp-fix", ["third"]],
  ["th-translate", ["there"]],
  ["th-translate-rev", ["there"]],
  ["th-fix", ["there"]],
  ["pc-translate", ["cont"]],
  ["pc-translate-rev", ["cont"]],
  ["pc-fix", ["cont"]],
  ["wh-match", ["wh"]],
  ["wh-cloze", ["wh"]],
  ["wh-translate", ["wh"]],
  ["prep-cloze", ["prep"]],
  ["prep-translate", ["prep"]],
  ["prep-translate-rev", ["prep"]],
  ["adv-match", ["adv"]],
  ["adv-translate", ["adv"]],
  ["adv-fix", ["adv"]],
  ["ph-match", ["phrase"]],
  ["ph-match-rev", ["phrase"]],
  ["ph-write", ["phrase"]],
  ["pron-dict", ["pronoun"]],
  ["tobe-dict", ["tobe"]],
  ["art-dict", ["article"]],
  ["ps-dict", ["present"]],
  ["tp-dict", ["third"]],
  ["th-dict", ["there"]],
  ["pc-dict", ["cont"]],
  ["a1-dict", ["verb"]],
  ["ph-dict", ["phrase"]],
  ["qa-dict", ["qa"]],
  ["wh-dict", ["wh"]],
  ["prep-dict", ["prep"]],
  ["adv-dict", ["adv"]],
  ["a1-speak", ["verb"]],
  ["ph-speak", ["phrase"]],
  ["qa-speak", ["qa"]],
  ["pron-speak", ["pronoun"]],
  ["tobe-speak", ["tobe"]],
  ["art-speak", ["article"]],
  ["ps-speak", ["present"]],
  ["tp-speak", ["third"]],
  ["th-speak", ["there"]],
  ["pc-speak", ["cont"]],
  ["wh-speak", ["wh"]],
  ["prep-speak", ["prep"]],
  ["adv-speak", ["adv"]],
];

/** Los cuatro temas de expresiones comparten la misma forma de tabla. */
const EXPRESSION_TABLES = [
  ["wh_forms", "wh_sentences", "cloze"],
  ["prep_forms", "prep_sentences", "cloze"],
  ["adv_forms", "adv_sentences", "wrong"],
  ["phrase_items", null, null],
];

const parsed = new URL(process.env.DATABASE_URL);
const conn = await mysql.createConnection({
  host: parsed.hostname,
  port: Number(parsed.port),
  user: decodeURIComponent(parsed.username),
  password: decodeURIComponent(parsed.password),
  database: parsed.pathname.slice(1),
  ssl: { rejectUnauthorized: false },
});

// Misma zona que usa la app (src/lib/db.ts): el día corta a medianoche de México.
await conn.query("SET time_zone = ?", [process.env.APP_TIME_ZONE ?? "-06:00"]);

await conn.query(`
  CREATE TABLE IF NOT EXISTS verbs (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    level VARCHAR(4) NOT NULL DEFAULT 'A1',
    english VARCHAR(64) NOT NULL,
    spanish VARCHAR(128) NOT NULL,
    spanish_alt JSON NULL,
    UNIQUE KEY uq_verbs_english (english),
    KEY idx_verbs_level (level)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS pronouns (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(16) NOT NULL,
    english VARCHAR(16) NOT NULL,
    spanish VARCHAR(96) NOT NULL,
    category VARCHAR(16) NOT NULL,
    hint VARCHAR(255) NOT NULL,
    UNIQUE KEY uq_pronouns_slug (slug),
    KEY idx_pronouns_category (category)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS tobe_forms (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(24) NOT NULL,
    english VARCHAR(32) NOT NULL,
    spanish VARCHAR(96) NOT NULL,
    category VARCHAR(24) NOT NULL,
    hint VARCHAR(255) NOT NULL,
    UNIQUE KEY uq_tobe_forms_slug (slug),
    KEY idx_tobe_forms_category (category)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS tobe_sentences (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    level TINYINT UNSIGNED NOT NULL,
    form_id INT UNSIGNED NOT NULL,
    spanish VARCHAR(255) NOT NULL,
    english VARCHAR(255) NOT NULL,
    alternatives JSON NULL,
    UNIQUE KEY uq_tobe_sentences_spanish (spanish),
    KEY idx_tobe_sentences_level (level),
    KEY idx_tobe_sentences_form (form_id),
    CONSTRAINT fk_tobe_sentences_form FOREIGN KEY (form_id) REFERENCES tobe_forms (id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS article_forms (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(24) NOT NULL,
    english VARCHAR(32) NOT NULL,
    spanish VARCHAR(96) NOT NULL,
    category VARCHAR(24) NOT NULL,
    hint VARCHAR(255) NOT NULL,
    UNIQUE KEY uq_article_forms_slug (slug),
    KEY idx_article_forms_category (category)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS article_sentences (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    level TINYINT UNSIGNED NOT NULL,
    form_id INT UNSIGNED NOT NULL,
    spanish VARCHAR(255) NOT NULL,
    english VARCHAR(255) NOT NULL,
    alternatives JSON NULL,
    UNIQUE KEY uq_article_sentences_spanish (spanish),
    KEY idx_article_sentences_level (level),
    KEY idx_article_sentences_form (form_id),
    CONSTRAINT fk_article_sentences_form FOREIGN KEY (form_id) REFERENCES article_forms (id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS present_forms (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(24) NOT NULL,
    english VARCHAR(48) NOT NULL,
    spanish VARCHAR(96) NOT NULL,
    category VARCHAR(24) NOT NULL,
    hint VARCHAR(255) NOT NULL,
    UNIQUE KEY uq_present_forms_slug (slug),
    KEY idx_present_forms_category (category)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS present_sentences (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    level TINYINT UNSIGNED NOT NULL,
    form_id INT UNSIGNED NOT NULL,
    spanish VARCHAR(255) NOT NULL,
    english VARCHAR(255) NOT NULL,
    cloze_text VARCHAR(255) NOT NULL,
    cloze_answer VARCHAR(64) NOT NULL,
    alternatives JSON NULL,
    UNIQUE KEY uq_present_sentences_spanish (spanish),
    KEY idx_present_sentences_level (level),
    KEY idx_present_sentences_form (form_id),
    CONSTRAINT fk_present_sentences_form FOREIGN KEY (form_id) REFERENCES present_forms (id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS qa_forms (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(24) NOT NULL,
    english VARCHAR(64) NOT NULL,
    spanish VARCHAR(96) NOT NULL,
    category VARCHAR(24) NOT NULL,
    hint VARCHAR(255) NOT NULL,
    UNIQUE KEY uq_qa_forms_slug (slug),
    KEY idx_qa_forms_category (category)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS qa_pairs (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    level TINYINT UNSIGNED NOT NULL,
    form_id INT UNSIGNED NOT NULL,
    spanish_question VARCHAR(255) NOT NULL,
    spanish_answer VARCHAR(255) NOT NULL,
    english_question VARCHAR(255) NOT NULL,
    english_answer VARCHAR(255) NOT NULL,
    cue VARCHAR(255) NOT NULL,
    UNIQUE KEY uq_qa_pairs_question (spanish_question),
    KEY idx_qa_pairs_level (level),
    KEY idx_qa_pairs_form (form_id),
    CONSTRAINT fk_qa_pairs_form FOREIGN KEY (form_id) REFERENCES qa_forms (id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS third_forms (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(24) NOT NULL,
    english VARCHAR(48) NOT NULL,
    spanish VARCHAR(96) NOT NULL,
    category VARCHAR(24) NOT NULL,
    hint VARCHAR(255) NOT NULL,
    UNIQUE KEY uq_third_forms_slug (slug),
    KEY idx_third_forms_category (category)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS third_sentences (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    level TINYINT UNSIGNED NOT NULL,
    form_id INT UNSIGNED NOT NULL,
    spanish VARCHAR(255) NOT NULL,
    english VARCHAR(255) NOT NULL,
    wrong_english VARCHAR(255) NOT NULL,
    alternatives JSON NULL,
    UNIQUE KEY uq_third_sentences_spanish (spanish),
    KEY idx_third_sentences_level (level),
    KEY idx_third_sentences_form (form_id),
    CONSTRAINT fk_third_sentences_form FOREIGN KEY (form_id) REFERENCES third_forms (id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS there_forms (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(24) NOT NULL,
    english VARCHAR(64) NOT NULL,
    spanish VARCHAR(96) NOT NULL,
    category VARCHAR(24) NOT NULL,
    hint VARCHAR(255) NOT NULL,
    UNIQUE KEY uq_there_forms_slug (slug),
    KEY idx_there_forms_category (category)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS there_sentences (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    level TINYINT UNSIGNED NOT NULL,
    form_id INT UNSIGNED NOT NULL,
    spanish VARCHAR(255) NOT NULL,
    english VARCHAR(255) NOT NULL,
    wrong_english VARCHAR(255) NOT NULL,
    alternatives JSON NULL,
    UNIQUE KEY uq_there_sentences_spanish (spanish),
    KEY idx_there_sentences_level (level),
    KEY idx_there_sentences_form (form_id),
    CONSTRAINT fk_there_sentences_form FOREIGN KEY (form_id) REFERENCES there_forms (id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS cont_forms (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(24) NOT NULL,
    english VARCHAR(64) NOT NULL,
    spanish VARCHAR(96) NOT NULL,
    category VARCHAR(24) NOT NULL,
    hint VARCHAR(255) NOT NULL,
    UNIQUE KEY uq_cont_forms_slug (slug),
    KEY idx_cont_forms_category (category)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS cont_sentences (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    level TINYINT UNSIGNED NOT NULL,
    form_id INT UNSIGNED NOT NULL,
    spanish VARCHAR(255) NOT NULL,
    english VARCHAR(255) NOT NULL,
    wrong_english VARCHAR(255) NOT NULL,
    alternatives JSON NULL,
    UNIQUE KEY uq_cont_sentences_spanish (spanish),
    KEY idx_cont_sentences_level (level),
    KEY idx_cont_sentences_form (form_id),
    CONSTRAINT fk_cont_sentences_form FOREIGN KEY (form_id) REFERENCES cont_forms (id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

for (const [formsTable, sentencesTable, extra] of EXPRESSION_TABLES) {
  await conn.query(`
    CREATE TABLE IF NOT EXISTS ${formsTable} (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(32) NOT NULL,
      english VARCHAR(96) NOT NULL,
      spanish VARCHAR(128) NOT NULL,
      category VARCHAR(24) NOT NULL,
      hint VARCHAR(255) NOT NULL,
      english_alt JSON NULL,
      UNIQUE KEY uq_${formsTable}_slug (slug),
      KEY idx_${formsTable}_category (category)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  if (!sentencesTable) continue;

  await conn.query(`
    CREATE TABLE IF NOT EXISTS ${sentencesTable} (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      level TINYINT UNSIGNED NOT NULL,
      form_id INT UNSIGNED NOT NULL,
      spanish VARCHAR(255) NOT NULL,
      english VARCHAR(255) NOT NULL,
      ${extra === "cloze" ? "cloze_text VARCHAR(255) NOT NULL, cloze_answer VARCHAR(64) NOT NULL," : "wrong_english VARCHAR(255) NOT NULL,"}
      alternatives JSON NULL,
      UNIQUE KEY uq_${sentencesTable}_spanish (spanish),
      KEY idx_${sentencesTable}_level (level),
      KEY idx_${sentencesTable}_form (form_id),
      CONSTRAINT fk_${sentencesTable}_form FOREIGN KEY (form_id) REFERENCES ${formsTable} (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
}

await conn.query(`
  CREATE TABLE IF NOT EXISTS exam_questions (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    section TINYINT UNSIGNED NOT NULL,
    position TINYINT UNSIGNED NOT NULL,
    type VARCHAR(12) NOT NULL,
    prompt VARCHAR(400) NOT NULL,
    context VARCHAR(255) NULL,
    options JSON NULL,
    expected VARCHAR(400) NOT NULL,
    alternatives JSON NULL,
    hint VARCHAR(400) NOT NULL,
    UNIQUE KEY uq_exam_questions_pos (section, position),
    KEY idx_exam_questions_section (section)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS exam_attempts (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    finished_at TIMESTAMP NULL,
    correct_count SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    total SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    passed TINYINT(1) NOT NULL DEFAULT 0,
    KEY idx_exam_attempts_finished (finished_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS exam_answers (
    attempt_id INT UNSIGNED NOT NULL,
    question_id INT UNSIGNED NOT NULL,
    given VARCHAR(400) NOT NULL,
    correct TINYINT(1) NOT NULL,
    answered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (attempt_id, question_id),
    CONSTRAINT fk_exam_answers_attempt FOREIGN KEY (attempt_id) REFERENCES exam_attempts (id) ON DELETE CASCADE,
    CONSTRAINT fk_exam_answers_question FOREIGN KEY (question_id) REFERENCES exam_questions (id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS sentences (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    level TINYINT UNSIGNED NOT NULL,
    verb_id INT UNSIGNED NOT NULL,
    pronoun_id INT UNSIGNED NOT NULL,
    spanish VARCHAR(255) NOT NULL,
    english VARCHAR(255) NOT NULL,
    alternatives JSON NULL,
    UNIQUE KEY uq_sentences_level_verb (level, verb_id),
    KEY idx_sentences_level (level),
    KEY idx_sentences_pronoun (pronoun_id),
    CONSTRAINT fk_sentences_verb FOREIGN KEY (verb_id) REFERENCES verbs (id) ON DELETE CASCADE,
    CONSTRAINT fk_sentences_pronoun FOREIGN KEY (pronoun_id) REFERENCES pronouns (id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

// Progreso genérico: un renglón por (ejercicio, tipo de elemento, elemento).
await conn.query(`
  CREATE TABLE IF NOT EXISTS progress (
    exercise VARCHAR(16) NOT NULL,
    item_type VARCHAR(8) NOT NULL,
    item_id INT UNSIGNED NOT NULL,
    correct_count INT UNSIGNED NOT NULL DEFAULT 0,
    wrong_count INT UNSIGNED NOT NULL DEFAULT 0,
    mastered TINYINT(1) NOT NULL DEFAULT 0,
    active TINYINT(1) NOT NULL DEFAULT 1,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (exercise, item_type, item_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(`
  CREATE TABLE IF NOT EXISTS settings (
    id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
    mastery_target INT UNSIGNED NOT NULL DEFAULT 10,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

await conn.query(
  "INSERT INTO settings (id, mastery_target) VALUES (1, 10) ON DUPLICATE KEY UPDATE id = id",
);

// Interruptor de pronunciación, agregado después del esquema inicial.
const [[{ tieneVoz }]] = await conn.query(
  `SELECT COUNT(*) AS tieneVoz FROM information_schema.columns
    WHERE table_schema = DATABASE() AND table_name = 'settings'
      AND column_name = 'speech_enabled'`,
);
if (!tieneVoz) {
  await conn.query(
    "ALTER TABLE settings ADD COLUMN speech_enabled TINYINT(1) NOT NULL DEFAULT 1 AFTER mastery_target",
  );
  console.log("settings.speech_enabled agregada");
}

// Velocidad de lectura. La VOZ no va en la base: cada dispositivo ofrece voces
// distintas (Apple, Google, Microsoft), así que se guarda en localStorage.
const [[{ tieneRate }]] = await conn.query(
  `SELECT COUNT(*) AS tieneRate FROM information_schema.columns
    WHERE table_schema = DATABASE() AND table_name = 'settings'
      AND column_name = 'speech_rate'`,
);
if (!tieneRate) {
  await conn.query(
    "ALTER TABLE settings ADD COLUMN speech_rate DECIMAL(3,2) NOT NULL DEFAULT 0.95 AFTER speech_enabled",
  );
  console.log("settings.speech_rate agregada");
}

const [[{ tieneVozBase }]] = await conn.query(
  `SELECT COUNT(*) AS tieneVozBase FROM information_schema.columns
    WHERE table_schema = DATABASE() AND table_name = 'settings'
      AND column_name = 'speech_voice'`,
);
if (tieneVozBase) {
  await conn.query("ALTER TABLE settings DROP COLUMN speech_voice");
  console.log("settings.speech_voice eliminada (la voz se guarda por dispositivo)");
}

// Plan del día: interruptor y meta diaria de respuestas.
const [[{ tienePlan }]] = await conn.query(
  `SELECT COUNT(*) AS tienePlan FROM information_schema.columns
    WHERE table_schema = DATABASE() AND table_name = 'settings'
      AND column_name = 'daily_plan_enabled'`,
);
if (!tienePlan) {
  await conn.query(
    `ALTER TABLE settings
       ADD COLUMN daily_plan_enabled TINYINT(1) NOT NULL DEFAULT 1,
       ADD COLUMN daily_goal SMALLINT UNSIGNED NOT NULL DEFAULT 40`,
  );
  console.log("settings: plan del día agregado");
}

// Actividad diaria: alimenta el plan del día, la racha y el histórico.
await conn.query(`
  CREATE TABLE IF NOT EXISTS activity (
    day DATE NOT NULL,
    exercise VARCHAR(32) NOT NULL,
    answers INT UNSIGNED NOT NULL DEFAULT 0,
    correct INT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (day, exercise),
    KEY idx_activity_day (day)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`);

// Repaso espaciado: cuándo se dominó, en qué etapa del repaso va y cuándo toca.
const [[{ tieneRepaso }]] = await conn.query(
  `SELECT COUNT(*) AS tieneRepaso FROM information_schema.columns
    WHERE table_schema = DATABASE() AND table_name = 'progress'
      AND column_name = 'review_due'`,
);
if (!tieneRepaso) {
  await conn.query(
    `ALTER TABLE progress
       ADD COLUMN mastered_at TIMESTAMP NULL,
       ADD COLUMN review_stage TINYINT UNSIGNED NOT NULL DEFAULT 0,
       ADD COLUMN review_due DATE NULL,
       ADD KEY idx_progress_review (review_due)`,
  );
  console.log("progress: columnas de repaso espaciado agregadas");

  // Lo que ya estaba dominado entra al ciclo desde hoy.
  const [res] = await conn.query(
    `UPDATE progress
        SET mastered_at = COALESCE(mastered_at, updated_at),
            review_stage = 1,
            review_due = DATE_ADD(CURDATE(), INTERVAL 7 DAY)
      WHERE mastered = 1 AND review_due IS NULL`,
  );
  if (res.affectedRows > 0) {
    console.log(`repaso: ${res.affectedRows} elementos dominados programados a 7 días`);
  }
}

// Las claves de ejercicio crecieron (prep-translate-rev son 18 caracteres) y la
// columna original de 16 las truncaba en silencio.
await conn.query(
  "ALTER TABLE progress MODIFY exercise VARCHAR(32) NOT NULL, MODIFY item_type VARCHAR(16) NOT NULL",
);

const [{ affectedRows: truncadas }] = await conn.query(
  `DELETE FROM progress
    WHERE exercise NOT IN (${EXERCISES.map(() => "?").join(", ")})`,
  EXERCISES.map(([key]) => key),
);
if (truncadas > 0) {
  console.log(`progress: ${truncadas} filas con clave inválida eliminadas`);
}

// Las formas conjugadas se agregaron después de la primera versión del esquema.
const [[{ tieneFormas }]] = await conn.query(
  `SELECT COUNT(*) AS tieneFormas FROM information_schema.columns
    WHERE table_schema = DATABASE() AND table_name = 'verbs' AND column_name = 'third_person'`,
);
if (!tieneFormas) {
  await conn.query(
    `ALTER TABLE verbs
       ADD COLUMN third_person VARCHAR(48) NULL,
       ADD COLUMN gerund VARCHAR(48) NULL,
       ADD COLUMN past VARCHAR(48) NULL,
       ADD COLUMN participle VARCHAR(48) NULL,
       ADD COLUMN irregular TINYINT(1) NOT NULL DEFAULT 0,
       ADD COLUMN form_note VARCHAR(200) NULL`,
  );
  console.log("verbs: columnas de conjugación agregadas");
}

// Marca personal de «ya lo estudié» en la lista de consulta.
const [[{ tieneEstudiado }]] = await conn.query(
  `SELECT COUNT(*) AS tieneEstudiado FROM information_schema.columns
    WHERE table_schema = DATABASE() AND table_name = 'verbs' AND column_name = 'studied'`,
);
if (!tieneEstudiado) {
  await conn.query(
    "ALTER TABLE verbs ADD COLUMN studied TINYINT(1) NOT NULL DEFAULT 0",
  );
  console.log("verbs.studied agregada");
}

// La columna spanish_alt se agregó después de la primera versión del esquema.
const [[{ tiene }]] = await conn.query(
  `SELECT COUNT(*) AS tiene FROM information_schema.columns
    WHERE table_schema = DATABASE() AND table_name = 'verbs' AND column_name = 'spanish_alt'`,
);
if (!tiene) {
  await conn.query("ALTER TABLE verbs ADD COLUMN spanish_alt JSON NULL AFTER spanish");
  console.log("verbs.spanish_alt agregada");
}

// --- Catálogos -------------------------------------------------------------
await conn.query(
  `INSERT INTO verbs (level, english, spanish, spanish_alt) VALUES ?
     ON DUPLICATE KEY UPDATE spanish = VALUES(spanish), spanish_alt = VALUES(spanish_alt)`,
  [
    verbsA1.map(([english, spanish, alt]) => [
      "A1",
      english,
      spanish,
      alt && alt.length ? JSON.stringify(alt) : null,
    ]),
  ],
);

await conn.query(
  `INSERT INTO pronouns (slug, english, spanish, category, hint) VALUES ?
     ON DUPLICATE KEY UPDATE english = VALUES(english), spanish = VALUES(spanish),
       category = VALUES(category), hint = VALUES(hint)`,
  [pronouns],
);

await conn.query(
  `INSERT INTO tobe_forms (slug, english, spanish, category, hint) VALUES ?
     ON DUPLICATE KEY UPDATE english = VALUES(english), spanish = VALUES(spanish),
       category = VALUES(category), hint = VALUES(hint)`,
  [tobeForms],
);

const [formRows] = await conn.query("SELECT id, slug FROM tobe_forms");
const formId = new Map(formRows.map((r) => [r.slug, r.id]));

const tobeRows = tobeSentences.map(([level, slug, es, en, alts]) => {
  if (!formId.has(slug)) throw new Error(`Forma de to be desconocida: ${slug}`);
  return [level, formId.get(slug), es, en, alts ? JSON.stringify(alts) : null];
});

await conn.query(
  `INSERT INTO tobe_sentences (level, form_id, spanish, english, alternatives) VALUES ?
     ON DUPLICATE KEY UPDATE level = VALUES(level), form_id = VALUES(form_id),
       english = VALUES(english), alternatives = VALUES(alternatives)`,
  [tobeRows],
);

await conn.query(
  `INSERT INTO article_forms (slug, english, spanish, category, hint) VALUES ?
     ON DUPLICATE KEY UPDATE english = VALUES(english), spanish = VALUES(spanish),
       category = VALUES(category), hint = VALUES(hint)`,
  [articleForms],
);

const [articleRows] = await conn.query("SELECT id, slug FROM article_forms");
const articleId = new Map(articleRows.map((r) => [r.slug, r.id]));

await conn.query(
  `INSERT INTO article_sentences (level, form_id, spanish, english, alternatives) VALUES ?
     ON DUPLICATE KEY UPDATE level = VALUES(level), form_id = VALUES(form_id),
       english = VALUES(english), alternatives = VALUES(alternatives)`,
  [
    articleSentences.map(([level, slug, es, en, alts]) => {
      if (!articleId.has(slug)) throw new Error(`Artículo desconocido: ${slug}`);
      return [level, articleId.get(slug), es, en, alts ? JSON.stringify(alts) : null];
    }),
  ],
);

await conn.query(
  `INSERT INTO present_forms (slug, english, spanish, category, hint) VALUES ?
     ON DUPLICATE KEY UPDATE english = VALUES(english), spanish = VALUES(spanish),
       category = VALUES(category), hint = VALUES(hint)`,
  [presentForms],
);

const [presentRows] = await conn.query("SELECT id, slug FROM present_forms");
const presentId = new Map(presentRows.map((r) => [r.slug, r.id]));

await conn.query(
  `INSERT INTO present_sentences
     (level, form_id, spanish, english, cloze_text, cloze_answer, alternatives) VALUES ?
     ON DUPLICATE KEY UPDATE level = VALUES(level), form_id = VALUES(form_id),
       english = VALUES(english), cloze_text = VALUES(cloze_text),
       cloze_answer = VALUES(cloze_answer), alternatives = VALUES(alternatives)`,
  [
    presentSentences.map(([level, slug, es, en, cloze, answer, alts]) => {
      if (!presentId.has(slug)) throw new Error(`Forma de presente desconocida: ${slug}`);
      return [
        level,
        presentId.get(slug),
        es,
        en,
        cloze,
        answer,
        alts ? JSON.stringify(alts) : null,
      ];
    }),
  ],
);

await conn.query(
  `INSERT INTO qa_forms (slug, english, spanish, category, hint) VALUES ?
     ON DUPLICATE KEY UPDATE english = VALUES(english), spanish = VALUES(spanish),
       category = VALUES(category), hint = VALUES(hint)`,
  [qaForms],
);

const [qaRows] = await conn.query("SELECT id, slug FROM qa_forms");
const qaId = new Map(qaRows.map((r) => [r.slug, r.id]));

await conn.query(
  `INSERT INTO qa_pairs
     (level, form_id, spanish_question, spanish_answer, english_question, english_answer, cue)
     VALUES ?
     ON DUPLICATE KEY UPDATE level = VALUES(level), form_id = VALUES(form_id),
       spanish_answer = VALUES(spanish_answer), english_question = VALUES(english_question),
       english_answer = VALUES(english_answer), cue = VALUES(cue)`,
  [
    qaPairs.map(([level, slug, esQ, esA, enQ, enA, cue]) => {
      if (!qaId.has(slug)) throw new Error(`Forma de pregunta desconocida: ${slug}`);
      return [level, qaId.get(slug), esQ, esA, enQ, enA, cue];
    }),
  ],
);

await conn.query(
  `INSERT INTO third_forms (slug, english, spanish, category, hint) VALUES ?
     ON DUPLICATE KEY UPDATE english = VALUES(english), spanish = VALUES(spanish),
       category = VALUES(category), hint = VALUES(hint)`,
  [thirdForms],
);

const [thirdRows] = await conn.query("SELECT id, slug FROM third_forms");
const thirdId = new Map(thirdRows.map((r) => [r.slug, r.id]));

await conn.query(
  `INSERT INTO third_sentences (level, form_id, spanish, english, wrong_english) VALUES ?
     ON DUPLICATE KEY UPDATE level = VALUES(level), form_id = VALUES(form_id),
       english = VALUES(english), wrong_english = VALUES(wrong_english)`,
  [
    thirdSentences.map(([level, slug, es, en, wrong]) => {
      if (!thirdId.has(slug)) throw new Error(`Forma de tercera persona desconocida: ${slug}`);
      return [level, thirdId.get(slug), es, en, wrong];
    }),
  ],
);

await conn.query(
  `INSERT INTO there_forms (slug, english, spanish, category, hint) VALUES ?
     ON DUPLICATE KEY UPDATE english = VALUES(english), spanish = VALUES(spanish),
       category = VALUES(category), hint = VALUES(hint)`,
  [thereForms],
);

const [thereRows] = await conn.query("SELECT id, slug FROM there_forms");
const thereId = new Map(thereRows.map((r) => [r.slug, r.id]));

await conn.query(
  `INSERT INTO there_sentences (level, form_id, spanish, english, wrong_english) VALUES ?
     ON DUPLICATE KEY UPDATE level = VALUES(level), form_id = VALUES(form_id),
       english = VALUES(english), wrong_english = VALUES(wrong_english)`,
  [
    thereSentences.map(([level, slug, es, en, wrong]) => {
      if (!thereId.has(slug)) throw new Error(`Forma de there is/are desconocida: ${slug}`);
      return [level, thereId.get(slug), es, en, wrong];
    }),
  ],
);

await conn.query(
  `INSERT INTO cont_forms (slug, english, spanish, category, hint) VALUES ?
     ON DUPLICATE KEY UPDATE english = VALUES(english), spanish = VALUES(spanish),
       category = VALUES(category), hint = VALUES(hint)`,
  [contForms],
);

const [contRows] = await conn.query("SELECT id, slug FROM cont_forms");
const contId = new Map(contRows.map((r) => [r.slug, r.id]));

await conn.query(
  `INSERT INTO cont_sentences (level, form_id, spanish, english, wrong_english) VALUES ?
     ON DUPLICATE KEY UPDATE level = VALUES(level), form_id = VALUES(form_id),
       english = VALUES(english), wrong_english = VALUES(wrong_english)`,
  [
    contSentences.map(([level, slug, es, en, wrong]) => {
      if (!contId.has(slug)) throw new Error(`Forma de continuo desconocida: ${slug}`);
      return [level, contId.get(slug), es, en, wrong];
    }),
  ],
);

/** Semilla de un tema de expresiones: catálogo y, si tiene, banco de frases. */
async function seedExpression(formsTable, forms, sentencesTable, sentences, extra) {
  await conn.query(
    `INSERT INTO ${formsTable} (slug, english, spanish, category, hint, english_alt) VALUES ?
       ON DUPLICATE KEY UPDATE english = VALUES(english), spanish = VALUES(spanish),
         category = VALUES(category), hint = VALUES(hint), english_alt = VALUES(english_alt)`,
    [
      forms.map(([slug, english, spanish, category, hint, alt]) => [
        slug,
        english,
        spanish,
        category,
        hint,
        alt && alt.length ? JSON.stringify(alt) : null,
      ]),
    ],
  );

  if (!sentencesTable) return;

  const [rows] = await conn.query(`SELECT id, slug FROM ${formsTable}`);
  const byslug = new Map(rows.map((r) => [r.slug, r.id]));

  const columns =
    extra === "cloze"
      ? "(level, form_id, spanish, english, cloze_text, cloze_answer)"
      : "(level, form_id, spanish, english, wrong_english)";
  const update =
    extra === "cloze"
      ? "cloze_text = VALUES(cloze_text), cloze_answer = VALUES(cloze_answer)"
      : "wrong_english = VALUES(wrong_english)";

  await conn.query(
    `INSERT INTO ${sentencesTable} ${columns} VALUES ?
       ON DUPLICATE KEY UPDATE level = VALUES(level), form_id = VALUES(form_id),
         english = VALUES(english), ${update}`,
    [
      sentences.map(([level, slug, es, en, extra1, extra2]) => {
        if (!byslug.has(slug)) throw new Error(`${formsTable}: slug desconocido ${slug}`);
        return extra === "cloze"
          ? [level, byslug.get(slug), es, en, extra1, extra2]
          : [level, byslug.get(slug), es, en, extra1];
      }),
    ],
  );
}

await seedExpression("wh_forms", whForms, "wh_sentences", whSentences, "cloze");
await seedExpression("prep_forms", prepForms, "prep_sentences", prepSentences, "cloze");
await seedExpression("adv_forms", advForms, "adv_sentences", advSentences, "wrong");
await seedExpression("phrase_items", phraseItems, null, null, null);

// Examen de cierre: el banco se identifica por (sección, posición)
{
  const posiciones = new Map();
  const filas = examQuestions.map((q) => {
    const [section, type, prompt, context, options, expected, alternatives, hint] = q;
    const position = (posiciones.get(section) ?? 0) + 1;
    posiciones.set(section, position);
    return [
      section,
      position,
      type,
      prompt,
      context,
      options ? JSON.stringify(options) : null,
      expected,
      alternatives && alternatives.length ? JSON.stringify(alternatives) : null,
      hint,
    ];
  });

  await conn.query(
    `INSERT INTO exam_questions
       (section, position, type, prompt, context, options, expected, alternatives, hint)
       VALUES ?
       ON DUPLICATE KEY UPDATE type = VALUES(type), prompt = VALUES(prompt),
         context = VALUES(context), options = VALUES(options), expected = VALUES(expected),
         alternatives = VALUES(alternatives), hint = VALUES(hint)`,
    [filas],
  );

  // Si el banco se recorta, se borran los reactivos que ya no existen.
  const [{ affectedRows: sobrantes }] = await conn.query(
    `DELETE FROM exam_questions
      WHERE (section, position) NOT IN (${filas.map(() => "(?, ?)").join(", ")})`,
    filas.flatMap((f) => [f[0], f[1]]),
  );
  if (sobrantes > 0) console.log(`exam_questions: ${sobrantes} reactivos viejos eliminados`);
  console.log(`exam: ${filas.length} reactivos en ${examSections.length} secciones`);
}

// Conjugación de cada verbo (para la lista de consulta)
{
  const porVerbo = new Map(verbForms.map((f) => [f[0], f]));
  const faltantes = verbsA1.filter(([english]) => !porVerbo.has(english));
  if (faltantes.length > 0) {
    throw new Error(`Sin formas: ${faltantes.map(([v]) => v).join(", ")}`);
  }

  await conn.query(
    `INSERT INTO verbs (level, english, spanish, third_person, gerund, past, participle, irregular, form_note)
       VALUES ?
       ON DUPLICATE KEY UPDATE third_person = VALUES(third_person), gerund = VALUES(gerund),
         past = VALUES(past), participle = VALUES(participle),
         irregular = VALUES(irregular), form_note = VALUES(form_note)`,
    [
      verbsA1.map(([english, spanish]) => {
        const [, third, gerund, past, participle, irregular, note] =
          porVerbo.get(english);
        return [
          "A1",
          english,
          spanish,
          third,
          gerund,
          past,
          participle,
          irregular ? 1 : 0,
          note,
        ];
      }),
    ],
  );
  console.log(
    `verbos: conjugación de ${verbsA1.length} (irregulares: ${verbForms.filter((f) => f[5]).map((f) => f[0]).join(", ")})`,
  );
}

// Invariante: «dominado» significa haber llegado al umbral vigente. Si el
// umbral cambió (o quedó desalineado), se recalcula y se limpia el repaso de lo
// que ya no califica.
{
  const [[{ mastery_target: umbral }]] = await conn.query(
    "SELECT mastery_target FROM settings WHERE id = 1",
  );
  const [res] = await conn.query(
    `UPDATE progress
        SET mastered = 0, mastered_at = NULL, review_stage = 0, review_due = NULL
      WHERE mastered = 1 AND correct_count < ?`,
    [umbral],
  );
  if (res.affectedRows > 0) {
    console.log(
      `progress: ${res.affectedRows} elementos marcados como dominados sin llegar a ${umbral} aciertos; se devolvieron a práctica`,
    );
  }
  const [res2] = await conn.query(
    `UPDATE progress
        SET mastered = 1,
            mastered_at = COALESCE(mastered_at, updated_at),
            review_stage = GREATEST(review_stage, 1),
            review_due = COALESCE(review_due, DATE_ADD(CURDATE(), INTERVAL 7 DAY))
      WHERE mastered = 0 AND correct_count >= ?`,
    [umbral],
  );
  if (res2.affectedRows > 0) {
    console.log(`progress: ${res2.affectedRows} elementos ya alcanzaban el umbral; quedaron dominados`);
  }
}

const [verbRows] = await conn.query("SELECT id, english FROM verbs");
const verbId = new Map(verbRows.map((r) => [r.english, r.id]));
const [pronRows] = await conn.query("SELECT id, slug FROM pronouns");
const pronounId = new Map(pronRows.map((r) => [r.slug, r.id]));

const sentenceRows = sentences.map(([level, verb, slug, es, en, alts]) => {
  if (!verbId.has(verb)) throw new Error(`Verbo desconocido: ${verb}`);
  if (!pronounId.has(slug)) throw new Error(`Pronombre desconocido: ${slug}`);
  return [
    level,
    verbId.get(verb),
    pronounId.get(slug),
    es,
    en,
    alts ? JSON.stringify(alts) : null,
  ];
});

await conn.query(
  `INSERT INTO sentences (level, verb_id, pronoun_id, spanish, english, alternatives) VALUES ?
     ON DUPLICATE KEY UPDATE pronoun_id = VALUES(pronoun_id), spanish = VALUES(spanish),
       english = VALUES(english), alternatives = VALUES(alternatives)`,
  [sentenceRows],
);

// --- Progreso: una fila por ejercicio y elemento ---------------------------
// Migración desde el esquema anterior (verb_progress -> progress/a1-match).
const [legacy] = await conn.query("SHOW TABLES LIKE 'verb_progress'");
if (legacy.length > 0) {
  await conn.query(`
    INSERT IGNORE INTO progress (exercise, item_type, item_id, correct_count, wrong_count, mastered, active)
      SELECT 'a1-match', 'verb', verb_id, correct_count, wrong_count, mastered, active FROM verb_progress
  `);
  await conn.query("DROP TABLE verb_progress");
  console.log("verb_progress migrada a progress y eliminada");
}

for (const [exercise, itemTypes] of EXERCISES) {
  for (const itemType of itemTypes) {
    const table =
      {
        verb: "verbs",
        pronoun: "pronouns",
        tobe: "tobe_forms",
        article: "article_forms",
        present: "present_forms",
        qa: "qa_forms",
        third: "third_forms",
        there: "there_forms",
        cont: "cont_forms",
        wh: "wh_forms",
        prep: "prep_forms",
        adv: "adv_forms",
        phrase: "phrase_items",
      }[itemType];
    const [res] = await conn.query(
      `INSERT IGNORE INTO progress (exercise, item_type, item_id)
         SELECT ?, ?, id FROM ${table}`,
      [exercise, itemType],
    );
    if (res.affectedRows > 0) {
      console.log(`progress ${exercise}/${itemType}: ${res.affectedRows} filas`);
    }
  }
}

const [[counts]] = await conn.query(`
  SELECT (SELECT COUNT(*) FROM verbs) AS verbos,
         (SELECT COUNT(*) FROM pronouns) AS pronombres,
         (SELECT COUNT(*) FROM tobe_forms) AS formas_tobe,
         (SELECT COUNT(*) FROM article_forms) AS formas_art,
         (SELECT COUNT(*) FROM present_forms) AS formas_ps,
         (SELECT COUNT(*) FROM qa_forms) AS formas_qa,
         (SELECT COUNT(*) FROM third_forms) AS formas_3a,
         (SELECT COUNT(*) FROM there_forms) AS formas_there,
         (SELECT COUNT(*) FROM cont_forms) AS formas_cont,
         (SELECT COUNT(*) FROM wh_forms) AS wh,
         (SELECT COUNT(*) FROM prep_forms) AS prep,
         (SELECT COUNT(*) FROM adv_forms) AS adv,
         (SELECT COUNT(*) FROM phrase_items) AS frases_utiles,
         (SELECT COUNT(*) FROM sentences) AS frases,
         (SELECT COUNT(*) FROM tobe_sentences) AS frases_tobe,
         (SELECT COUNT(*) FROM article_sentences) AS frases_art,
         (SELECT COUNT(*) FROM present_sentences) AS frases_ps,
         (SELECT COUNT(*) FROM qa_pairs) AS pares_qa,
         (SELECT COUNT(*) FROM third_sentences) AS frases_3a,
         (SELECT COUNT(*) FROM there_sentences) AS frases_there,
         (SELECT COUNT(*) FROM cont_sentences) AS frases_cont,
         (SELECT COUNT(*) FROM wh_sentences) AS wh_frases,
         (SELECT COUNT(*) FROM prep_sentences) AS prep_frases,
         (SELECT COUNT(*) FROM adv_sentences) AS adv_frases,
         (SELECT COUNT(*) FROM exam_questions) AS examen,
         (SELECT COUNT(*) FROM progress) AS progreso
`);
console.log(counts);

await conn.end();
