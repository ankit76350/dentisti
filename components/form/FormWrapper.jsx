import React from "react";
import {
    View,
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
import BackButton from "../../components/BackButton.jsx";

const FormWrapper = ({ children, formFields, onSubmit, title = "Billing", isSubmitting = false, screen = "" }) => {
    const theme = useColorScheme();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={[styles.container, theme === "dark" ? styles.darkContainer : styles.lightContainer]}>
                    <BackButton title={title} screen={screen} />
                    <StatusBar
                        animated
                        backgroundColor={theme === "dark" ? "#1B263B" : "#49a3f1"}
                        barStyle={theme === "dark" ? "light-content" : "dark-content"}
                    />

                    <View style={[styles.header, theme === "dark" ? styles.darkHeader : styles.lightHeader]} />

                    <View style={[styles.formContainer, theme === "dark" ? styles.darkFormContainer : styles.lightFormContainer]}>
                        <ScrollView
                            contentContainerStyle={{ marginTop: hp(1) }}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            {children}
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
        gap:1,
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



export default FormWrapper;
