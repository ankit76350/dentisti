import React, { useState, useEffect, useRef, useMemo } from "react";
import { View, StyleSheet, Animated, useColorScheme } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { hp, wp } from "../../helpers/common";

const Select = ({ label, keyName, data, onChange, search = false, icon = null, value = "", minHeight = false }) => {
  const [selectValue, setSelectValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;
  const theme = useColorScheme();

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || selectValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, selectValue]);

  useEffect(() => {
    setSelectValue(value);
  }, [value]);

  const animatedLabelStyle = useMemo(() => ({
    top: animatedLabel.interpolate({ inputRange: [0, 1], outputRange: [18, -10] }),
    fontSize: animatedLabel.interpolate({ inputRange: [0, 1], outputRange: [14, 12] }),
  }), [animatedLabel]);

  const isDark = theme === "dark";

  const dropdownStyles = useMemo(() => ([
    styles.dropdown,
    isDark ? styles.darkDropdown : styles.lightDropdown,
  ]), [isDark]);

  const containerStyles = useMemo(() => ([
    {
      borderRadius: wp(2),
      height: minHeight ? 400 : undefined,
    },
    isDark ? styles.darkDropdown : styles.lightDropdown,
  ]), [minHeight, isDark]);

  return (
    <View style={styles.inputContainer}>
      {(isFocused || selectValue) && (
        <Animated.Text
          style={[
            styles.label,
            isDark ? styles.darkLabel : styles.lightLabel,
            animatedLabelStyle,
          ]}
        >
          {label}
        </Animated.Text>
      )}

      <Dropdown
        style={dropdownStyles}
        containerStyle={containerStyles}
        itemTextStyle={{ color: isDark ? "#FFF" : "#000" }}
        placeholderStyle={[
          styles.placeholderStyle,
          isDark ? styles.darkPlaceholder : styles.lightPlaceholder,
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          isDark ? styles.darkText : styles.lightText,
        ]}
        activeColor={isDark ? "#3A506B" : "#D4D4D4"}
        inputSearchStyle={[
          { borderRadius: wp(2) },
          styles.inputSearchStyle,
          isDark ? styles.darkSearchInput : styles.lightSearchInput,
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
    marginBottom: hp(0.9),
  },
  label: {
    position: "absolute",
    left: wp(4),
    zIndex: 2,
    backgroundColor: "transparent",
    paddingHorizontal: wp(1),
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
  dropdown: {
    width: "100%",
    padding: 15,
    borderRadius: wp(2.5),
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
