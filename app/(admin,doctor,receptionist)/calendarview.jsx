// import React, { useState, useCallback } from 'react';
// import { View, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
// import { Agenda } from 'react-native-calendars';
// import { Card, Avatar, Text } from 'react-native-paper';
// import ScreenContainer from '../../components/ScreenContainer';

// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split('T')[0];
// };

// const AgendaScreen = () => {
//   const [items, setItems] = useState({});

//   const loadItems = (day) => {
//     setTimeout(() => {
//       setItems((prevItems) => {
//         const newItems = { ...prevItems };

//         for (let i = -15; i < 85; i++) {
//           const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//           const strTime = timeToString(time);

//           if (!newItems[strTime]) {
//             newItems[strTime] = [];
//             const numItems = Math.floor(Math.random() * 3 + 1);
//             for (let j = 0; j < numItems; j++) {
//               newItems[strTime].push({
//                 name: `Item for ${strTime} #${j}`,
//                 height: Math.max(50, Math.floor(Math.random() * 150)),
//                 day: strTime,
//               });
//             }
//           }
//         }
//         return newItems;
//       });
//     }, 1000);
//   };

//   const renderItem = useCallback(
//     (item) => (
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <TouchableOpacity
//           style={{ marginRight: 10, marginTop: 17 }}
//           activeOpacity={0.7}
//           onPress={() => {
//             console.log(`Clicked: ${item.name}`);
//             Alert.alert('Agenda Item', `You clicked on ${item.name}`);
//           }}
//         >
//           <Card>
//             <Card.Content>
//               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Text>{item.name}</Text>
//                 <Avatar.Text label="J" />
//               </View>
//             </Card.Content>
//           </Card>
//         </TouchableOpacity>
//       </TouchableWithoutFeedback>
//     ),
//     []
//   );

//   return (
//     <ScreenContainer
//     title="Patient Information"
//     addIconComponent={null}

//   >
//     <View style={{ flex: 1,marginVertical:100 }}>
//       <Agenda
//         key={Object.keys(items).length} // Forces re-render
//         items={items}
//         loadItemsForMonth={loadItems}
//         selected={'2025-03-21'}
//         renderItem={renderItem}
//       />
//     </View>
//     </ScreenContainer>
//   );
// };

// export default AgendaScreen;





// Abhi please  do not remove above code




// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import Calendar from '../../components/AnotherCaln'

// const calendarview = () => {
//   return (
  

//       <Calendar/>

//   )
// }

// export default calendarview

// const styles = StyleSheet.create({})










// import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';
// import React, { useCallback, useRef, useState } from 'react';
// import { StyleSheet, useColorScheme, View } from 'react-native';
// import Header from '../../components/HeaderCC';


// const Calendar = () => {
//     const calendarRef = useRef(null);
//     const currentDate = useState(new Date().toLocaleDateString('en-CA'));
//    const _onPressToday = useCallback(() => {
//       calendarRef.current?.goToDate({
//         date: new Date().toISOString(),
//         animatedDate: true,
//         hourScroll: true,
//       });
//     }, []);
  
//   console.log("currentDate",currentDate[0]);
//     const colorScheme = useColorScheme();
//     const [events, setEvents] = useState([]);
//       const [selectedEvent, setSelectedEvent] = useState(null);

//     return (
//     <View style={{marginTop:100 , flex:1}}>
// {/* <Header currentDate={currentDate[0]} onPressToday={_onPressToday} /> */}
// <Header currentDate={'2025-03-21'} onPressToday={_onPressToday} />
// <CalendarContainer
//         ref={calendarRef}
//         numberOfDays={3}
//         scrollByDay={5}
//         theme={colorScheme === 'dark' ? styles.darkTheme : styles.lightTheme}
//         events={events}
//         onPressEvent={(event) => console.log(event)}
//         selectedEvent={selectedEvent}
// >
//       <CalendarHeader />
//       <CalendarBody />
//     </CalendarContainer>
//     </View>

