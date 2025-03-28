import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useTheme } from "../hooks/use-theme";
import { WordCardPager } from "../components/word-card-pager";
import { NavigationProps } from "../utils/root-stack";
import { useRandomWords } from "../hooks/use-random-words";
import LoadingView from "../components/ui/loading-view";

interface WordsScreenProps {}

const WordsScreen = ({ navigation }: WordsScreenProps & NavigationProps) => {
  const { words, loading, error } = useRandomWords();
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.white,
    },
  });

  if (loading) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WordCardPager words={words} goBack={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

export default WordsScreen;
