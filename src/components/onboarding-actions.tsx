import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface OnboardingActionsProps {
  currentIndex: number;
  totalScreens: number;
  onNext: () => void;
  onPrev: () => void;
}

const OnboardingActions: React.FC<OnboardingActionsProps> = ({
  currentIndex,
  totalScreens,
  onNext,
  onPrev,
}) => {
  const isFirstSlide = currentIndex === 0;

  return (
    <View style={styles.container}>
      {!isFirstSlide && (
        <TouchableOpacity onPress={onPrev} style={styles.actionButton}>
          <AntDesign name="left" size={24} color="#007AFF" />
        </TouchableOpacity>
      )}
      {isFirstSlide && <View style={styles.placeholderButton} />}

      <View style={styles.paginationContainer}>
        {[...Array(totalScreens)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity onPress={onNext} style={styles.actionButton}>
        <AntDesign name="right" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    width: "100%",
  },
  actionButton: {
    padding: 10,
  },
  placeholderButton: {
    width: 44,
    height: 44,
  },
  paginationContainer: {
    flexDirection: "row",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CCCCCC",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#FFA500",
  },
});

export default OnboardingActions;
