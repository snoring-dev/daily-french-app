import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import OnboardingCarousel from "./src/screens/onboarind-screen";
import HomeScreen from "./src/screens/home-screen";

const Stack = createStackNavigator();

export default function App() {
  const handleOnboardingComplete = () => {
    console.log("Onboarding complete!");
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
