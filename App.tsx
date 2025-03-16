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
import SetUserInformationScreen from "./src/screens/set-user-information";
import { setOnboardingDone } from "./src/utils/storage";
import { getUserData } from "./src/service/users.service";
import { RootStackParamList } from "./src/utils/root-stack";
import { removeJWT, removeUserData, saveUserData } from "./src/utils/auth";
import DefineLanguageLevelScreen from "./src/screens/define-language-level";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "./drizzle/migrations";
import { RootNavigator } from "./src/navigation/RootNavigator";

export const DATABASE_NAME = "daily_french";

const Stack = createStackNavigator();

type Screens = keyof RootStackParamList;

const LOGIN_NEXT_SCREEN = "Home";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

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
    const responseData = await getUserData();

    if (responseData.id) {
      await saveUserData(responseData);
      setInitialScreen(LOGIN_NEXT_SCREEN);
    }
  };

  useEffect(() => {
    async function cleanUp() {
      await removeUserData();
      await removeJWT();
    }

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

    // cleanUp();
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
    console.log("Onboarding complete!");
    await setOnboardingDone(true);
  };

  console.log("initialScreen =>", initialScreen);
  console.log("DB =>", { success, error });

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
      >
        <NavigationContainer>
          <RootNavigator 
            initialScreen={initialScreen}
            onOnboardingComplete={handleOnboardingComplete}
          />
        </NavigationContainer>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
