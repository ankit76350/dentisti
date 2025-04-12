import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  useColorScheme,
} from "react-native";
import { hp, wp } from "../../helpers/common";

const ViewOnly = ({
  label,
  value="Hiii",
  onChangeText,
  secureTextEntry,
  keyboardType,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;
  const theme = useColorScheme();

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, animatedLabel]);

  const interpolatedLabelStyle = useMemo(
    () => ({
      top: animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: [18, -10],
      }),
      fontSize: animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 12],
      }),
    }),
    [animatedLabel]
  );

  const themeStyles = useMemo(() => {
    return {
      input:
        theme === "dark"
          ? [styles.input, styles.darkInput]
          : [styles.input, styles.lightInput],
      label:
        theme === "dark"
          ? [styles.label, styles.darkLabel]
          : [styles.label, styles.lightLabel],
      placeholderColor: theme === "dark" ? "#A0A0A0" : "#808080",
    };
  }, [theme]);

  return (
    <View style={styles.inputContainer}>
      {(isFocused || value) && (
        <Animated.Text style={[...themeStyles.label, interpolatedLabelStyle]}>
          {label} 
        </Animated.Text>
      )}
      <TextInput
        style={themeStyles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(!!value)}
        secureTextEntry={secureTextEntry}
        placeholder={!isFocused && !value ? label : ""}
        keyboardType={keyboardType}
        placeholderTextColor={themeStyles.placeholderColor}
        autoCapitalize="none"
        editable={false} 
      />
    </View>
  );
};

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

export default React.memo(ViewOnly);
