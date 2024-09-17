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
import { RedefinePasswordScreenProps } from "../utils/root-stack";
import { getResources } from "../utils/text-resources";
import RedefinePasswordForm from "../components/redefine-password-form";
import { showAlert } from "../utils/alert";
import { setNewPassword } from "../service/auth.service";

const RedefinePasswordScreen: React.FC<RedefinePasswordScreenProps> = ({
  navigation,
  route,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const screenLabels = getResources("redefinePassword");
  const { email } = route.params;

  const handleRedefinePassword = async (formData: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setIsLoading(true);
      await setNewPassword(email, formData.password, formData.confirmPassword);
      showAlert({
        title: screenLabels.successTitle,
        message: screenLabels.successMessage,
      });
      navigation.navigate("Login");
    } catch (err: any) {
      showAlert({
        title: getResources("global").errorTitle,
        message: err.message,
      });
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
              <RedefinePasswordForm
                onRedefinePassword={handleRedefinePassword}
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
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
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

export default RedefinePasswordScreen;
