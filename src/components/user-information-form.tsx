import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import PhoneField from "./ui/phone-input";
import InputField from "./ui/input-field";
import { getResources } from "../utils/text-resources";

interface UserInformationFormProps {
  initialValues: {
    firstName: string;
    lastName: string;
    phoneNumber: { callingCode: string; number: string };
  };
  onSubmit: (formData: {
    firstName: string;
    lastName: string;
    phoneNumber: { callingCode: string; number: string };
  }) => void;
  isSubmitting: boolean;
}

const UserInformationForm: React.FC<UserInformationFormProps> = ({
  initialValues,
  onSubmit,
  isSubmitting,
}) => {
  const labels = getResources("userInformation");
  const [firstName, setFirstName] = useState(initialValues.firstName);
  const [lastName, setLastName] = useState(initialValues.lastName);
  const [phoneNumber, setPhoneNumber] = useState(initialValues.phoneNumber);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  useEffect(() => {
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setPhoneNumber(initialValues.phoneNumber);
  }, [initialValues]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = labels.firstNameRequired;
    }

    if (!lastName.trim()) {
      newErrors.lastName = labels.lastNameRequired;
    }

    if (!phoneNumber.callingCode || !phoneNumber.number) {
      newErrors.phoneNumber = labels.phoneNumberRequired;
    } else if (!isPhoneValid) {
      newErrors.phoneNumber = labels.invalidPhoneNumber;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid for enabling/disabling the submit button
  const isFormValid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      phoneNumber.callingCode !== "" &&
      phoneNumber.number !== "" &&
      isPhoneValid &&
      Object.keys(errors).length === 0
    );
  };

  const handleSubmit = () => {
    if (validate()) {
      const formData = {
        firstName,
        lastName,
        phoneNumber,
      };
      
      // Log user information before submitting to API
      console.log('Submitting user information:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
      });
      
      onSubmit(formData);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <InputField
          label={labels.firstNameField}
          value={firstName}
          onChangeText={setFirstName}
          placeholder={labels.firstNamePlaceholder}
          type="text"
          hint={errors.firstName || undefined}
        />
      </View>

      <View style={styles.inputGroup}>
        <InputField
          label={labels.lastNameField}
          value={lastName}
          onChangeText={setLastName}
          placeholder={labels.lastNamePlaceholder}
          type="text"
          hint={errors.lastName || undefined}
        />
      </View>

      <View style={styles.inputGroup}>
        <PhoneField
          label={labels.phoneField}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder={labels.phonePlaceholder}
          hint={errors.phoneNumber ? errors.phoneNumber : undefined}
          onValidationChange={setIsPhoneValid}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, !isFormValid() && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting || !isFormValid()}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{labels.submitButton}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
  },
});

export default UserInformationForm; 