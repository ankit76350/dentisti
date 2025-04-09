import React, { useEffect, useState, useCallback } from "react";
import { Alert } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import MyForm from "../../../components/form/MyForm";
import { validateAppointmentForm } from "../../../helpers/validator";
import { fetchHospitalDetails } from "../../../redux/hospital/hospitalSlice";
import { catalystURL } from "../../../constants";
import usePost from "../../../hooks/usePost";
import { role, user } from "../../../assets/json/role";

const appointmentform = () => {
  const route = useRoute();
  const { newAppointmentDetails = {} } = route.params || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { hospitalDetailsData } = useSelector((state) => state.hospitals.hospitalDetailsState || {});

  const [formFields, setFormFields] = useState([
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name', defaultValue: '' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', defaultValue: '' },
    { name: 'phone', label: 'Phone', type: 'phone', placeholder: 'Enter your phone number', defaultValue: '' },
    { name: 'address', label: 'Address', type: 'text', placeholder: 'Enter your address', defaultValue: '' },
    { name: 'dob', label: 'Date Of Birth', type: 'date', defaultValue: '' },
    { name: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }], defaultValue: '' },
    { name: 'hospitalName', label: 'Hospital Name', type: 'select', options: [], defaultValue: newAppointmentDetails.hospital_id || '' },
    { name: 'doctorName', label: 'Doctor Name', type: 'select', options: [], defaultValue: newAppointmentDetails.doctor_id || '' },
    { name: 'date', label: 'Appointment Date', type: 'date', defaultValue: '' },
    { name: 'time', label: 'Appointment Time', type: 'time', defaultValue: '' },
  ]);

  const updateFieldOptions = useCallback((fieldName, options) => {
    setFormFields(prevFields =>
      prevFields.map(field =>
        field.name === fieldName ? { ...field, options } : field
      )
    );
  }, []);

  useEffect(() => {
    const { doctors = [], hospital } = hospitalDetailsData || {};

    if (doctors.length && role !== 'doctor') {
      const doctorOptions = doctors.map(d => ({ label: d.name, value: d.ROWID }));
      updateFieldOptions('doctorName', doctorOptions);
    } else if (role === 'doctor') {
      updateFieldOptions('doctorName', [{
        label: user?.username,
        value: newAppointmentDetails?.doctor_id
      }]);
    }

    if (hospital) {
      updateFieldOptions('hospitalName', [{
        label: hospital.hospital_name,
        value: hospital.ROWID
      }]);
    }
  }, [hospitalDetailsData, role, user, newAppointmentDetails?.doctor_id, updateFieldOptions]);

  useEffect(() => {
    if (newAppointmentDetails.hospital_id) {
      dispatch(fetchHospitalDetails(newAppointmentDetails.hospital_id));
    }
  }, [dispatch, newAppointmentDetails.hospital_id]);

  const { loading, error, postData } = usePost();

  const handleSubmit = async (formData) => {
    if (!validateAppointmentForm(formData)) return;

    const newAppointmentData = {
      name: formData.name,
      email: formData.email,
      phone_no: formData.phone,
      address: formData.address,
      date_of_birth: formData.dob,
      gender: formData.gender,
      hospital_id: formData.hospitalName,
      doctor_id: formData.doctorName,
      date_time: `${formData.date} ${formData.time}`,
      status: "Pending",
    };

    try {
      const response = await postData(`${catalystURL}admin/appointment`, newAppointmentData);
      if (!error) {
        console.log(JSON.stringify(response, null, 2));
        Alert.alert("Success", `Appointment added successfully for ${response.name}.`);
        navigation.navigate('appointments');
      } else {
        Alert.alert("Something went wrong", "Appointment not added.");
      }
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to submit data.");
    }
  };

  return (
    <MyForm
      formFields={formFields}
      onSubmit={handleSubmit}
      screen="appointments"
      isSubmitting={loading}
    />
  );
};

export default appointmentform;
