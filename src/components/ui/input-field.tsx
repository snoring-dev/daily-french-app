import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  type: "text" | "email" | "phone" | "number" | "password";
  placeholder?: string;
  hint?: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  type,
  placeholder,
  hint,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
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

  const getInputStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = styles.input;
    if (leftIcon) {
      return { ...baseStyle, paddingLeft: 10 };
    }
    if (rightIcon) {
      return { ...baseStyle, paddingRight: 10 };
    }
    return baseStyle;
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        {leftIcon && (
          <TouchableOpacity
            onPress={onLeftIconPress}
            disabled={!onLeftIconPress}
          >
            <Ionicons
              name={leftIcon as any}
              size={20}
              color="#818181"
              style={styles.inputWithLeftIcon}
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={getInputStyle()}
          value={value}
          onChangeText={onChangeText}
          keyboardType={getKeyboardType()}
          secureTextEntry={type === "password"}
          autoCapitalize={type === "email" ? "none" : "sentences"}
          placeholder={placeholder}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            <Ionicons
              name={rightIcon as any}
              size={20}
              color="#818181"
              style={[styles.icon, styles.inputWithRightIcon]}
            />
          </TouchableOpacity>
        )}
      </View>
      {hint && <Text style={styles.hint}>{hint}</Text>}
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
    color: "#000",
    fontFamily: "Poppins",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    backgroundColor: '#F4F6F9'
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    fontFamily: "Poppins",
    position: "relative",
    backgroundColor: 'transparent'
  },
  inputWithLeftIcon: {
    marginLeft: 10,
  },
  inputWithRightIcon: {
    marginRight: 10,
  },
  icon: {
    backgroundColor: 'transparent'
  },
  hint: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    fontFamily: "Poppins",
  },
});

export default InputField;
