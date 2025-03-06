import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import CustomDropDown from "./CustomDropDown";

const FeedbackModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [feedback, setFeedback] = useState("");

    // ! Filter thing : Start
    const [value, setValue] = useState('');
    const options = Array.from({ length: 20 }, (_, i) => {
        const year = 2023 + i;
        return { label: `${year}`, value: `${year}` };
    });

    // ! Filter thing : End
    return (
        <View style={styles.container}>
            {/* Button to Open Modal */}
            <TouchableOpacity
                style={styles.openButton}
                onPress={() => setModalVisible(true)}
            >
                {/* <Text style={styles.buttonText}>Send Feedback</Text> */}
                <AntDesign name="filter" size={24} color="black" />
            </TouchableOpacity>

            {/* Modal Component */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                {/* Close modal when tapping outside */}
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalBackground}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}></Text>


                                <CustomDropDown options={options} value={value} setValue={setValue} optionTitle='Select a Year' selectTitle='Year' />

                                {/* Submit Button */}
                                {/* <TouchableOpacity
                                    style={styles.submitButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.submitButtonText}>Filter</Text>
                                </TouchableOpacity> */}

                                {/* Close Modal Button */}
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Entypo name="circle-with-cross" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    openButton: {
        // backgroundColor: "#4F46E5",
        // paddingVertical: 12,
        // paddingHorizontal: 24,
        // borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        width: "85%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        elevation: 5,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    modalDescription: {
        fontSize: 14,
        textAlign: "center",
        color: "#666",
        marginBottom: 15,
    },
    input: {
        width: "100%",
        height: 80,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlignVertical: "top",
        fontSize: 14,
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: "#4F46E5",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        padding: 5,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#999",
    },
});

export default FeedbackModal;
