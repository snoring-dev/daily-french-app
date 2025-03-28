import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "../hooks/use-theme";
import { NavigationProps } from "../utils/root-stack";

const HomeScreen = ({ navigation }: NavigationProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.white,
    },
    content: {
      flex: 1,
      padding: theme.spacing.l,
    },
    spacerBlock: {
      width: "100%",
      height: 100,
      backgroundColor: "transparent",
    },
    header: {
      marginBottom: theme.spacing.xl,
    },
    welcomeText: {
      fontFamily: theme.font.secondary.bold,
      fontSize: theme.fontSize.xl,
      color: theme.color.textPrimary,
      marginBottom: theme.spacing.s,
    },
    subtitleText: {
      fontFamily: theme.font.secondary.regular,
      fontSize: theme.fontSize.m,
      color: theme.color.textSecondary,
    },
    sectionTitle: {
      fontFamily: theme.font.primary.bold,
      fontSize: theme.fontSize.l,
      color: theme.color.textPrimary,
      marginBottom: theme.spacing.m,
      marginTop: theme.spacing.l,
    },
    card: {
      backgroundColor: theme.color.white,
      borderRadius: theme.borderRadius.m,
      padding: theme.spacing.l,
      marginBottom: theme.spacing.m,
      ...theme.shadow.medium,
    },
    todaysWordsCard: {
      backgroundColor: theme.color.softBeige,
      borderLeftWidth: 3,
      borderLeftColor: theme.color.lightGold,
    },
    cardTitle: {
      fontFamily: theme.font.primary.bold,
      fontSize: theme.fontSize.m,
      color: theme.color.navyBlue,
      marginBottom: theme.spacing.s,
    },
    cardContent: {
      fontFamily: theme.font.primary.regular,
      fontSize: theme.fontSize.s,
      color: theme.color.textSecondary,
      marginBottom: theme.spacing.m,
    },
    button: {
      backgroundColor: theme.color.navyBlue,
      borderRadius: theme.borderRadius.m,
      paddingVertical: theme.spacing.m,
      paddingHorizontal: theme.spacing.xl,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontFamily: theme.font.primary.bold,
      fontSize: theme.fontSize.m,
      color: theme.color.white,
    },
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: theme.spacing.m,
    },
    statCard: {
      flex: 1,
      backgroundColor: theme.color.white,
      borderRadius: theme.borderRadius.m,
      padding: theme.spacing.m,
      marginHorizontal: theme.spacing.xs,
      alignItems: "center",
      justifyContent: "space-between",
      ...theme.shadow.small,
    },
    statNumber: {
      fontFamily: theme.font.decorative.regular,
      fontSize: theme.fontSize.xxl,
      color: theme.color.navyBlue,
      marginBottom: theme.spacing.xs,
    },
    statLabel: {
      fontFamily: theme.font.primary.light,
      fontSize: theme.fontSize.xs,
      color: theme.color.textSecondary,
      textAlign: "center",
    },
  });

  const renderView = () => {
    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bonjour! 👋</Text>
          <Text style={styles.subtitleText}>
            Prêt à enrichir votre vocabulaire aujourd'hui?
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.card, styles.todaysWordsCard]}
          onPress={() => navigation.navigate("DailyWords")}
        >
          <Text style={styles.cardTitle}>Mots du jour</Text>
          <Text style={styles.cardContent}>
            Découvrez 5 nouveaux mots français pour enrichir votre vocabulaire.
          </Text>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Apprendre</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Votre progression</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Jours consécutifs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>60</Text>
            <Text style={styles.statLabel}>Mots appris</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Quiz complétés</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Activités</Text>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Quiz quotidien</Text>
          <Text style={styles.cardContent}>
            Testez vos connaissances avec notre quiz quotidien.
          </Text>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Commencer</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Pratique d'aujourd'hui</Text>
          <Text style={styles.cardContent}>
            Exercices courts pour pratiquer les mots d'aujourd'hui.
          </Text>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Pratiquer</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.spacerBlock} />
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {renderView()}
    </SafeAreaView>
  );
};

export default HomeScreen;
