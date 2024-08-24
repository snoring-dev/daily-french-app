import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import OnboardingActions from "../components/onboarding-actions";
import OnboardingView from "../components/onboarding-view";

// SVGs for each step
import Step1SVG from "../../assets/onboarding_step_1.svg";
import Step2SVG from "../../assets/onboarding_step_2.svg";
import Step3SVG from "../../assets/onboarding_step_3.svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const onboardingData = [
  {
    title: "Découvrez Votre Aventure Linguistique",
    content:
      "Apprenez 5 nouveaux mots français chaque jour et enrichissez votre vocabulaire de manière ludique et efficace.",
    SvgImage: Step1SVG,
  },
  {
    title: "Restez Organisé avec nos Outils",
    content:
      "Profitez de quiz quotidiens pour tester vos connaissances et de vidéos courtes en français pour améliorer votre compréhension.",
    SvgImage: Step2SVG,
  },
  {
    title: "Progressez à Votre Rythme",
    content:
      "Accédez à une sélection de ressources utiles pour perfectionner votre français et suivez votre progression au fil du temps.",
    SvgImage: Step3SVG,
  },
];

interface OnboardingCarouselProps {
  onComplete: () => void;
  navigation: any;
}

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({
  onComplete,
  navigation
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const isLastSlide = currentIndex === onboardingData.length - 1;

  const handleComplete = useCallback(() => {
    onComplete();
    navigation.replace('Home');
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleNext = () => {
    if (currentIndex >= onboardingData.length - 1) {
      handleComplete();
    } else {
      setCurrentIndex(prev => prev + 1);
      scrollTo(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      scrollTo(currentIndex - 1);
    }
  };

  const scrollTo = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * SCREEN_WIDTH,
      animated: true,
    });
  };

  const scrollViewRef = React.useRef<Animated.ScrollView>(null);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {!isLastSlide && (
        <TouchableOpacity style={styles.skipButton} onPress={handleComplete}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      )}
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {onboardingData.map((step, index) => (
          <View key={index} style={styles.slide}>
            <OnboardingView
              title={step.title}
              content={step.content}
              SvgImage={step.SvgImage}
            />
          </View>
        ))}
      </Animated.ScrollView>
      <OnboardingActions
        currentIndex={currentIndex}
        totalScreens={onboardingData.length}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  slide: {
    width: SCREEN_WIDTH,
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 1,
  },
  skipButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
});

export default OnboardingCarousel;
