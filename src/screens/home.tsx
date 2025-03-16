import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { getRandomWords } from "../service/word.service";
import { Word } from "../service/word.service";
import { useSQLiteContext } from "expo-sqlite";
import { WordRepository } from "../database/repositories/words.repository";

const HomeScreen = () => {
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

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={true}
          >
            <Text style={styles.text}>Welcome to the Home Screen!</Text>
            <Text style={styles.subtitle}>Random Words:</Text>
            {words.map((word) => (
              <View key={word.id} style={styles.wordContainer}>
                <Text style={styles.wordText}>
                  {word.word}({word.completions.type})
                </Text>
                {word?.completions && (
                  <Text style={styles.definitionText}>
                    {word.completions.explication}
                  </Text>
                )}

                {/* Add phrases as a bulleted list */}
                {word.completions.phrases &&
                  word.completions.phrases.length > 0 && (
                    <View style={styles.phrasesContainer}>
                      <Text style={styles.phrasesTitle}>Example Phrases:</Text>
                      {word.completions.phrases.map((phrase, index) => (
                        <View key={index} style={styles.phraseItem}>
                          <Text style={styles.bulletPoint}>•</Text>
                          <View style={styles.phraseContent}>
                            <Text style={styles.phraseText}>
                              {phrase.texte}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    paddingVertical: 10,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 15,
  },
  wordContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  wordText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  definitionText: {
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    margin: 20,
  },
  phrasesContainer: {
    marginTop: 10,
    backgroundColor: "#fff",
  },
  phrasesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  phraseItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 5,
  },
  phraseContent: {
    flexDirection: "column",
  },
  phraseText: {
    fontSize: 16,
  },
  phraseLevel: {
    fontSize: 14,
    color: "#555",
  },
});

export default HomeScreen;
