import { createStackNavigator } from "@react-navigation/stack";
import OnboardingCarousel from "../screens/onboarding";
import HomeScreen from "../screens/home";
import RegisterScreen from "../screens/register";
import LoginScreen from "../screens/login";
import EmailValidationScreen from "../screens/email-validation";
import SetUserInformationScreen from "../screens/set-user-information";
import DefineLanguageLevelScreen from "../screens/define-language-level";
import { RootStackParamList } from "../utils/root-stack";

const Stack = createStackNavigator<RootStackParamList>();

interface RootNavigatorProps {
  initialScreen: keyof RootStackParamList;
  onOnboardingComplete: () => Promise<void>;
}

export function RootNavigator({
  initialScreen,
  onOnboardingComplete,
}: RootNavigatorProps) {
  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="Onboarding" 
        options={{ headerShown: false }}>
        {(props) => <OnboardingCarousel {...props} onComplete={onOnboardingComplete} />}
      </Stack.Screen>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="EmailValidation" 
        component={EmailValidationScreen} 
        options={{ 
          headerShown: true,
          headerTitle: "Verify Email",
          headerBackTitle: "Back"
        }} 
      />
      <Stack.Screen 
        name="SetUserInformation" 
        component={SetUserInformationScreen} 
        options={{ 
          headerShown: false,
          gestureEnabled: false 
        }} 
      />
      <Stack.Screen 
        name="DefineLanguageLevel" 
        component={DefineLanguageLevelScreen} 
        options={{ 
          headerShown: false,
          gestureEnabled: false 
        }} 
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          headerShown: false,
          gestureEnabled: false 
        }} 
      />
    </Stack.Navigator>
  );
}
