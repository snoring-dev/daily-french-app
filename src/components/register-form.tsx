import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getResources } from "../utils/text-resources";
import InputField from "../components/ui/input-field";
import Button from "../components/ui/button";
import CheckboxWithLink from "../components/checkbox-with-link";
import PhoneField from "./ui/phone-input";

const screenLabels = getResources("register");

const schema = z.object({
  email: z.string().email(screenLabels.invalidEmail),
  phone: z.object({
    callingCode: z.string(),
    number: z.string().min(10, screenLabels.phoneNumberTooShort),
  }),
  password: z.string().min(8, screenLabels.passwordTooShort),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: screenLabels.mustAgreeTerms,
  }),
});

export type FormData = z.infer<typeof schema>;

interface RegisterFormProps {
  onSubmit: (formData: FormData) => void;
  onLogin: () => void;
  isSubmitting?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  onLogin,
  isSubmitting,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: { callingCode: "+33", number: "" },
    },
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
        name="phone"
        render={({ field: { onChange, value } }) => (
          <PhoneField
            value={value.number}
            label={screenLabels.phoneField}
            onChangeText={({ callingCode, number }) => {
              onChange({ callingCode, number });
            }}
            placeholder=""
            hint={errors.phone?.number?.message}
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

      <Controller
        disabled={isSubmitting}
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
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
        gradientColors={["#1E0096", "#3300FF"]}
        gradientStart={{ x: 0, y: 0 }}
        gradientEnd={{ x: 1, y: 0 }}
      />

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>{screenLabels.alreadyHaveAccount} </Text>
        <TouchableOpacity onPress={onLogin}>
          <Text style={styles.loginLink}>{screenLabels.loginNow}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    fontFamily: "Poppins",
  },
  loginLink: {
    color: "#007AFF",
    fontFamily: "PoppinsBold",
  },
});

export default RegisterForm;
