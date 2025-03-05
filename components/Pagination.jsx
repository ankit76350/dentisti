import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Importing Ant Design Icons

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Previous Button */}
      <TouchableOpacity
        style={[styles.button, currentPage === 1 && styles.disabled]}
        onPress={handlePrev}
        disabled={currentPage === 1}
        activeOpacity={0.7}
      >
        <AntDesign 
          name="left" 
          size={20} 
          color={currentPage === 1 ? "#666" : "white"} 
        />
      </TouchableOpacity>

      {/* Page Indicator */}
      <View style={styles.pageIndicator}>
        <Text style={styles.pageText}>Page {currentPage} of {totalPages}</Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.button, currentPage === totalPages && styles.disabled]}
        onPress={handleNext}
        disabled={currentPage === totalPages}
        activeOpacity={0.7}
      >
        <AntDesign 
          name="right" 
          size={20} 
          color={currentPage === totalPages ? "#666" : "white"} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: 15,
    // backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    // elevation: 3,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginHorizontal: 10,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    backgroundColor: "#ccc",
  },
  pageIndicator: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  pageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Pagination;
