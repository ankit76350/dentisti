import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Animated, useColorScheme } from "react-native";
import { wp } from "../helpers/common";

const LabelledInputField = ({ label, value, onChangeText, secureTextEntry, keyboardType }) => {
    const [isFocused, setIsFocused] = useState(false);
    const animatedLabel = new Animated.Value(value ? 1 : 0);
    const theme = useColorScheme(); // Detect light/dark mode

    useEffect(() => {
        Animated.timing(animatedLabel, {
            toValue: isFocused || value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value]);

    return (
        <View style={styles.inputContainer}>
            {isFocused || value ? (
                <Animated.Text
                    style={[
                        styles.label,
                        theme === "dark" ? styles.darkLabel : styles.lightLabel,
                        {
                            top: animatedLabel.interpolate({ inputRange: [0, 1], outputRange: [18, -10] }),
                            fontSize: animatedLabel.interpolate({ inputRange: [0, 1], outputRange: [14, 12] }),
                        },
                    ]}
                >
                    {label}
                </Animated.Text>
            ) : null}

            <TextInput
                style={[
                    styles.input,
                    theme === "dark" ? styles.darkInput : styles.lightInput,
                ]}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(value ? true : false)}
                secureTextEntry={secureTextEntry}
                placeholder={!isFocused && !value ? label : ""}
                keyboardType={keyboardType}
                placeholderTextColor={theme === "dark" ? "#A0A0A0" : "#808080"}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        position: "relative",
        marginBottom: 15,
    },
    label: {
        position: "absolute",
        left: 15,
        zIndex: 2,
        backgroundColor: "transparent",
        paddingHorizontal: 5,
        borderRadius: wp(1),
    },
    lightLabel: {
        color: "gray",
        backgroundColor: "white",
    },
    darkLabel: {
        color: "white",
        backgroundColor: "#1B263B",
    },
    input: {
        width: "100%",
        padding: 15,
        borderRadius: wp(2.5),
        borderWidth: 1,
    },
    lightInput: {
        backgroundColor: "#F7F7F7",
        borderColor: "white",
    },
    darkInput: {
        backgroundColor: "#1B263B",
        borderColor: "#1B263B",
        color: "white",
    },
});

export default LabelledInputField;
