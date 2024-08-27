import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getResources } from "../utils/text-resources";
import InputField from "../components/ui/input-field";
import Button from "../components/ui/button";
import CheckboxWithLink from "../components/checkbox-with-link";

const screenLabels = getResources("register");

const schema = z.object({
  email: z.string().email(screenLabels.invalidEmail),
  phoneNumber: z.string().min(10, screenLabels.phoneNumberTooShort),
  password: z.string().min(8, screenLabels.passwordTooShort),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: screenLabels.mustAgreeTerms,
  }),
});

type FormData = z.infer<typeof schema>;

interface RegisterFormProps {
  onSubmit: (formData: FormData) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View style={styles.form}>
      <Controller
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
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, value } }) => (
          <InputField
            label={screenLabels.phoneField}
            value={value}
            onChangeText={onChange}
            type="phone"
            hint={errors.phoneNumber?.message}
          />
        )}
      />

      <Controller
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

      <Controller
        control={control}
        name="agreeTerms"
        render={({ field: { onChange, value } }) => (
          <CheckboxWithLink
            checked={value}
            onValueChange={onChange}
            label={screenLabels.agreeTermsPrefix}
            linkText={screenLabels.termsAndConditions}
            linkUrl="https://www.google.com"
            // error={errors.agreeTerms?.message}
          />
        )}
      />

      <Button
        title={screenLabels.submitButton}
        onPress={handleSubmit(onSubmit)}
        type="gradient"
        size="large"
        icon="arrow-forward"
        iconPosition="right"
        disabled={!isValid}
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
