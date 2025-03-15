import api from "../utils/request";

// Types for the word response
export interface Phrase {
  texte: string;
  niveau: string;
  contexte: string;
}

export interface ImagePrompt {
  prompt: string;
  elements_cles: string[];
  objectif_pedagogique: string;
}

export interface WordCompletion {
  mot: string;
  type: string;
  explication: string;
  niveau_max: string;
  phrases: Phrase[];
  image: ImagePrompt;
}

export interface Word {
  id: number;
  userId: number;
  word: string;
  definitions: string[];
  completions: WordCompletion;
}

/**
 * Fetches multiple random words from the API
 * @param count Number of random words to fetch
 * @returns Promise with an array of random word data
 */
export const getRandomWords = async (): Promise<Word[]> => {
  const resp = await api.get(`/words/random`);
  return resp.data;
};
