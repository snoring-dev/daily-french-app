import * as SecureStore from "expo-secure-store";

export const ONBOARDING_KEY = "onboarding_done";

export const setOnboardingDone = async (done: boolean) => {
  try {
    await SecureStore.setItemAsync(ONBOARDING_KEY, JSON.stringify(done));
  } catch (e) {
    console.error("Failed to save onboarding status", e);
  }
};

export const getOnboardingStatus = async () => {
  try {
    const status = await SecureStore.getItemAsync(ONBOARDING_KEY);
    return status ? JSON.parse(status) : false;
  } catch (e) {
    console.error("Failed to get onboarding status", e);
    return false;
  }
};
