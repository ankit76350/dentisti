
import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const notifications = [
  {
    id: "1",
    name: "John Doe",
    phone: "+91 98765 43210",
    time: "12:30 PM",
    date: "05 Mar 2025",
    status: "online",
  },
  {
    id: "2",
    name: "Emily Smith",
    phone: "+91 98234 56789",
    time: "1:45 PM",
    date: "05 Mar 2025",
    status: "offline",
  },
  {
    id: "3",
    name: "Michael Brown",
    phone: "+91 98567 12345",
    time: "3:15 PM",
    date: "05 Mar 2025",
    status: "online",
  },
  {
    id: "4",
    name: "Sophia Wilson",
    phone: "+91 98123 87654",
    time: "4:50 PM",
    date: "05 Mar 2025",
    status: "offline",
  },
];

const Item = () => {
  const theme = useColorScheme(); // Detects system theme (light/dark)
  // const theme = "dark"

  return (
    <View style={[styles.container, theme === "dark" ? styles.darkBackground : styles.lightBackground]}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={theme === "dark" ? "white" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme === "dark" ? "white" : "black" }]}>
          Notifications
        </Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color={theme === "dark" ? "white" : "black"} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.notificationCard, theme === "dark" ? styles.darkCard : styles.lightCard]}>
            <Ionicons name="person-circle-outline" size={28} color="#49a3f1" />
            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: theme === "dark" ? "white" : "black" }]}>{item.name}</Text>
              <Text style={[styles.description, { color: theme === "dark" ? "gray" : "#555" }]}>
                {item.phone}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Ionicons
              name={item.status === "online" ? "checkmark-circle" : "alert-circle"}
              size={22}
              color={item.status === "online" ? "green" : "red"}
              style={styles.statusIcon}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  darkBackground: {
    backgroundColor: "#0D1B2A",
  },
  lightBackground: {
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationCard: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  darkCard: {
    backgroundColor: "#1B263B",
  },
  lightCard: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Android shadow
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginTop: 3,
  },
  timeContainer: {
    alignItems: "flex-end",
    marginRight: 10,
  },
  time: {
    fontSize: 14,
    color: "#49a3f1",
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "gray",
    marginTop: 3,
  },
  statusIcon: {
    marginLeft: 10,
  },
});



export default Item;
