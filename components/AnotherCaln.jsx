import { Ionicons } from '@expo/vector-icons';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  DraggingEvent,
  parseDateTime,
  ResourceHeaderItem,
} from '@howljs/calendar-kit';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from './HeaderCC';



const Calendar = () => {
  const [events, setEvents] = useState([]);
  const { bottom: safeBottom } = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const calendarRef = useRef(null);
  const params = useLocalSearchParams();
  const router = useRouter();
  const currentDate = useState(new Date().toISOString())[0];
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarWidth, setCalendarWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setCalendarWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const _onPressToday = useCallback(() => {
    calendarRef.current?.goToDate({
      date: new Date().toISOString(),
      animatedDate: true,
      hourScroll: true,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header currentDate={currentDate} onPressToday={_onPressToday} />
      <CalendarContainer
        ref={calendarRef}
        calendarWidth={calendarWidth}
        numberOfDays={Number(params.numberOfDays)}
        scrollByDay={Number(params.numberOfDays) < 5}
        theme={colorScheme === 'dark' ? styles.darkTheme : styles.lightTheme}
        events={events}
        onPressEvent={(event) => console.log(event)}
        selectedEvent={selectedEvent}
        spaceFromBottom={safeBottom}
      >
        <CalendarHeader />
        <CalendarBody />
      </CalendarContainer>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: { flex: 1 },
  lightTheme: {
    backgroundColor: '#fff',
  },
  darkTheme: {
    backgroundColor: '#1A1B21',
  },
});
