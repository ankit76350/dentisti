import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useColorScheme, StatusBar } from "react-native";
import LabelledInputField from '../../components/LabelledInputField';
import Select from '../../components/Select';
import { hp, wp } from '../../helpers/common';
import BackButton from "../../components/BackButton";
import { useRoute } from "@react-navigation/native";


const addstafform = () => {
  const theme = useColorScheme();
  // const { staffInfo } = route.params || {}; 
  const route = useRoute(); // Get route params
  const staffInfo = route?.params?.staffInfo || {}; // Avoid undefined issues

  console.log("route", route); // Check if params exist


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    phone: "",
    hospitalName: "",
    role: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const roleOptions = [
    { label: "Doctor", value: "Doctor" },
    { label: "Receptionist", value: "Receptionist" },
  ];

  const handleSelection = (item) => {
    console.log("Selected:", item);
  };

  return (
    <>

      <BackButton title="Add New Staff" />
      <ScrollView contentContainerStyle={[styles.container, theme === "dark" ? styles.darkContainer : styles.lightContainer]}>
        <StatusBar
          animated={true}
          backgroundColor={theme === "dark" ? "#1B263B" : "#49a3f1"}
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />

        {/* Header */}
        <View style={[styles.header, theme === "dark" ? styles.darkHeader : styles.lightHeader]}>
          {/* <View style={{alignSelf:''}}> */}

          {/* <Text style={styles.title}>Add New Staff</Text> */}
          {/* <Text style={styles.subtitle}>Add Staff</Text> */}
          {/* </View> */}
        </View>

        {/* Form Container */}
        <View style={[styles.formContainer, theme === "dark" ? styles.darkFormContainer : styles.lightFormContainer]}>
          <LabelledInputField label="Name" value={form.name} onChangeText={(text) => handleChange("name", text)} />
          <LabelledInputField label="Email" value={form.email} onChangeText={(text) => handleChange("email", text)} keyboardType="email-address" />
          <LabelledInputField label="Password" value={form.password} onChangeText={(text) => handleChange("password", text)} secureTextEntry />
          <LabelledInputField label="Username" value={form.username} onChangeText={(text) => handleChange("username", text)} />
          <LabelledInputField label="Phone" value={form.phone} onChangeText={(text) => handleChange("phone", text)} keyboardType="phone-pad" />
          <LabelledInputField label="Role" value={form.role} onChangeText={(text) => handleChange("role", text)} />
          <Select label="Hospital Name" data={data} onChange={handleSelection} search={true} />
          <Select label="Role" data={roleOptions   } onChange={handleSelection} search={false} />

          {/* Submit Button */}
          <TouchableOpacity style={[styles.button, theme === "dark" ? styles.darkButton : styles.lightButton]}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
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
