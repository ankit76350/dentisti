import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, useColorScheme } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { wp } from "../helpers/common";

const Select = ({ label, keyName, data, onChange, search = false, icon = null, value = "" }) => {
  const [selectValue, setSelectValue] = useState(value); // State for selected value
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = new Animated.Value(selectValue ? 1 : 0);
  const theme = useColorScheme(); // Detect light/dark mode

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || selectValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, selectValue]);

  useEffect(() => {
    setSelectValue(value); // Ensure predefined value is applied on mount and updates correctly
  }, [value]);

  return (
    <View style={styles.inputContainer}>
      {isFocused || selectValue ? (
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

      <Dropdown
        style={[
          styles.dropdown,
          theme === "dark" ? styles.darkDropdown : styles.lightDropdown,
        ]}
        containerStyle={[
          {
            borderRadius: wp(2),
            height: 400,
          },
          theme === "dark" ? styles.darkDropdown : styles.lightDropdown,
        ]}
        itemTextStyle={[
          theme === "dark" ? { color: "#FFF" } : { color: "#000" },
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          theme === "dark" ? styles.darkPlaceholder : styles.lightPlaceholder,
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          theme === "dark" ? styles.darkText : styles.lightText,
        ]}
        activeColor={theme === "dark" ? "#3A506B" : "#D4D4D4"}
        inputSearchStyle={[
          {
            borderRadius: wp(2),
          },
          styles.inputSearchStyle,
          theme === "dark" ? styles.darkSearchInput : styles.lightSearchInput,
        ]}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        mode="modal"
        placeholder={!isFocused ? label : ""}
        searchPlaceholder="Search..."
        search={search}
        value={selectValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(item) => {
          setSelectValue(item.value);
          onChange && onChange(keyName, item);
          setIsFocused(false);
        }}
        renderLeftIcon={() => icon}
      />
    </View>
  );
};

export default Select;

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
    borderRadius: 5,
  },
  lightLabel: {
    color: "gray",
    backgroundColor: "white",
  },
  darkLabel: {
    color: "white",
    backgroundColor: "#1B263B",
  },
  dropdown: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  lightDropdown: {
    backgroundColor: "#F7F7F7",
    borderColor: "white",
  },
  darkDropdown: {
    backgroundColor: "#1B263B",
    borderColor: "#1B263B",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  lightPlaceholder: {
    color: "gray",
  },
  darkPlaceholder: {
    color: "#A0A0A0",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  lightText: {
    color: "black",
  },
  darkText: {
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  lightSearchInput: {
    color: "black",
  },
  darkSearchInput: {
    color: "white",
  },
});
