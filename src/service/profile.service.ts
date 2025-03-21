import { getUserData } from "./users.service";

/**
 * Check if user has completed their profile setup
 * @returns Object with status of different profile parts
 */
export const getProfileCompletionStatus = async () => {
  try {
    const user = await getUserData();
    
    return {
      hasUserInformation: !!(user.firstName && user.lastName),
      hasLanguageLevel: !!user.languageLevel,
      isProfileComplete: !!(user.firstName && user.lastName && user.languageLevel)
    };
  } catch (error) {
    console.error("Error checking profile completion:", error);
    return {
      hasUserInformation: false,
      hasLanguageLevel: false,
      isProfileComplete: false
    };
  }
};

/**
 * Navigate to the appropriate screen based on profile completion
 * @param navigation Navigation object
 */
export const navigateBasedOnProfileCompletion = async (navigation: any) => {
  const status = await getProfileCompletionStatus();
  
  if (!status.hasUserInformation) {
    navigation.replace("SetUserInformation");
  } else if (!status.hasLanguageLevel) {
    navigation.replace("DefineLanguageLevel");
  } else {
    navigation.replace("Home");
  }
}; 