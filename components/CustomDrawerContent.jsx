import React from "react";
import { View, Text, Image, StyleSheet, useColorScheme } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons, FontAwesome5, MaterialIcons, FontAwesome, FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { hp, wp } from "../helpers/common";


const CustomDrawerContent = (props) => {
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
      screenOptions={{
        drawerStyle: {
          width: 20, // Adjust this value to control the width
        },
      }}
    >
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://cdn.dribbble.com/userupload/30614507/file/original-ccc111a8b4a3a17c76de7260755c86dc.png", // Replace with actual profile image
            }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.profileName}>Ankit Kumar</Text>
        <Text style={styles.profileDesignation}>Developer</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <DrawerItem
          label="Dashboard"
          labelStyle={styles.menuLabel}
          icon={() => <MaterialIcons name="dashboard" size={20} color="#555" />}
          onPress={() => {}}
        />
        <DrawerItem
          label="Patients"
          labelStyle={styles.menuLabel}
          icon={() => <FontAwesome5 name="hospital-user" size={20} color="#555" />}
          style={styles.activeItem}
          onPress={() => {}}
        />
        <DrawerItem
          label="Calender View"
          labelStyle={styles.menuLabel}
          icon={() => <Ionicons name="calendar" size={20} color="#555" />}
          onPress={() => {}}
        />
        <DrawerItem
          label="Staffs"
          labelStyle={styles.menuLabel}
          icon={() => <FontAwesome name="users" size={20} color="#555" />}
          onPress={() => {}}
        />
        <DrawerItem
          label="Bills"
          labelStyle={styles.menuLabel}
          icon={() => <FontAwesome6 name="money-bills" size={20} color="#555" />}
          onPress={() => {}}
        />
        <DrawerItem
          label="Clinics"
          labelStyle={styles.menuLabel}
          icon={() => <FontAwesome5 name="hospital-alt" size={20} color="#555" />}
          onPress={() => {}}
        />
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <DrawerItem
          label="Profile"
          labelStyle={styles.menuLabel}
          icon={() => <FontAwesome name="user" size={20} color="#555" />}
          onPress={() => {}}
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
    backgroundColor: "#f8f9fa",
    // backgroundColor: "black",
    // paddingLeft: 40,
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
    color: "#777",
  },
  menuSection: {
    paddingTop: 0,
  },
  menuLabel: {
    fontSize: 16,
  },
  activeItem: {
    backgroundColor: "#9dcbf2",
    borderRadius: 50,
  },
  bottomSection: {
    marginTop: "auto", // Pushes it to the bottom
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
});

export default CustomDrawerContent;
