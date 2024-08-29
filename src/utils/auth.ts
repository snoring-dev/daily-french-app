import * as SecureStore from "expo-secure-store";

export const JWT_KEY = "user_jwt";

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
