import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Onboarding: undefined;
  ResetPassword: undefined;
  EmailValidation: {
    email: string;
  };
  ResetPasswordValidation: {
    email: string;
  };
  RedefinePassword: {
    email: string;
  };
};

export type NavigationProps = NativeStackScreenProps<RootStackParamList>;

export type EmailValidationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EmailValidation"
>;

export type ResetPasswordValidationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ResetPasswordValidation"
>;

export type RedefinePasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "RedefinePassword"
>;
