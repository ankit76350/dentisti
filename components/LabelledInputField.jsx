import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Animated } from "react-native";

const LabelledInputField = ({ label, value, onChangeText, secureTextEntry, keyboardType }) => {
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
            {isFocused || value ? (
                <Animated.Text
                    style={[
                        styles.label,
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
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(value ? true : false)}
                secureTextEntry={secureTextEntry}
                placeholder={!isFocused && !value ? label : ""}
                keyboardType={keyboardType}
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
        color: "gray",
        backgroundColor: "white",
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    input: {
        width: "100%",
        backgroundColor: "#F7F7F7",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },

});


export default LabelledInputField;
