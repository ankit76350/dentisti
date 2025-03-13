import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const CustomDropdown = ({ label, data, onChange }) => {
    const [value, setValue] = useState(null);
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

            <Dropdown
                style={[styles.dropdown, isFocused && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                mode="modal"
                placeholder={!isFocused ? label : ""}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(item) => {
                    setValue(item.value);
                    onChange && onChange(item);
                    setIsFocused(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocused ? "blue" : "black"}
                        name="Safety"
                        size={20}
                    />
                )}
            />
        </View>
    );
};

export default CustomDropdown;

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
    dropdown: {
        width: "100%",
        backgroundColor: "#F7F7F7",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        color: "gray",
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
