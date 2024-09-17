import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { getResources } from "../utils/text-resources";
import InputField from "./ui/input-field";
import Button from "./ui/button";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const screenLabels = getResources("resetPassword");

const schema = z.object({
  email: z.string().email(screenLabels.wrongEmail),
});

export type ResetPasswordData = z.infer<typeof schema>;

interface ResetPasswordProps {
  onConfirm: (formData: ResetPasswordData) => void;
  redirectToLogin: () => void;
  isSubmitting: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordProps> = ({
  onConfirm,
  redirectToLogin,
  isSubmitting = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

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

      <Button
        title={screenLabels.submitButton}
        onPress={handleSubmit(onConfirm)}
        type="gradient"
        size="large"
        gradientColors={["#1E0096", "#3300FF"]}
        gradientStart={{ x: 0, y: 0 }}
        gradientEnd={{ x: 1, y: 0 }}
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
      />

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>{screenLabels.alreadyHaveAccount} </Text>
        <TouchableOpacity onPress={redirectToLogin}>
          <Text style={styles.registerLink}>{screenLabels.loginNow}</Text>
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

export default ResetPasswordForm;
