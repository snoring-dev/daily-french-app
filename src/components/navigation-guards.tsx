import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { getProfileCompletionStatus } from "../service/profile.service";
import { SCREENS } from "../utils/navigation-constants";
import { getJWT } from "../utils/auth";

// Protects routes that require authentication
export const withAuthGuard = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const [isChecking, setIsChecking] = useState(true);
    
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const token = await getJWT();
          if (!token) {
            props.navigation.replace(SCREENS.LOGIN);
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          props.navigation.replace(SCREENS.LOGIN);
        } finally {
          setIsChecking(false);
        }
      };
      
      checkAuth();
    }, []);
    
    if (isChecking) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#3300FF" />
        </View>
      );
    }
    
    return <Component {...props} />;
  };
};

// Protects routes that require profile completion
export const withProfileCompletionGuard = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const [isChecking, setIsChecking] = useState(true);
    
    useEffect(() => {
      const checkProfileCompletion = async () => {
        try {
          const status = await getProfileCompletionStatus();
          if (!status.isProfileComplete) {
            if (!status.hasUserInformation) {
              props.navigation.replace(SCREENS.SET_USER_INFO);
            } else if (!status.hasLanguageLevel) {
              props.navigation.replace(SCREENS.LANGUAGE_LEVEL);
            }
          }
        } catch (error) {
          console.error("Profile check failed:", error);
        } finally {
          setIsChecking(false);
        }
      };
      
      checkProfileCompletion();
    }, []);
    
    if (isChecking) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#3300FF" />
        </View>
      );
    }
    
    return <Component {...props} />;
  };
}; 