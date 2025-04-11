import React, { useEffect, useState } from "react";
import { View, FlatList, Text, useColorScheme, StyleSheet } from "react-native";
import ScreenContainer from "../../components/ScreenContainer.jsx";
import SearchBar from '../../components/SearchBar.jsx';
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/user/userSlice.js";
import PatientsInfoCard from "../../components/PatientsInfoCard.jsx";
import { fetchPatientsData } from "../../redux/patients/patientsSlice.js";
import Loading from "../../components/Loading.jsx";
import { hp } from "../../helpers/common.js";
import { fetchHospitalData } from "../../redux/hospital/hospitalSlice.js";
import { role, user } from "../../assets/json/role.js";
import Icon from 'react-native-vector-icons/FontAwesome';

const patients = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchHospitalData());
    dispatch(fetchPatientsData());
  }, []);

  const hospitals = useSelector((state) => state.hospitals.hospitalsState.hospitalsData);
  const patients = useSelector((state) => state.patients.patientsState);


  const populate = (hospitalId) => {
    if (!hospitalId) return "N/A";
    const hospital = hospitals.find(item => item.ROWID == hospitalId);
    return hospital?.hospital_name || "N/A";
  };


  //Todo Start: filter data 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(patients.patientsData);
    } else {
      setFilteredData(
        patients.patientsData?.filter(
          (item) =>
            item?.patient_name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [patients.patientsData, searchQuery]);
  //Todo end: filter data 




  //TODO START: Edit thing
  const addNewPatients = (item) => {
    // console.log('====================================');
    // console.log("Ankit Kumar Add")
    // console.log('====================================');
    navigation.navigate('patientsform', {
      action: 'POST',
      newFormDetails: {
        hospital_id: user.userHospitalId,
        doctor_id: user.userId,
      },
    });
  };
  //TODO END: Edit thing


  //TODO START: Edit thing
  const edit = (item) => {
    if (!item) return;
    navigation.navigate("patientsform", {
      action: "PUT",
      newFormDetails: { ...item },
    });
  };
  //TODO END: Edit thing



  //TODO START: DELETE thing
  const confirmDelete = (item) => {

  };
  //TODO END: DELETE thing



  return (
    <ScreenContainer title="Patient Information" addIconComponent={<Icon name="plus-square" size={22} color={theme === 'dark' ? '#FFF' : '#333'} />} navigateTo={addNewPatients}>

      <View style={{
        marginBottom: hp(1)
      }}>
        <SearchBar query={searchQuery} setQuery={setSearchQuery} />
      </View>

      {patients.isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <Loading />
        </View>
      ) : filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <PatientsInfoCard item={item} edit={edit} confirmDelete={confirmDelete} populate={populate} borderColor="#E91E63" editIcon={role !== 'admin'} removeIcon={role !== 'admin'} treatmentIcon={role === 'doctor'} />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <View style={[{ alignItems: "center" }]}>
          <Text style={[styles.infoText, isDark && styles.darkText]}>No patients found</Text>
        </View>
      )}
    </ScreenContainer>
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
export default patients;
