import { SQLiteDatabase } from "expo-sqlite";
import { words, phrases } from "../../../db/schema";
import { eq, and, gte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { Word } from "../../service/word.service";

interface Phrase {
  texte: string;
  niveau: string;
  contexte: string;
}

interface Completion {
  mot: string;
  type: string;
  explication: string;
  niveau_max: string;
  phrases: Phrase[];
  image?: string; // Make image optional since we don't store it
}

interface WordResponse {
  id: number;
  userId: number;
  word: string;
  definitions: string[];
  completions: Completion;
}

export class WordRepository {
  private db;
  
  constructor(sqlite: SQLiteDatabase) {
    this.db = drizzle(sqlite);
  }

  async getTodaysWords(): Promise<Word[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const wordsWithPhrases = await this.db
      .select()
      .from(words)
      .where(gte(words.createdAt, sql`date('now', 'start of day')`))
      .leftJoin(phrases, eq(phrases.wordId, words.id));

    // Group phrases by word
    const groupedResults = wordsWithPhrases.reduce((acc: Word[], curr) => {
      const existingWord = acc.find((w) => w.id === curr.words.id);
      if (existingWord) {
        if (curr.phrases) {
          existingWord.completions.phrases.push({
            texte: curr.phrases.texte,
            niveau: curr.phrases.niveau,
            contexte: curr.phrases.contexte,
          });
        }
      } else {
        acc.push({
          id: curr.words.id,
          originalId: curr.words.originalId,
          userId: 0, // Default value since we don't store this
          word: curr.words.word,
          definitions: [], // We don't store definitions separately
          completions: {
            mot: curr.words.word,
            type: curr.words.type,
            explication: curr.words.explication,
            niveau_max: "", // We don't store this
            phrases: curr.phrases ? [{
              texte: curr.phrases.texte,
              niveau: curr.phrases.niveau,
              contexte: curr.phrases.contexte,
            }] : [],
            image: {
              prompt: "",
              elements_cles: [],
              objectif_pedagogique: "",
            }, // Provide default empty ImagePrompt
          },
        });
      }
      return acc;
    }, []);

    return groupedResults;
  }

  async saveWords(words_data: Word[]): Promise<void> {
    for (const wordData of words_data) {
      // Insert the word with its completion data and current timestamp
      const [insertedWord] = await this.db
        .insert(words)
        .values({
          originalId: wordData.id,
          word: wordData.word,
          type: wordData.completions.type,
          explication: wordData.completions.explication,
          createdAt: sql`datetime('now')`,
        })
        .returning();

      // Insert phrases
      if (wordData.completions.phrases && wordData.completions.phrases.length > 0) {
        await this.db.insert(phrases).values(
          wordData.completions.phrases.map((phrase) => ({
            wordId: insertedWord.id,
            texte: phrase.texte,
            niveau: phrase.niveau,
            contexte: phrase.contexte,
          }))
        );
      }
    }
  }

  async getWordByWord(word: string) {
    const result = await this.db
      .select()
      .from(words)
      .where(eq(words.word, word));
    return result[0];
  }

  async getAllWords() {
    return await this.db.select().from(words);
  }

  async getWordWithPhrases(wordId: number) {
    const result = await this.db
      .select()
      .from(words)
      .where(eq(words.id, wordId))
      .leftJoin(phrases, eq(phrases.wordId, words.id));
    return result;
  }
}
