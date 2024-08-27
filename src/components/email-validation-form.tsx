import React, { useCallback, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { getResources } from "../utils/text-resources";
import InputField from "./ui/input-field";
import Button from "./ui/button";

const screenLabels = getResources("emailValidation");

interface EmailValidationFormProps {}

const EmailValidationForm: React.FC<EmailValidationFormProps> = () => {
  const [validationCode, setValidationCode] = useState("");

  const setCode = useCallback((value: string) => {
    setValidationCode(value);
  }, []);

  return (
    <View style={styles.form}>
      <InputField
        label={screenLabels.codeField}
        value={validationCode}
        onChangeText={setCode}
        type="text"
      />

      <Button
        title={screenLabels.submitButton}
        onPress={() => {}}
        type="gradient"
        size="large"
        gradientColors={["#1E0096", "#3300FF"]}
        gradientStart={{ x: 0, y: 0 }}
        gradientEnd={{ x: 1, y: 0 }}
      />

      <View style={styles.resendCodeContainer}>
        <Text style={styles.resendCodeLabel}>
          {screenLabels.codeNotReceived}{" "}
        </Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.resendCodeLink}>{screenLabels.resendCode}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#007AFF",
    fontFamily: "Poppins",
  },
  resendCodeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  resendCodeLabel: {
    fontFamily: "Poppins",
  },
  resendCodeLink: {
    color: "#007AFF",
    fontFamily: "PoppinsBold",
  },
});

export default EmailValidationForm;
