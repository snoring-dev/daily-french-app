import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import LanguageLevelCarousel from "../components/language-level-carousel";
import Button from "../components/ui/button";
import { getResources } from "../utils/text-resources";
import { ScrollView } from "react-native";
import { getLocalUserData } from "../utils/auth";
import api from "../utils/request";
import { NavigationProps } from "../utils/root-stack";
import { refreshUserData } from "../service/users.service";

const DefineLanguageLevelScreen: React.FC<NavigationProps> = ({
  navigation,
  route
}) => {
  const [languageLevel, setLanguageLevel] = useState("A1");
  const [isLoading, setIsLoading] = useState(false);
  const mode = route.params?.mode || "CREATE";

  const resources = getResources("languageLevel");

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { id } = await getLocalUserData();

      const response = await api.patch(`/users/${id}`, {
        languageLevel,
      });

      if (response.status === 200) {
        await refreshUserData();
        if (mode === "CREATE")
          navigation.push("Home");
        else
          navigation.goBack();
      }
    } catch (error) {
      console.error("Failed to update language level:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContent}>
        <Text style={styles.text}>{resources.title}</Text>
        <LanguageLevelCarousel
          onChange={(level: string) => setLanguageLevel(level)}
        />
        <Button
          title={resources.saveButton}
          onPress={() => handleSubmit()}
          type="gradient"
          size="large"
          gradientColors={["#1E0096", "#3300FF"] as const}
          gradientStart={{ x: 0, y: 0 }}
          gradientEnd={{ x: 1, y: 0 }}
          disabled={isLoading}
          loading={isLoading}
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingTop: "20%",
  },
  innerContent: {
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Poppins",
  },
  submitButton: {
    width: "100%",
    marginTop: 8,
    paddingHorizontal: 36,
  },
});

export default DefineLanguageLevelScreen;
