import React, { useState } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { hp, wp } from '../../helpers/common';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const DateAndTimePicker = ({ fieldType = 'date' , defaultValue='2025-04-01 17:33:57:862'}) => {

  const parseDate = (value) => {
    if (!value) return new Date();
    const isoString = value.replace(' ', 'T').replace(/:(\d{3})$/, '.$1');
    return new Date(isoString);
  };
  
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const [date, setDate] = useState(parseDate(defaultValue));


  const [showIOSPicker, setShowIOSPicker] = useState({
    visible: false,
    mode: 'date',
  });

  const handleChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      if (event?.type === 'set') setDate(selectedDate);
      return;
    }

    if (event?.type !== 'dismissed') {
      setDate(selectedDate || date);
    }
  };

  const showPicker = (mode) => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: date,
        onChange: handleChange,
        mode,
        is24Hour: true,
      });
    } else {
      setShowIOSPicker({ visible: true, mode });
    }
  };

  const formattedValue =
    fieldType === 'date' ? date.toDateString() : date.toLocaleTimeString();

  return (
    <View style={{ padding: 0 }}>
      <TouchableOpacity
        style={[
          styles.button,
          isDark ? styles.darkDropdown : styles.lightDropdown,
        ]}
        onPress={() => showPicker(fieldType)}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.label,
            isDark ? styles.darkLabel : styles.lightLabel,
          ]}
        >
          {fieldType === 'date' ? 'Date' : 'Time'}
        </Text>

        <View style={styles.valueWrapper}>
          <Text
            style={[
              styles.valueText,
              isDark ? styles.darkText : styles.lightText,
            ]}
            numberOfLines={1}
          >
            {formattedValue}
          </Text>
         {fieldType === 'date' ? <AntDesign name="calendar" size={24} color={"gray"} /> : <MaterialCommunityIcons name="timer-outline" size={24} color={"gray"} />}
        </View>
      </TouchableOpacity>

      {Platform.OS === 'ios' && showIOSPicker.visible && (
        <View style={{ marginBottom: hp(2) }}>
          <DateTimePicker
            value={date}
            mode={showIOSPicker.mode}
            onChange={(event, selectedDate) => {
              handleChange(event, selectedDate);
              setShowIOSPicker({ ...showIOSPicker, visible: false });
            }}
          />
        </View>
      )}
    </View>
  );
};

export default DateAndTimePicker;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: hp(0.9),
    justifyContent: 'center',
  },
  lightDropdown: {
    backgroundColor: '#F7F7F7',
    borderColor: 'white',
  },
  darkDropdown: {
    backgroundColor: '#1B263B',
    borderColor: '#1B263B',
  },
  label: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -8,
    left: 15,
    fontSize: 12,
    zIndex: 1,
    paddingHorizontal: wp(1),
    borderRadius: wp(1),
  },
  lightLabel: {
    color: 'gray',
    backgroundColor: 'white',
  },
  darkLabel: {
    color: 'white',
    backgroundColor: '#1B263B',
  },
  valueWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 16,
    flex: 1,
  },
  lightText: {
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
});
