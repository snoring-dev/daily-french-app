import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/root-stack";

// Create navigator using v7 syntax
export const Stack = createStackNavigator<RootStackParamList>();
