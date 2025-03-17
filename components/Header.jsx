import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { role } from "../assets/json/role";
import { useRouter } from "expo-router";

const Header = ({
  title,
  showBackButton = true,
  showAddButton = false,
  onAddPress,
  addIconComponent = null,
  screen = ''
}) => {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const isDark = theme === "dark";
  const router = useRouter();
  const navgateTo = () => {
    navigation.goBack()
    //  router.replace(`/(${role})/(dash)/${screen}`);
  }

  return (
    <View style={[styles.header, isDark && styles.darkHeader]}>


      {showBackButton && (
        <TouchableOpacity onPress={() => navgateTo()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDark ? "#FFFFFF" : "#000"} />
        </TouchableOpacity>
      )}

      <Text style={[styles.headerTitle, isDark && styles.darkText]}>{title}</Text>

      {showAddButton ? (
        <TouchableOpacity onPress={onAddPress} style={styles.addButton} >
          {addIconComponent}
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} /> // Empty space for alignment
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 60 : 10,
  },
  darkHeader: {
    backgroundColor: "#0D1B2A",
    borderBottomColor: "#444",
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  darkText: { color: "#FFFFFF" },
  addButton: { padding: 5 },
  placeholder: { width: 30 },
});

export default Header;
