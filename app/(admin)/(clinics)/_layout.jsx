import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import {  StyleSheet } from 'react-native';

export default function _layout() {
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: [
          styles.tabBar,
          isDarkMode ? styles.darkBackground : styles.lightBackground,
        ],
        tabBarActiveTintColor: isDarkMode ? "#fff" : "blue",
        tabBarInactiveTintColor: isDarkMode ? "#bbb" : "#666",
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tabs.Screen
        name="doctors"
        options={{
          title: 'Doctors',
          tabBarIcon: ({ color }) => <FontAwesome6 name="user-doctor" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="receptionists"
        options={{
          title: 'Receptionists',
          tabBarIcon: ({ color }) => <MaterialIcons name="call" size={24} color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    // width: "80%",
    // alignSelf: 'center',
    // position: "absolute",
    // bottom: 20,
    // left: 20,
    // right: 20,
    // borderRadius: 50,
    // elevation: 6,
    // shadowColor: "#000",
    // shadowOpacity: 0.3,
    // shadowRadius: 6,
    // shadowOffset: { width: 0, height: 4 },
    // paddingVertical: 19,
    // height:hp(10),
    padding:10,
  },
  darkBackground: {
    backgroundColor: "#1B263B",
  },
  lightBackground: {
    backgroundColor: "#FFFFFF",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
});
