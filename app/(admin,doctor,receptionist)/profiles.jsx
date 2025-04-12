import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, useColorScheme, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { role, user } from "../../assets/json/role";

const profiles = () => {
    const navigation = useNavigation();
    const theme = useColorScheme(); // Detects system theme (light/dark)

    return (
        <View style={[styles.container, theme === "dark" ? styles.darkBackground : styles.lightBackground]}>
            <StatusBar
                animated={true}
                backgroundColor={theme === "dark" ? "#1B263B" : "#49a3f1"}
                barStyle={theme === "dark" ? "light-content" : "dark-content"}
            />

            {/* Header Section */}
            <View style={[styles.header, theme === "dark" ? styles.darkHeader : styles.lightHeader]}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Image source={require("../../assets/images/unnamed.jpg")} style={styles.profileImage} />
                <Text style={[styles.name, theme === "dark" ? styles.darkText : styles.lightText]}>
                {user.username ? user.username :"Ankit Kumar"}  
                    </Text>
                <Text style={[styles.level, theme === "dark" ? styles.darkText : styles.lightText]}>Healthcare Professional</Text>
            </View>

            {/* User Information Section */}
            <View style={[styles.infoContainer, theme === "dark" ? styles.darkCard : styles.lightCard]}>
                <Text style={[styles.roleText, theme === "dark" ? styles.darkText : styles.lightText]}>{role ? role.toUpperCase() : "ADMIN"}</Text>

                <View style={[styles.infoRow, theme === "dark" ? styles.darkInfoRow : styles.lightInfoRow]}>
                    <MaterialCommunityIcons name="email" size={22} color="#F8B400" />
                    <Text style={[styles.infoText, theme === "dark" ? styles.darkText : styles.lightText]}>
                        {user.email ? user.email :"kedar7390@gmail.com"}
                    </Text>
                </View>

                <View style={[styles.infoRow, theme === "dark" ? styles.darkInfoRow : styles.lightInfoRow]}>
                    <FontAwesome6 name="phone" size={22} color="#49a3f1" />
                    <Text style={[styles.infoText, theme === "dark" ? styles.darkText : styles.lightText]}>
                    {user.phone ? user.phone :"7840977390"}
                    
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    darkBackground: {
        // backgroundColor: "#1B263B", // Dark theme background
        backgroundColor: "#0D1B2A", // Dark theme background
    },
    lightBackground: {
        backgroundColor: "#F5F5F5", // Light theme background
    },
    header: {
        alignItems: "center",
        width: "100%",
        paddingTop: Platform.OS === "ios" ? 80 : 40, // 80 for iOS, 40 for Android
        paddingBottom: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: "relative",
    },
    darkHeader: {
        backgroundColor: "#1B263B", // Dark theme navbar
    },
    lightHeader: {
        backgroundColor: "#49a3f1", // Light theme navbar
    },
    backButton: {
        position: "absolute",
        left: 20,
        // paddingTop: Platform.OS === "ios" ? 80 : 40, // 80 for iOS, 40 for Android
        top: Platform.OS === "ios" ? 70 : 20, // 80 for iOS, 40 for Android
        // top: 45,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginTop: 10,
        borderWidth: 3,
        borderColor: "#F8B400",
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
    },
    level: {
        fontSize: 14,
        opacity: 0.8,
        marginBottom: 5,
    },
    infoContainer: {
        width: "90%",
        borderRadius: 15,
        padding: 20,
        marginTop: -20,
        alignItems: "center",
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },
    darkCard: {
        backgroundColor: "#2C3E50", // Dark theme card
    },
    lightCard: {
        backgroundColor: "white", // Light theme card
    },
    roleText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    darkText: {
        color: "#E0E0E0", // Text color in dark mode
    },
    lightText: {
        color: "#333", // Text color in light mode
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        width: "100%",
    },
    darkInfoRow: {
        backgroundColor: "#324A5F",
    },
    lightInfoRow: {
        backgroundColor: "#f1f1f1",
    },
    infoText: {
        fontSize: 14,
        marginLeft: 10,
    },
});

export default profiles;
