import React, { useEffect, useState } from "react";
import { View, FlatList, Text, useColorScheme, StyleSheet, TouchableOpacity } from "react-native";
import ScreenContainer from "../../components/ScreenContainer.jsx";
import SearchBar from '../../components/SearchBar.jsx';
import { useDispatch, useSelector } from "react-redux";
import PatientsInfoCard from "../../components/PatientsInfoCard.jsx";
import { fetchPatientsData } from "../../redux/patients/patientsSlice.js";
import Loading from "../../components/Loading.jsx";
import { hp } from "../../helpers/common.js";
import { fetchUserData } from "../../redux/user/userSlice.js";
import { fetchHospitalData } from "../../redux/hospital/hospitalSlice.js";
import { useNavigation } from "@react-navigation/native";


const patienthistory = () => {
  const [fetchNewData, setFetchNewData] = useState(false);
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchHospitalData());
  }, []);

  useEffect(() => {
    dispatch(fetchPatientsData());
  }, [fetchNewData]);

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

  const navigation = useNavigation();
  const navigateTo = (item) => {
  
    navigation.navigate("patienttreatmentinfo" , {  ROWID: item.ROWID });
  }





  return (
    <ScreenContainer title="Patient Information" addIconComponent={null} >

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
            <>
              <TouchableOpacity onPress={()=>navigateTo(item)}>
                <PatientsInfoCard item={item} populate={populate} borderColor="#E91E63" />
              </TouchableOpacity>
            </>
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
export default patienthistory;
