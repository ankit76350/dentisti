import React, { useEffect, useState, useMemo } from "react";
import { View, Text, FlatList, StyleSheet, useColorScheme } from "react-native";
import { Calendar } from "react-native-calendars";
import ScreenContainer from "../../components/ScreenContainer";
import EventCard from "../../components/EventCard";

const getCurrentDate = () => new Date().toISOString().split("T")[0];

const calendarview = () => {
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [year, setYear] = useState(2025);
  const theme = useColorScheme(); // Detect system theme

  const events = useMemo(() => ({
    "2025-03-05": [
      { date: "12 Aug", time: "10:00 AM", name: "Ankit1", phone: "8734325299", doctor: "Dr. Kedar", status: "Pending" },
      { date: "12 Aug", time: "12:30 PM", name: "Raj", phone: "9827361829", doctor: "Dr. Sharma", status: "Attended" }
    ],
    "2025-03-10": [
      { date: "12 Aug", time: "10:00 AM", name: "Aman", phone: "4575854545", doctor: "Dr. Ankit", status: "Attended" }
    ],
    "2025-03-15": [
      { date: "12 Aug", time: "10:00 AM", name: "Aman", phone: "4575854545", doctor: "Dr. Ankit", status: "Attended" },
      { date: "12 Aug", time: "02:00 PM", name: "Neha", phone: "8756392984", doctor: "Dr. Rao", status: "Pending" }
    ],
  }), []);

  const markedDates = useMemo(() => {
    const dates = Object.keys(events).reduce((acc, date) => {
      acc[date] = { marked: true, selectedDotColor: "red" };
      return acc;
    }, {});
    dates[selectedDate] = { ...(dates[selectedDate] || {}), selected: true, selectedColor: "#49a3f1" };
    return dates;
  }, [events, selectedDate]);

  useEffect(() => {
    setSelectedYear(parseInt(year));
  }, [year]);

  return (
    <ScreenContainer title="Calendar">
      <View style={[styles.container, theme === "dark" ? styles.darkBackground : styles.lightBackground]}>
        <Calendar
          key={selectedYear}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          enableSwipeMonths
          hideExtraDays
          theme={{
            todayTextColor: theme === "dark" ? "#FF6B6B" : "red",
            arrowColor: theme === "dark" ? "#49a3f1" : "#49a3f1",
            textDayFontWeight: "bold",
            textColor: "red",
            backgroundColor: theme === "dark" ? "#0D1B2A" : "#FFF",
            calendarBackground: theme === "dark" ? "#0D1B2A" : "#FFF",
            textSectionTitleColor: theme === "dark" ? "#E4E4E4" : "#222",
            textMonthFontWeight: "bold",
            dayTextColor: theme === "dark" ? "#FFF" : "#000000",
            monthTextColor: theme === "dark" ? "#E4E4E4" : "#222",
          }}
          current={selectedDate}
        />

        <Text style={[styles.selectedDateText, theme === "dark" ? styles.darkText : styles.lightText]}>
          Appointments
        </Text>

        {/* 
        <FlatList
          data={events[selectedDate] ? [events[selectedDate]] : []}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <EventCard appointments={[item]} />}
          ListEmptyComponent={<Text style={{ textAlign: "center", color: theme === "dark" ? "#FFF" : "#000" }}>No Appointments</Text>}
        /> */}

        <FlatList
          data={events[selectedDate] || []} // Now it's an array
          keyExtractor={(item, index) => `${selectedDate}-${index}`}
          renderItem={({ item }) => <EventCard appointments={[item]} />} // Pass as an array
          ListEmptyComponent={<Text style={{ textAlign: "center", color: theme === "dark" ? "#FFF" : "#000" }}>No Appointments</Text>}
        />

      </View>
    </ScreenContainer>
  );
};

export default calendarview;

const styles = StyleSheet.create({
  container: { flex: 1 },
  darkBackground: {
    backgroundColor: "tranparent",
  },
  lightBackground: {
    backgroundColor: "tranparent",
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  darkText: {
    color: "#FFF",
  },
  lightText: {
    color: "#333",
  },
});
