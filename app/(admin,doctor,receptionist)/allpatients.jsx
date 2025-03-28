import React, { useEffect, useState } from "react";
import { View, FlatList, useColorScheme } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import SearchButton from '../../components/SearchButton';
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/user/userSlice";
import { fetchHospitalData } from "../../redux/dashboard/dashboardSlice";
import PatientsInfoCard from "../../components/PatientsInfoCard"; 
import { fetchPatientsData } from "../../redux/patients/patientsSlice.js";

const allstaff = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchHospitalData());
    dispatch(fetchPatientsData());
  }, []);

  const userState = useSelector((state) => state.user);
  const hospitals = useSelector((state) => state.dashboard.hospitalsState.hospitalsData);
  const patients = useSelector((state) => state.patients.patientsState.patientsData);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    setInfo(patients);
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

  return (
    <>
      <ScreenContainer
        title="Patient Information"
        addIconComponent={null}

      >
        <View style={{ alignItems: 'center', paddingHorizontal: 35, paddingTop: 5 }}>
          <SearchButton />
        </View>
        <FlatList
          data={info}
          renderItem={({ item }) => (
            <PatientsInfoCard item={item} navigateTo={navigateTo} populate={populate} borderColor="#E91E63"/>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </ScreenContainer>
    </>
  );
};

export default allstaff;
