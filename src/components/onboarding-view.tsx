import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";

interface OnboardingViewProps {
  title: string;
  content: string;
  SvgImage: React.FC<SvgProps>;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({
  title,
  content,
  SvgImage,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.imageContainer}>
        <SvgImage width={300} height={300} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default OnboardingView;
