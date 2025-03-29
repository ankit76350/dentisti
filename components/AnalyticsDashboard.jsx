import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, useColorScheme } from "react-native";
import { Card } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Svg, { Circle } from "react-native-svg";
import { FontAwesome5, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import FilterYear from "./FilterYear";


const CircularProgress = ({ progress, size = 40, strokeWidth = 5, color = "#49a3f1" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - progress);


  return (
    <Svg width={size} height={size}>
      {/* Background Circle */}
      <Circle cx={size / 2} cy={size / 2} r={radius} stroke="#e6e6e6" strokeWidth={strokeWidth} fill="none" />
      {/* Progress Circle */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={progressOffset}
        strokeLinecap="round"
        rotation="-90"
        origin={`${size / 2}, ${size / 2}`}
      />
    </Svg>
  );
};



const AnalyticsDashboard = ({ dashboardState = {} , hospitalState={}}) => {
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";
  const [totalAppointment, setTotalAppointment] = useState();
  const [totalClinics, setTotalClinics] = useState();
  const [totalDoctors, setTotalDoctors] = useState();
  const [appointments, setAppointments] = useState([]);
  const [monthlyAppointmentsCount, setMonthlyAppointmentsCount] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);




  // ! Filter thing : Start
  const [year, setYear] = useState(2025);
  const options = [
    { label: "2025", value: "2025" },
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
    { label: "2020", value: "2020" }
  ];
  // ! Filter thing : End


  //Todo : filter monthly appointments
  const getMonthlyCountsForYear = (data, year) => {
    let monthlyCounts = Array(12).fill(0); 

    data.forEach(item => {
      const date = new Date(item.date_time.replace(" ", "T")); 
      const itemYear = date.getFullYear(); 
      const itemMonth = date.getMonth(); 

      if (itemYear === year) {
        monthlyCounts[itemMonth]++; 
      }
    });

    return monthlyCounts;
  };
  //Todo : filter monthly appointments


  useEffect(() => {
    setTotalAppointment(dashboardState.appointmentState.appointmentsData.length);
    setTotalClinics(hospitalState.hospitalsState.hospitalsData.length);
    setTotalDoctors(dashboardState.doctorsState.doctorsData.length);
    setAppointments(dashboardState.appointmentState.appointmentsData);
  }, [dashboardState])

  useEffect(()=>{
    const allMonthcounts = getMonthlyCountsForYear(appointments, year)
    setMonthlyAppointmentsCount(allMonthcounts)
  },[appointments , year])

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingBottom: hp(10) }]}
      style={isDarkMode ? styles.darkBackground : styles.lightBackground}
      showsVerticalScrollIndicator={false} // Hides vertical scrollbar
      showsHorizontalScrollIndicator={false} // Hides horizontal scrollbar (if needed)
    >
      {/* Total Appointments Card */}
      <Card style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
        <View style={styles.cardContent}>

          <FontAwesome5 name="calendar-day" size={wp(7)} color={isDarkMode ? `rgba(255, 255, 255, ${0.9})` : `rgba(0, 0, 0, ${1})`} />
          <View>
            <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Total Appointments</Text>
            <Text style={[styles.count, isDarkMode ? styles.darkText : styles.lightText]}>{totalAppointment}</Text>
          </View>
          <CircularProgress progress={0.7} size={50} strokeWidth={7} color="#49a3f1" />
        </View>
      </Card>


      {/* Total Clinics Card */}
      <Card style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
        <View style={styles.cardContent}>
          <MaterialCommunityIcons name="office-building-outline" size={wp(7)} color={isDarkMode ? `rgba(255, 255, 255, ${0.9})` : `rgba(0, 0, 0, ${1})`} />
          <View>
            <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Total Clinics</Text>
            <Text style={[styles.count, isDarkMode ? styles.darkText : styles.lightText]}>{totalClinics}</Text>
          </View>
          <CircularProgress progress={0.5} size={50} strokeWidth={7} color="#28a745" />
        </View>
      </Card>

      {/* Total Doctors Card */}
      <Card style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
        <View style={styles.cardContent}>
          <Fontisto name="doctor" size={wp(7)} color={isDarkMode ? `rgba(255, 255, 255, ${0.9})` : `rgba(0, 0, 0, ${1})`} />

          <View>
            <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Total Doctors</Text>
            <Text style={[styles.count, isDarkMode ? styles.darkText : styles.lightText]}>{totalDoctors}</Text>
          </View>
          <CircularProgress progress={0.6} size={50} strokeWidth={7} color="#f39c12" />
        </View>
      </Card>

      {/* Monthly Appointments Bar Chart */}
      <Card style={[styles.chartCard, { marginBottom: hp(5) }, isDarkMode ? styles.darkCard : styles.lightCard]}>
        <View style={{ flexDirection: 'row', alignItems: 'start', justifyContent: 'space-between' }}>

          <View>
            <Text style={[styles.chartTitle, isDarkMode ? styles.darkText : styles.lightText]}>Monthly Appointments</Text>
            <Text style={[styles.increaseText, isDarkMode ? { color: "green" } : { color: "green" }]}>
              ↑ 5% more than last month.
            </Text>
          </View>

          <View>
            <FilterYear options={options} value={year}  setValue={setYear}/>
          </View>

        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%", }}>
          <ScrollView horizontal
            showsHorizontalScrollIndicator={false}
          >
            <BarChart
              data={{
                labels: [
                  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ],
                datasets: [{ data: monthlyAppointmentsCount }],
              }}

              width={500} // Increased width for better spacing
              height={hp(30)}
              yAxisLabel=""
              showValuesOnTopOfBars
              withHorizontalLabels={true}
              fromZero
              chartConfig={{
                backgroundGradientFrom: isDarkMode ? "#2C3E50" : "#FFFFFF",
                backgroundGradientTo: isDarkMode ? "#2C3E50" : "#FFFFFF",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(73, 163, 241, ${opacity})`,
                labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                barPercentage: 0.6,
                fillShadowGradient: "#49a3f1",
                fillShadowGradientOpacity: 0.7,
              }}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: 'center',
                borderRadius: wp(3),
                alignSelf: "center",
                marginVertical: hp(2),
              }}
            />
          </ScrollView>

        </View>

      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: wp(5) },
  darkBackground: { backgroundColor: "#0D1B2A" },
  // lightBackground: { backgroundColor: "#FFFFF" },
  card: {
    borderRadius: wp(3),
    padding: wp(4),
    marginBottom: hp(2),
    elevation: 3,
  },
  darkCard: { backgroundColor: "#2C3E50" },
  lightCard: { backgroundColor: "#FFFFFF" },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(5)
  },
  title: { flex: 1, color: 'green', fontSize: wp(4), fontWeight: "bold" },
  count: { fontSize: wp(6), fontWeight: "bold" },
  darkText: { color: "#FFF" },
  lightText: { color: "#333" },
  chartCard: { borderRadius: wp(3), padding: wp(4) },
  chartTitle: { fontSize: wp(4.5), fontWeight: "bold", marginBottom: hp(1) },
  increaseText: { fontSize: wp(3.5), marginBottom: hp(1) },
  chart: { borderRadius: wp(3), marginBottom: hp(5) },
});

export default AnalyticsDashboard;