//   );
// };

// export default Calendar;



// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   lightTheme: {
//     backgroundColor: '#fff',
//   },
//   darkTheme: {
//     backgroundColor: '#1A1B21',
//   },
// });


//! also do not remove above code something this was working



















// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Alert } from "react-native";
// import { Calendar } from "react-native-calendars";
// import { Picker } from "@react-native-picker/picker"; // Import Picker

// const getCurrentDate = () => {
//   const today = new Date();
//   return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
// };

// const EventCalendar = () => {
//   const [selectedDate, setSelectedDate] = useState(getCurrentDate());
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [calendarVisible, setCalendarVisible] = useState(false);
//   const [newEvent, setNewEvent] = useState("");
//   const [selectedTime, setSelectedTime] = useState("09:00 AM"); // Default time slot

//   const [events, setEvents] = useState({
//     "2025-03-05": { "09:00 AM": ["Team Meeting"], "02:00 PM": ["Project Review"] },
//     "2025-03-10": { "10:00 AM": ["Doctor's Appointment"] },
//     "2025-03-15": { "05:00 PM": ["Friend's Birthday Party"] },
//   });

//   // Time slots
//   const timeSlots = [
//     "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
//     "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
//     "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
//   ];

//   // Generate last 20 years dynamically
//   const yearOptions = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

//   // Marked dates on calendar
//   const markedDates = Object.keys(events).reduce((acc, date) => {
//     acc[date] = { marked: true, dotColor: "red" };
//     return acc;
//   }, {});

//   markedDates[selectedDate] = { selected: true, selectedColor: "blue" };

//   // Add event to selected date & time
//   const addEvent = () => {
//     if (!newEvent.trim()) {
//       Alert.alert("Event cannot be empty!");
//       return;
//     }

//     setEvents((prevEvents) => ({
//       ...prevEvents,
//       [selectedDate]: {
//         ...prevEvents[selectedDate],
//         [selectedTime]: prevEvents[selectedDate]?.[selectedTime]
//           ? [...prevEvents[selectedDate][selectedTime], newEvent]
//           : [newEvent],
//       },
//     }));

//     setNewEvent("");
//   };

//   return (
//     <View style={styles.container}>
//       {/* Year Selector */}
//       <View style={styles.pickerContainer}>
//         <Text style={styles.label}>Select Year:</Text>
//         <Picker
//           selectedValue={selectedYear.toString()} // Convert to string
//           style={styles.picker}
//           onValueChange={(itemValue) => setSelectedYear(parseInt(itemValue))}
//         >
//           {yearOptions.map((year) => (
//             <Picker.Item key={year} label={year.toString()} value={year.toString()} />
//           ))}
//         </Picker>
//       </View>

//       {/* Toggle Calendar Button */}
//       <TouchableOpacity style={styles.toggleButton} onPress={() => setCalendarVisible(!calendarVisible)}>
//         <Text style={styles.toggleButtonText}>
//           {calendarVisible ? "Hide Calendar" : "Show Calendar"}
//         </Text>
//       </TouchableOpacity>

//       {/* Calendar Component */}
//       {calendarVisible && (
//         <Calendar
//           onDayPress={(day) => setSelectedDate(day.dateString)}
//           markedDates={markedDates}
//           enableSwipeMonths
//           hideExtraDays
//           theme={{
//             todayTextColor: "red",
//             arrowColor: "blue",
//             textDayFontWeight: "bold",
//           }}
//           current={`${selectedYear}-01-01`}
//         />
//       )}

//       {/* Selected Date */}
//       <Text style={styles.selectedDateText}>Events on {selectedDate}:</Text>

