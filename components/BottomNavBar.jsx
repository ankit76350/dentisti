import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

const BottomNavBar = ({ navigation }) => {
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";

  return (
    <View style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Analytics")}> 
        <View style={styles.iconContainer}>
        {/* expo/vector-icons */}
        {/* <Ionicons name="analytics" size={24} color="black" /> */}
          <Ionicons name="analytics" size={24} color={isDarkMode ? "#fff" : "#000"} />
          <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>Analytics</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Revenue")}> 
        <View style={styles.iconContainer}>
        {/* <FontAwesome6 name="money-check-dollar" size={24} color="black" /> */}
          <Ionicons name="cash-outline" size={24} color={isDarkMode ? "#fff" : "#000"} />
          <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>Revenue</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Appointments")}> 
        <View style={styles.iconContainer}>
          <Ionicons name="calendar-outline" size={24} color={isDarkMode ? "#fff" : "#000"} />
          <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>Appointments</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    paddingVertical: 1,
    borderRadius: 50,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  darkBackground: {
    backgroundColor: "#2C3E50",
  },
  lightBackground: {
    backgroundColor: "#FFFFFF",
  },
  iconButton: {
    flex: 1, // Ensures equal spacing for all buttons
    alignItems: "center", // Centers the text and icon properly
    paddingVertical: 10,
  },
  iconContainer: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
  darkText: {
    color: "#FFF",
  },
  lightText: {
    color: "#333",
  },
});

export default BottomNavBar;
