import * as SecureStore from "expo-secure-store";

export const JWT_KEY = "user_jwt";
export const USER_DATA_KEY = "user_data";

export async function getJWT(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(JWT_KEY);
  } catch (error) {
    console.error("Error retrieving JWT:", error);
    return null;
  }
}

export async function setJWT(jwt: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(JWT_KEY, jwt);
  } catch (error) {
    console.error("Error storing JWT:", error);
  }
}

export async function removeJWT(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(JWT_KEY);
  } catch (error) {
    console.error("Error removing JWT:", error);
  }
}

export async function saveUserData(userData: any): Promise<void> {
  try {
    const userDataString = JSON.stringify(userData);
    await SecureStore.setItemAsync(USER_DATA_KEY, userDataString);
  } catch (error) {
    console.error("Error storing user data:", error);
  }
}

export async function getLocalUserData(): Promise<any | null> {
  try {
    const userDataString = await SecureStore.getItemAsync(USER_DATA_KEY);
    console.log('USER_DATA:Storage =>', userDataString);
    if (!userDataString) return null;
    return JSON.parse(userDataString);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
}