//       {/* Time Slot Selection */}
//       <View style={styles.pickerContainer}>
//         <Text style={styles.label}>Select Time Slot:</Text>
//         <Picker
//           selectedValue={selectedTime}
//           style={styles.picker}
//           onValueChange={(itemValue) => setSelectedTime(itemValue)}
//         >
//           {timeSlots.map((time) => (
//             <Picker.Item key={time} label={time} value={time} />
//           ))}
//         </Picker>
//       </View>

//       {/* Event List for Selected Time Slot */}
//       <FlatList
//         data={events[selectedDate]?.[selectedTime] || []}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => <Text style={styles.eventItem}>• {item}</Text>}
//       />

//       {/* Input for Adding Events */}
//       <TextInput
//         style={styles.input}
//         placeholder="Add Event"
//         value={newEvent}
//         onChangeText={setNewEvent}
//       />

//       <TouchableOpacity style={styles.addButton} onPress={addEvent}>
//         <Text style={styles.addButtonText}>Add Event</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default EventCalendar;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
//   pickerContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
//   label: { fontSize: 16, marginRight: 10 },
//   picker: { height: 50, width: 150 },
//   toggleButton: { backgroundColor: "blue", padding: 12, borderRadius: 5, alignItems: "center", marginBottom: 10 },
//   toggleButtonText: { color: "white", fontWeight: "bold" },
//   selectedDateText: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
//   eventItem: { fontSize: 16, marginVertical: 4, backgroundColor: "#e0f7fa", padding: 10, borderRadius: 5 },
//   input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginVertical: 10 },
//   addButton: { backgroundColor: "blue", padding: 12, alignItems: "center", borderRadius: 5 },
//   addButtonText: { color: "white", fontWeight: "bold" },
// });



//! above code is now good you can use it in you app









// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Alert } from "react-native";
// import { Calendar } from "react-native-calendars";
// import { Picker } from "@react-native-picker/picker";

// const getCurrentDate = () => new Date().toISOString().split("T")[0];

// const timeSlots = [
//   "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
//   "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
//   "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
//   "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
//   "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
//   "07:00 PM", "07:30 PM", "08:00 PM"
// ];

// // Converts time string to a comparable number
// const timeToNumber = (time) => {
//   const [hour, minute] = time.split(/[: ]/);
//   let num = parseInt(hour) + (time.includes("PM") && hour !== "12" ? 12 : 0);
//   return num + parseInt(minute) / 60;
// };

// const EventCalendar = () => {
//   const [selectedDate, setSelectedDate] = useState(getCurrentDate());
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [calendarVisible, setCalendarVisible] = useState(false);
//   const [newEvent, setNewEvent] = useState("");
//   const [startTime, setStartTime] = useState("09:00 AM");
//   const [endTime, setEndTime] = useState("10:00 AM");

//   const [events, setEvents] = useState({
//     "2025-03-05": [
//       { start: "09:00 AM", end: "10:00 AM", name: "Team Meeting" },
//       { start: "09:30 AM", end: "10:30 AM", name: "Project Discussion" },
//       { start: "02:00 PM", end: "03:00 PM", name: "Client Meeting" }
//     ],
//     "2025-03-10": [{ start: "10:00 AM", end: "11:00 AM", name: "Workout" }],
//     "2025-03-15": [{ start: "05:00 PM", end: "06:30 PM", name: "Friend's Birthday" }]
//   });

//   // Generate last 20 years dynamically
//   const yearOptions = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

//   // Marked dates
//   const markedDates = Object.keys(events).reduce((acc, date) => {
//     acc[date] = { marked: true, dotColor: "red" };
//     return acc;
//   }, { selected: true, selectedColor: "blue" });

//   // Add event
//   const addEvent = () => {
//     if (!newEvent.trim()) {
//       Alert.alert("Event name cannot be empty!");
//       return;
//     }

//     if (timeToNumber(endTime) <= timeToNumber(startTime)) {
//       Alert.alert("End time must be after start time.");
//       return;
//     }

