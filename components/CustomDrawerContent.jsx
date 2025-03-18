import React from "react";
import { View, Text, Image, StyleSheet, useColorScheme } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons, FontAwesome5, MaterialIcons, FontAwesome, FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { hp, wp } from "../helpers/common";
import { useRouter } from "expo-router";
import {role} from '../assets/json/role'


const CustomDrawerContent = (props) => {
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";
  const router = useRouter();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.drawerContainer,
        isDarkMode ? styles.drawerContainerDark : styles.drawerContainerLight,
      ]}
    >
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image source={require("../assets/images/unnamed.jpg")} style={styles.avatar} />
        </View>
        <Text style={[styles.profileName, isDarkMode ? styles.profileNameDarkColor : styles.profileNameLightColor]}>
          Ankit Kumar
        </Text>
        <Text style={[styles.profileDesignation, isDarkMode ? styles.darkText : styles.lightText]}>
          Developer
        </Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <DrawerItem
          label="Dashboard"
          labelStyle={[styles.menuLabel, isDarkMode ? styles.darkText : styles.lightText]}
          icon={() => <MaterialIcons name="dashboard" size={20} color={isDarkMode ? "#FFF" : "#555"} />}
          onPress={() => {}}
        />
        <DrawerItem
          label="Patients"
          labelStyle={[styles.menuLabel, isDarkMode ? styles.darkText : styles.lightText]}
          icon={() => <FontAwesome5 name="hospital-user" size={20} color={isDarkMode ? "#FFF" : "#555"} />}
          style={[styles.activeItem , isDarkMode ? styles.activeItemDark : styles.activeItemLight]}
          onPress={() => router.push(`/(${role})/allpatients`)}
        />
        <DrawerItem
          label="Calendar View"
          labelStyle={[styles.menuLabel, isDarkMode ? styles.darkText : styles.lightText]}
          icon={() => <Ionicons name="calendar" size={20} color={isDarkMode ? "#FFF" : "#555"} />}
          onPress={() => {}}
        />
        <DrawerItem
          label="Staffs"
          labelStyle={[styles.menuLabel, isDarkMode ? styles.darkText : styles.lightText]}
          icon={() => <FontAwesome name="users" size={20} color={isDarkMode ? "#FFF" : "#555"} />}
          onPress={() => router.push(`/(${role})/allstaff`)}

        />
        <DrawerItem
          label="Bills"
          labelStyle={[styles.menuLabel, isDarkMode ? styles.darkText : styles.lightText]}
          icon={() => <FontAwesome6 name="money-bills" size={20} color={isDarkMode ? "#FFF" : "#555"} />}
          onPress={() => router.push(`/(${role})/allbills`)}
          />
        <DrawerItem
          label="Clinics"
          labelStyle={[styles.menuLabel, isDarkMode ? styles.darkText : styles.lightText]}
          icon={() => <FontAwesome5 name="hospital-alt" size={20} color={isDarkMode ? "#FFF" : "#555"} />}
          onPress={() => router.push(`/(${role})/allclinics`)}
          // onPress={() => {}}
        />
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <DrawerItem
          label="Profile"
          labelStyle={[styles.menuLabel, isDarkMode ? styles.darkText : styles.lightText]}
          icon={() => <FontAwesome name="user" size={20} color={isDarkMode ? "#FFF" : "#555"} />}
          onPress={() => router.push(`/(${role})/profiles`)}
          // onPress={() => router.push(`/profiles`)}
        />
        <DrawerItem
          label="Logout"
          labelStyle={[styles.menuLabel, { color: "red" }]}
          icon={() => <MaterialCommunityIcons name="logout" size={20} color="red" />}
          onPress={() => {}}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  profileSection: {
    alignItems: "flex-start",
    paddingVertical: hp(3),
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatarContainer: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 4,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileDesignation: {
    fontSize: 12,
  },
  menuSection: {
    paddingTop: 0,
  },
  menuLabel: {
    fontSize: 16,
  },
  activeItem: {
    // backgroundColor: "#9dcbf2",
    borderRadius: 50,
    elevation: 3, // Added a subtle shadow effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  bottomSection: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },

  //! Light Theme
  drawerContainerLight: {
    backgroundColor: "#FFFFFF",
  },
  profileNameLightColor: {
    color: "#333",
  },
  lightText: {
    color: "#333",
  },
  activeItemLight:{
    backgroundColor: "#9dcbf2",
  },

  //! Dark Theme
  drawerContainerDark: {
    backgroundColor: "#0D1B2A",
  },
  profileNameDarkColor: {
    color: "#FFF",
  },
  darkText: {
    color: "#FFF",
  },
  activeItemDark:{
    backgroundColor: "black",
  },
});

export default CustomDrawerContent;
