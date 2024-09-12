import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { NavigationProps } from "../utils/root-stack";
import { getResources } from "../utils/text-resources";
import LoginForm from "../components/login-form";
import { showAlert } from "../utils/alert";
import { doLogin } from "../service/auth.service";
import { setJWT } from "../utils/auth";

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps & NavigationProps> = ({
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const screenLabels = getResources("login");

  const handleLogin = async (formData: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const jwt = await doLogin(formData);
      await setJWT(jwt);
      navigation.navigate("Home");
    } catch (err: any) {
      showAlert({
        title: getResources("global").errorTitle,
        message: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ResetPassword");
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{screenLabels.title}</Text>
              <Text style={styles.subtitle}>{screenLabels.subtitle}</Text>
              <LoginForm
                onLogin={handleLogin}
                onForgotPassword={handleForgotPassword}
                onRegister={handleRegister}
                isSubmitting={isLoading}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 30,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 50,
    textAlign: "center",
    fontFamily: "PoppinsLight",
  },
});

export default LoginScreen;
