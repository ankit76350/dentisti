import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, useColorScheme } from "react-native";
import { Entypo, Feather,  FontAwesome5,  Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const InfoCard = ({ item, navigateTo, populate ,editIcon , removeIcon , borderColor}) => {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  return (
    <View style={[styles.card,{  borderLeftColor: borderColor},isDark && styles.darkCard]}>
      {/* Top Row: Buttons and Name */}
      <View style={styles.topRow}>
        <Text style={[styles.name, isDark && styles.darkText]}>{item.patient_name}</Text>
        <View style={styles.actionButtons}>
        {editIcon &&  <TouchableOpacity style={styles.iconButton} onPress={() => navigateTo(item)}>
            <Feather name="edit" size={19} color="#2ECC71" />
          </TouchableOpacity>}
          {removeIcon && <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="delete-empty-outline" size={22} color="#E74C3C" />
          </TouchableOpacity>}
        </View>
      </View>

      {/* User Info Row */}
      <View style={styles.contentRow}>
        <Image source={require("../assets/images/defaultuser.png")} style={[styles.profileImage, {  borderColor: borderColor}]} />
        <View style={styles.textContainer}>
          <Text style={[styles.role, isDark && styles.darkTextSecondary]}>{populate(item.hospital_id) || "N/A"}</Text>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="cake-variant" size={14} color={isDark ? "#f6f6f6" : "#555"} />
            <Text style={[styles.infoText, isDark && styles.darkText]}>{item.date_of_birth}</Text>
          </View>

          <View style={styles.infoRow}>
          <MaterialCommunityIcons name="gender-male-female" size={14} color={isDark ? "#f6f6f6" : "#555"} />
            {/* <FontAwesome6 name="user-pen" size={14} color={isDark ? "#f6f6f6" : "#555"} /> */}
            <Text style={[styles.infoText, isDark && styles.darkText]}>{item.gender}</Text>
          </View>

          <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={14} color={isDark ? "#f6f6f6" : "#555"} />
            {/* <FontAwesome6 name="phone" size={14} color={isDark ? "#f6f6f6" : "#555"} /> */}

            <Text style={[styles.infoText, isDark && styles.darkText]}>{item.date_of_admission}</Text>
          </View>


          <View style={styles.infoRow}>
          <FontAwesome5 name="user-md"size={14} color={isDark ? "#f6f6f6" : "#555"} />
            {/* <FontAwesome6 name="phone" size={14} color={isDark ? "#f6f6f6" : "#555"} /> */}

            <Text style={[styles.infoText, isDark && styles.darkText]}>{item.doctor_id}</Text>
          </View>


          <View style={styles.infoRow}>
          <MaterialCommunityIcons name="phone"  size={14} color={isDark ? "#f6f6f6" : "#555"} />
            {/* <FontAwesome6 name="phone" size={14} color={isDark ? "#f6f6f6" : "#555"} /> */}

            <Text style={[styles.infoText, isDark && styles.darkText]}>{item.phone}</Text>
          </View>



          <View style={styles.infoRow}>
          <Entypo name="address" size={14} color={isDark ? "#f6f6f6" : "#555"} />
            {/* <Entypo name="address" size={24} color="black" /> */}
            <Text style={[styles.infoText, isDark && styles.hospitalText]}>
              {/* {populate(item.hospital_id) || "N/A"} */}
              {item.address || "N/A"}
            </Text>
          </View>
        </View>
      </View>
    </View>
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
   
  },
  darkCard: {
    backgroundColor: "#2C3E50",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  darkText: {
    color: "#f6f6f6",
  },
  actionButtons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 8,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
    borderWidth: 1.5,
    // borderColor: "#F39C12",
  },
  textContainer: {
    flex: 1,
  },
  role: {
    fontSize: 14,
    color: "#777",
  },
  darkTextSecondary: {
    color: "#BBB",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  infoText: {
    fontSize: 13,
    marginLeft: 6,
    color: "#444",
  },
  hospitalText: {
    color: "#f6f6f6",
  },
});

export default InfoCard;
