import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Platform,
  Alert,

} from "react-native";
import Select from "../../components/form/Select";
import ViewOnly from "../../components/form/ViewOnly";
import LabelledInputField from "../../components/form/LabelledInputField";
import DateAndTimePicker from "../../components/form/DateTimePicker";
import { hp, wp } from "../../helpers/common";
import FormWrapper from "../../components/form/FormWrapper.jsx";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorTreatements } from "../../redux/hospital/hospitalSlice.js";
import { validateTreatmentForm } from "../../helpers/validator.js";
import usePost from "../../hooks/usePost.jsx";
import Loading from "../../components/Loading.jsx";
import { fetchDoctersData } from "../../redux/dashboard/dashboardSlice.js";
import { catalystURL } from "../../constants/index.js";
import { user } from "../../assets/json/role.js";

const treatmentform = ({ }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useColorScheme();
  const route = useRoute();
  const { newFormDetails = {}, action } = route.params || {};

  const [formData, setFormData] = useState({
    doctor_id: '',
    doctor_name: '',
    dosage: '',
    duration: '',
    hospital_name: '',
    medicines: '',
    notes: '',
    patient_id: '',
    patient_name: '',
    treatement_name: '',
    treatment_date: '', // this is not sending in the backend
    morning:'',
    noon:'',
    night:''

  });
  const [doctor, setDoctor] = useState([]);


  useEffect(() => {
    dispatch(fetchDoctersData());
  }, []);

  const dashboardState = useSelector((state) => state.dashboard);
  useEffect(() => {
    setDoctor(dashboardState.doctorsState.doctorsData?.find((d) => d.ROWID === newFormDetails.doctor_id));
  }, [dashboardState])

  useEffect(() => {
    if (newFormDetails) {
      setFormData(prev => ({
        ...prev,
        patient_name: newFormDetails.patient_name,
        doctor_name: doctor?.name,
        doctor_id: newFormDetails.doctor_id,
        hospital_name: 'Shri Rama clinics',
        patient_id: newFormDetails.ROWID,
      }));
    }
  }, [newFormDetails, doctor]);




  const handleChange = (keyName, value) => {
    setFormData(prev => ({
      ...prev,
      [keyName]: value,
    }));
  };
  const formatDate = useCallback((date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  useEffect(() => {
    dispatch(fetchDoctorTreatements());
  }, [dispatch]);

  const [treatmentType, setTreatmentType] = useState([]);

  const { doctorTreatementsData } = useSelector((state) => state.hospitals.doctorTreatementsState || {});

  useEffect(() => {
    const uniqueTreatment = [...new Set(doctorTreatementsData?.map(item => item.Category))];
    setTreatmentType(uniqueTreatment.map(currItem => ({ label: currItem, value: currItem })));
  }, [doctorTreatementsData])

  const [medicinesName, setMedicinesName] = useState([]);
  const setMedicines = (categoryValue) => {
    const treatements = doctorTreatementsData.filter(item => item.Category === categoryValue);
    setMedicinesName(treatements.map(currItem => ({
      label: currItem.medicine_name,
      value: currItem.medicine_name,
    })));
  };

  const { loading, error: postError, postData } = usePost();
  const onSubmit = async () => {
     if (!validateTreatmentForm(formData)) return
     const newTreatmentData = {
      ...formData , advice:`Morning: ${formData.morning}, Noon: ${formData.noon}, Night: ${formData.night}`
     }

     delete newTreatmentData.treatment_date;
     delete newTreatmentData.morning;
     delete newTreatmentData.noon;
     delete newTreatmentData.night;

    //  console.log('====================================');
    //  console.log("newTreatmentData",newTreatmentData);
    //  console.log('====================================');

    // console.log("Submitting form with data:", newTreatmentData);
    // Alert.alert(JSON.stringify(newTreatmentData))
    // Submit logic goes here

    try {

      let response = await postData(`${catalystURL}doctor/treatement/${newFormDetails.doctor_id}/${newFormDetails.ROWID}`, newTreatmentData);

      const err = postError 

      if (!err) {
        Alert.alert("Success", `Treatment added successfully for ${response.patient_name}.`);
        navigation.navigate("patients");
      } else {
        throw new Error("Server error");
      }
    } catch (err) {
      Alert.alert("Error", err.message || `Failed to ${action === "POST" ? "add" : "update"} treatment .`);
    }
  }

  return (
    <FormWrapper title={"Add Treatment"}>

      <ViewOnly label="Patient Name" value={formData.patient_name} />
      <ViewOnly label="Doctor Name" value={formData.doctor_name} />
      <ViewOnly label="Hospital Name" value={formData.hospital_name} />


      <DateAndTimePicker
        onChange={(date) => handleChange('treatment_date', formatDate(date))}
        fieldType="date"
        label={'Treatment Date'}
        defaultValue={formData['treatment_date']}
      />

      <LabelledInputField
        label="Notes"
        value={formData.notes}
        onChangeText={(text) => handleChange('notes', text)}
      />

      <Select
        label="Treatment Type"
        keyName={"treatement_name"}
        data={[...treatmentType]}
        onChange={(keyName, item) => {
          handleChange(keyName, item.value);
          setMedicines(item.value);

        }}
        search
        modalMode={false}
      />

      <Select
        label="Medicine"
        keyName={"medicines"}
        data={[
          ...medicinesName
        ]}
        onChange={(keyName, item) => handleChange(keyName, item.value)}

      />

      <LabelledInputField
        label="Dosage"
        value={formData.dosage}
        onChangeText={(text) => handleChange('dosage', text)}
      />

      <LabelledInputField
        label="Duration"
        value={formData.duration}
        onChangeText={(text) => handleChange('duration', text)}
      />


      <View style={styles.titleContainer}>
        <Text style={styles.title}>When To Take</Text>
      </View>

      <Select
        label="Morning"
        keyName={"morning"}
        data={[
          { label: 'Before Food', value: 'Before Food' },
          { label: 'After Food', value: 'After Food' },
        ]}
        onChange={(keyName, item) => handleChange(keyName, item.value)}
        search
      />
      <Select
        label="Noon"
        keyName={"noon"}
        data={[
          { label: 'Before Food', value: 'Before Food' },
          { label: 'After Food', value: 'After Food' },
        ]}
        onChange={(keyName, item) => handleChange(keyName, item.value)}
        search
      />
      <Select
        label="Night"
        keyName={"night"}
        data={[
          { label: 'Before Food', value: 'Before Food' },
          { label: 'After Food', value: 'After Food' },
        ]}
        onChange={(keyName, item) => handleChange(keyName, item.value)}
        search
      />



      <TouchableOpacity
        style={[
          styles.button,
          theme === "dark" ? styles.darkButton : styles.lightButton,
          loading && { opacity: 0.5 },
        ]}
        onPress={() => onSubmit()}
        disabled={loading}
      >
        {loading ? <Loading size="small" /> : <Text style={styles.buttonText}>Submit</Text>}
      </TouchableOpacity>
    </FormWrapper>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },

  button: {
    width: "100%",
    padding: wp(3.5),
    borderRadius: wp(2.5),
    alignItems: "center",
    marginBottom: Platform.select({ ios: hp(1), android: hp(2) }),
  },
  lightButton: {
    backgroundColor: "#49a3f1",
  },
  darkButton: {
    backgroundColor: "#3A506B",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default treatmentform;
