import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: "primary" | "secondary" | "outline" | "gradient";
  size?: "small" | "medium" | "large";
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradientColors?: string[];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = "primary",
  size = "medium",
  icon,
  iconPosition = "left",
  disabled = false,
  loading = false,
  style,
  textStyle,
  gradientColors = ["#4c669f", "#3b5998", "#192f6a"],
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 0 },
}) => {
  const buttonStyle = [
    styles.button,
    styles[`${size}Button`],
    type !== "gradient" && styles[`${type}Button`],
    disabled && styles.disabledButton,
    style,
  ];

  const textStyleArray = [
    styles.buttonText,
    styles[`${type}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  const iconSize = size === "small" ? 16 : size === "medium" ? 20 : 24;
  const iconColor =
    type === "primary" || type === "gradient" ? "#FFFFFF" : "#007AFF";

  const getIconStyle = () => {
    const positionStyle =
      iconPosition === "left" ? styles.iconLeft : styles.iconRight;
    const opacityStyle = disabled ? styles.halfOpacity : undefined;
    return [positionStyle, opacityStyle];
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={
            type === "primary" || type === "gradient" ? "#FFFFFF" : "#007AFF"
          }
        />
      );
    }

    const iconElement = icon && (
      <Ionicons
        name={icon}
        size={iconSize}
        color={iconColor}
        style={getIconStyle()}
      />
    );

    return (
      <>
        {iconPosition === "left" && iconElement}
        <Text style={textStyleArray}>{title}</Text>
        {iconPosition === "right" && iconElement}
      </>
    );
  };

  if (type === "gradient") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.button, style]}
      >
        <LinearGradient
          colors={gradientColors}
          start={gradientStart}
          end={gradientEnd}
          style={[buttonStyle, styles.gradientContainer]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    overflow: "hidden",
  },
  gradientContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
  },
  secondaryButton: {
    backgroundColor: "#F0F0F0",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryText: {
    color: "#007AFF",
  },
  outlineText: {
    color: "#007AFF",
  },
  gradientText: {
    color: "#FFFFFF",
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  halfOpacity: {
    opacity: 0.5,
  },
});

export default Button;
