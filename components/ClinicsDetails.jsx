import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ClinicModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Button to Open Modal */}
      <TouchableOpacity style={styles.openButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.openButtonText}>Show Clinic Info</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <LinearGradient colors={["#007bff", "#0056b3"]} style={styles.modalContainer}>
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {/* Clinic Info */}
            <Text style={styles.title}>🏥 Shri Rama Clinics</Text>
            <Text style={styles.subtitle}>📍 Pune, Hinjewadi</Text>

            {/* Doctors Section */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>👨‍⚕️ Doctors</Text>
              <Text style={styles.listItem}>• Dr Kedar</Text>
              <Text style={styles.listItem}>• Dr Ram Charan</Text>
              <Text style={styles.listItem}>• Dr Sham</Text>
            </View>

            {/* Receptionists Section */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>💼 Receptionists</Text>
              <Text style={styles.listItem}>• Rohan Shinde</Text>
              <Text style={styles.listItem}>• Rohan Shinde</Text>
              <Text style={styles.listItem}>• Rohan Shinde</Text>
              <Text style={styles.listItem}>• Rohan Shinde</Text>

            </View>
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
};

export default ClinicModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  openButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  openButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#007bff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#f0f0f0",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    width: "100%",
    borderRadius: 12,
    marginBottom: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#007bff",
  },
  listItem: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
  },
});