//     setEvents((prevEvents) => ({
//       ...prevEvents,
//       [selectedDate]: [
//         ...(prevEvents[selectedDate] || []),
//         { start: startTime, end: endTime, name: newEvent }
//       ].sort((a, b) => timeToNumber(a.start) - timeToNumber(b.start)), // Sort events by start time
//     }));

//     setNewEvent("");
//   };

//   // Get sorted events for selected date
//   const sortedEvents = events[selectedDate] || [];

//   // Check if two events overlap
//   const isOverlapping = (event1, event2) =>
//     timeToNumber(event2.start) < timeToNumber(event1.end);

//   return (
//     <View style={styles.container}>
//       {/* Year Selector */}
//       <View style={styles.pickerContainer}>
//         <Text style={styles.label}>Select Year:</Text>
//         <Picker
//           selectedValue={selectedYear.toString()}
//           style={styles.picker}
//           onValueChange={(itemValue) => setSelectedYear(parseInt(itemValue))}
//         >
//           {yearOptions.map((year) => (
//             <Picker.Item key={year} label={year.toString()} value={year.toString()} />
//           ))}
//         </Picker>
//       </View>

//       {/* Toggle Calendar Button */}
//       <TouchableOpacity style={styles.toggleButton} onPress={() => setCalendarVisible(!calendarVisible)}>
//         <Text style={styles.toggleButtonText}>{calendarVisible ? "Hide Calendar" : "Show Calendar"}</Text>
//       </TouchableOpacity>

//       {/* Calendar Component */}
//       {calendarVisible && (
//         <Calendar
//           onDayPress={(day) => {setSelectedDate(day.dateString) } }
//           markedDates={markedDates}
//           enableSwipeMonths
//           hideExtraDays
//           theme={{
//             todayTextColor: "red",
//             arrowColor: "blue",
//             textDayFontWeight: "bold",
//           }}
//           current={`${selectedYear}-01-01`}
//         />
//       )}

//       {/* Selected Date */}
//       <Text style={styles.selectedDateText}>Events on {selectedDate}:</Text>

//       {/* Start & End Time Selection */}
//       <View style={styles.pickerContainer}>
//         <Text style={styles.label}>Start Time:</Text>
//         <Picker selectedValue={startTime} style={styles.picker} onValueChange={setStartTime}>
//           {timeSlots.map((time) => <Picker.Item key={time} label={time} value={time} />)}
//         </Picker>
//       </View>

//       <View style={styles.pickerContainer}>
//         <Text style={styles.label}>End Time:</Text>
//         <Picker selectedValue={endTime} style={styles.picker} onValueChange={setEndTime}>
//           {timeSlots.map((time) => <Picker.Item key={time} label={time} value={time} />)}
//         </Picker>
//       </View>

//       {/* Events List - Sorted & Adjacent Overlapping */}
//       <View style={styles.eventListContainer}>
//         {sortedEvents.map((event, index) => {
//           const prevEvent = sortedEvents[index - 1];
//           const isColliding = prevEvent && isOverlapping(prevEvent, event);

//           return (
//             <View key={index} style={[styles.eventRow, isColliding && styles.eventOverlap]}>
//               <Text style={styles.eventTime}>{event.start} - {event.end}</Text>
//               <Text style={styles.eventName}>{event.name}</Text>
//             </View>
//           );
//         })}
//       </View>

//       {/* Input for Adding Events */}
//       <TextInput style={styles.input} placeholder="Event Name" value={newEvent} onChangeText={setNewEvent} />

