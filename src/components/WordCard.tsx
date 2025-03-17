import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Word } from '../service/word.service';
import { useTheme } from '../hooks/use-theme';
import { Theme } from '../theme';

interface WordCardProps {
  word: Word;
}
const getStyles = (theme: Theme) => StyleSheet.create({
  wordContainer: {
    backgroundColor: theme.color.white,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginVertical: theme.spacing.s,
    width: "100%",
    ...theme.shadow.small,
  },
  wordText: {
    fontSize: theme.fontSize.xxxl,
    marginBottom: theme.spacing.s,
    fontFamily: theme.font.decorative.regular,
  },
  wordType: {
    fontSize: theme.fontSize.xs,
    marginBottom: theme.spacing.s,
    fontFamily: theme.font.primary.regular,
    textTransform: "capitalize",
    backgroundColor: theme.color.softGray,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing[1],
    borderRadius: theme.borderRadius.round,
    alignSelf: "flex-start",
    color: theme.color.textSecondary,
  },
  definitionText: {
    fontSize: theme.fontSize.m,
    color: theme.color.textSecondary,
    fontFamily: theme.font.primary.regular,
  },
  phrasesContainer: {
    marginTop: theme.spacing.m,
    backgroundColor: theme.color.white,
  },
  phrasesTitle: {
    fontSize: theme.fontSize.l,
    fontFamily: theme.font.primary.bold,
    marginBottom: theme.spacing.s,
  },
  phraseItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.s,
  },
  bulletPoint: {
    fontSize: theme.fontSize.l,
    fontFamily: theme.font.primary.bold,
    marginRight: theme.spacing.s,
  },
  phraseContent: {
    flexDirection: "column",
  },
  phraseText: {
    fontSize: theme.fontSize.m,
    fontFamily: theme.font.primary.regular,
  },
});

export const WordCard = ({ word }: WordCardProps) => {
  const theme = useTheme();
  
  const styles = getStyles(theme);

  return (
    <View style={styles.wordContainer}>
      <Text style={styles.wordText}>
        {word.word}
      </Text>
      <Text style={styles.wordType}>
        {word.completions.type}
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
  );
}; 