import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Onboarding: undefined;
  ResetPassword: undefined;
  EmailValidation: {
    email: string;
  };
  ResetPasswordValidation: undefined;
  SetUserInformation: undefined;
  DefineLanguageLevel: undefined;
};

export type NavigationProps = StackScreenProps<RootStackParamList>;

export type EmailValidationScreenProps = StackScreenProps<
  RootStackParamList,
  "EmailValidation"
>;

export type SetUserInformationScreenProps = StackScreenProps<
  RootStackParamList,
  "SetUserInformation"
>;
