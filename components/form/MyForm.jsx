import React, { useState, useMemo, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    useColorScheme,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { hp, wp } from "../../helpers/common";
import BackButton from "../BackButton";
import LabelledInputField from "./LabelledInputField";
import Loading from "../Loading";
import Select from "./Select";
import DateAndTimePicker from "./DateTimePicker";

const MyForm = ({ formFields, onSubmit, title = "Add New Appointments", isSubmitting = false }) => {
    const theme = useColorScheme();

    const initialFormData = useMemo(() => {
        const result = {};
        for (const field of formFields) {
            if (field.type === 'date' || field.type === 'time') {
                const [date, time] = field.defaultValue?.split(" ") || [];
                result[field.name] = field.type === 'date' ? date || '' : time || '';
            } else {
                result[field.name] = field.defaultValue || '';
            }
        }
        return result;
    }, [formFields]);

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = useCallback((name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const formatDate = useCallback((date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }, []);

    const renderField = (field) => {
        const value = formData[field.name];
        switch (field.type) {
            case "select":
                return (
                    <Select
                        label={field.label}
                        keyName={field.name}
                        data={field.options}
                        onChange={(keyName, item) => handleChange(keyName, item.value)}
                        search
                        value={value}
                    />
                );
            case "date":
                return (
                    <DateAndTimePicker
                        onChange={(date) => handleChange(field.name, formatDate(date))}
                        fieldType="date"
                        defaultValue={field.defaultValue}
                    />
                );
            case "time":
                return (
                    <DateAndTimePicker
                        onChange={(date) => handleChange(
                            field.name,
                            date.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false,
                            })
                        )}
                        fieldType="time"
                        defaultValue={field.defaultValue}
                    />
                );
            default:
                return (
                    <LabelledInputField
                        label={field.label}
                        value={value}
                        onChangeText={(text) => handleChange(field.name, text)}
                    />
                );
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={[styles.container, theme === "dark" ? styles.darkContainer : styles.lightContainer]}>
                    <BackButton title={title} />
                    <StatusBar
                        animated
                        backgroundColor={theme === "dark" ? "#1B263B" : "#49a3f1"}
                        barStyle={theme === "dark" ? "light-content" : "dark-content"}
                    />
                    {/* Header */}
                    <View style={[styles.header, theme === "dark" ? styles.darkHeader : styles.lightHeader]}>

                    </View>
                    <View style={[styles.formContainer, theme === "dark" ? styles.darkFormContainer : styles.lightFormContainer]}>
                        <ScrollView
                            contentContainerStyle={{ marginTop: hp(1) }}
                            keyboardShouldPersistTaps="handled"
                        >
                            {formFields.map((field) => (
                                <View key={field.name} style={{ marginTop: hp(0.4) }}>
                                    {renderField(field)}
                                </View>
                            ))}

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    theme === "dark" ? styles.darkButton : styles.lightButton,
                                    isSubmitting && { opacity: 0.5 },
                                ]}
                                onPress={() => onSubmit(formData)}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <Loading size="small" /> : <Text style={styles.buttonText}>Submit</Text>}
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
    },
    lightContainer: {
        backgroundColor: "#E5E5E5",
    },
    darkContainer: {
        backgroundColor: "#0D1B2A",
    },
    header: {
        width: "100%",

        height: Platform.select({
            ios: hp(20),
            android: hp(17),
        }),

        borderBottomLeftRadius: wp(5),
        borderBottomRightRadius: wp(5),
        alignItems: "center",
        justifyContent: 'flex-end',

    },
    lightHeader: {
        backgroundColor: "#49a3f1",
    },
    darkHeader: {
        backgroundColor: "#1B263B",
    },
    formContainer: {
        marginTop: 20,
        width: "90%",
        borderRadius: wp(4),
        paddingHorizontal: wp(5),
        paddingVertical: hp(3),
        marginTop: Platform.select({ ios: hp(-6), android: hp(-8) }),
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

export default MyForm;
