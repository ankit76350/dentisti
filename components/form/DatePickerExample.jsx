import React, { useState } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';


const DatePickerExample = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Select Date" onPress={() => setShow(true)} />
      <Text style={{ marginTop: 10 }}>
        Selected Date: {date.toDateString()}
      </Text>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <RNDateTimePicker mode="date" value={new Date()}

        timeZoneName={'Asia/Calcutta'}
        themeVariant="light"
        title="Choose anniversary" 
        />



      {/* {Platform.OS === 'android' && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      {Platform.OS === 'ios' && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )} */}

    </View>
  );
};

export default DatePickerExample;
