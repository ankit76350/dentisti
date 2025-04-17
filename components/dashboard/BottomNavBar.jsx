import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import {role} from '../../assets/json/role'
import {  useRouter } from "expo-router";

const BottomNavBar = ({ navigation }) => {
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";
  const router = useRouter();

  const navigateTo = (screen)=>{
    console.log("role",role);
    
    router.replace(`/(${role})/(dash)/${screen}`); // Replace so it removes index from stack
  }

  return (
    <View style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>


      <TouchableOpacity style={styles.iconButton} onPress={()=>navigateTo("analytics")}>
          <View style={styles.iconContainer}>

            <Ionicons name="analytics" size={24} color={isDarkMode ? "#fff" : "#000"} />
            <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>Analytics</Text>
          </View>
      </TouchableOpacity>

  
      <TouchableOpacity style={styles.iconButton} onPress={()=>navigateTo("revenue")}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="money-bill" size={24} color={isDarkMode ? "#fff" : "#000"} />
          <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>Revenue</Text>
        </View>
      </TouchableOpacity>



 
      <TouchableOpacity style={styles.iconButton} onPress={()=>navigateTo("appointments")}>
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
    backgroundColor: "#1B263B",
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
