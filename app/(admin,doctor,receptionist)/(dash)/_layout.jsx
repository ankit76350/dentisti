import React from 'react';
import { Text, View, useColorScheme, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function _layout() {
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";

  return (
    <BottomSheetModalProvider>


    <Tabs
      screenOptions={{
        tabBarStyle: { display: "none" } ,
        // tabBarStyle: [
        //   styles.tabBar,
        //   isDarkMode ? styles.darkBackground : styles.lightBackground,
        // ],
        headerShown: false,
        tabBarShowLabel: false, // Hide default label
      }}
    />
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 30, // More rounded edges
    paddingVertical: 12,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  darkBackground: {
    backgroundColor: "#1B263B",
  },
  lightBackground: {
    backgroundColor: "#FFFFFF",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6, // Better spacing
  },
  label: {
    fontSize: 13, // Slightly larger for readability
    marginTop: 4,
    fontWeight: "600",
  },
  darkText: {
    color: "#FFF",
  },
  lightText: {
    color: "#333",
  },
});