//       <TouchableOpacity style={styles.addButton} onPress={addEvent}>
//         <Text style={styles.addButtonText}>Add Event</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default EventCalendar;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
//   pickerContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
//   label: { fontSize: 16, marginRight: 10 },
//   picker: { height: 50, width: 150 },
//   toggleButton: { backgroundColor: "blue", padding: 12, borderRadius: 5, alignItems: "center", marginBottom: 10 },
//   toggleButtonText: { color: "white", fontWeight: "bold" },
//   selectedDateText: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
//   eventRow: { flexDirection: "row", padding: 10, backgroundColor: "#e0f7fa", marginVertical: 5, borderRadius: 5 },
//   eventOverlap: { backgroundColor: "#ffeb3b" },
//   eventTime: { fontSize: 16, fontWeight: "bold", marginRight: 10 },
//   eventName: { fontSize: 16 },
//   addButton: { backgroundColor: "blue", padding: 12, alignItems: "center", borderRadius: 5 },
//   addButtonText: { color: "white", fontWeight: "bold" },
// });







//! above code were working












import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { FAB } from 'react-native-paper';
import ScreenContainer from '../../components/ScreenContainer';

const CalendarScreen = () => {
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";

  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({
    '2025-03-24': [{ title: 'Meeting with Team', time: '10:00 AM' }],
    '2025-03-25': [
      { title: 'Client Call', time: '3:00 PM' },
      { title: 'Design Review', time: '5:00 PM' }
    ],
    '2025-03-26': [{ title: 'Project Deadline', time: 'All Day' }]
  });

  const renderEventItem = useCallback((item) => (
    <View style={[styles.eventItem, isDarkMode ? styles.darkEventItem : styles.lightEventItem]}>
      <Text style={[styles.eventTitle, isDarkMode ? styles.darkText : styles.lightText]}>{item.title}</Text>
      <Text style={[styles.eventTime, isDarkMode ? styles.darkText : styles.lightText]}>{item.time}</Text>
    </View>
  ), [isDarkMode]);

  return (
    <ScreenContainer title="Calendar View">
      <View style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
        <Agenda
          items={selectedDate ? { [selectedDate]: events[selectedDate] || [] } : events}
          selected={selectedDate || '2025-03-24'}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          renderItem={renderEventItem}
          renderEmptyDate={() => (
            <View style={styles.emptyDate}>
              <Text style={[styles.emptyText, isDarkMode ? styles.darkText : styles.lightText]}>No events for this date</Text>
            </View>
          )}
          theme={{
            backgroundColor: isDarkMode ? "#0D1B2A" : "#FFFFFF",
            calendarBackground: isDarkMode ? "#2C3E50" : "#FFFFFF",
            // backgroundColor: '#F5F5F5',  // Change this to your preferred color
            // calendarBackground: '#F5F5F5', // Background of the calendar view
            selectedDayBackgroundColor: "#49a3f1",
            selectedDayTextColor: "#FFFFFF",
            todayTextColor: "#f39c12",
            dayTextColor: isDarkMode ? "#FFF" : "#333",
            textDisabledColor: "#d9e1e8",
            dotColor: "#49a3f1",
            selectedDotColor: "#FFFFFF",
            arrowColor: "#49a3f1",
            monthTextColor: "#49a3f1",
            agendaTodayColor: "#49a3f1",
            agendaKnobColor: "#49a3f1",
          }}
        />
        <FAB style={[styles.fab, isDarkMode ? styles.darkFab : styles.lightFab]} icon="plus" onPress={() => alert('Add Event')} />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  darkBackground: { backgroundColor: "#0D1B2A" },
  lightBackground: { backgroundColor: "#FFFFFF" },
  
  eventItem: { padding: 10, marginVertical: 5, borderRadius: 5 },
  darkEventItem: { backgroundColor: "#2C3E50" },
  lightEventItem: { backgroundColor: "#e3f2fd" },

  eventTitle: { fontSize: 16, fontWeight: "bold" },
  eventTime: { fontSize: 14 },
  darkText: { color: "#FFF" },
  lightText: { color: "#333" },

  emptyDate: { padding: 20, alignItems: "center" },
  emptyText: { fontSize: 16 },

  fab: { position: "absolute", right: 20, bottom: 20 },
  darkFab: { backgroundColor: "#49a3f1" },
  lightFab: { backgroundColor: "#f39c12" },
});

export default CalendarScreen;
