import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { getResources } from "../utils/text-resources";
import InputField from "./ui/input-field";
import Button from "./ui/button";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onForgotPassword: () => void;
  onRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onForgotPassword,
  onRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const screenLabels = getResources("login");

  const handleLogin = () => {
    onLogin(email, password);
  };

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
        label={screenLabels.passwordField}
        value={password}
        onChangeText={setPassword}
        type={showPassword ? "text" : "password"}
        rightIcon={showPassword ? "eye-outline" : "eye-off-outline"}
        onRightIconPress={togglePasswordVisibility}
      />

      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={onForgotPassword}
      >
        <Text style={styles.forgotPasswordText}>
          {screenLabels.forgotPassword}
        </Text>
      </TouchableOpacity>

      <Button
        title={screenLabels.loginButton}
        onPress={handleLogin}
        type="gradient"
        size="large"
        gradientColors={["#1E0096", "#3300FF"]}
        gradientStart={{ x: 0, y: 0 }}
        gradientEnd={{ x: 1, y: 0 }}
      />

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>{screenLabels.dontHaveAccount} </Text>
        <TouchableOpacity onPress={onRegister}>
          <Text style={styles.registerLink}>{screenLabels.registerNow}</Text>
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
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    fontFamily: "Poppins",
  },
  registerLink: {
    color: "#007AFF",
    fontFamily: "PoppinsBold",
  },
});

export default LoginForm;
