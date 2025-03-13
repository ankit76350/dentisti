import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { role } from '../assets/json/role';

const BackButton = ({ screen = "analytics", title = "Dashboard", showInfoIcon = false }) => {
    const navigation = useNavigation();
    const router = useRouter();

    const navigateTo = () => {
        navigation.goBack();
        // router.replace(`/(${role})/(dash)/${screen}`);
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={navigateTo}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            {/* Title (Remains Centered) */}
            <Text style={styles.title}>{title}</Text>

            {/* Info Icon or Placeholder to Keep Title Centered */}
            {showInfoIcon ? (
                <TouchableOpacity style={styles.infoButton} onPress={() => console.log("Info clicked")}>
                    <Ionicons name="information-circle-outline" size={24} color="white" />
                </TouchableOpacity>
            ) : (
                <View style={styles.infoButtonPlaceholder} />  
            )}
        </View>
    );
};

export default BackButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Ensures spacing remains consistent
        position: "absolute",
        top: Platform.OS === "ios" ? 70 : 25,
        left: 20,
        right: 20,
        zIndex: 2,
    },
    backButton: {
        width: 40,  // Fixed width to keep alignment
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        flex: 1, // Ensures title takes the center space
    },
    infoButton: {
        width: 40,  // Fixed width so layout remains balanced
        alignItems: "center",
    },
    infoButtonPlaceholder: {
        width: 40,  // Invisible placeholder when info button is hidden
    },
});
