import { useState, useEffect } from "react";
import { getWordImage } from "../service/word.service";

interface UseWordImageResult {
  imageUrl: string | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch the image URL for a specific word
 * @param wordId The ID of the word to fetch the image for
 * @returns Object containing the image URL, loading state, and any error
 */
export const useWordImage = (wordId: number | null): UseWordImageResult => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Reset states when wordId changes
    setImageUrl(null);
    setError(null);

    // Don't fetch if wordId is null
    if (wordId === null) return;

    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const url = await getWordImage(wordId);
        setImageUrl(url);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch image")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [wordId]);

  return { imageUrl, isLoading, error };
};
