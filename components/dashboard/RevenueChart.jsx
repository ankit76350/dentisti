import React, { useEffect, useState, useRef } from "react";
import { View, Text, Animated, Easing, useColorScheme } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";
import { hp, wp } from "../../helpers/common";


const CircularProgress = ({ progress = 0, size = 40, strokeWidth = 5, color = "#49a3f1" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference * (1 - progress);

    const rotationAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (progress === 0) {
            Animated.loop(
                Animated.timing(rotationAnim, {
                    toValue: 1,
                    duration: 1500, // Adjust speed of rotation
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();
        } else {
            rotationAnim.setValue(0); // Reset rotation if progress > 0
        }
    }, [progress]);

    const rotateInterpolate = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
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
                    transform={`rotate(-90, ${size / 2}, ${size / 2})`}
                />
            </Svg>
        </Animated.View>
    );
};

const RevenueChart = ({ progressColor = "#28ed5d", revenueAmount }) => {
    const isDarkMode = useColorScheme() === "dark";
    const [progress, setProgress] = useState(0);

    const progressBar = () => {
        if (!revenueAmount?.totalRevenue) return 0;
        const percentage = revenueAmount.totalRevenue / 100000;
        return Math.min(Math.max(percentage, 0), 1); // Clamp between 0 and 1
    };

    useEffect(() => {
        setProgress(progressBar());
    }, [revenueAmount]);

    return (
        <Card style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Total Revenue</Text>
            </View>
            <View style={styles.cardContent}>
                <CircularProgress progress={progress} size={hp(20)} strokeWidth={wp(5)} color={progressColor} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>${revenueAmount?.totalRevenue || "000"}</Text>
            </View>
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
        padding:hp(2),
    },
    darkCard: { backgroundColor: "#2C3E50" },
    lightCard: { backgroundColor: "#FFFFFF" },
    cardContent: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: wp(5),
        paddingVertical: hp(1),
    },
    textContainer: {
        alignItems: "center",
        justifyContent: "center",

    },
    text: {
        fontSize: wp(6),
        fontWeight: "bold",
        textAlign: "center",
    },
});


export default RevenueChart;