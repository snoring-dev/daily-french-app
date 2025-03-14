import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import PhoneField from "./ui/phone-input";
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
    } else if (!/^\d{9,10}$/.test(phoneNumber.number)) {
      newErrors.phoneNumber = labels.invalidPhoneNumber;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        firstName,
        lastName,
        phoneNumber,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{labels.firstNameField}</Text>
        <TextInput
          style={[styles.input, errors.firstName ? styles.inputError : null]}
          value={firstName}
          onChangeText={setFirstName}
          placeholder={labels.firstNamePlaceholder}
        />
        {errors.firstName ? (
          <Text style={styles.errorText}>{errors.firstName}</Text>
        ) : null}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>{labels.lastNameField}</Text>
        <TextInput
          style={[styles.input, errors.lastName ? styles.inputError : null]}
          value={lastName}
          onChangeText={setLastName}
          placeholder={labels.lastNamePlaceholder}
        />
        {errors.lastName ? (
          <Text style={styles.errorText}>{errors.lastName}</Text>
        ) : null}
      </View>

      <View style={styles.inputGroup}>
        <PhoneField
          label={labels.phoneField}
          value={phoneNumber.number}
          onChangeText={setPhoneNumber}
          placeholder={labels.phonePlaceholder}
          hint={errors.phoneNumber ? errors.phoneNumber : undefined}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={isSubmitting}
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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "PoppinsMedium",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: "PoppinsRegular",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    fontFamily: "PoppinsRegular",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
  },
});

export default UserInformationForm; 