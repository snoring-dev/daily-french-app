import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
  Animated,
} from "react-native";
import {
  getResources,
  PhoneModalResources,
  ResourceKey,
} from "../../utils/text-resources";

// Common country codes with flags and validation patterns
const getCountryCodes = (labels: PhoneModalResources) => [
  {
    code: "FR",
    name: labels.France,
    callingCode: "33",
    flag: "🇫🇷",
    pattern: /^[1-9][0-9]{8}$/, // French numbers are 9 digits, not starting with 0
    example: "612345678",
  },
  {
    code: "US",
    name: labels.US,
    callingCode: "1",
    flag: "🇺🇸",
    pattern: /^[2-9][0-9]{9}$/, // US numbers are 10 digits, not starting with 0 or 1
    example: "2123456789",
  },
  {
    code: "GB",
    name: labels.UK,
    callingCode: "44",
    flag: "🇬🇧",
    pattern: /^[1-9][0-9]{9}$/, // UK mobile numbers are generally 10 digits
    example: "7123456789",
  },
  {
    code: "DE",
    name: labels.Germany,
    callingCode: "49",
    flag: "🇩🇪",
    pattern: /^[1-9][0-9]{9,10}$/, // German mobile numbers are 10-11 digits
    example: "1512345678",
  },
  {
    code: "ES",
    name: labels.Spain,
    callingCode: "34",
    flag: "🇪🇸",
    pattern: /^[6-9][0-9]{8}$/, // Spanish numbers are 9 digits
    example: "612345678",
  },
  {
    code: "IT",
    name: labels.Italy,
    callingCode: "39",
    flag: "🇮🇹",
    pattern: /^[3][0-9]{9}$/, // Italian mobile numbers start with 3 and are 10 digits
    example: "3123456789",
  },
  {
    code: "CA",
    name: labels.Canada,
    callingCode: "1",
    flag: "🇨🇦",
    pattern: /^[2-9][0-9]{9}$/, // Canadian numbers are 10 digits
    example: "2123456789",
  },
  {
    code: "AU",
    name: labels.Australia,
    callingCode: "61",
    flag: "🇦🇺",
    pattern: /^[4][0-9]{8}$/, // Australian mobile numbers start with 4 and are 9 digits
    example: "412345678",
  },
  {
    code: "JP",
    name: labels.Japan,
    callingCode: "81",
    flag: "🇯🇵",
    pattern: /^[0][0-9]{9,10}$/, // Japanese mobile numbers start with 0 and are 10-11 digits
    example: "0123456789",
  },
  {
    code: "CN",
    name: labels.China,
    callingCode: "86",
    flag: "🇨🇳",
    pattern: /^[1][0-9]{10}$/, // Chinese mobile numbers start with 1 and are 11 digits
    example: "13123456789",
  },
];

interface PhoneFieldProps {
  label: string;
  value: { callingCode: string; number: string };
  onChangeText: (phoneData: { callingCode: string; number: string }) => void;
  placeholder?: string;
  hint?: string;
  onValidationChange?: (isValid: boolean) => void;
}

