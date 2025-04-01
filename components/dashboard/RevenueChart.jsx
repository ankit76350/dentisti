import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { Card } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Svg, { Circle } from "react-native-svg";

const CircularProgress = ({ progress, size = 40, strokeWidth = 5, color = "#49a3f1" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference * (1 - progress);

    return (
        <Svg width={size} height={size}>
            <Circle cx={size / 2} cy={size / 2} r={radius} stroke="#e6e6e6" strokeWidth={strokeWidth} fill="none" />
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

const RevenueChart = ({ progress = 0.8, progressColor = "#28ed5d" }) => {
    const isDarkMode = useColorScheme() === "dark";

    return (
        <Card style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
            <View style={styles.textContainer}><Text style={styles.text}>Total Revenue</Text></View>
            <View style={styles.cardContent}>
                <CircularProgress progress={progress} size={hp(20)} strokeWidth={wp(5)} color={progressColor} />
            </View>
            <View style={styles.textContainer}><Text style={styles.text}>${30}</Text></View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',        
        justifyContent: 'center',
        borderRadius: wp(3),
        padding: wp(5),
        marginBottom: hp(2),
        elevation: 3,
    },
    darkCard: { backgroundColor: "#2C3E50" },
    lightCard: { backgroundColor: "#FFFFFF" },
    cardContent: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: wp(5),
    },
    textContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginVertical: hp(1),
    },
    text: {
        fontSize: wp(5),
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default RevenueChart;