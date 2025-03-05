import React from "react";
import { View, Text, FlatList, StyleSheet, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { wp } from "../helpers/common";

const data = [
  { id: "1", name: "John Doe", phone: "+91 98765 43210", time: "12:30 PM", date: "05 Mar 2025", status: "online" },
  { id: "2", name: "Emily Smith", phone: "+91 98234 56789", time: "1:45 PM", date: "05 Mar 2025", status: "offline" },
  { id: "3", name: "Michael Brown", phone: "+91 98567 12345", time: "3:15 PM", date: "05 Mar 2025", status: "online" },
  { id: "4", name: "Sophia Wilson", phone: "+91 98123 87654", time: "4:50 PM", date: "05 Mar 2025", status: "offline" },

];

const Item = () => {
  const theme = useColorScheme();

  return (
    <View style={[styles.container, theme === "dark" ? styles.darkBackground : styles.lightBackground]}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.notificationCard, theme === "dark" ? styles.darkCard : styles.lightCard]}>
            <Ionicons name="person-circle-outline" size={32} color="#49a3f1" />
            <View style={styles.textContainer}>
              <Text style={[styles.title, theme === "dark" ? styles.darkText : styles.lightText]}>{item.name}</Text>
              <Text style={[styles.description]}>
                {item.phone}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Ionicons
              name={item.status === "online" ? "checkmark-circle" : "alert-circle"}
              size={24}
              color={item.status === "online" ? "green" : "red"}
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
    paddingTop: 10,
  },
  darkBackground: {
    // backgroundColor: "#1B263B",
  },
  lightBackground: {
    // backgroundColor: "white",
  },
  notificationCard: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 }, // Adds shadow only at the bottom
    elevation: 4, // For Android
    marginHorizontal: wp(0.5),
  },
  
  darkCard: {
    backgroundColor: "#2C3E50",
  },
  lightCard: {
    backgroundColor: "#FFFFFF",
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lightText: {
    color: "#333",
  },
  darkText: {
    color: "#FFF",
  },
  timeContainer: {
    alignItems: "flex-end",
    marginRight: 12,
  },
  time: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#49a3f1",
  },
  description:{
    fontSize: 14,
    color: "gray",
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
});

export default Item;