const PhoneField: React.FC<PhoneFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder = "Enter phone number",
  hint,
  onValidationChange,
}) => {
  // Internal state to track input values
  const [phoneData, setPhoneData] = useState({
    callingCode: value?.callingCode || "33",
    number: value?.number || "",
  });
  const [isFocused, setIsFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const phoneModalLabels = getResources("phoneModal");
  const COUNTRY_CODES = getCountryCodes(phoneModalLabels);

  // Animation values
  const borderColorAnim = React.useRef(new Animated.Value(0)).current;
  const borderWidthAnim = React.useRef(new Animated.Value(1)).current;
  const shadowOpacityAnim = React.useRef(new Animated.Value(0)).current;

  // Update internal state when props change
  useEffect(() => {
    if (value) {
      setPhoneData({
        callingCode: value.callingCode || phoneData.callingCode,
        number: value.number || phoneData.number,
      });
    }
  }, [value]);

  // Animate focus/blur transitions
  useEffect(() => {
    Animated.parallel([
      Animated.timing(borderColorAnim, {
        toValue: isFocused
          ? 1
          : isValid
          ? 0
          : phoneData.number.length > 0 && !isValid
          ? 2
          : 0,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(borderWidthAnim, {
        toValue:
          isFocused || (phoneData.number.length > 0 && !isValid) ? 1.5 : 1,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(shadowOpacityAnim, {
        toValue: isFocused ? 0.1 : 0,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isFocused, isValid, phoneData.number]);


  // Find the selected country or default to France
  const selectedCountry =
    COUNTRY_CODES.find(
      (country) =>
        country.callingCode === phoneData.callingCode.replace(/^\+/, "")
    ) || COUNTRY_CODES[0];

  // Validate phone number whenever it changes
  useEffect(() => {
    validatePhoneNumber();
  }, [phoneData]);

  const validatePhoneNumber = () => {
    // Skip validation if number is empty
    if (!phoneData.number) {
      setIsValid(false);
      setErrorMessage("");
      if (onValidationChange) onValidationChange(false);
      return;
    }

    const pattern = selectedCountry.pattern;
    const isNumberValid = pattern.test(phoneData.number);

    setIsValid(isNumberValid);

    if (!isNumberValid && phoneData.number.length > 0) {
      setErrorMessage(
        `Invalid number format. Example: ${selectedCountry.example}`
      );
    } else {
      setErrorMessage("");
    }

    if (onValidationChange) onValidationChange(isNumberValid);
  };

  const handleCountrySelect = (country: (typeof COUNTRY_CODES)[0]) => {
    const newData = { ...phoneData, callingCode: country.callingCode };
    setPhoneData(newData);
    onChangeText(newData);
    setModalVisible(false);
  };

  const handleNumberChange = (text: string) => {
    // Remove any non-numeric characters
    const cleanedText = text.replace(/[^0-9]/g, "");
    const newData = { ...phoneData, number: cleanedText };
    setPhoneData(newData);
    onChangeText(newData);
  };

  // Create animated styles
  const animatedInputWrapperStyle = {
    ...styles.inputWrapper,
    borderColor: borderColorAnim.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ["#CCC", "#007BFF", "#FF3B30"],
    }),
    borderWidth: borderWidthAnim,
    shadowOpacity: shadowOpacityAnim,
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>

      <Animated.View style={animatedInputWrapperStyle}>
        {/* Country Code Selector */}
        <TouchableOpacity
          style={styles.countrySelector}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.flag}>{selectedCountry.flag}</Text>
          <Text style={styles.callingCode}>+{selectedCountry.callingCode}</Text>
        </TouchableOpacity>

        {/* Phone Number Input */}
        <TextInput
          style={styles.input}
          value={phoneData.number}
          onChangeText={handleNumberChange}
          placeholder={placeholder}
          keyboardType="phone-pad"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Validation indicator */}
        {phoneData.number.length > 0 && (
          <View style={styles.validationIndicator}>
            {isValid ? (
              <Text style={styles.validIcon}>✓</Text>
            ) : (
              <Text style={styles.invalidIcon}>✗</Text>
            )}
          </View>
        )}
      </Animated.View>

      {/* Error message or hint */}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}

      {/* Country Selection Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={COUNTRY_CODES}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.countryItem}
                onPress={() => handleCountrySelect(item)}
              >
                <Text style={styles.countryFlag}>{item.flag}</Text>
                <Text style={styles.countryName}>{item.name}</Text>
                <Text style={styles.countryCode}>+{item.callingCode}</Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>
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
    borderRadius: 5,
    backgroundColor: "#F4F6F9",
    overflow: "hidden",
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    elevation: 2,
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: "#e9e6e6",
  },
  flag: {
    fontSize: 18,
    marginRight: 5,
  },
  callingCode: {
    fontSize: 14,
    fontFamily: "PoppinsLight",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: "PoppinsLight",
  },
  validationIndicator: {
    paddingHorizontal: 10,
  },
  validIcon: {
    color: "#34C759",
    fontSize: 16,
    fontWeight: "bold",
  },
  invalidIcon: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "bold",
  },
  hint: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    fontFamily: "Poppins",
  },
  errorMessage: {
    fontSize: 12,
    color: "#FF3B30",
    marginTop: 5,
    fontFamily: "Poppins",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
  },
  closeButton: {
    fontSize: 16,
    color: "#007BFF",
    fontFamily: "Poppins",
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 15,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins",
  },
  countryCode: {
    fontSize: 14,
    color: "#666",
    fontFamily: "PoppinsLight",
  },
});

export default PhoneField;
