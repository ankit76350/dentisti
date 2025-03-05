import React from "react";
import { View, Text, ScrollView, StyleSheet, useColorScheme } from "react-native";
import { ProgressBar, Card, IconButton } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const AnalyticsDashboard = () => {
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";

  return (
    <ScrollView 
      contentContainerStyle={[styles.container, { paddingBottom: hp(10) }]} 
      style={isDarkMode ? styles.darkBackground : styles.lightBackground}
    >
      {/* Total Appointments Card */}
      <Card style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
        <View style={styles.cardContent}>
          <IconButton icon="calendar" size={wp(7)} color="#49a3f1" />
          <View>
            <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Total Appointments</Text>
            <Text style={[styles.count, isDarkMode ? styles.darkText : styles.lightText]}>119</Text>
          </View>
          <ProgressBar progress={0.7} color="#49a3f1" style={styles.progressBar} />
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
          <ProgressBar progress={0.5} color="#28a745" style={styles.progressBar} />
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
          <ProgressBar progress={0.6} color="#f39c12" style={styles.progressBar} />
        </View>
      </Card>

      {/* Monthly Appointments Bar Chart */}
      <Card style={[styles.chartCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
        <Text style={[styles.chartTitle, isDarkMode ? styles.darkText : styles.lightText]}>Monthly Appointments</Text>
        <Text style={[styles.increaseText, isDarkMode ? styles.darkText : { color: "green" }]}>
          ↑ 5% more than last month.
        </Text>
        <View style={{  alignItems: "center", overflow: "visible" }}>
          <BarChart
            data={{
              labels: ["Jan","Feb", "Mar",  "Jun",  "Oct", "Dec"],
              datasets: [{ data: [2,5,1.7, 2.7, 1.2, 2.5, 9.2] }],
            }}
            width={wp(80)}
            height={hp(30)}
            chartConfig={{
              backgroundGradientFrom: isDarkMode ? "#1E1E1E" : "gray",
              backgroundGradientTo: isDarkMode ? "#1E1E1E" : "#FFFFFF",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(73, 163, 241, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              barPercentage: 0.6,
              fillShadowGradient: "#49a3f1",
              fillShadowGradientOpacity: 0.5,
              style: { borderRadius: wp(3)},
            }}
            style={styles.chart}
          />
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
  progressBar: { width: wp(30), height: hp(1), borderRadius: wp(2) },
  chartCard: { borderRadius: wp(3), padding: wp(4) },
  chartTitle: { fontSize: wp(4.5), fontWeight: "bold", marginBottom: hp(1) },
  increaseText: { fontSize: wp(3.5), marginBottom: hp(1) },
  chart: { borderRadius: wp(3), marginBottom: hp(5) },
});

export default AnalyticsDashboard;
