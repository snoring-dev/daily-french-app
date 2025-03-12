import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { getResources } from "../utils/text-resources";
import InputField from "./ui/input-field";
import Button from "./ui/button";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const screenLabels = getResources("login");

const schema = z.object({
  email: z.string().email(getResources("register").invalidEmail),
  password: z.string().min(8, getResources("register").passwordTooShort),
});

export type LoginFormData = z.infer<typeof schema>;

interface LoginFormProps {
  onLogin: (formData: LoginFormData) => void;
  onForgotPassword: () => void;
  onRegister: () => void;
  isSubmitting: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onForgotPassword,
  onRegister,
  isSubmitting = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View style={styles.form}>
      <Controller
        disabled={isSubmitting}
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <InputField
            label={screenLabels.emailField}
            value={value}
            onChangeText={onChange}
            type="email"
            hint={errors.email?.message}
          />
        )}
      />

      <Controller
        disabled={isSubmitting}
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <InputField
            label={screenLabels.passwordField}
            value={value}
            onChangeText={onChange}
            type={showPassword ? "text" : "password"}
            rightIcon={showPassword ? "eye-outline" : "eye-off-outline"}
            onRightIconPress={togglePasswordVisibility}
            hint={errors.password?.message}
          />
        )}
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
        onPress={handleSubmit(onLogin)}
        type="gradient"
        size="large"
        gradientColors={["#1E0096", "#3300FF"]}
        gradientStart={{ x: 0, y: 0 }}
        gradientEnd={{ x: 1, y: 0 }}
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
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
