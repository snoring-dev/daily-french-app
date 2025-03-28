import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Word } from "../service/word.service";
import { WordCard } from "./word-card";
import { useTheme } from "../hooks/use-theme";
import { Theme } from "../theme";

interface WordCardPagerProps {
  words: Word[];
  onWordChange?: (index: number) => void;
  goBack: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    pagerContainer: {
      flex: 1,
    },
    pageItem: {
      width: SCREEN_WIDTH,
      height: "100%",
    },
    scrollViewContainer: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 80,
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderTopWidth: 1,
      borderTopColor: theme.color.borderLight,
    },
    paginationContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.color.mediumGray,
      marginHorizontal: 4,
    },
    activeDot: {
      width: 24,
      backgroundColor: theme.color.primaryBlue,
    },
    navButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.color.primaryBlue,
      justifyContent: "center",
      alignItems: "center",
    },
    navButtonDisabled: {
      backgroundColor: theme.color.softGray,
    },
    navButtonDone: {
      backgroundColor: theme.color.successGreen,
    },
    navButtonText: {
      color: theme.color.white,
      fontSize: 18,
      fontWeight: "bold",
    },
  });

export const WordCardPager = ({
  words,
  onWordChange,
  goBack,
}: WordCardPagerProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollViewRefs = useRef<{ [key: number]: ScrollView | null }>({});

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentIndex(index);
      if (onWordChange) {
        onWordChange(index);
      }

      // Reset scroll position when changing pages
      Object.values(scrollViewRefs.current).forEach((ref) => {
        ref?.scrollTo({ y: 0, animated: false });
      });
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const goToPage = (index: number) => {
    if (index >= 0 && index < words.length) {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
      });
    }
  };

  const goToNext = () => {
    if (currentIndex < words.length - 1) {
      goToPage(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      goToPage(currentIndex - 1);
    }
  };

  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex === words.length - 1;

  const renderItem = ({ item, index }: { item: Word; index: number }) => (
    <View style={styles.pageItem}>
      <ScrollView
        ref={(ref) => (scrollViewRefs.current[index] = ref)}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollViewContainer}
        nestedScrollEnabled={true}
      >
        <WordCard word={item} />
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={words}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => `word-${item.id || index}`}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, isFirstPage && styles.navButtonDisabled]}
          onPress={goToPrevious}
          disabled={isFirstPage}
        >
          <Text style={styles.navButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.paginationContainer}>
          {words.map((_, index) => (
            <View
              key={`dot-${index}`}
              style={[
                styles.paginationDot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.navButton, isLastPage && styles.navButtonDone]}
          onPress={isLastPage ? goBack : goToNext}
        >
          {isLastPage ? (
            <FontAwesome6 name="check" size={24} color="white" />
          ) : (
            <Text style={styles.navButtonText}>→</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
