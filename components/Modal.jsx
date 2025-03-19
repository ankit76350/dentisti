import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";

const CustomModal = ({ isVisible, onClose, title="Modal", children }) => {
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
            <View style={styles.modalWrapper}>
                {/* Header with Title and Close Button */}
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Entypo name="cross" size={28} color="black" />
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
        backgroundColor: "white",
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        alignSelf: "center",
    },
    header: {
        flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "space-between",
        width: "100%",
        marginBottom: 5, 
        // paddingHorizontal:10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1, // Pushes close button to the right
    },
    modalContent: {
        width: "100%",
        // alignItems: "center",
        gap: 8,
    },
});
