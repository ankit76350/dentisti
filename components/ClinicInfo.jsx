import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, useColorScheme } from "react-native";
import { Feather, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const DoctorInfo = ({ item, navigateTo, populate =()=>{},editIcon , removeIcon , borderColor , hospitalName="Hospital"}) => {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  
  return (
    <View style={[styles.card,{  borderLeftColor: borderColor},isDark && styles.darkCard]}>
      {/* Top Row: Buttons and Name */}
      <View style={styles.topRow}>
        <Text style={[styles.name, isDark && styles.darkText]}>{item.name}</Text>
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
          <Text style={[styles.role, isDark && styles.darkTextSecondary]}>{"Doctor"}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={14} color={isDark ? "#f6f6f6" : "#555"} />
            <Text style={[styles.infoText, isDark && styles.darkText]}>{item.email}</Text>
          </View>

          {/* <View style={styles.infoRow}>
            <FontAwesome6 name="user-pen" size={14} color={isDark ? "#f6f6f6" : "#555"} />
            <Text style={[styles.infoText, isDark && styles.darkText]}>{item.username}</Text>
          </View> */}

          <View style={styles.infoRow}>
            <FontAwesome6 name="phone" size={14} color={isDark ? "#f6f6f6" : "#555"} />
            <Text style={[styles.infoText, isDark && styles.darkText]}>{item.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome5 name="hospital-alt" size={14} color={isDark ? "#f6f6f6" : "#555"} />
            <Text style={[styles.infoText, isDark && styles.darkText]}>{hospitalName}</Text>
            {/* <Text style={[styles.infoText, isDark && styles.hospitalText]}>
              {populate(item.hospital_id) || "N/A"}
            </Text> */}
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

export default DoctorInfo;
