import React, { useEffect, useState } from "react";
import { View, FlatList, useColorScheme } from "react-native";
import ScreenContainer from "../../../components/ScreenContainer";
import SearchBar from '../../../components/SearchBar';
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../redux/user/userSlice";
import InfoCard from "../../../components/InfoCard.jsx";
import { hp } from "../../../helpers/common.js";
import { fetchHospitalData } from "../../../redux/hospital/hospitalSlice.js";

const doctors = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const navigation = useNavigation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchHospitalData());
  }, []);

  const userState = useSelector((state) => state.user);
  const hospitals = useSelector((state) => state.hospitals.hospitalsState.hospitalsData);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    setStaffData(userState.userState.usersData);
  }, [userState]);

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
    navigation.navigate("addstafform", { staffInfo });
  };

   //Todo Start: filter data 
   const [searchQuery, setSearchQuery] = useState("");
   const [filteredData, setFilteredData] = useState([]);
  //  useEffect(() => {
  //    if (!searchQuery.trim()) {
  //      setFilteredData(userState.usersData);
  //    } else {
  //      setFilteredData(
  //        userState.usersData?.filter(
  //          (item) =>
  //            item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  //        )
  //      );
  //    }
  //  }, [userState.usersData, searchQuery]);
   //Todo end: filter data 

  return (
    <>
      <ScreenContainer
        title="Doctors"
        addIconComponent={null}

      >
        <View style={{ marginVertical: hp(0.5) }}>
        <SearchBar query={searchQuery} setQuery={setSearchQuery} />
      </View>
        <FlatList
          data={staffData}
          renderItem={({ item }) => (
            <InfoCard item={item} navigateTo={navigateTo} populate={populate} borderColor="#4CAF50" />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </ScreenContainer>
    </>
  );
};

export default doctors;
