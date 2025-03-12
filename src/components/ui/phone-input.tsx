import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PhoneInput, { ICountry } from "react-native-international-phone-number";

interface PhoneFieldProps {
  label: string;
  value: string;
  onChangeText: (phoneData: { callingCode: string; number: string }) => void;
  placeholder?: string;
  hint?: string;
}

const PhoneField: React.FC<PhoneFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  hint,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  
  const changeCountry = (country: ICountry) => {
    setSelectedCountry(country);
    onChangeText({ callingCode: country.callingCode, number: value });
  };

  const onChange = (inputValue: string) => {
    onChangeText({ 
      callingCode: selectedCountry?.callingCode ?? '+33', 
      number: inputValue 
    });
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <PhoneInput
        value={value}
        onChangePhoneNumber={onChange}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={changeCountry}
        placeholder={placeholder}
        phoneInputStyles={{
          container: {
            borderColor: "#CCC",
            borderRadius: 5,
            backgroundColor: "#F4F6F9",
          },
          flagContainer: {
            backgroundColor: "#ffffff",
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            paddingLeft: 10,
            paddingRight: 10,
            borderRightWidth: 1,
            borderRightColor: "#e9e6e6",
          },
          flag: {
            width: 24,
            height: 24,
            margin: 0,
            padding: 0,
          },
          callingCode: {
            fontSize: 14,
            fontFamily: "PoppinsLight",
          },
          caret: {
            display: "none",
            margin: 0,
            padding: 0,
          },
          divider: {
            margin: 0,
            padding: 0,
            display: "none",
          },
        }}
      />
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
    backgroundColor: "#F4F6F9",
  },
  hint: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    fontFamily: "Poppins",
  },
});

export default PhoneField;
