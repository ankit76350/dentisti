import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from 'react';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';

const STYLES = ['default', 'dark-content', 'light-content'];

const DashboardHeader = ({ openDrawer = () => { } }) => {
    const [statusBarStyle] = useState(STYLES[0]);

    return (
        <View style={styles.headerContainer}>

            <StatusBar
                animated={true}
                backgroundColor={theme.myColors.navbarColor}
                barStyle={statusBarStyle}
            />

            <View style={styles.logoContainer}>
                <Pressable onPress={openDrawer}>
                    <Image style={styles.iconImage} source={require('../assets/images/logo.jpg')} />
                </Pressable> 
                <Text style={styles.title}>Dentisti</Text>
            </View>


            <View style={styles.menuContainer}>
                <TouchableOpacity>
                    <Text style={styles.menuText}>Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.menuText}>Toggle theme</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.menuText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DashboardHeader;

const styles = StyleSheet.create({
    headerContainer: {
        height: hp(14),
        backgroundColor: theme.myColors.navbarColor,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: wp(2.3),
        paddingTop: hp(1),
        borderBottomLeftRadius: wp(9),
        borderBottomRightRadius: wp(9),
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
        color: "white",
        fontSize: wp(5),
        fontWeight: "bold",
    },
    menuContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    menuText: {
        color: "white",
        fontSize: wp(3),
        marginRight: 10,
    },
});
