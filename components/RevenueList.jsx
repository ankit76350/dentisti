import React from "react";
import { View, Text, StyleSheet, FlatList, useColorScheme } from "react-native";
import { Card } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const revenueData = [
  { name: "Rama Clinics", revenue: 4000, progress: 0.1 },
  { name: "Shree Clinic", revenue: 3900, progress: 0.08 },
  { name: "Apollo Hospital", revenue: 41900, progress: 1 },
  { name: "Sharada Clinic", revenue: 10000, progress: 0.25 },
  { name: "Rama Clinics", revenue: 4000, progress: 0.1 },
  { name: "Shree Clinic", revenue: 3900, progress: 0.08 },
  { name: "Apollo Hospital", revenue: 41900, progress: 1 },
  { name: "Sharada Clinic", revenue: 10000, progress: 0.25 },
  { name: "Rama Clinics", revenue: 4000, progress: 0.1 },
  { name: "Shree Clinic", revenue: 3900, progress: 0.08 },
  { name: "Apollo Hospital", revenue: 41900, progress: 1 },
  { name: "Sharada Clinic", revenue: 10000, progress: 0.25 },
  { name: "Rama Clinics", revenue: 4000, progress: 0.1 },
  { name: "Shree Clinic", revenue: 3900, progress: 0.08 },
  { name: "Apollo Hospital", revenue: 41900, progress: 1 },
  { name: "Sharada Clinic", revenue: 10000, progress: 0.25 },
  { name: "Rama Clinics", revenue: 4000, progress: 0.1 },
  { name: "Shree Clinic", revenue: 3900, progress: 0.08 },
  { name: "Apollo Hospital", revenue: 41900, progress: 1 },
  { name: "Sharada Clinic", revenue: 10000, progress: 0.25 },
];

const RevenueList = () => {
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";

  return (
    <Card style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Hospital Revenue</Text>
      <FlatList
        data={revenueData}
        keyExtractor={(item , index) => index}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={[styles.itemText, isDarkMode ? styles.darkText : styles.lightText]}>{item.name}</Text>
            <Text style={[styles.revenueText, isDarkMode ? styles.darkText : styles.lightText]}>₹{item.revenue}</Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBar, { width: `${item.progress * 100}%` }]} />
            </View>
          </View>
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    // borderRadius: wp(3),
    padding: wp(4),
    // marginBottom: hp(2),
    // elevation: 3,
  },
  darkCard: { backgroundColor: "#0D1B2A" },
  lightCard: { backgroundColor: "#FFFFFF" },
  title: { fontSize: wp(5), fontWeight: "bold", textAlign: "center", marginBottom: hp(2) },
  darkText: { color: "#FFF" },
  lightText: { color: "#333" },
  itemContainer: { marginBottom: hp(2) },
  itemText: { fontSize: wp(4), fontWeight: "600" },
  revenueText: { fontSize: wp(4), fontWeight: "600", alignSelf: "flex-end" },
  progressBarBackground: {
    height: hp(1.2),
    backgroundColor: "#e0e0e0",
    borderRadius: wp(2),
    overflow: "hidden",
    marginTop: hp(0.5),
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#49a3f1",
  },
});

export default RevenueList;
