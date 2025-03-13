import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import LabelledInputField from '../../components/LabelledInputField'
import Select from '../../components/Select'

const AddStaffForm = () => {
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

  const data = [
    { label: "Apple", value: "1" },
    { label: "Banana", value: "2" },
    { label: "Cherry", value: "3" },
  ];


  const handleSelection = (item) => {
    console.log("Selected:", item);
  };

  return (
    <>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Add Staff</Text>
        </View>
        <View style={styles.formContainer}>
          <LabelledInputField label="Name" value={form.name} onChangeText={(text) => handleChange("name", text)} />
          <LabelledInputField label="Email" value={form.email} onChangeText={(text) => handleChange("email", text)} keyboardType="email-address" />
          <LabelledInputField label="Password" value={form.password} onChangeText={(text) => handleChange("password", text)} secureTextEntry />
          <LabelledInputField label="Username" value={form.username} onChangeText={(text) => handleChange("username", text)} />
          <LabelledInputField label="Phone" value={form.phone} onChangeText={(text) => handleChange("phone", text)} keyboardType="phone-pad" />
          <LabelledInputField label="Role" value={form.role} onChangeText={(text) => handleChange("role", text)} />
          <Select label="Hospital Name" data={data} onChange={handleSelection} />
          <Select label="Role" data={data} onChange={handleSelection} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Staff</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    // padding: 20,
  },
  header: {
    width: "100%",
    backgroundColor: "#026670",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginTop: -30,
    elevation: 5,
  },
  button: {
    width: "100%",
    backgroundColor: "#026670",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddStaffForm;
