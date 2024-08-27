import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { getResources } from "../utils/text-resources";
import InputField from "../components/ui/input-field";
import Button from "../components/ui/button";
import CheckboxWithLink from "../components/checkbox-with-link";

interface RegisterFormProps {
  onSubmit: (formData: {
    email: string;
    phoneNumber: string;
    password: string;
    agreeTerms: boolean;
  }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const screenLabels = getResources("register");

  const handleSubmit = () => {
    onSubmit({ email, phoneNumber, password, agreeTerms });
  };

  const onTermsChecked = useCallback((value: boolean) => {
    setAgreeTerms(value);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View style={styles.form}>
      <InputField
        label={screenLabels.emailField}
        value={email}
        onChangeText={setEmail}
        type="email"
      />

      <InputField
        label={screenLabels.phoneField}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        type="phone"
      />

      <InputField
        label={screenLabels.passwordField}
        value={password}
        onChangeText={setPassword}
        type={showPassword ? "text" : "password"}
        rightIcon={showPassword ? "eye-outline" : "eye-off-outline"}
        onRightIconPress={togglePasswordVisibility}
        hint={screenLabels.passwordHint}
      />

      <CheckboxWithLink
        checked={agreeTerms}
        onValueChange={onTermsChecked}
        label={screenLabels.agreeTermsPrefix}
        linkText={screenLabels.termsAndConditions}
        linkUrl="https://www.google.com"
      />

      <Button
        title={screenLabels.submitButton}
        onPress={handleSubmit}
        type="gradient"
        size="large"
        icon="arrow-forward"
        iconPosition="right"
        disabled={!agreeTerms}
        loading={false}
        gradientColors={["#1E0096", "#3300FF"]}
        gradientStart={{ x: 0, y: 0 }}
        gradientEnd={{ x: 1, y: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
});

export default RegisterForm;
