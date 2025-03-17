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
  originalId: number;
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

/**
 * Interface for the word image response
 */
export interface WordImageResponse {
  word: string;
  image: {
    imageData: {
      images: {
        url: string;
        width: number;
        height: number;
        content_type: string;
      }[];
      timings: {
        inference: number;
      };
      seed: number;
      has_nsfw_concepts: boolean[];
      prompt: string;
    };
    requestId: string;
  };
}

/**
 * Fetches the image URL for a specific word
 * @param wordId The ID of the word to fetch the image for
 * @returns Promise with the image URL
 */
export const getWordImage = async (wordId: number): Promise<string> => {
  const resp = await api.get<WordImageResponse>(`/words/${wordId}/image`);
  return resp.data.image.imageData.images[0].url;
};
