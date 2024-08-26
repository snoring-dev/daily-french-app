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
import InputField from "../components/input-field";

interface RegisterScreenProps {}

const RegisterScreen: React.FC<RegisterScreenProps & NavigationProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const screenLabels = getResources("register");

  const handleRegister = () => {
    console.log("Register with:", { email, phoneNumber, password, agreeTerms });
  };

  const onTermsChecked = useCallback(() => {
    setAgreeTerms((prev) => !prev);
  }, []);

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
              type="password"
            />

            <View style={styles.checkboxContainer}>
              <Checkbox
                style={{ marginBottom: 8, marginTop: 8 }}
                value={agreeTerms}
                onValueChange={onTermsChecked}
              />
              <Text style={styles.checkboxLabel}>
                {screenLabels.agreeTerms}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleRegister}
            >
              <Text style={styles.submitButtonText}>
                {screenLabels.submitButton}
              </Text>
            </TouchableOpacity>
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
