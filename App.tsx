import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import OnboardingCarousel from "./src/components/onboarind-carousel";

export default function App() {
  return (
    <SafeAreaProvider>
      <OnboardingCarousel onComplete={() => console.log("OnBoarding done!")} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
