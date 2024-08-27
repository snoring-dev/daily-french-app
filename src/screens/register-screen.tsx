import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { NavigationProps } from "../utils/root-stack";
import { getResources } from "../utils/text-resources";
import InputField from "../components/ui/input-field";
import Button from "../components/ui/button";
import CheckboxWithLink from "../components/checkbox-with-link";

interface RegisterScreenProps {}

const RegisterScreen: React.FC<RegisterScreenProps & NavigationProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const screenLabels = getResources("register");

  const handleRegister = () => {
    console.log("Register with:", { email, phoneNumber, password, agreeTerms });
  };

  const onTermsChecked = useCallback(() => {
    setAgreeTerms((prev) => !prev);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{screenLabels.title}</Text>
          <Text style={styles.subtitle}>{screenLabels.subtitle}</Text>

          <View style={styles.form}>
            <InputField
              label={screenLabels.emailField}
              value={email}
              onChangeText={setEmail}
              type="email"
            />

            <InputField
              label={screenLabels.phoneField}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              type="phone"
            />

            <InputField
              label={screenLabels.passwordField}
              value={password}
              onChangeText={setPassword}
              type={showPassword ? "text" : "password"}
              rightIcon={showPassword ? "eye-outline" : "eye-off-outline"}
              onRightIconPress={togglePasswordVisibility}
              hint={screenLabels.passwordHint}
            />

            <CheckboxWithLink
              checked={agreeTerms}
              onValueChange={onTermsChecked}
              label={screenLabels.agreeTermsPrefix}
              linkText={screenLabels.termsAndConditions}
              linkUrl="https://www.google.com"
            />

            <Button
              title={screenLabels.submitButton}
              onPress={handleRegister}
              type="gradient"
              size="large"
              icon="arrow-forward"
              iconPosition="right"
              disabled={!agreeTerms}
              loading={false}
              gradientColors={["#1E0096", "#3300FF"]}
              gradientStart={{ x: 0, y: 0 }}
              gradientEnd={{ x: 1, y: 0 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 30,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 50,
    textAlign: "center",
    fontFamily: "PoppinsLight",
  },
  form: {
    width: "100%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: "Poppins",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins",
  },
});

export default RegisterScreen;
