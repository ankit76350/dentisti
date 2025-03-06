import React from "react";
import { View, Text, ScrollView, StyleSheet, useColorScheme } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Svg, { Circle } from "react-native-svg";

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

const AnalyticsDashboard = () => {
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";

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
          <IconButton icon="calendar" size={wp(7)} color="#49a3f1" />
          <View>
            <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Total Appointments</Text>
            <Text style={[styles.count, isDarkMode ? styles.darkText : styles.lightText]}>119</Text>
          </View>
          <CircularProgress progress={0.7} size={50} strokeWidth={5} color="#49a3f1" />
        </View>
      </Card>

      {/* Total Clinics Card */}
      <Card style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
        <View style={styles.cardContent}>
          <IconButton icon="hospital-building" size={wp(7)} color="#28a745" />
          <View>
            <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Total Clinics</Text>
            <Text style={[styles.count, isDarkMode ? styles.darkText : styles.lightText]}>12</Text>
          </View>
          <CircularProgress progress={0.5} size={50} strokeWidth={5} color="#28a745" />
        </View>
      </Card>

      {/* Total Doctors Card */}
      <Card style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
        <View style={styles.cardContent}>
          <IconButton icon="doctor" size={wp(7)} color="#f39c12" />
          <View>
            <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Total Doctors</Text>
            <Text style={[styles.count, isDarkMode ? styles.darkText : styles.lightText]}>21</Text>
          </View>
          <CircularProgress progress={0.6} size={50} strokeWidth={5} color="#f39c12" />
        </View>
      </Card>

      {/* Monthly Appointments Bar Chart */}
      <Card style={[styles.chartCard, {marginBottom:hp(5)}, isDarkMode ? styles.darkCard : styles.lightCard]}>
        <Text style={[styles.chartTitle, isDarkMode ? styles.darkText : styles.lightText]}>Monthly Appointments</Text>
        <Text style={[styles.increaseText, isDarkMode ? { color: "green" } : { color: "green" }]}>
          ↑ 5% more than last month.
        </Text>
        
        <View style={{flex:1, alignItems: "center", justifyContent: "center", width: "100%", }}>
        <ScrollView horizontal>
          <BarChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr"],
              datasets: [{ data: [2, 5, 1.7, 2.7] }],
            }}
            width={wp(90)} // Increased width for better spacing
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
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              barPercentage: 0.9,
              fillShadowGradient: "#49a3f1",
              fillShadowGradientOpacity: 0.7,
            }}
            style={{
              flex:1,
              justifyContent:"center",
              alignItems:'center',
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
  lightBackground: { backgroundColor: "#FFFFF" },
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
  },
  title: { fontSize: wp(4), fontWeight: "bold" },
  count: { fontSize: wp(6), fontWeight: "bold" },
  darkText: { color: "#FFF" },
  lightText: { color: "#333" },
  chartCard: { borderRadius: wp(3), padding: wp(4) },
  chartTitle: { fontSize: wp(4.5), fontWeight: "bold", marginBottom: hp(1) },
  increaseText: { fontSize: wp(3.5), marginBottom: hp(1) },
  chart: { borderRadius: wp(3), marginBottom: hp(5) },
});

export default AnalyticsDashboard;
