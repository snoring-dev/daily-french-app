import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import OnboardingCarousel from "./src/screens/onboarding";
import HomeScreen from "./src/screens/home";
import RegisterScreen from "./src/screens/register";
import LoginScreen from "./src/screens/login";
import EmailValidationScreen from "./src/screens/email-validation";
import { setOnboardingDone } from "./src/utils/storage";
import { getUserData } from "./src/service/users.service";
import { RootStackParamList } from "./src/utils/root-stack";
import ResetPasswordValidationScreen from "./src/screens/reset-password-validation";
import ResetPasswordScreen from "./src/screens/reset-password";
import RedefinePasswordScreen from "./src/screens/redefine-password";

const Stack = createStackNavigator();

type Screens = keyof RootStackParamList;

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialScreen, setInitialScreen] = useState<Screens>("Login");

  const loadFonts = async () => {
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
  };

  const loadUserData = async () => {
    const response = await getUserData();

    if (response.data.id) {
      setInitialScreen("Home");
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
        await loadUserData();
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

  const handleOnboardingComplete = async () => {
    await setOnboardingDone(true);
  };

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialScreen}
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
          <Stack.Screen
            name="EmailValidation"
            component={EmailValidationScreen as React.ComponentType<any>}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="ResetPasswordValidation"
            component={
              ResetPasswordValidationScreen as React.ComponentType<any>
            }
          />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen
            name="RedefinePassword"
            component={RedefinePasswordScreen as React.ComponentType<any>}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
