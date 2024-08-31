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
import RegisterForm from "../components/register-form";
import api from "../utils/request";
import { saveUser } from "../service/users.service";

interface RegisterScreenProps {}

const RegisterScreen: React.FC<RegisterScreenProps & NavigationProps> = ({
  navigation,
}) => {
  const screenLabels = getResources("register");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (formData: {
    email: string;
    phone: { callingCode: string; number: string };
    password: string;
    agreeTerms: boolean;
  }) => {
    try {
      setIsLoading(true);
      if (formData.agreeTerms) {
        const success = await saveUser(formData);

        if (success) {
          navigation.navigate("EmailValidation", { email: formData.email });
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{screenLabels.title}</Text>
              <Text style={styles.subtitle}>{screenLabels.subtitle}</Text>
              <RegisterForm
                onSubmit={handleRegister}
                isSubmitting={isLoading}
                onLogin={() => navigation.navigate("Login")}
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

export default RegisterScreen;
