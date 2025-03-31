import React, { useEffect, useState } from "react";
import { View, FlatList, useColorScheme, StyleSheet, Text } from "react-native";
import ScreenContainer from "../../../components/ScreenContainer";
import SearchBar from '../../../components/SearchBar';
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import ClinicInfo from "../../../components/ClinicInfo.jsx";
import { hp } from "../../../helpers/common.js";
import { fetchHospitalDetails } from "../../../redux/hospital/hospitalSlice.js";
import Loading from "../../../components/Loading.jsx";

const receptionists = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const navigation = useNavigation();

  const navigateTo = (item) => {
    let staffInfo = { ...item };
    staffInfo.hospital_name = populate(item.hospital_id);
    navigation.navigate("addstafform", { staffInfo });
  };

  // Todo Redux: start
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHospitalDetails());
  }, []);

  const hospitalDetails = useSelector((state) => state.hospitals.hospitalDetailsState);

  // Todo Redux: end




  //Todo Start: filter data 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(hospitalDetails.hospitalDetailsData.receptionists || []);
    } else {
      setFilteredData(
        hospitalDetails.hospitalDetailsData.receptionists?.filter(
          (item) =>
            item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [hospitalDetails, searchQuery]);
  //Todo end: filter data 

  return (
    <>
      <ScreenContainer
        title="Receptionist"
        addIconComponent={null}

      >
        <View style={{ marginVertical: hp(0.5) }}>
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
        </View>

        {hospitalDetails.isLoading ? (
          <Loading />
        ) : filteredData.length > 0 ? (
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <ClinicInfo item={item} navigateTo={navigateTo} borderColor="#4CAF50" />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        ) : (
          <View style={[{ alignItems: "center" }]}>
            <Text style={[styles.infoText, isDark && styles.darkText]}>No receptionist found</Text>
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

export default receptionists;
