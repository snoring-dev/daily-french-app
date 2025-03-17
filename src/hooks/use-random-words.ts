import { useState, useEffect } from "react";
import { Word } from "../service/word.service";
import { getRandomWords } from "../service/word.service";
import { useSQLiteContext } from "expo-sqlite";
import { WordRepository } from "../database/repositories/words.repository";

export const useRandomWords = () => {
  const db = useSQLiteContext();
  const wordRepository = new WordRepository(db);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRandomWords = async () => {
      try {
        setLoading(true);
        // First try to get today's words from local database
        const todaysWords = await wordRepository.getTodaysWords();

        if (todaysWords.length > 0) {
          // If we have words from today, use those
          setWords(todaysWords);
          setError(null);
        } else {
          // If no words from today, fetch new ones from API
          const randomWords = await getRandomWords();
          setWords(randomWords);
          setError(null);
          // Save the new words to the database
          await wordRepository.saveWords(randomWords);
        }
      } catch (err) {
        console.error("Failed to load words:", err);
        setError("Failed to load words. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadRandomWords();
  }, []);

  return { words, loading, error };
};
