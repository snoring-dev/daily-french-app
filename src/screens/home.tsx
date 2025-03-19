import React from "react";
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { useRandomWords } from "../hooks/use-random-words";
import { useTheme } from "../hooks/use-theme";
import { WordCardPager } from "../components/word-card-pager";
import LoadingView from "../components/ui/loading-view";

const HomeScreen = () => {
  const { words, loading, error } = useRandomWords();
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.white,
    },
    content: {
      flex: 1,
    },
  });

  const renderView = () => {
    if (loading) {
      return <LoadingView />;
    }

    return (
      <>
        <StatusBar barStyle="light-content" />
        <View style={styles.content}>
          <WordCardPager words={words} />
        </View>
      </>
    );
  };

  return <SafeAreaView style={styles.container}>{renderView()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
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
  errorText: {
    color: "red",
    textAlign: "center",
    margin: 20,
  },
});

export default HomeScreen;
