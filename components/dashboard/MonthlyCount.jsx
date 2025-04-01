import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, useColorScheme } from "react-native";
import { Card } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import FilterYear from "../FilterYear";

const MonthlyCount = ({ dashboardState = {} }) => {
  const isDarkMode = useColorScheme() === "dark";
  const [year, setYear] = useState(2025);
  const [monthlyAppointmentsCount, setMonthlyAppointmentsCount] = useState(Array(12).fill(0));

  const options = [2025, 2024, 2023, 2022, 2021, 2020].map(y => ({ label: y.toString(), value: y.toString() }));

  useEffect(() => {
    if (dashboardState.appointmentState?.appointmentsData) {
      setMonthlyAppointmentsCount(getMonthlyCountsForYear(dashboardState.appointmentState.appointmentsData, year));
    }
  }, [dashboardState, year]);

  const getMonthlyCountsForYear = (data, year) => {
    return data.reduce((acc, { date_time }) => {
      const date = new Date(date_time.replace(" ", "T"));
      if (date.getFullYear() === year) acc[date.getMonth()]++;
      return acc;
    }, Array(12).fill(0));
  };

  return (
    <Card style={[styles.chartCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={[styles.chartTitle, isDarkMode ? styles.darkText : styles.lightText]}>Monthly Appointments</Text>
          <Text style={[styles.increaseText, { color: "green" }]}>↑ 5% more than last month.</Text>
        </View>
        <FilterYear options={options} value={year} setValue={setYear} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BarChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{ data: monthlyAppointmentsCount }],
          }}
          width={500}
          height={hp(30)}
          showValuesOnTopOfBars
          fromZero
          chartConfig={{
            backgroundGradientFrom: isDarkMode ? "#2C3E50" : "#FFFFFF",
            backgroundGradientTo: isDarkMode ? "#2C3E50" : "#FFFFFF",
            color: (opacity = 1) => `rgba(73, 163, 241, ${opacity})`,
            labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
            barPercentage: 0.6,
            fillShadowGradient: "#49a3f1",
            fillShadowGradientOpacity: 0.7,
          }}
          style={styles.chartStyle}
        />
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  chartCard: { borderRadius: wp(3), padding: wp(4), marginBottom: hp(5) },
  darkCard: { backgroundColor: "#2C3E50" },
  lightCard: { backgroundColor: "#FFFFFF" },
  chartTitle: { fontSize: wp(4.5), fontWeight: "bold", marginBottom: hp(1) },
  increaseText: { fontSize: wp(3.5), marginBottom: hp(1) },
  chartStyle: { borderRadius: wp(3), marginVertical: hp(2) },
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  darkText: { color: "#FFF" },
  lightText: { color: "#333" },
});

export default MonthlyCount;