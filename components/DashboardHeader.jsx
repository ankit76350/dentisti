import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Image, useColorScheme, SafeAreaView } from "react-native";
import React, { useState } from 'react';
import { hp, wp } from '../helpers/common';
import { Feather, Ionicons } from "@expo/vector-icons";
import Avatar from "./Avatar";
import { theme as constantsTheme } from '../constants/theme'
import { user } from '../assets/json/role'
import { useNavigation } from "@react-navigation/native";

const DashboardHeader = ({ openDrawer = () => { } }) => {
    const theme = useColorScheme(); 
    const navigation = useNavigation();

    return (


        <View style={[styles.headerContainer, theme === "dark" ? styles.darkHeader : styles.lightHeader]}>
            <StatusBar
                animated={true}
                backgroundColor={theme === "dark" ? "#1B263B" : "#49a3f1"}
                barStyle={theme === "dark" ? "light-content" : "dark-content"}
            />


            {/* Logo & Title */}
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={openDrawer}>
                    <Image style={styles.iconImage} source={require('../assets/images/logo.jpg')} />
                </TouchableOpacity>

                <Text style={[styles.title, theme === "dark" ? styles.darkText : styles.lightText]}>Dentisti</Text>
            </View>

            {/* Menu Options */}
            <View style={styles.menuContainer}>
                <TouchableOpacity>
                    <Text style={[styles.menuText, theme === "dark" ? styles.darkText : styles.lightText]}>
                        <Ionicons name="notifications-outline" size={hp(3.3)} color={"white"} />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("profiles")}>

                    <Avatar
                        uri={user?.image}
                        size={hp(3.5)}
                        rounded={constantsTheme.radius.xxl * 1.4}
                        style={{ borderWidth: 2 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DashboardHeader;

const styles = StyleSheet.create({
    headerContainer: {
        height: hp(14),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: wp(2.3),
        paddingTop: hp(1),
        borderBottomLeftRadius: wp(9),
        borderBottomRightRadius: wp(9),
    },
    lightHeader: {
        backgroundColor: "#49a3f1", // Light mode navbar color
    },
    darkHeader: {
        backgroundColor: "#1B263B", // Dark mode navbar color
    },
    logoContainer: {
        padding: 3,
        flexDirection: "row",
        alignItems: "center",
    },
    iconImage: {
        width: 45,
        height: 45,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 50,
        padding: 2,
    },
    title: {
        marginLeft: wp(4),
        fontSize: wp(5),
        fontWeight: "bold",
    },
    lightText: {
        color: "white",
    },
    darkText: {
        color: "#E0E0E0",
    },
    menuContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        paddingHorizontal: wp(3)
    },
    menuText: {
        fontSize: wp(3),
        marginRight: 15,
    },
});
