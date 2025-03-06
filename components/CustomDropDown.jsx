// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { hp, wp } from '../helpers/common';
// import { Entypo } from '@expo/vector-icons';

// const CustomDropDown = ({ options, value, setValue, optionTitle = '', selectTitle = '' }) => {
//   const [isFocus, setIsFocus] = useState(false);

//   return (
//     <>
//     {isFocus || value ? (
//       <Text style={[styles.label, isFocus && { color: 'black' }]}>{!isFocus ? "You have selected" :`${optionTitle}`}</Text>
//     ) : null}
//     <View style={styles.container}>
    
//       <Dropdown
//         style={[styles.dropdown, isFocus && { borderColor: '#007bff', shadowOpacity: 0.3 }]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         inputSearchStyle={styles.inputSearchStyle}
//         iconStyle={styles.iconStyle}
//         data={options}
//         search
//         maxHeight={300}
//         labelField="label"
//         valueField="value"
//         placeholder={!isFocus ? ` ${optionTitle}` : '...'}
//         searchPlaceholder="Search..."
//         value={value}
//         onFocus={() => {
//           console.log("hii");

//           return setIsFocus(true)
//         }
//         }
//         onBlur={() => setIsFocus(false)}
//         onChange={(item) => {
//           setValue(item.value);
//           setIsFocus(false);
//         }}
//         renderRightIcon={() => (
//           <AntDesign
//             style={styles.icon}
//             color={isFocus ? '#007bff' : 'gray'}
//             name={isFocus ? 'up' : 'down'}
//             size={24}
//           />
//         )}
//       />
//     </View>
//     </>

//   );
// };

// export default CustomDropDown;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     paddingVertical: hp(1),
//     marginHorizontal: 12,
//     borderRadius: 10,
//     elevation: 2, // Adds subtle shadow
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   dropdown: {
//     height: 50,
//     // borderColor: '#ccc',
//     // borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     width: wp(70),
//     // backgroundColor: '#f9f9f9',
//   },
//   icon: {
//     marginRight: 8,
//     fontWeight:'100'
//   },
//   label: {
//     position: 'absolute',
//     backgroundColor: '#fff',
//     left: 9,
//     top: hp(2.5),
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 16,
//     fontWeight: 'bold',
//     // borderWidth: 1,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//     color: '#666',
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   inputSearchStyle: {
//     height: hp(5),
//     fontSize: 16,
//     borderRadius: 5,
//   },
// });





import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { wp } from '../helpers/common';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
];

const CustomDropdown = () => {
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
        <Text style={styles.openButton}>Open</Text>
      </TouchableOpacity>

      {/* Dropdown (Hidden UI, only opens via ref) */}
      <Dropdown
        ref={dropdownRef}
        data={data}
        labelField="label"
        valueField="value"
        search
        searchPlaceholder="Search..."
        maxHeight={250}
        value={value}
        onChange={item => {
          setValue(item.value);
          dropdownRef.current?.close(); // Close after selection
        }}
        // mode="modal" // Opens dropdown as a modal
        renderLeftIcon={() => null} // Removes the dropdown icon
        style={{ position: 'absolute', width: wp(50), height: 1, left:20, opacity: 0 }} // Hide the UI
      />
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  openButton: {
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
