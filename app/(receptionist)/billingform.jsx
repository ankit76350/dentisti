import React, { useState, useEffect, useCallback } from "react";
import MyForm from "../../components/form/MyForm";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { role, user } from "../../assets/json/role";
import { fetchHospitalDetails } from "../../redux/hospital/hospitalSlice";
import usePost from "../../hooks/usePost";
import usePut from "../../hooks/usePut";
import { catalystURL } from "../../constants";
import { Alert } from "react-native";
import { validatePatientForm } from "../../helpers/validator";

const billingform = () => {
  const dispatch = useDispatch();
    const navigation = useNavigation();
  const route = useRoute();
  const { hospitalDetailsData } = useSelector(
    (state) => state.hospitals.hospitalDetailsState || {}
  );

  const { newFormDetails = {}, action } = route.params || {};

  //! fetch the hospital detail like hospital name doctors...
  useEffect(() => {
    if (newFormDetails.hospital_id) {
      dispatch(fetchHospitalDetails(newFormDetails.hospital_id));
    }
  }, [dispatch, newFormDetails.hospital_id, newFormDetails]);


  // Utility function to extract date and time from appointmentDate
  const splitDateTime = (datetime) => {
    if (!datetime) return { date: '', time: '' };
    const [date, time] = datetime.split(" ");

    return {
      date: date || '',
      time: time || ''
    };
  };
  
  const generateFormFields = (details = {}) => {
    const { date, time } = splitDateTime(details.date_of_admission);


    return [
      {
        name: 'patient_name',
        label: 'Patient Name',
        type: 'text',
        placeholder: 'Enter Patient Name',
        defaultValue: details.patient_name || '',
      },
      {
        name: 'doctorName',
        label: 'Doctor Name',
        type: 'select',
        defaultValue: details.doctor_id || '',
      },
      {
        name: 'date',
        label: 'Date Of Admission',
        type: 'date',
        defaultValue: date, // date should be in this format 2024-07-22
      },
      {
        name: 'time',
        label: 'Time Of Admission',
        type: 'time',
        defaultValue: time, // time should be in this format 06:04:04
      },
      {
        name: 'phone',
        label: 'Patient Phone No',
        type: 'phone',
        placeholder: 'Enter phone number',
        defaultValue: details.phone || '',
      },

      {
        name: 'date',
        label: 'Date',
        type: 'date',
        defaultValue: date || '',
      },

    
     
      {
        name: 'paymentMethod',
        label: 'Gender',
        type: 'select',
        options: [
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
        ],
        defaultValue: details.gender || '',
      },
     
     
      {
        name: 'paymentStatus',
        label: 'Gender',
        type: 'select',
        options: [
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
        ],
        defaultValue: details.gender || '',
      },
     
      
      
     
    ];
  };

  const [formFields, setFormFields] = useState(generateFormFields());

  // console.log("generateFormFields",generateFormFields());
  // console.log("formFields",newFormDetails);
  // console.log("formFields wre",formFields);




  useEffect(() => {
    setFormFields(generateFormFields(newFormDetails));
  }, [newFormDetails]);

  const updateFieldOptions = (fieldName, options) => {
    setFormFields(prevFields =>
      prevFields.map(field =>
        field.name === fieldName ? { ...field, options } : field
      )
    );
  };

  const { doctors = [], hospital } = hospitalDetailsData || {};
  // console.log("doctors",doctors);



  useEffect(() => {
    if (doctors.length && role !== 'doctor') {
      //All doctor in the hospital
      const doctorOptions = doctors.map(d => ({ label: d.name, value: d.ROWID }));
      updateFieldOptions('doctorName', doctorOptions);

    } else if (role === 'doctor') {
      //one doctor in the hospital
      updateFieldOptions('doctorName', [{
        label: user?.username,
        value: newFormDetails?.doctor_id
      }]);

    }
    if (hospital) {
      //only one hospital 
      updateFieldOptions('hospitalName', [{
        label: hospital.hospital_name,
        value: hospital.ROWID
      }]);
    }
  }, [hospitalDetailsData]);



  const { loading, error:postError, postData } = usePost();
  const { isUpdating, error:putError, updateData } = usePut();

  // Handle submit
  const addNewPatients = async (formData) => {
    console.log("Submit Add New Patients:", formData);
    if (!validatePatientForm(formData)) return;


    const newFormData = {
      patient_name: formData.patient_name,
      address: formData.address,
      date_of_birth: formData.dob,
      phone: formData.phone,
      gender: formData.gender,
      hospital_id: formData.hospitalName,
      doctor_id: formData.doctorName,
      date_of_admission: `${formData.date} ${formData.time}`,
    };

 

    try {
          let response;
    
          if (action === "POST") {
            console.log("jii");
            
            response = await postData(`${catalystURL}admin/patient`, newFormData);
            
          } else if (action === "PUT") {
            response = await updateData(`${catalystURL}admin/patient/${newFormDetails.ROWID}`, newFormData);
          }
    
          const err = action === "POST" ? postError : putError;
    
          if (!err) {
            Alert.alert("Success", `Patient ${action === "POST" ? "added" : "updated"} successfully for ${response.patient_name}.`);
            navigation.navigate("patients");
          } else {
            throw new Error("Server error");
          }
        } catch (err) {
          Alert.alert("Error", err.message || `Failed to ${action === "POST" ? "add" : "update"} patient.`);
        }

    // You can dispatch action or API call here
  };

  return (
    <MyForm
      formFields={formFields}
      title="New Recept"
      onSubmit={addNewPatients}
      screen = "billing"
      isSubmitting={loading || isUpdating}
    />
  );
};

export default billingform;
