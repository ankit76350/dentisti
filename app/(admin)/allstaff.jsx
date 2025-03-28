import React, { useEffect, useState } from "react";
import { View, FlatList, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenContainer from "../../components/ScreenContainer";
import SearchButton from '../../components/SearchButton';
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/user/userSlice";
import { fetchHospitalData } from "../../redux/dashboard/dashboardSlice";
import InfoCard from "../../components/InfoCard.jsx";
import Loading from "../../components/Loading.jsx";

const allstaff = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchHospitalData());
  }, []);

  const userState = useSelector((state) => state.user);
  const hospitals = useSelector((state) => state.dashboard.hospitalsState.hospitalsData);
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
    navigation.navigate("stafform", { staffInfo, title: "Update Staff Info", update: true });
  };

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
        <View style={{ alignItems: 'center', paddingHorizontal: 35, paddingTop: 5 }}>
          <SearchButton />
        </View>

        {userState.userState.isLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>
            <Loading />
          </View>) : (<FlatList
            data={staffData}
            renderItem={({ item }) => (
              <InfoCard item={item} navigateTo={navigateTo} populate={populate} editIcon={true} removeIcon={true} borderColor="#2196F3" />
            )}
            keyExtractor={(_, index) => index.toString()}
          />)}

          
      </ScreenContainer>
    </>
  );
};

export default allstaff;
