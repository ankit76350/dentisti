import React, { useEffect, useState } from "react";
import { View, FlatList, useColorScheme, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenContainer from "../../components/ScreenContainer.jsx";
import SearchBar from '../../components/SearchBar.jsx';
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/user/userSlice.js";
import InfoCard from "../../components/InfoCard.jsx";
import Loading from "../../components/Loading.jsx";
import { hp } from "../../helpers/common.js";
import { fetchHospitalData } from "../../redux/hospital/hospitalSlice.js";

const staffs = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchHospitalData());
  }, []);

  const userState = useSelector((state) => state.user.userState);
  const hospitals = useSelector((state) => state.hospitals.hospitalsState.hospitalsData);


  const populate = (hospitalId) => {
    if (!hospitalId) {
      return "N/A";
    }
    const hospital = hospitals.find(item => item.ROWID == hospitalId);
    return hospital?.hospital_name || "N/A";
  };

  const navigateTo = (item) => {
    let staffInfo = { ...item };
    staffInfo.hospital_name = populate(item.hospital_id);
    navigation.navigate("stafform", { staffInfo, title: "Update Staff Info", update: true });
  };


  //Todo Start: filter data 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(userState.usersData);
    } else {
      setFilteredData(
        userState.usersData?.filter(
          (item) =>
            item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [userState.usersData, searchQuery]);
  //Todo end: filter data 

  return (
    <>
      <ScreenContainer
        title="Staffs"
        addIconComponent={
          <Ionicons name="person-add" size={24} color={isDark ? "#FFFFFF" : "#000"} />
        }
        backScreen="analytics"
        navigateTo={() => navigation.navigate("stafform")}
      >
        <View style={{ marginBottom: hp(1) }}>
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
        </View>

        {userState.isLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>
            <Loading />
          </View>) : filteredData.length > 0 ? (<FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <InfoCard item={item} navigateTo={navigateTo} populate={populate} editIcon={true} removeIcon={true} borderColor="#2196F3" />
            )}
            keyExtractor={(_, index) => index.toString()}
          />) : (
          <View style={[{ alignItems: "center" }]}>
            <Text style={[styles.infoText, isDark && styles.darkText]}>No staffs found</Text>
          </View>
        )}


      </ScreenContainer>
    </>
  );
};
const styles = StyleSheet.create({
  infoText: {
    fontSize: 13,
    marginLeft: 6,
    color: "#444",
  },
  darkText: {
    color: "#f6f6f6",
  },
});
export default staffs;
