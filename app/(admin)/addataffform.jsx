import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Animated } from "react-native";
import { Picker } from "@react-native-picker/picker";

const FloatingLabelInput = ({ label, value, onChangeText, secureTextEntry, keyboardType }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = new Animated.Value(value ? 1 : 0);

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  return (
    <View style={styles.inputContainer}>
      <Animated.Text
        style={[
          styles.label,
          {
            top: animatedLabel.interpolate({ inputRange: [0, 1], outputRange: [10, -12] }),
            fontSize: animatedLabel.interpolate({ inputRange: [0, 1], outputRange: [16, 12] }),
          },
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Add Staff</Text>
      </View>
      <View style={styles.formContainer}>
        <FloatingLabelInput label="Name" value={form.name} onChangeText={(text) => handleChange("name", text)} />
        <FloatingLabelInput label="Email" value={form.email} onChangeText={(text) => handleChange("email", text)} keyboardType="email-address" />
        <FloatingLabelInput label="Password" value={form.password} onChangeText={(text) => handleChange("password", text)} secureTextEntry />
        <FloatingLabelInput label="Username" value={form.username} onChangeText={(text) => handleChange("username", text)} />
        <FloatingLabelInput label="Phone" value={form.phone} onChangeText={(text) => handleChange("phone", text)} keyboardType="phone-pad" />
        
        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabel}>Hospital Name</Text>
          <Picker
            selectedValue={form.hospitalName}
            onValueChange={(itemValue) => handleChange("hospitalName", itemValue)}
            style={styles.picker}
            mode="dropdown"
          >
            <Picker.Item label="Select Hospital" value="" />
            <Picker.Item label="City Hospital" value="City Hospital" />
            <Picker.Item label="Green Health Clinic" value="Green Health Clinic" />
          </Picker>
        </View>
        
        <FloatingLabelInput label="Role" value={form.role} onChangeText={(text) => handleChange("role", text)} />
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Staff</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    padding: 20,
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
  inputContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 15,
  },
  label: {
    position: "absolute",
    left: 15,
    color: "#666",
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#F7F7F7",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  pickerWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    padding: 5,
  },
  pickerLabel: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
  },
  picker: {
    height: 50,
    width: "100%",
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
