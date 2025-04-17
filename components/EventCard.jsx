import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Logo from "../assets/icons/Logo";

const EventCard = ({ appointments }) => {
    const theme = useColorScheme();
    if (!appointments || appointments.length === 0) return null;

    return (
        <View style={styles.cardContainer}>
            {appointments.map((appointment, index) => (
                <View
                    key={index}
                    style={[
                        styles.appointmentCard,
                        theme === "dark" ? styles.darkCard : styles.lightCard,
                    ]}
                >
                    <View style={styles.dateContainer}>
                        <Text style={styles.date}>{appointment.date}</Text>
                        <Text style={styles.time}>{appointment.time}</Text>
                    </View>

                    <View style={styles.detailsContainer}>
                        <Text style={[styles.title, theme === "dark" ? styles.darkText : styles.lightText]}>
                            {appointment.name}
                        </Text>
                        <View style={styles.infoContainer}>
                            <Logo name="patient" size={22} color="black" />
                            <Text style={[styles.infoText, theme === "dark" ? styles.darkText : styles.lightText]}>
                                {appointment.phone}
                            </Text>
                        </View>
                        {/* <View style={styles.infoContainer}>
                            <Fontisto name="doctor" size={21} color={theme === "dark" ? "#FFF" : "black"} />
                            <Text style={[styles.infoText, theme === "dark" ? styles.darkText : styles.lightText]}>
                                {appointment.doctor}
                            </Text>
                        </View> */}
                    </View>
                    
                    <View style={styles.statusContainer}>{renderStatusIcon(appointment.status)}</View>
                </View>
            ))}
        </View>
    );
};


const renderStatusIcon = (status) => {
    switch (status) {
        case "Pending":
            return <MaterialIcons name="pending-actions" size={22} color="orange" />;
        case "Canceled":
            return <MaterialCommunityIcons name="cancel" size={22} color="red" />;
        case "Attended":
            return <MaterialIcons name="co-present" size={22} color="blue" />;
        case "Converted To Patient":
            return <Ionicons name="checkmark-circle" size={22} color="green" />;
        default:
            return <MaterialIcons name="help-outline" size={22} color="gray" />;
    }
};
const styles = StyleSheet.create({
    cardContainer: {
        // marginVertical: 10,
    },
    appointmentCard: {
        flexDirection: "row",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "space-between",
    },
    darkCard: {
        backgroundColor: "#2A2A3C",
    },
    lightCard: {
        backgroundColor: "#F5F5F5",
    },
    dateContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#49a3f1",
        padding: 10,
        borderRadius: 5,
        marginRight: 15,
    },
    date: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
    time: { color: "#BBB", fontSize: 14 },
    detailsContainer: { flex: 1 },
    title: { fontSize: 16, fontWeight: "bold" },
    darkText: {
        color: "#FFF",
    },
    lightText: {
        color: "#333",
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 1,
    },
    infoText: {
        fontSize: 14,
        marginLeft: 8,
    },
    statusContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
});

export default EventCard;
