import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";

const CustomModal = ({ isVisible, onClose, title = "Modal", children }) => {
    const theme= useColorScheme()
    return (
        <Modal
            isVisible={isVisible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={400}
            animationOutTiming={500}
            backdropTransitionOutTiming={500}
            backdropOpacity={0.4}
            onBackdropPress={onClose}
        >
            <View style={[styles.modalWrapper, theme === "dark" ? styles.darkBg : styles.lightBg ]}>
                {/* Header with Title and Close Button */}
                <View style={styles.header}>
                    <Text style={[styles.title , theme === "dark" ? styles.darkColor : styles.lightColor]}>{title}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Entypo name="cross" size={28} color={theme === "dark" ? styles.darkColor.color : styles.lightColor.color} />
                    </TouchableOpacity>
                </View>

                {/* Modal Content */}
                <View style={styles.modalContent}>{children}</View>
            </View>
        </Modal>
    );
};

export default CustomModal;
const styles = StyleSheet.create({
    modalWrapper: {
  
      
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",  // Adjust modal width for better appearance
        alignSelf: "center",
    },
    lightBg:{
      backgroundColor: "white",
    },
    darkBg:{
        backgroundColor: "#2C3E50",
    },
    lightColor:{
        color: "black",
    },
    darkColor:{
        color: "white",
    
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", // Center contents
        width: "100%",
        position: "relative", // Helps with absolute positioning
        paddingVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
    },
    closeButton: {
        position: "absolute",
        right: 10, // Position close button at right
    },
    modalContent: {
        width: "100%",
        gap: 8,
    },
});
