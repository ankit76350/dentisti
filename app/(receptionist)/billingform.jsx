import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Platform,
  Alert
} from "react-native";
import Select from "../../components/form/Select";
import ViewOnly from "../../components/form/ViewOnly";
import LabelledInputField from "../../components/form/LabelledInputField";
import DateAndTimePicker from "../../components/form/DateTimePicker";
import { hp, wp } from "../../helpers/common";
import FormWrapper from "../../components/form/FormWrapper.jsx";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceDetails } from "../../redux/hospital/hospitalSlice.js";
import { validateBillingForm } from "../../helpers/validator.js";
import { user } from "../../assets/json/role.js";
import { fetchAppointmentsData, fetchDoctersData } from "../../redux/dashboard/dashboardSlice.js";
import { catalystURL } from "../../constants/index.js";
import usePost from "../../hooks/usePost.jsx";
import Loading from "../../components/Loading.jsx";
// import Loading if not already available
// import Loading from "../../components/ui/Loading";

const BillingForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useColorScheme();
  const route = useRoute();


  const { newFormDetails = {}, action } = route.params || {};
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_id: '',
    hospital_name: '',
    doctor_name: '',
    ServiceDetails: '',
    Amount: '',
    phone: '',
    Billing_Date: '',
    Status: '',
    PaymentMethod: '',
    doctor_id: '',
    date_of_admission: '',
    receptionist_id: '',
  });
  const [doctor, setDoctor] = useState([]);


  useEffect(() => {
    dispatch(fetchDoctersData());
  }, []);

  const dashboardState = useSelector((state) => state.dashboard);
  useEffect(() => {
    setDoctor(dashboardState.doctorsState.doctorsData?.find((d) => d.ROWID === newFormDetails.doctor_id));
  }, [dashboardState])



  const { serviceDetailsData } = useSelector((state) => state.hospitals.serviceDetailsState || {});
  const uniqueCategories = [...new Set(serviceDetailsData?.map(item => item.Category))];

  const [category, setCategory] = useState([]);
  const [treatmentName, setTreatmentName] = useState([]);
  const [cost, setCost] = useState("00.00");
  // doctor_name
  // receptionist_id
  useEffect(() => {
    if (newFormDetails) {
      setFormData(prev => ({
        ...prev,
        patient_name: newFormDetails.patient_name || '',
        patient_id: newFormDetails.ROWID || '',
        hospital_name: newFormDetails.hospital_name || '',
        phone: newFormDetails.phone || '',
        Status: newFormDetails.patient_status || '',
        doctor_id: newFormDetails.doctor_id || '',
        doctor_name: doctor?.name || '',
        date_of_admission: newFormDetails.date_of_admission || '',
        receptionist_id: user.userId || '',
      }));
    }
  }, [newFormDetails, doctor]);

  useEffect(() => {
    dispatch(fetchServiceDetails());
  }, [dispatch]);

  useEffect(() => {
    setCategory(uniqueCategories.map(currItem => ({ label: currItem, value: currItem })));
  }, [serviceDetailsData]);

  const setTreatments = (categoryValue) => {
    const service = serviceDetailsData.filter(item => item.Category === categoryValue);
    setTreatmentName(service.map(currItem => ({
      label: currItem.ServiceName,
      value: currItem.ServiceName,
    })));
  };

  const setCosts = (treatmentValue) => {
    const treatment = serviceDetailsData.find(item => item.ServiceName === treatmentValue);
    if (treatment) {
      setCost(treatment.Cost);
      setFormData(prev => ({ ...prev, Amount: treatment.Cost }));
    }
  };

  const handleChange = (keyName, value) => {
    setFormData(prev => ({
      ...prev,
      [keyName]: value,
    }));
  };

  const handleDate = (keyName, value) => {
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


  const { loading, error:postError, postData } = usePost();
  const onSubmit = async () => {
    if (!validateBillingForm(formData)) return

    const newFormData = {...formData}

    delete newFormData.TreatmentName;

    // console.log("Submitting form with data:", formData);
    // Alert.alert(JSON.stringify(formData))
    // Submit logic goes here

    try {

      let response = await postData(`${catalystURL}receptionist/1380000000411185/${user.userHospitalId}/bill`, newFormData);

      const err = postError 

      if (!err) {
        Alert.alert("Success", `Bill generated successfully for ${response.patient_name}.`);
        navigation.navigate("billing");
      } else {
        throw new Error("Server error");
      }
    } catch (err) {
      Alert.alert("Error", err.message || `Failed to ${action === "POST" ? "add" : "update"} patient.`);
    }
  };

  return (
    <FormWrapper>

      <ViewOnly label="Patient Name" value={formData.patient_name} />
      <ViewOnly label="Doctor ID" value={formData.doctor_name} />
      <ViewOnly label="Admission Date" value={formData.date_of_admission} />
      <ViewOnly label="Patient Phone No" value={formData.phone} />

      <DateAndTimePicker
        onChange={(date) => handleDate('Billing_Date', formatDate(date))}
        fieldType="date"
        label={'Billing Date'}
        defaultValue={formData['Billing_Date']}
      />

      <Select
        label="Payment Method"
        keyName={"PaymentMethod"}
        data={[
          { label: 'Cash', value: 'Cash' },
          { label: 'Credit Card', value: 'Credit Card' },
          { label: 'Insurance', value: 'Insurance' },
        ]}
        onChange={(keyName, item) => handleChange(keyName, item.value)}
        search
      />

      <Select
        label="Payment Status"
        keyName={"Status"}
        data={[
          { label: 'Paid', value: 'Paid' },
          { label: 'Pending', value: 'Pending' },
          { label: 'Overdue', value: 'Overdue' },
        ]}
        onChange={(keyName, item) => handleChange(keyName, item.value)}
        search
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Services</Text>
      </View>

      <Select
        label="Category"
        keyName={"ServiceDetails"}
        data={category}
        onChange={(keyName, item) => {
          handleChange(keyName, item.value);
          setTreatments(item.value);
        }}
        search
      />

      <Select
        label="Treatment Name"
        keyName={"TreatmentName"}
        data={treatmentName}
        onChange={(keyName, item) => {
          handleChange(keyName, item.value);
          setCosts(item.value);
        }}
        search
      />

      <LabelledInputField
        label="Cost"
        value={cost}
        onChangeText={(text) => handleChange('Amount', text)}
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

export default BillingForm;
