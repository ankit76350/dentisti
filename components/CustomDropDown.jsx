import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { hp, wp } from '../helpers/common';

const CustomDropDown = ({ options, value, setValue }) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      {isFocus || value ? (
        <Text style={[styles.label, isFocus && { color: '#007bff' }]}>Select an option</Text>
      ) : null}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#007bff', shadowOpacity: 0.3 }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={options}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Rows per page' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? '#007bff' : 'gray'}
            name={isFocus ? 'up' : 'down'}
            size={18}
          />
        )}
      />
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: hp(1),
    marginHorizontal: 12,
    borderRadius: 10,
    // elevation: 2, // Adds subtle shadow
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    width: wp(50),
    backgroundColor: '#f9f9f9',
  },
  icon: {
    marginRight: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#fff',
    left: 20,
    top: hp(0.5),
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#666',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  inputSearchStyle: {
    height: hp(5),
    fontSize: 16,
    borderRadius: 5,
  },
});
