import React from "react";
import { ScrollView } from "react-native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { hp } from "../helpers/common";



const data = {
  labels: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ],
  datasets: [
    {
      data: [12, 44, 54, 66, 81, 67, 45, 78, 90, 34, 56, 72],
    },
  ],
};


const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
};

const HorizontalBarChart = () => {
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Actual vs Expected</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={450} // Adjust width based on your layout
          height={350}
          yAxisLabel=""
          chartConfig={chartConfig}
          showValuesOnTopOfBars
          withHorizontalLabels={true}
          withVerticalLabels={true}
          verticalLabelRotation={-90} // Rotates labels correctly
          horizontalLabelRotation={-90}
          style={{
            transform: [{ rotate: "90deg" }], // Rotates the whole chart
          }}
        />
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    margin:hp(5)
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartContainer: {
    height: 350, // Adjust to prevent clipping
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HorizontalBarChart;
