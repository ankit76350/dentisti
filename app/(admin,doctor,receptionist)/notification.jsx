import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Notification = ({ navigation }) => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "SALE IS LIVE",
      description: "Your appointment with Dr. Smith is confirmed for tomorrow at 10 AM.",
      time: "1m ago",
      unread: true,
    },
    {
      id: "2",
      title: "New App Update",
      description: "New update available in the Dental Clinic App. Check it out!",
      time: "1m ago",
      unread: true,
    },
    {
      id: "3",
      title: "Profile Update Reminder",
      description: "Reminder: Please complete your profile for better service.",
      time: "10 Hrs ago",
      unread: false,
    },
    {
      id: "4",
      title: "Dental Records Updated",
      description: "Your dental records have been updated successfully.",
      time: "15 Hrs ago",
      unread: false,
    },
  ]);

  const theme = useColorScheme();

  // Function to remove notification
  const removeNotification = (id) => {
    setNotifications(notifications.filter((item) => item.id !== id));
  };

  const renderNotificationItem = ({ item }) => (
    <View style={[
      styles.notificationItem,
      theme === "dark" ? styles.darkCard : styles.lightCard,
      item.unread && (theme === "dark" ? styles.unreadNotificationDark : styles.unreadNotification)
    ]}>

      <View style={styles.iconContainer}>
        <Ionicons name="notifications-circle-sharp" size={36} color={theme === "dark" ? "#FFD700" : "#007AFF"} />
        {item.unread && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, theme === "dark" ? styles.darkText : styles.lightText]}>{item.title}</Text>
        <Text style={[styles.description, theme === "dark" ? styles.darkText : styles.lightText]}>{item.description}</Text>
      </View>
      <Text style={[styles.time, theme === "dark" ? styles.darkText : styles.lightText]}>{item.time}</Text>

      {/* Delete Icon */}
      <TouchableOpacity onPress={() => removeNotification(item.id)}>
        <Ionicons name="trash-outline" size={24} color="red" style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, theme === "dark" ? styles.darkBackground : styles.lightBackground]}>
      <StatusBar
        animated={true}
        backgroundColor={theme === "dark" ? "#1B263B" : "#49a3f1"}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />

      {/* Header */}
      <View style={[styles.header, theme === "dark" ? styles.darkHeader : styles.lightHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme === "dark" ? "#E0E0E0" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, theme === "dark" ? styles.darkText : styles.lightText]}>Notifications</Text>
        <Ionicons name="notifications-outline" size={24} color={theme === "dark" ? "#E0E0E0" : "black"} />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  darkBackground: { backgroundColor: "#0D1B2A" },
  lightBackground: { backgroundColor: "#F5F5F5" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginBottom: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  list: { marginTop: 10 },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  darkCard: {
    backgroundColor: "#1B263B", // Dark Navy Blue
  },
  lightCard: {
    backgroundColor: "#FFF",
  },
  unreadNotification: {
    backgroundColor: "#E8F0FE", // Light mode unread background
  },
  unreadNotificationDark: {
    backgroundColor: "#1E2A38", // Dark mode unread background
  },
  iconContainer: {
    position: "relative",
    marginRight: 10,
    alignItems: "center",
  },
  unreadDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
  textContainer: { flex: 1 },
  title: { fontSize: 14, fontWeight: "bold" },
  description: { fontSize: 12, marginTop: 3 },
  time: { fontSize: 12, color: "#777" },
  deleteIcon: { marginLeft: 10 },
  darkText: { color: "#E0E0E0" },
  lightText: { color: "#333" },
});

export default Notification;
