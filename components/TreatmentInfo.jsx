import React from "react";
import { View, Text, Image, StyleSheet, useColorScheme } from "react-native";
import { Entypo, FontAwesome5, FontAwesome6, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { wp } from "../helpers/common";


const TreatmentInfo = ({ item, borderColor }) => {
    const theme = useColorScheme();
    const isDark = theme === "dark";

    return (
        <View style={[styles.card, { borderLeftColor: borderColor }, isDark && styles.darkCard]}>
            {/* Top Row: Buttons and Name */}
            <View style={styles.topRow}>
                <Text style={[styles.name, isDark && styles.darkText]}>{item.patient_name}</Text>
                <View>
                    <Image source={require("../assets/images/defaultuser.png")} style={[styles.profileImage, { borderColor: borderColor }]} />
                </View>
            </View>

            {/* User Info Row */}
            <View style={styles.contentRow}>
                {/* <Image source={require("../assets/images/defaultuser.png")} style={[styles.profileImage, { borderColor: borderColor }]} /> */}
                <View style={styles.textContainer}>

                    <View style={styles.infoRow}>
                        <MaterialIcons name="healing" size={14} color={isDark ? "#f6f6f6" : "#555"} />
                        <Text style={[styles.infoText, isDark && styles.darkText]}>{item.treatement_name}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="doctor" size={14} color={isDark ? "#f6f6f6" : "#555"} />
                        <Text style={[styles.infoText, isDark && styles.darkText]}>{item.doctor_name}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <FontAwesome5 name="hospital-symbol" size={14} color={isDark ? "#f6f6f6" : "#555"} />
                        <Text style={[styles.infoText, isDark && styles.darkText]}>{item.hospital_name}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <FontAwesome6 name="capsules" size={14} color={isDark ? "#f6f6f6" : "#555"} />
                        <Text style={[styles.infoText, isDark && styles.darkText]}>{item.medicines}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Fontisto name="prescription" size={14} color={isDark ? "#f6f6f6" : "#555"} />
                        <Text style={[styles.infoText, isDark && styles.darkText]}>{item.dosage}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="head-lightbulb-outline" size={14} color={isDark ? "#f6f6f6" : "#555"} />
                        <Text style={[styles.infoText, isDark && styles.hospitalText]}>
                            {item.advice || "N/A"}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <MaterialIcons name="timer" size={14} color={isDark ? "#f6f6f6" : "#555"} />
                        <Text style={[styles.infoText, isDark && styles.hospitalText]}>
                            {item.duration || "N/A"}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="note-text" size={14} color={isDark ? "#f6f6f6" : "#555"} />
                        <Text style={[styles.infoText, isDark && styles.hospitalText]}>
                            {item.notes || "N/A"}
                        </Text>
                    </View>


                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        borderLeftWidth: 5,

    },
    darkCard: {
        backgroundColor: "#2C3E50",
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    darkText: {
        color: "#f6f6f6",
    },
    actionButtons: {
        flexDirection: "row",
    },
    iconButton: {
        marginLeft: 8,
    },
    contentRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        marginRight: 12,
        borderWidth: 1.5,
        // borderColor: "#F39C12",
    },
    textContainer: {
        flex: 1,
        marginLeft: wp(3)
    },
    role: {
        fontSize: 14,
        color: "#777",
    },
    darkTextSecondary: {
        color: "#BBB",
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    infoText: {
        fontSize: 13,
        marginLeft: 6,
        color: "#444",
    },
    hospitalText: {
        color: "#f6f6f6",
    },
});

export default TreatmentInfo;
