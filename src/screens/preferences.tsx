import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Theme } from "../theme";
import { useTheme } from "../hooks/use-theme";
import { getUserData } from "../service/users.service";
import LoadingView from "../components/ui/loading-view";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { getResources } from "../utils/text-resources";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.white,
    },
    content: {
      flex: 1,
      paddingBottom: 20,
    },
    profileSection: {
      alignItems: "center",
      marginVertical: 30,
    },
    profilePictureContainer: {
      marginBottom: 20,
      alignItems: "center",
    },
    dashedBorderWrapper: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderWidth: 2,
      borderColor: "#A8A1FF",
      borderStyle: "dashed",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
    },
    profilePictureWrapper: {
      width: 138,
      height: 138,
      borderRadius: 69,
      backgroundColor: theme.color.white,
      alignItems: "center",
      justifyContent: "center",
    },
    profilePicture: {
      width: 136,
      height: 136,
      borderRadius: 65,
    },
    userName: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.color.textPrimary,
      marginTop: 8,
      textAlign: "center",
    },
    userHandle: {
      fontSize: 16,
      color: theme.color.textSecondary,
      marginTop: 4,
    },
    menuContainer: {
      marginHorizontal: 20,
      marginTop: 20,
      borderRadius: 12,
      backgroundColor: theme.color.softGray,
      overflow: "hidden",
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0,0,0,0.05)",
    },
    menuIcon: {
      marginRight: 15,
      width: 24,
      alignItems: "center",
    },
    menuText: {
      fontSize: 16,
      color: theme.color.textPrimary,
      flex: 1,
      fontWeight: "500",
    },
    chevronIcon: {
      opacity: 0.5,
    },
    logoutContainer: {
      marginHorizontal: 20,
      marginTop: 30,
      marginBottom: 50,
    },
    logoutButton: {
      flexDirection: "row",
      paddingVertical: 15,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      backgroundColor: theme.color.error,
    },
    logoutText: {
      fontSize: 16,
      fontWeight: "600",
      color: "white",
      marginLeft: 8,
    },
  });

type MenuItemType = {
  id: number;
  title: string;
  icon: any; // Using any for icon names to avoid type issues
  color: string;
};

export const PreferencesScreen = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const preferences = getResources("preferences");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    pictureUrl: "https://avatar.iran.liara.run/public/15",
    languageLevel: "",
    emailConfirmation: false,
    createdAt: "",
    updatedAt: "",
    id: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await getUserData();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const menuItems: MenuItemType[] = [
    {
      id: 1,
      title: preferences.personalInformation,
      icon: "person",
      color: theme.color.primaryBlue,
    },
    {
      id: 2,
      title: preferences.languageLevel,
      icon: "language",
      color: theme.color.accentRed,
    },
    {
      id: 3,
      title: preferences.applicationSettings,
      icon: "settings",
      color: theme.color.navyBlue,
    },
  ];

  const fullName = user ? `${user.firstName} ${user.lastName}` : "";

  const renderContent = () => {
    if (loading) {
      return <LoadingView />;
    }

    if (error) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: theme.color.error }}>
            {preferences.loadingError}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.content}>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profilePictureContainer}>
              <View style={styles.dashedBorderWrapper}>
                <View style={styles.profilePictureWrapper}>
                  <Image
                    source={{
                      uri: user?.pictureUrl || "https://avatar.iran.liara.run/public/15",
                    }}
                    style={styles.profilePicture}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.userName}>{fullName}</Text>
            <Text style={styles.userHandle}>{user?.email || ""}</Text>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.menuItem}>
                <View style={styles.menuIcon}>
                  <MaterialIcons
                    name={item.icon as any}
                    size={22}
                    color={item.color}
                  />
                </View>
                <Text style={styles.menuText}>{item.title}</Text>
                <MaterialIcons
                  name="chevron-right"
                  size={20}
                  color="#888"
                  style={styles.chevronIcon}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => console.log("Logout pressed")}
            >
              <MaterialIcons name={"logout" as any} size={20} color="white" />
              <Text style={styles.logoutText}>{preferences.logout}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderContent()}
    </SafeAreaView>
  );
};
