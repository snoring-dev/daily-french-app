import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import theme from "../../theme";
import { TextResources } from "../../utils/text-resources";

interface LoadingViewProps {
  loop?: boolean;
  autoPlay?: boolean;
  speed?: number;
}

const LoadingView: React.FC<LoadingViewProps> = ({
  loop = true,
  autoPlay = true,
  speed = 1,
}) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (autoPlay && animationRef.current) {
      animationRef.current.play();
    }
  }, [autoPlay]);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={require("../../../assets/lotties/loading_words_lottie.json")}
        style={styles.animation}
        loop={loop}
        speed={speed}
        autoPlay={autoPlay}
        resizeMode="cover"
      />
      <Text style={styles.loadingText}>
        {TextResources.loading?.message || "Chargement en cours..."}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  animation: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
  },
  loadingText: {
    marginTop: theme.spacing.s,
    fontSize: theme.spacing.m,
    color: theme.color.primaryBlue,
    textAlign: "center",
    fontFamily: theme.font.primary.regular,
  },
});

export default LoadingView;
