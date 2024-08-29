import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-native-international-phone-number";
import { getResources } from "../utils/text-resources";
import InputField from "../components/ui/input-field";
import Button from "../components/ui/button";
import CheckboxWithLink from "../components/checkbox-with-link";
import PhoneField from "./ui/phone-input";

const screenLabels = getResources("register");

const schema = z.object({
  email: z.string().email(screenLabels.invalidEmail),
  // phoneNumber: z.string().min(10, screenLabels.phoneNumberTooShort),
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
  isSubmitting?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [inputValue, setInputValue] = useState("");

  function handleInputValue(phoneNumber: any) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country: any) {
    setSelectedCountry(country);
  }

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
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
});

export default RegisterForm;
