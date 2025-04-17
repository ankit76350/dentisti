import React, { useEffect } from "react";
import { View, FlatList, Text, useColorScheme, StyleSheet } from "react-native";
import ScreenContainer from "../../components/ScreenContainer.jsx";
import { useDispatch, useSelector } from "react-redux";
import TreatmentInfo from "../../components/TreatmentInfo.jsx";
import { fetchPatientTreatmentInfo } from "../../redux/patients/patientsSlice.js";
import Loading from "../../components/Loading.jsx";
import { hp } from "../../helpers/common.js";
import { useRoute } from "@react-navigation/native";

const patienttreatmentinfo = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const route = useRoute();
  const ROWID = route?.params?.ROWID || "";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPatientTreatmentInfo(ROWID));
  }, [ROWID, dispatch]);

  const { isLoading, patientsTreatmentData } = useSelector(
    (state) => state.patients.patientsTreatmentHistory
  );


  return (
    <ScreenContainer title="Patient Treatment Info" addIconComponent={null}>
      <View style={{ marginBottom: hp(1) }} />

      {isLoading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 20 }}>
          <Loading />
        </View>
      ) : patientsTreatmentData.length > 0 ? (
        <FlatList
          data={patientsTreatmentData}
          renderItem={({ item }) => <TreatmentInfo item={item} borderColor="#E91E63" />}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <View style={[{ alignItems: "center" }]}>
          <Text style={[styles.infoText, isDark && styles.darkText]}>
            No patient's history found
          </Text>
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

export default patienttreatmentinfo;
