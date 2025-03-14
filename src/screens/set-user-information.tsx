import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { NavigationProps } from "../utils/root-stack";
import { getResources } from "../utils/text-resources";
import PicturePicker from "../components/picture-picker";
import UserInformationForm from "../components/user-information-form";
import api from "../utils/request";
import { getLocalUserData } from "../utils/auth";

interface SetUserInformationScreenProps {}

const SetUserInformationScreen: React.FC<
  SetUserInformationScreenProps & NavigationProps
> = ({ navigation }) => {
  const screenLabels = getResources("userInformation");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: { callingCode: "", number: "" },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { id } = await getLocalUserData();
        const response = await api.get(`/users/${id}`);

        if (response.data) {
          const { firstName, lastName, phoneNumber } = response.data;
          // Parse phone number into calling code and number
          const phoneRegex = /^\+(\d+)(\d{9,10})$/;
          const match = phoneNumber ? phoneNumber.match(phoneRegex) : null;

          setUserData({
            firstName: firstName || "",
            lastName: lastName || "",
            phoneNumber: {
              callingCode: match ? match[1] : "",
              number: match ? match[2] : "",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async (formData: {
    firstName: string;
    lastName: string;
    phoneNumber: { callingCode: string; number: string };
  }) => {
    try {
      setIsLoading(true);
      const { id } = await getLocalUserData();

      // Format phone number to include calling code
      const formattedPhoneNumber = `+${formData.phoneNumber.callingCode}${formData.phoneNumber.number}`;

      const response = await api.patch(`/users/${id}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formattedPhoneNumber,
      });

      if (response.status === 200) {
        navigation.push("Home");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(screenLabels.updateError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>
                {screenLabels.title}
              </Text>
              <Text style={styles.subtitle}>
                {screenLabels.subtitle}
              </Text>

              <View style={styles.pictureContainer}>
                <PicturePicker />
              </View>

              <UserInformationForm
                initialValues={userData}
                onSubmit={handleUpdateProfile}
                isSubmitting={isLoading}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 0,
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
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "PoppinsLight",
  },
  pictureContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
});

export default SetUserInformationScreen;
