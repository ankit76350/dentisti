import React, { useEffect, useState } from "react";
import { View, FlatList, useColorScheme, Text } from "react-native";
import ScreenContainer from "../../components/ScreenContainer.jsx";
import SearchButton from '../../components/SearchButton.jsx';
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/user/userSlice.js";
import { fetchHospitalData } from "../../redux/dashboard/dashboardSlice.js";
import PatientsInfoCard from "../../components/PatientsInfoCard.jsx";
import { fetchPatientsData } from "../../redux/patients/patientsSlice.js";
import Loading from "../../components/Loading.jsx";

const patients = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchHospitalData());
    dispatch(fetchPatientsData());
  }, []);

  const userState = useSelector((state) => state.user);
  const hospitals = useSelector((state) => state.dashboard.hospitalsState.hospitalsData);
  const patients = useSelector((state) => state.patients.patientsState);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    if (patients.patientsData) {
      setInfo(patients.patientsData);
    }
  }, [patients.patientsData]); // Corrected dependency

  const populate = (hospitalId) => {
    if (!hospitalId) return "N/A";
    const hospital = hospitals.find(item => item.ROWID == hospitalId);
    return hospital?.hospital_name || "N/A";
  };

  const navigateTo = (item) => {
    let staffInfo = { ...item, hospital_name: populate(item.hospital_id) };
    navigation.navigate("addstafform", { staffInfo });
  };

  console.log("patients.isLoading", patients.isLoading);

  return (
    <ScreenContainer title="Patient Information" addIconComponent={null}>
      <View style={{ alignItems: 'center', paddingHorizontal: 35, paddingTop: 5 }}>
        <SearchButton />
      </View>

      {patients.isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <Loading />
        </View>
      ) : info.length > 0 ? (
        <FlatList
          data={info}
          renderItem={({ item }) => (
            <PatientsInfoCard item={item} navigateTo={navigateTo} populate={populate} borderColor="#E91E63" />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text>No patients found</Text>
        </View>
      )}
    </ScreenContainer>
  );
};



export default patients;
