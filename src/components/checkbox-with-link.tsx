import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import Checkbox from "expo-checkbox";

interface CheckboxWithLinkProps {
  checked: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
  linkText: string;
  linkUrl: string;
}

const CheckboxWithLink: React.FC<CheckboxWithLinkProps> = ({
  checked,
  onValueChange,
  label,
  linkText,
  linkUrl,
}) => {
  const handleLinkPress = async () => {
    const supported = await Linking.canOpenURL(linkUrl);
    if (supported) {
      await Linking.openURL(linkUrl);
    } else {
      console.error("Don't know how to open this URL: " + linkUrl);
    }
  };

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={checked}
        onValueChange={onValueChange}
      />
      <View style={styles.textContainer}>
        <Text style={styles.label}>
          {label}{" "}
          <TouchableOpacity onPress={handleLinkPress}>
            <Text style={styles.link}>{linkText}</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#333",
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
    position: "relative",
    top: 1,
  },
});

export default CheckboxWithLink;
