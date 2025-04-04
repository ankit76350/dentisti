import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useColorScheme, StatusBar, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { hp, wp } from "../../helpers/common";
import BackButton from "../BackButton";
import LabelledInputField from "./LabelledInputField";
import Loading from '../Loading'
import Select from "./Select";
import DatePickerExample from "./DatePickerExample";

const MyForm = ({ formFields, onSubmit, title = "Add New Appointments" }) => {
    const theme = useColorScheme();

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >

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
                            {/* <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                             style={{ flex: 1 }}> 
                            */}

                            <ScrollView
                                contentContainerStyle={{ marginTop: hp(1) }}
                                keyboardShouldPersistTaps="handled"
                            >
                                {formFields.map((field) => (
                                    <View key={field.name} style={{ marginTop: hp(0.4) }}>
                                        {field.type === "select" ? (
                                            <Select
                                                label="Role"
                                                keyName="role"
                                                data={[
                                                    { label: "Doctor", value: "Doctor" },
                                                    { label: "Receptionist", value: "Receptionist" },
                                                ]}
                                                onChange={() => { }}
                                                search={true}
                                                value={"Doctor"}
                                            />
                                        ) : field.type === "date" ? (
                                            <Text>Date</Text>
                                        ) : field.type === "time" ? (
                                            <Text>Time</Text>
                                        ) : (
                                            <LabelledInputField
                                                label={field.label}
                                                value={field.defaultValue}
                                                onChangeText={(text) => handleChange(field.name, text)}
                                            />
                                        )}
                                    </View>
                                ))}


                                <DatePickerExample />
                                {/* Submit Button */}
                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        theme === "dark" ? styles.darkButton : styles.lightButton,
                                        { opacity: 0.5 } // Optional: makes it look disabled
                                    ]}
                                    onPress={onSubmit}
                                    disabled={true} // This disables the button
                                >
                                    {/* <Text style={styles.buttonText}>Add</Text> */}
                                    <Loading size='small' />
                                </TouchableOpacity>
                            </ScrollView>
                            {/* </KeyboardAvoidingView> */}
                        </View>
                    </View>
                </KeyboardAvoidingView>
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
            ios: hp(20),      // For iOS (iPhone, iPad, etc.)
            android: hp(17),   // For Android
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
        marginTop: 20,
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
        // marginBottom:hp(2)
        marginBottom: Platform.select({
            ios: hp(1),      // For iOS (iPhone, iPad, etc.)
            android: hp(2),   // For Android
        }),
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

export default MyForm;