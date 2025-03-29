import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useColorScheme, StatusBar, Alert } from "react-native";
import LabelledInputField from '../../components/LabelledInputField';
import Select from '../../components/Select';
import { hp, wp } from '../../helpers/common';
import BackButton from "../../components/BackButton";
import { useRoute } from "@react-navigation/native";
import { validateStaffForm } from '../../helpers/validator';
import { useDispatch, useSelector } from "react-redux";
import usePost from "../../hooks/usePost";
import { catalystURL } from "../../constants";
import usePut from "../../hooks/usePut";
import { fetchUserData } from "../../redux/user/userSlice";
import { fetchHospitalData } from "../../redux/hospital/hospitalSlice";


const addstafform = () => {
  const theme = useColorScheme();
  const route = useRoute();

  const dispatch = useDispatch();

  // Extracting parameters from route
  const staffInfo = route?.params?.staffInfo || {};
  const title = route?.params?.title || "";
  const updating = route?.params?.update || false;

  // State for form fields
  const [form, setForm] = useState({
    name: staffInfo.name || "",
    email: staffInfo.email || "",
    password: staffInfo.password || "",
    username: staffInfo.username || "",
    phone: staffInfo.phone || "",
    hospitalName: staffInfo.hospital_name || "",
    role: staffInfo.role || "",
  });


  //Todo Start: handle inputfiled
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSelection = (keyName, item) => {
    setForm({ ...form, [keyName]: item.value });
  };
  //Todo End: handle inputfiled



  //Todo: Start Hospital info
  const [totalClinics, setTotalClinics] = useState([]);
  const hospitals = useSelector((state) => state.hospitals.hospitalsState.hospitalsData);
  const [hospital, setHospital] = useState([]);


  useEffect(() => {
    dispatch(fetchHospitalData());
  }, []);

  useEffect(() => {
    setTotalClinics(hospitals);
  }, [hospitals]);


  useEffect(() => {
    setHospital(totalClinics.map(currItem => ({ label: currItem.hospital_name, value: currItem.hospital_name })));
  }, [totalClinics]);

  const findHospitalId = (hospitalName) => {
    if (!hospitalName) return null;
    const hospital = hospitals.find(item => item.hospital_name === hospitalName);
    return hospital?.ROWID || null;
  };

  function removeHospitalName(userObj) {
    delete userObj.hospitalName;
    return userObj;
  }
  //Todo: End Hospital info


  //Add New new staff data
  const { loading, error, postData } = usePost();
  const url = `${catalystURL}admin/user`;

  const submitStaffData = async () => {
    if (validateStaffForm(form)) {
      const hospital_id = findHospitalId(form.hospitalName);
      let updatedUser = removeHospitalName(form);

      try {
        const response = await postData(url, { ...updatedUser, hospital_id });
        if (response && response.success) {
          setForm({ name: "", email: "", password: "", username: "", phone: "", hospital_id: "", role: "" });
             dispatch(fetchUserData());
          Alert.alert("Success", "Staff data submitted successfully.");
        } else {
          Alert.alert("Error", error || "Something went wrong.");
        }
      } catch (err) {
        Alert.alert("Error", err.message || "Failed to submit data.");
      }
    }
  };



  // Update existing staff data
  const { updateData } = usePut();
  const handleUpdate = async () => {
    if (validateStaffForm(form)) {
      const hospital_id = findHospitalId(form.hospitalName);
      let updatedUser = removeHospitalName(form);
      try {
        const response = await updateData(`${catalystURL}admin/user/${staffInfo.ROWID}`, { ...updatedUser, hospital_id });
        if (response && response.success) {
          setForm({ name: "", email: "", password: "", username: "", phone: "", hospital_id: "", role: "" });
             dispatch(fetchUserData());
          Alert.alert("Success", "Staff data updated successfully.");
        } else {
          Alert.alert("Error", error || "Something went wrong.");
        }
      } catch (err) {
        Alert.alert("Error", err.message || "Failed to update data.");
      }
    }
  };



  return (
    <>

      <BackButton title={title || "Add New Staff"} />
      <ScrollView contentContainerStyle={[styles.container, theme === "dark" ? styles.darkContainer : styles.lightContainer]}>
        <StatusBar
          animated={true}
          backgroundColor={theme === "dark" ? "#1B263B" : "#49a3f1"}
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />

        {/* Header */}
        <View style={[styles.header, theme === "dark" ? styles.darkHeader : styles.lightHeader]}>

        </View>

        {/* Form Container */}
        <View style={[styles.formContainer, theme === "dark" ? styles.darkFormContainer : styles.lightFormContainer]}>
          <LabelledInputField label="Name" value={form.name} onChangeText={(text) => handleChange("name", text)} />
          <LabelledInputField label="Email" value={form.email} onChangeText={(text) => handleChange("email", text)} keyboardType="email-address" />
          <LabelledInputField label="Password" value={form.password} onChangeText={(text) => handleChange("password", text)} secureTextEntry />
          <LabelledInputField label="Username" value={form.username} onChangeText={(text) => handleChange("username", text)} />
          <LabelledInputField label="Phone" value={form.phone} onChangeText={(text) => handleChange("phone", text)} keyboardType="phone-pad" />
          <Select
            label="Hospital Name"
            keyName="hospitalName"
            data={hospital}
            onChange={handleSelection}
            search={true}
            value={form.hospitalName} // Predefined value
          />

          <Select
            label="Role"
            keyName="role"
            data={[
              { label: "Doctor", value: "Doctor" },
              { label: "Receptionist", value: "Receptionist" },
            ]}
            onChange={handleSelection}
            search={false}
            value={form.role} // Predefined value
          />


          {/* Submit Button */}
          {!updating ? (<TouchableOpacity style={[styles.button, theme === "dark" ? styles.darkButton : styles.lightButton]} onPress={submitStaffData}>
            {!loading ? (<Text style={styles.buttonText}>Add</Text>) : (<Text style={styles.buttonText}>Adding...</Text>)}
          </TouchableOpacity>) :
            (<TouchableOpacity style={[styles.button, theme === "dark" ? styles.darkButton : styles.lightButton]} onPress={handleUpdate}>
              {!loading ? (<Text style={styles.buttonText}>Update</Text>) : (<Text style={styles.buttonText}>Updating...</Text>)}
            </TouchableOpacity>)
          }


        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    // paddingBottom: 100,

  },
  lightContainer: {
    backgroundColor: "#E5E5E5",
  },
  darkContainer: {
    backgroundColor: "#0D1B2A",
  },
  header: {
    width: "100%",
    height: hp(17),
    // Top: hp(10),
    // paddingHorizontal: wp(20),
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
    alignItems: "center",
    justifyContent: 'flex-end',
    // marginBottom:10
  },
  lightHeader: {
    backgroundColor: "#49a3f1",
  },
  darkHeader: {
    backgroundColor: "#1B263B",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: hp(3.8),
    // alignSelf:'baseline'
  },
  subtitle: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
  },
  formContainer: {
    width: "90%",
    borderRadius: wp(4),
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
    marginTop: hp(-3),
    elevation: 5,
  },
  lightFormContainer: {
    backgroundColor: "#fff",
  },
  darkFormContainer: {
    backgroundColor: "#2A3A4D",
  },
  button: {
    width: "100%",
    padding: wp(3.5),
    borderRadius: wp(2.5),
    alignItems: "center",
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

export default addstafform;