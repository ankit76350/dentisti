// import React, { useState } from 'react';
// import { View, Button, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
// import LabelledInputField from './LabelledInputField';
// import { hp, wp } from '../helpers/common';

// const MyForm = ({ formFields, onSubmit }) => {
//     const initialFormData = formFields.reduce((acc, field) => {
//         acc[field.name] = field.defaultValue || '';
//         return acc;
//     }, {});

//     const [formData, setFormData] = useState(initialFormData);

//     const handleChange = (name, value) => {
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = () => {
//         onSubmit(formData);
//     };

//     return (
//         <KeyboardAvoidingView 
//             behavior={Platform.OS === "ios" ? "padding" : "height"} 
//             style={{ flex: 1 }}
//         >
//             <ScrollView 
//                 contentContainerStyle={{ flexGrow: 1 , marginTop:hp(3), paddingHorizontal:wp(2.5)}}
//                 keyboardShouldPersistTaps="handled"
//             >
//                 {formFields.map((field) => (
//                     <View key={field.name} style={{ marginBottom: hp(0.05) }}>
//                         <LabelledInputField
//                             label={field.label}
//                             value={formData[field.name]}
//                             onChangeText={(text) => handleChange(field.name, text)}
//                         />
//                     </View>
//                 ))}
//                 <Button title="Submit" onPress={handleSubmit} />
//             </ScrollView>
//         </KeyboardAvoidingView>
//     );

// };

// export default MyForm;


















// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, StyleSheet } from 'react-native';

// const MyForm = ({ formFields, onSubmit }) => {
//     const initialFormData = formFields.reduce((acc, field) => {
//         acc[field.name] = field.defaultValue || '';
//         return acc;
//     }, {});

//     const [formData, setFormData] = useState(initialFormData);

//     const handleChange = (name, value) => {
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = () => {
//         onSubmit(formData);
//     };

//     return (
//         <>
//             <View style={styles.appointmentsHeader}>
//             </View>
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//                 style={styles.container}
//             >
//                 <ScrollView
//                     contentContainerStyle={styles.scrollContainer}
//                     keyboardShouldPersistTaps="handled"
//                 >
//                     <Text style={styles.header}>Add New Staff</Text>
//                     {formFields.map((field) => (
//                         <View key={field.name} style={styles.inputContainer}>
//                             <Text style={styles.label}>{field.label}</Text>
//                             <TextInput
//                                 style={styles.input}
//                                 value={formData[field.name]}
//                                 onChangeText={(text) => handleChange(field.name, text)}
//                                 placeholder={field.label}
//                                 placeholderTextColor="#999"
//                             />
//                         </View>
//                     ))}
//                     <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//                         <Text style={styles.buttonText}>Add</Text>
//                     </TouchableOpacity>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     appointmentsHeader: {
//         paddingVertical: 5,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     container: {
//         flex: 1,
//         backgroundColor: '#F5F5F5',
//     },
//     scrollContainer: {
//         flexGrow: 1,
//         paddingHorizontal: 20,
//         paddingVertical: 30,
//     },
//     header: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 20,
//         color: '#000',
//     },
//     inputContainer: {
//         marginBottom: 15,
//     },
//     label: {
//         fontSize: 14,
//         fontWeight: '600',
//         marginBottom: 5,
//         color: '#333',
//     },
//     input: {
//         height: 50,
//         backgroundColor: '#FFF',
//         borderRadius: 10,
//         paddingHorizontal: 15,
//         fontSize: 16,
//         color: '#000',
//         borderWidth: 1,
//         borderColor: '#DDD',
//     },
//     button: {
//         backgroundColor: '#007BFF',
//         paddingVertical: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     buttonText: {
//         color: '#FFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default MyForm;








import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useColorScheme, StatusBar, Alert, KeyboardAvoidingView, Platform, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRoute } from "@react-navigation/native";
import { validateStaffForm } from '../helpers/validator';
import { useDispatch, useSelector } from "react-redux";
import usePost from "../hooks/usePost";
import { catalystURL } from "../constants";
import usePut from "../hooks/usePut";
import { fetchUserData } from "../redux/user/userSlice";
import { fetchHospitalData } from "../redux/hospital/hospitalSlice";
import { hp, wp } from "../helpers/common";
import BackButton from "./BackButton";
import LabelledInputField from "./LabelledInputField";


const stafform = ({ formFields, onSubmit }) => {
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
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, theme === "dark" ? styles.darkContainer : styles.lightContainer]}>
                <BackButton title={title || "Add New Staff"} />
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
                    <KeyboardAvoidingView>
                        <ScrollView
                            contentContainerStyle={{marginTop:hp(1)}}
                            keyboardShouldPersistTaps="handled"
                        >
                            {formFields.map((field) => (
                                <View key={field.name} style={{ marginTop:hp(0.4)}}>
                                    <LabelledInputField
                                        label={field.label}
                                        value={field.defaultValue}
                                        onChangeText={(text) => handleChange(field.name, text)}
                                    />
                                </View>
                            ))}

                            {/* Submit Button */}
                            <TouchableOpacity style={[styles.button, theme === "dark" ? styles.darkButton : styles.lightButton]} onPress={onSubmit}>
                                <Text style={styles.buttonText}>Add</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        // marginBottom: 200,

    },
    lightContainer: {
        backgroundColor: "#E5E5E5",
    },
    darkContainer: {
        backgroundColor: "#0D1B2A",
    },
    header: {
        width: "100%",
        // height: hp(17),
        height: Platform.select({
            ios:hp(20),      // For iOS (iPhone, iPad, etc.)
            android:hp(17),   // For Android
          }),
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
        marginTop:20,
        width: "90%",
        borderRadius: wp(4),
        paddingHorizontal: wp(5),
        paddingVertical: hp(3),
        marginTop: Platform.select({
            ios: hp(-6),      // For iOS (iPhone, iPad, etc.)
            android: hp(-8),   // For Android
          }),
        marginBottom: hp(38),
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

export default stafform;