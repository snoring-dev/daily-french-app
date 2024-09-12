import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { getResources } from "../utils/text-resources";
import InputField from "./ui/input-field";
import Button from "./ui/button";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const screenLabels = getResources("redefinePassword");

const schema = z
  .object({
    password: z.string().min(8, getResources("register").passwordTooShort),
    confirmPassword: z
      .string()
      .min(8, getResources("register").passwordTooShort),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: screenLabels.passwordsDontMatch,
    path: ["confirmPassword"],
  });

export type RedefinePasswordFormData = z.infer<typeof schema>;

interface RedefinePasswordFormProps {
  onRedefinePassword: (formData: RedefinePasswordFormData) => void;
  isSubmitting: boolean;
}

const RedefinePasswordForm: React.FC<RedefinePasswordFormProps> = ({
  onRedefinePassword,
  isSubmitting = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RedefinePasswordFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <View style={styles.form}>
      <Controller
        disabled={isSubmitting}
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <InputField
            label={screenLabels.newPasswordField}
            value={value}
            onChangeText={onChange}
            type={showPassword ? "text" : "password"}
            rightIcon={showPassword ? "eye-outline" : "eye-off-outline"}
            onRightIconPress={togglePasswordVisibility}
            hint={errors.password?.message}
          />
        )}
      />

      <Controller
        disabled={isSubmitting}
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <InputField
            label={screenLabels.confirmPasswordField}
            value={value}
            onChangeText={onChange}
            type={showConfirmPassword ? "text" : "password"}
            rightIcon={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
            onRightIconPress={toggleConfirmPasswordVisibility}
            hint={errors.confirmPassword?.message}
          />
        )}
      />

      <Button
        title={screenLabels.redefinePasswordButton}
        onPress={handleSubmit(onRedefinePassword)}
        type="gradient"
        size="large"
        gradientColors={["#1E0096", "#3300FF"]}
        gradientStart={{ x: 0, y: 0 }}
        gradientEnd={{ x: 1, y: 0 }}
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
});

export default RedefinePasswordForm;
