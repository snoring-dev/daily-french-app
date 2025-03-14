import React, { useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const CARD_HEIGHT = CARD_WIDTH * (16/9);
const SPACING = 10;

const images = [
  require("../../assets/images/A1.jpg"),
  require("../../assets/images/A2.jpg"),
  require("../../assets/images/B1.jpg"),
  require("../../assets/images/B2.jpg"),
  require("../../assets/images/C1.jpg"),
  require("../../assets/images/C2.jpg"),
];

const LanguageLevelCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<Animated.ScrollView>(null);

  const onScrollHandler = (event: any) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollX.value / (CARD_WIDTH + SPACING));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollTo({
        x: index * (CARD_WIDTH + SPACING),
        animated: true,
      });
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * (CARD_WIDTH + SPACING),
        index * (CARD_WIDTH + SPACING),
        (index + 1) * (CARD_WIDTH + SPACING),
      ];

      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.8, 1, 0.8],
        { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
      );

      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.6, 1, 0.6],
        { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
      );

      const translateY = interpolate(
        scrollX.value,
        inputRange,
        [20, 0, 20],
        { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
      );

      return {
        transform: [{ scale }, { translateY }],
        opacity,
      };
    });

    return (
      <Animated.View style={[styles.cardContainer, animatedStyle]}>
        <Image source={item} style={styles.image} resizeMode="cover" />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Animated.ScrollView
          ref={flatListRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          snapToInterval={CARD_WIDTH + SPACING}
          decelerationRate="fast"
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
        >
          {images.map((image, index) => (
            <View key={index} style={{ width: CARD_WIDTH, marginRight: SPACING }}>
              {renderItem({ item: image, index })}
            </View>
          ))}
        </Animated.ScrollView>

        <View style={styles.pagination}>
          {images.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                activeIndex === index && styles.paginationDotActive,
              ]}
              onPress={() => scrollToIndex(index)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  carouselContainer: {
    height: CARD_HEIGHT + 30, // Add space for pagination dots
    alignItems: "center",
  },
  scrollViewContent: {
    paddingHorizontal: SCREEN_WIDTH * 0.1,
    alignItems: "center",
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#333",
    transform: [{ scale: 1.2 }],
  },
});

export default LanguageLevelCarousel;
