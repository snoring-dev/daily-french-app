import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  type: "email" | "phone" | "number" | "password";
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  type,
  placeholder,
}) => {
  const getKeyboardType = (): KeyboardTypeOptions => {
    switch (type) {
      case "email":
        return "email-address";
      case "phone":
        return "phone-pad";
      case "number":
        return "numeric";
      default:
        return "default";
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={getKeyboardType()}
        secureTextEntry={type === "password"}
        autoCapitalize={type === "email" ? "none" : "sentences"}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
    fontFamily: "Poppins",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    fontFamily: "Poppins",
  },
});

export default InputField;
