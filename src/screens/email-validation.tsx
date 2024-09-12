import React, { useCallback, useState } from "react";
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
import { EmailValidationScreenProps } from "../utils/root-stack";
import { getResources } from "../utils/text-resources";
import EmailValidationForm from "../components/email-validation-form";
import {
  resendEmailValidationCode,
  submitValidationCode,
} from "../service/users.service";
import {
  showCodeSendingErrorAlert,
  showCodeSentAlert,
  showErrorAlert,
} from "../utils/alert";

const EmailValidationScreen: React.FC<EmailValidationScreenProps> = ({
  navigation,
  route,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const screenLabels = getResources("emailValidation");
  const { email } = route.params;

  const handleCodeSubmit = useCallback(
    async (formData: { email: string; code: number }) => {
      try {
        setIsLoading(true);
        const resp = await submitValidationCode(formData.email, formData.code);
        if (resp) {
          navigation.navigate("Login");
        }
      } catch (e: any) {
        showErrorAlert(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleResend = useCallback(async () => {
    try {
      const resp = await resendEmailValidationCode();
      if (resp) {
        showCodeSentAlert();
      }
    } catch (e: any) {
      showErrorAlert(e.message);
      showCodeSendingErrorAlert();
    }
  }, []);

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
              <EmailValidationForm
                email={email}
                onSubmit={handleCodeSubmit}
                onRequestAnotherCode={handleResend}
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

export default EmailValidationScreen;
