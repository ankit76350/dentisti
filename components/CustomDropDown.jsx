import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { hp, wp } from '../helpers/common';
import { AntDesign } from '@expo/vector-icons';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
  { label: 'Item 9', value: '9' },
  { label: 'Item 10', value: '10' },

];

const CustomDropdown = () => {
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";

  const dropdownRef = useRef(null);
  const [value, setValue] = useState(null);

  const handleOpen = () => {
    if (dropdownRef.current) {
      dropdownRef.current.open();
    }
  };

  return (
    <View style={styles.container}>
      {/* Open Button */}
      <TouchableOpacity onPress={handleOpen}>
        <AntDesign name="filter" size={24} color={isDarkMode ? `rgba(255, 255, 255, ${0.9})` : `rgba(0, 0, 0, ${1})`} />
      </TouchableOpacity>

      {/* Dropdown (Hidden UI, only opens via ref) */}
      <Dropdown
        ref={dropdownRef}
        data={data}
        labelField="label"
        valueField="value"
        search
        searchPlaceholder="Search a Year..."
        maxHeight={250}
        value={value}
        onChange={item => {
          setValue(item.value);
          dropdownRef.current?.close(); // Close after selection
        }}
        mode="modal" // Opens dropdown as a modal
        renderLeftIcon={() => null} // Removes the dropdown icon
        containerStyle={!isDarkMode ? styles.lightContainerStyle : styles.darkContainerStyle}
        itemTextStyle={!isDarkMode ? styles.lightItemTextStyle : styles.darkItemTextStyle}
        inputSearchStyle={!isDarkMode ? styles.lightInputSearchStyle : styles.darkInputSearchStyle}
        selectedTextStyle={!isDarkMode ? styles.lightSelectedTextStyle : styles.darkSelectedTextStyle}
        activeColor= {isDarkMode ? "#444" : "#D4D4D4"}
        style={[
          styles.dropdown,
          {
            position: 'absolute',
            width: wp(50),
            height: 1,
            left: wp(-45),
            top: hp(2),
            opacity: 0
          }
        ]}

      />
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: 'white',
  },

  // for dark theme
  darkContainerStyle: {
    backgroundColor: '#2C3E50',
    borderRadius: wp(2),
    borderColor: 'white',
    borderWidth: wp(0.3),
    height: hp(40)
  },
  darkItemTextStyle: {
    color: 'white'
  },

  darkInputSearchStyle: {
    borderRadius: wp(2),
    borderColor: 'white',
    backgroundColor: '#1B263B', // Slightly darker than the container for contrast
    color: 'white',
    paddingHorizontal: wp(2),
  },
  darkSelectedTextStyle:{
    color: '#FFD700' ,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // for light theme
  lightContainerStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(2),
    borderColor: 'gray',
    borderWidth: wp(0.3),
    height: hp(40)
  },
  lightItemTextStyle: {
    color: 'black'
  },

  lightInputSearchStyle: {
    borderRadius: wp(2),
    borderColor: 'white',
    backgroundColor: '#B3B3B3', // Slightly darker than the container for contrast
    color: 'white',
    paddingHorizontal: wp(2),
  },
  lightSelectedTextStyle:{
    color: '#FFD700' ,
    fontSize: 16,
    fontWeight: 'bold',
  },


  
  
});


