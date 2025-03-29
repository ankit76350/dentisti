import { StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'

const CustomInput = ({ value, onChangeText, ...props }) => {
  const theme = useColorScheme(); // Detect light/dark mode
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}>
      {props.icon && props.icon}
      <TextInput
        style={[
          { flex: 1 },
          theme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={'gray'}
        ref={props.InputRef}
        {...props}
      />
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 'row' should be a string
    height: hp(7.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: theme.colorstext, // Assuming `theme` is defined elsewhere
    borderRadius: theme.radius.xxl,
    borderCurve: 'continuous', // This is not a valid React Native property. You might want to remove it or use a supported value.
    paddingHorizontal: 18,
    gap: 12,
  },
  lightInput: {
    // backgroundColor: "#F7F7F7",
    borderColor: "white",
  },
  darkInput: {
    // backgroundColor: "#1B263B",
    // borderColor: "#1B263B",
    color: "white",
  },
});