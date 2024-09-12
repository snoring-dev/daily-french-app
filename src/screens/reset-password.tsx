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
import ResetPasswordForm from "../components/reset-password-form";
import { requestPasswordReset } from "../service/auth.service";
import { showCodeSendingErrorAlert, showCodeSentAlert } from "../utils/alert";

interface ResetPasswordProps {}

const ResetPasswordScreen: React.FC<ResetPasswordProps & NavigationProps> = ({
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const screenLabels = getResources("resetPassword");

  const requestPasswordModification = async (data: { email: string }) => {
    try {
      setIsLoading(true);
      await requestPasswordReset(data);
      showCodeSentAlert(() => {
        navigation.navigate("ResetPasswordValidation", { email: data.email });
      });
    } catch (e: any) {
      showCodeSendingErrorAlert();
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
          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{screenLabels.title}</Text>
              <Text style={styles.subtitle}>{screenLabels.subtitle}</Text>
              <ResetPasswordForm
                isSubmitting={isLoading}
                onConfirm={requestPasswordModification}
                redirectToLogin={() => navigation.navigate("Login")}
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

export default ResetPasswordScreen;
