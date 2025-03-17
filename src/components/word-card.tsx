import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Word } from '../service/word.service';
import { useTheme } from '../hooks/use-theme';
import { Theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import { getResources } from '../utils/text-resources';
import { useWordImage } from '../hooks/use-word-image';

interface WordCardProps {
  word: Word;
}

const getStyles = (theme: Theme) => StyleSheet.create({
  cardContainer: {
    width: "100%",
    marginVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
    ...theme.shadow.medium,
  },
  gradientHeader: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderTopLeftRadius: theme.borderRadius.m,
    borderTopRightRadius: theme.borderRadius.m,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wordText: {
    fontSize: theme.fontSize.xxxl * 1.2,
    fontFamily: theme.font.decorative.regular,
    color: theme.color.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    flex: 1,
  },
  contentContainer: {
    backgroundColor: theme.color.white,
    padding: theme.spacing.l,
    borderBottomLeftRadius: theme.borderRadius.m,
    borderBottomRightRadius: theme.borderRadius.m,
  },
  wordTypeContainer: {
    marginLeft: theme.spacing.m,
  },
  wordTypeContainerBelow: {
    marginTop: theme.spacing.s,
    alignSelf: 'flex-start',
  },
  wordType: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.font.primary.regular,
    textTransform: "capitalize",
    backgroundColor: theme.color.white,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing[1],
    borderRadius: theme.borderRadius.round,
    alignSelf: "flex-start",
    color: theme.color.navyBlue,
  },
  definitionContainer: {
    backgroundColor: theme.color.softBeige,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.l,
    borderLeftWidth: 3,
    borderLeftColor: theme.color.lightGold,
  },
  definitionText: {
    fontSize: theme.fontSize.m,
    color: theme.color.textPrimary,
    fontFamily: theme.font.secondary.regular,
    lineHeight: theme.fontSize.m * 1.5,
    fontStyle: 'italic',
  },
  phrasesContainer: {
    marginTop: theme.spacing.m,
  },
  phrasesTitle: {
    fontSize: theme.fontSize.l,
    fontFamily: theme.font.primary.bold,
    marginBottom: theme.spacing.m,
    color: theme.color.primaryBlue,
    borderBottomWidth: 1,
    borderBottomColor: theme.color.borderLight,
    paddingBottom: theme.spacing.xs,
  },
  phraseItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: theme.spacing.m,
    backgroundColor: theme.color.softGray,
    borderRadius: theme.borderRadius.s,
    padding: theme.spacing.m,
  },
  bulletPoint: {
    fontSize: theme.fontSize.l,
    fontFamily: theme.font.primary.bold,
    marginRight: theme.spacing.s,
    color: theme.color.accentRed,
  },
  phraseContent: {
    flex: 1,
  },
  phraseText: {
    fontSize: theme.fontSize.m,
    fontFamily: theme.font.primary.regular,
    lineHeight: theme.fontSize.m * 1.4,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
    backgroundColor: theme.color.softGray,
    ...theme.shadow.small,
  },
  wordImage: {
    width: '100%',
    height: '100%',
  },
  imageLoadingContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLoadingText: {
    color: theme.color.textSecondary,
    fontFamily: theme.font.primary.regular,
  },
});

export const WordCard = ({ word }: WordCardProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const wordCardTexts = getResources('wordCard');
  const [isTypeLong, setIsTypeLong] = useState(false);
  const { imageUrl, isLoading, error } = useWordImage(word.originalId);

  useEffect(() => {
    if (word.completions.type && word.completions.type.length > 20) {
      setIsTypeLong(true);
    } else {
      setIsTypeLong(false);
    }
  }, [word.completions.type]);

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={theme.gradient.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientHeader}
      >
        {!isTypeLong ? (
          // If type is not long, show word and type side by side
          <View style={styles.headerRow}>
            <Text style={styles.wordText}>
              {word.word}
            </Text>
            <View style={styles.wordTypeContainer}>
              <Text style={styles.wordType}>
                {word.completions.type}
              </Text>
            </View>
          </View>
        ) : (
          // If type is long, show type below the word
          <>
            <Text style={styles.wordText}>
              {word.word}
            </Text>
            <View style={styles.wordTypeContainerBelow}>
              <Text style={styles.wordType}>
                {word.completions.type}
              </Text>
            </View>
          </>
        )}
      </LinearGradient>
      
      <View style={styles.contentContainer}>
        {word?.completions && (
          <View style={styles.definitionContainer}>
            <Text style={styles.definitionText}>
              {word.completions.explication}
            </Text>
          </View>
        )}

        {imageUrl && (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: imageUrl }} 
              style={styles.wordImage}
              resizeMode="cover"
            />
          </View>
        )}
        
        {isLoading && (
          <View style={styles.imageContainer}>
            <View style={styles.imageLoadingContainer}>
              <Text style={styles.imageLoadingText}>Loading image...</Text>
            </View>
          </View>
        )}

        {word.completions.phrases &&
          word.completions.phrases.length > 0 && (
            <View style={styles.phrasesContainer}>
              <Text style={styles.phrasesTitle}>{wordCardTexts.examplePhrases}</Text>
              {word.completions.phrases.map((phrase, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.phraseItem}
                  activeOpacity={0.7}
                >
                  <Text style={styles.bulletPoint}>•</Text>
                  <View style={styles.phraseContent}>
                    <Text style={styles.phraseText}>
                      {phrase.texte}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
      </View>
    </View>
  );
}; 