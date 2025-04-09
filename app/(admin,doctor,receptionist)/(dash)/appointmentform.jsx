import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import MyForm from "../../../components/form/MyForm";
import { validateAppointmentForm } from "../../../helpers/validator";
import { fetchHospitalDetails } from "../../../redux/hospital/hospitalSlice";
import { catalystURL } from "../../../constants";
import usePost from "../../../hooks/usePost";
import usePut from "../../../hooks/usePut";
import { role, user } from "../../../assets/json/role";

const appointmentform = () => {
  const { params = {} } = useRoute();
  const { newAppointmentDetails = {}, action = "" } = params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { hospitalDetailsData } =
    useSelector((state) => state.hospitals.hospitalDetailsState) || {};

  const [formFields, setFormFields] = useState([]);

  const defaultFields = useMemo(
    () => [
      { name: "name", label: "Name", type: "text", placeholder: "Enter your name" },
      { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
      { name: "phone", label: "Phone", type: "phone", placeholder: "Enter your phone number" },
      { name: "address", label: "Address", type: "text", placeholder: "Enter your address" },
      { name: "dob", label: "Date Of Birth", type: "date" },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: [
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
        ],
      },
      { name: "hospitalName", label: "Hospital Name", type: "select", options: [] },
      { name: "doctorName", label: "Doctor Name", type: "select", options: [] },
      { name: "date", label: "Appointment Date", type: "date" },
      { name: "time", label: "Appointment Time", type: "time" },
    ],
    []
  );

  useEffect(() => {
    const fieldsWithDefaults = defaultFields.map((field) => {
      let defaultValue = "";
      switch (field.name) {
        case "name":
          defaultValue = newAppointmentDetails.name;
          break;
        case "email":
          defaultValue = newAppointmentDetails.email;
          break;
        case "phone":
          defaultValue = newAppointmentDetails.phoneNo;
          break;
        case "address":
          defaultValue = newAppointmentDetails.address;
          break;
        case "dob":
          defaultValue = newAppointmentDetails.dob;
          break;
        case "gender":
          defaultValue = newAppointmentDetails.gender;
          break;
        case "hospitalName":
          defaultValue = newAppointmentDetails.hospital_id;
          break;
        case "doctorName":
          defaultValue = newAppointmentDetails.doctor_id;
          break;
        case "date":
          defaultValue = newAppointmentDetails.appointmentDate?.split(" ")[0];
          break;
        case "time":
          defaultValue = newAppointmentDetails.appointmentDate?.split(" ")[1];
          break;
      }
      return { ...field, defaultValue: defaultValue || "" };
    });

    setFormFields(fieldsWithDefaults);
  }, [defaultFields, newAppointmentDetails]);

  const updateFieldOptions = useCallback((fieldName, options) => {
    setFormFields((prev) =>
      prev.map((field) =>
        field.name === fieldName ? { ...field, options } : field
      )
    );
  }, []);

  useEffect(() => {
    const { doctors = [], hospital } = hospitalDetailsData || {};

    if (role === "doctor") {
      updateFieldOptions("doctorName", [
        {
          label: user?.username,
          value: newAppointmentDetails?.doctor_id,
        },
      ]);
    } else if (doctors.length) {
      const doctorOptions = doctors.map((d) => ({
        label: d.name,
        value: d.ROWID,
      }));
      updateFieldOptions("doctorName", doctorOptions);
    }

    if (hospital) {
      updateFieldOptions("hospitalName", [
        {
          label: hospital.hospital_name,
          value: hospital.ROWID,
        },
      ]);
    }
  }, [hospitalDetailsData, updateFieldOptions, newAppointmentDetails?.doctor_id]);

  useEffect(() => {
    if (newAppointmentDetails.hospital_id) {
      dispatch(fetchHospitalDetails(newAppointmentDetails.hospital_id));
    }
  }, [dispatch, newAppointmentDetails.hospital_id]);

  const { loading, error: postError, postData } = usePost();
  const { isUpdating, error: putError, updateData } = usePut();

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
      ...(action === "POST" && { status: "Pending" }),
    };

    try {
      let response;

      if (action === "POST") {
        response = await postData(`${catalystURL}admin/appointment`, newAppointmentData);
      } else if (action === "PUT") {
        response = await updateData(`${catalystURL}admin/appointment/${newAppointmentDetails.ROWID}`, newAppointmentData);
      }

      const err = action === "POST" ? postError : putError;

      if (!err) {
        Alert.alert("Success", `Appointment ${action === "POST" ? "added" : "updated"} successfully for ${response.name}.`);
        navigation.navigate("appointments");
      } else {
        throw new Error("Server error");
      }
    } catch (err) {
      Alert.alert("Error", err.message || `Failed to ${action === "POST" ? "add" : "update"} appointment.`);
    }
  };

  return (
    <MyForm
      formFields={formFields}
      onSubmit={handleSubmit}
      screen="appointments"
      isSubmitting={loading || isUpdating}
    />
  );
};

export default appointmentform;
