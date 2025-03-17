import { relations, sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const words = sqliteTable("words", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  originalId: integer("original_id").unique().notNull(),
  word: text("word").notNull(),
  type: text("type").notNull(),
  explication: text("explication").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const phrases = sqliteTable("phrases", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  wordId: integer("word_id")
    .references(() => words.id)
    .notNull(),
  texte: text("texte").notNull(),
  niveau: text("niveau").notNull(),
  contexte: text("contexte").notNull(),
});

export const wordsRelations = relations(words, ({ many }) => ({
  phrases: many(phrases),
}));

export const phrasesRelations = relations(phrases, ({ one }) => ({
  word: one(words, {
    fields: [phrases.wordId],
    references: [words.id],
  }),
}));

export type Word = typeof words.$inferSelect;
export type Phrase = typeof phrases.$inferSelect;
