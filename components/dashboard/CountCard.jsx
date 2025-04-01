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

const CountCard = ({ title = "Title Card", icon = null, totalCount = 0, progress = 0.8, progressColor = "#49a3f1" }) => {
    const isDarkMode = useColorScheme() === "dark";

    return (
        <Card style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
            <View style={styles.cardContent}>
                {icon}
                <View>
                    <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>{title}</Text>
                    <Text style={[styles.count, isDarkMode ? styles.darkText : styles.lightText]}>{totalCount}</Text>
                </View>
                <CircularProgress progress={progress} size={50} strokeWidth={7} color={progressColor} />
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
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
        paddingHorizontal: wp(5),
    },
    title: { fontSize: wp(4), fontWeight: "bold" },
    count: { fontSize: wp(6), fontWeight: "bold" },
    darkText: { color: "#FFF" },
    lightText: { color: "#333" },
});

export default CountCard;