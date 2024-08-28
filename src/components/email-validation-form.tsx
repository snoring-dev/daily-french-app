import React, { useCallback, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { getResources } from "../utils/text-resources";
import InputField from "./ui/input-field";
import Button from "./ui/button";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const screenLabels = getResources("emailValidation");
const emailLabels = getResources("register");

const schema = z.object({
  email: z.string().email(emailLabels.invalidEmail),
  code: z
    .string()
    .length(8, { message: screenLabels.invalidCodeLength })
    .regex(/^\d+$/, { message: screenLabels.codeContainsOnlyDigits })
    .transform(Number),
});

export type FormData = z.infer<typeof schema>;

interface EmailValidationFormProps {
  onSubmit: (formData: FormData) => void;
  email: string;
  isSubmitting?: boolean;
  onRequestAnotherCode: () => void;
}

const EmailValidationForm: React.FC<EmailValidationFormProps> = ({
  isSubmitting,
  email,
  onSubmit,
  onRequestAnotherCode,
}) => {
  // const [validationCode, setValidationCode] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email,
    },
    mode: "onChange",
  });

  // const setCode = useCallback((value: string) => {
  //   setValidationCode(value);
  // }, []);

  return (
    <View style={styles.form}>
      <Controller
        disabled={isSubmitting}
        control={control}
        name="code"
        render={({ field: { onChange, value } }) => (
          <InputField
            label={screenLabels.codeField}
            value={String(value)}
            onChangeText={onChange}
            type="text"
            hint={errors.code?.message}
          />
        )}
      />

      <Button
        title={screenLabels.submitButton}
        onPress={handleSubmit(onSubmit)}
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
        <TouchableOpacity onPress={onRequestAnotherCode}>
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
