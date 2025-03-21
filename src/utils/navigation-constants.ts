// Navigation screen names
export const SCREENS = {
  ONBOARDING: "Onboarding",
  LOGIN: "Login",
  REGISTER: "Register",
  EMAIL_VALIDATION: "EmailValidation",
  SET_USER_INFO: "SetUserInformation",
  LANGUAGE_LEVEL: "DefineLanguageLevel",
  HOME: "Home",
  RESET_PASSWORD: "ResetPassword"
};

// Common navigation paths
export const NAVIGATION_PATHS = {
  AUTH_FLOW: [SCREENS.LOGIN, SCREENS.REGISTER, SCREENS.EMAIL_VALIDATION],
  PROFILE_SETUP_FLOW: [SCREENS.SET_USER_INFO, SCREENS.LANGUAGE_LEVEL],
  POST_LOGIN: SCREENS.HOME
}; 