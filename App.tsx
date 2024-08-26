import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import OnboardingCarousel from "./src/screens/onboarind-screen";
import HomeScreen from "./src/screens/home-screen";
import RegisterScreen from "./src/screens/register-screen";

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Lora: require("./assets/fonts/lora/LoraRegular.ttf"),
          LoraMedium: require("./assets/fonts/lora/LoraMedium.ttf"),
          LoraSemiBold: require("./assets/fonts/lora/LoraSemiBold.ttf"),
          LoraBold: require("./assets/fonts/lora/LoraBold.ttf"),
          Poppins: require("./assets/fonts/poppins/PoppinsRegular.ttf"),
          PoppinsThin: require("./assets/fonts/poppins/PoppinsThin.ttf"),
          PoppinsLight: require("./assets/fonts/poppins/PoppinsLight.ttf"),
          PoppinsSemiBold: require("./assets/fonts/poppins/PoppinsSemiBold.ttf"),
          PoppinsBold: require("./assets/fonts/poppins/PoppinsBold.ttf"),
          PoppinsBlack: require("./assets/fonts/poppins/PoppinsBlack.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const handleOnboardingComplete = () => {
    console.log("Onboarding complete!");
  };

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Register"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Onboarding">
            {(props) => (
              <OnboardingCarousel
                {...props}
                onComplete={handleOnboardingComplete}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
