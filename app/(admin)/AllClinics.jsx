import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";

const initialFeedData = [
  { id: "1", name: "Twiggy", location: "Pune, Hinjawadi" },
  { id: "2", name: "Kara", location: "Wakad Pune" },
  { id: "3", name: "Daisy", location: "Saras Baug Pune 2" },
  { id: "4", name: "Chloe", location: "Nagpur Maharashtra" },
];

const allclinics = () => {
  const [feedData, setFeedData] = useState(initialFeedData);
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const handleEdit = (id) => {
    alert(`Edit item with ID: ${id}`);
  };

  const handleRemove = (id) => {
    setFeedData(feedData.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, isDark && styles.darkCard]}>
      <View style={styles.avatar}>
        <FontAwesome5 name="hospital" size={20} color={isDark ? "#f6f6f6" : "black"} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.name, isDark && styles.darkText]}>{item.name}</Text>
        <Text style={[styles.action, isDark && styles.darkTextSecondary]}>{item.location}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleEdit(item.id)}>
          <Feather name="edit" size={19} color="#2ECC71" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleRemove(item.id)}>
          <MaterialIcons name="delete-outline" size={22} color="#E74C3C" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScreenContainer title="Clinics" lightBgColor={isDark ? "#0D1B2A" : "#F8F8F8"}>
      <FlatList data={feedData} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#F39C12",
    flexDirection: "row",
    alignItems: "center",
  },
  darkCard: {
    backgroundColor: "#2C3E50",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: "#F39C12",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  darkText: {
    color: "#f6f6f6",
  },
  action: {
    fontSize: 14,
    color: "#555",
  },
  darkTextSecondary: {
    color: "#BBB",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 8,
  },
});

export default allclinics;
