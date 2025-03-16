import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  TouchableOpacity,
  ViewStyle,
  Animated,
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
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<TextInput>(null);
  const borderColorAnim = React.useRef(new Animated.Value(0)).current;
  const borderWidthAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(borderColorAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(borderWidthAnim, {
        toValue: isFocused ? 1.5 : 1,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isFocused]);

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

  const animatedInputWrapperStyle = {
    ...styles.inputWrapper,
    borderColor: borderColorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["#CCC", "#007BFF"],
    }),
    borderWidth: borderWidthAnim,
  };

  const handleFocus = () => {
    console.log('TextInput focused - handleFocus called');
    setIsFocused(true);
  };

  const handleBlur = () => {
    console.log('TextInput blurred - handleBlur called');
    setIsFocused(false);
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        activeOpacity={1} 
        onPress={focusInput}
      >
        <Animated.View style={animatedInputWrapperStyle}>
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
            ref={inputRef}
            style={getInputStyle()}
            value={value}
            onChangeText={onChangeText}
            keyboardType={getKeyboardType()}
            secureTextEntry={type === "password"}
            autoCapitalize={type === "email" ? "none" : "sentences"}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
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
        </Animated.View>
      </TouchableOpacity>
      {hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
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
