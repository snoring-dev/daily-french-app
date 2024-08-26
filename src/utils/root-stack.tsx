import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Onboarding: undefined;
  ResetPassword: undefined;
  EmailValidation: undefined;
  ResetPasswordValidation: undefined;
};

export type NavigationProps = NativeStackScreenProps<RootStackParamList>;
