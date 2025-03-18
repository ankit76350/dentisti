import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, useColorScheme } from "react-native";
import { Feather, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
import ScreenContainer from "../../components/ScreenContainer";
import SearchButton from '../../components/SearchButton';
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/user/userSlice";
import { fetchHospitalData } from "../../redux/dashboard/dashboardSlice";



const allstaff = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const navigation = useNavigation();
  //Todo start: redux things
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserData())
    dispatch(fetchHospitalData())

  }, [])
  const userState = useSelector((state) => state.user);
  const hospitals = useSelector((state) => state.dashboard.hospitalsState.hospitalsData);
  //  console.log("userState",userState.userState.usersData);
  //  console.log("hospitals",hospitals);

  //Todo end: redux things
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    setStaffData(userState.userState.usersData);
  }, [userState])


  const populate = (hospitalId) => {
    if (!hospitalId) {
      return "N/A"
    }
    const hospital = hospitals.find(item => item.ROWID == hospitalId)
    return hospital.hospital_name
  }

  const navigateTo = (item) => {
    let staffInfo = {...item}
    const hospital_name = populate(item.hospital_id)
    staffInfo.hospital_name = hospital_name
    navigation.navigate("addstafform", { staffInfo });
  }



  const renderItem = ({ item }) => (
    <View style={[styles.card, isDark && styles.darkCard]}>

      {/* Top Row: Buttons and Name */}
      <View style={styles.topRow}>
        <Text style={[styles.name, isDark && styles.darkText]}>{item.name}</Text>
        <View style={styles.actionButtons}>

          <TouchableOpacity style={styles.iconButton} onPress={() => navigateTo(item)}>
            <Feather name="edit" size={19} color="#2ECC71" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="delete-empty-outline" size={22} color="#E74C3C" />
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
              {populate(item.hospital_id) || "N/A"}
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
        navigateTo={() => navigation.navigate("addstafform")}

      >
        <View style={{ alignItems: 'center', paddingHorizontal: 35, paddingTop: 5 }}>
          <SearchButton />
        </View>
        <FlatList data={staffData} renderItem={renderItem} keyExtractor={(item, index) => index} />

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

export default allstaff;
