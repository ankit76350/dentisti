import React, { useState, useCallback, useMemo, useEffect } from 'react';
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

// Move outside to avoid recreation on every render
const parseDate = (value) => {
  if (!value) return new Date();
  const isoString = value;
  return new Date(isoString);
};

function parseTime(timeStr) {
  const dateStr = "2024-07-22";
  return new Date(`${dateStr}T${timeStr}`);
}


const DateAndTimePicker = ({ fieldType = '', defaultValue = '', onChange ,label}) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const [date, setDate] = useState(new Date());

  useEffect(()=>{
    if (fieldType ==='date') {
      console.log('====================================');
      console.log("label:",label, "defaultValue:",defaultValue , "fieldType:",fieldType);
      console.log('====================================');
      // date should be in this format 2024-07-22
      setDate(() => parseDate(defaultValue))
    }
    if (fieldType ==='time') {
      // console.log('====================================');
      // console.log("label:",label, "defaultValue:",defaultValue , "fieldType:",fieldType);
      // console.log('====================================');
      setDate(() => parseTime(defaultValue))
    }
  },[defaultValue , label,fieldType])

  // console.log('====================================');
  // console.log("date",date);
  // console.log("defaultValue",defaultValue);
  // console.log('====================================');

  const [showIOSPicker, setShowIOSPicker] = useState({
    visible: false,
    mode: 'date',
  });

  console.log('====================================');
  console.log("setDate",date);
  console.log('====================================');

  const handleChange = useCallback((event, selectedDate) => {
    if (!selectedDate || event?.type === 'dismissed') return;
    setDate(selectedDate);
    onChange?.(selectedDate);
  }, [onChange]);

  const showPicker = useCallback(
    (mode) => {
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
    },
    [date, handleChange]
  );

  const formattedValue = useMemo(() => {
    return fieldType === 'date' ? date.toDateString() : date.toLocaleTimeString();

  }, [fieldType, date]);

  const themeStyles = {
    dropdown: isDark ? styles.darkDropdown : styles.lightDropdown,
    label: isDark ? styles.darkLabel : styles.lightLabel,
    text: isDark ? styles.darkText : styles.lightText,
  };

  return (
    <View style={{ padding: 0 }}>
      <TouchableOpacity
        style={[styles.button, themeStyles.dropdown]}
        onPress={() => showPicker(fieldType)}
        activeOpacity={0.8}
      >
        {defaultValue && <Text style={[styles.label, themeStyles.label]}>
          { label}
        </Text>}

        <View style={styles.valueWrapper}>
          <Text style={[styles.valueText, themeStyles.text]} numberOfLines={1}>
            {defaultValue ? formattedValue : label }
          </Text>
          {fieldType === 'date' ? (
            <AntDesign name="calendar" size={24} color="gray" />
          ) : (
            <MaterialCommunityIcons name="timer-outline" size={24} color="gray" />
          )}
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

export default React.memo(DateAndTimePicker);

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
