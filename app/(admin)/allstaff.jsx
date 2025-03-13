import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Feather, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
import ScreenContainer from "../../components/ScreenContainer";
import SearchButton from '../../components/SearchButton';
import { useNavigation } from "expo-router";
const approvalsData = [
  {
    id: "1",
    name: "Abhay",
    email: "abhay@gmail.com",
    username: "abhay@gmail.com",
    phone: "1234567857",
    hospital: "Aman Clinic",
    role: "Receptionist",
    status: "pending",
  },
  {
    id: "2",
    name: "Rohan Vikas Shinde",
    email: "rohanshinde@gmail.com",
    username: "rohan@gmail.com",
    phone: "8007503557",
    hospital: "Rohan Clinic",
    role: "Doctor",
  },
  {
    id: "3",
    name: "Ankit",
    email: "ankit@gmail.com",
    username: "Ankit@123",
    phone: "1234568546",
    hospital: "",
    role: "Doctor",
  },
  {
    id: "4",
    name: "Ankit K",
    email: "ankitk@gmail.com",
    username: "Ankit@123",
    phone: "8007546254",
    hospital: "",
    role: "Receptionist",
  },
  {
    id: "5",
    name: "Dr. Pranay",
    email: "pranayg@gmail.com",
    username: "p21",
    phone: "9645457333",
    hospital: "Pranay Clinic",
    role: "Doctor",
  },
  {
    id: "4",
    name: "Ankit K",
    email: "ankitk@gmail.com",
    username: "Ankit@123",
    phone: "8007546254",
    hospital: "",
    role: "Receptionist",
  },
  {
    id: "5",
    name: "Dr. Pranay",
    email: "pranayg@gmail.com",
    username: "p21",
    phone: "9645457333",
    hospital: "Pranay Clinic",
    role: "Doctor",
  },
  {
    id: "4",
    name: "Ankit K",
    email: "ankitk@gmail.com",
    username: "Ankit@123",
    phone: "8007546254",
    hospital: "",
    role: "Receptionist",
  },
  {
    id: "5",
    name: "Dr. Pranay",
    email: "pranayg@gmail.com",
    username: "p21",
    phone: "9645457333",
    hospital: "Pranay Clinic",
    role: "Doctor",
  },
  {
    id: "4",
    name: "Ankit K",
    email: "ankitk@gmail.com",
    username: "Ankit@123",
    phone: "8007546254",
    hospital: "",
    role: "Receptionist",
  },
  {
    id: "5",
    name: "Dr. Pranay",
    email: "pranayg@gmail.com",
    username: "p21",
    phone: "9645457333",
    hospital: "Pranay Clinic",
    role: "Doctor",
  },
  {
    id: "4",
    name: "Ankit K",
    email: "ankitk@gmail.com",
    username: "Ankit@123",
    phone: "8007546254",
    hospital: "",
    role: "Receptionist",
  },
  {
    id: "5",
    name: "Dr. Pranay",
    email: "pranayg@gmail.com",
    username: "p21",
    phone: "9645457333",
    hospital: "Pranay Clinic",
    role: "Doctor",
  },
  {
    id: "4",
    name: "Ankit K",
    email: "ankitk@gmail.com",
    username: "Ankit@123",
    phone: "8007546254",
    hospital: "",
    role: "Receptionist",
  },
  {
    id: "5",
    name: "Dr. Pranay",
    email: "pranayg@gmail.com",
    username: "p21",
    phone: "9645457333",
    hospital: "Pranay Clinic",
    role: "Doctor",
  },
];

const ApprovalScreen = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";
      const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={[styles.card, isDark && styles.darkCard]}>
      
      {/* Top Row: Buttons and Name */}
      <View style={styles.topRow}>
        <Text style={[styles.name, isDark && styles.darkText]}>{item.name}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("addataffform")}>
          {/* navigateTo={() => navigation.navigate("addataffform")} */}
            <Feather name="edit" size={19} color="#2ECC71" />
            {/* <Ionicons name="edit" size={22} color="#E74C3C" /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="delete-empty-outline" size={22} color="#E74C3C" />
            {/* <Ionicons name="checkmark-circle" size={22} color="#2ECC71" /> */}
          </TouchableOpacity>
        </View>
      </View>

      {/* User Info Row */}
      <View style={styles.contentRow}>
        <Image source={require("../../assets/images/defaultUser.png")} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={[styles.role, isDark && styles.darkTextSecondary]}>{item.role}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={14} color={isDark ? "#f6f6f6" : "#555"} />
            <Text style={[styles.infoText, isDark && styles.darkText]}>{item.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome6 name="user-pen" size={14} color={isDark ? "#f6f6f6" : "#555"} />
            <Text style={[styles.infoText, isDark && styles.darkText]}>{item.username}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome6 name="phone" size={14} color={isDark ? "#f6f6f6" : "#555"} />
            <Text style={[styles.infoText, isDark && styles.darkText]}>{item.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome5 name="hospital-alt" size={14} color={isDark ? "#f6f6f6" : "#555"} />
            <Text style={[styles.infoText, isDark && styles.hospitalText]}>
              {item.hospital || "N/A"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <ScreenContainer
        title="Staffs"
        addIconComponent={
          <Ionicons name="person-add" size={24} color={isDark ? "#FFFFFF" : "#000"} />
        }
        backScreen="analytics"
        navigateTo={() => navigation.navigate("addataffform")}
   
      >
        <View style={{ alignItems: 'center', paddingHorizontal:35,  paddingTop:5 }}>
        <SearchButton />
        </View>
          <FlatList data={approvalsData} renderItem={renderItem} keyExtractor={(item, index) => index} />

      </ScreenContainer>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#F5F7FA",
  },
  darkContainer: {
    backgroundColor: "#0D1B2A",
  },
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
    borderColor: "#F39C12",
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

export default ApprovalScreen;
