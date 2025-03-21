import { Entypo,  Feather, FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, useColorScheme,Image } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import { useNavigation, useRouter } from "expo-router";
import Modal from "../../components/Modal";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const initialFeedData = [
  { id: "1", name: "Twiggy", location: "Pune, Hinjawadi" },
  { id: "2", name: "Kara", location: "Wakad Pune" },
  { id: "3", name: "Daisy", location: "Saras Baug Pune 2" },
  { id: "4", name: "Chloe", location: "Nagpur Maharashtra" },
];

const allclinics = () => {
  const [feedData, setFeedData] = useState(initialFeedData);
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const navigation = useNavigation();
  const router = useRouter();
  const handleEdit = (id) => {
    // alert(`Edit item with ID: ${id}`);
    router.push("/(clinics)/doctors"); // Redirect to the Doctors tab
  };
  const navigateTo = (id) => {
    // alert(`Edit item with ID: ${id}`);
    router.push("/(clinics)/doctors"); // Redirect to the Doctors tab
  };

  const handleRemove = (id) => {
    setFeedData(feedData.filter((item) => item.id !== id));
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, isDark && styles.darkCard]} onPress={() => navigateTo(item.id)}>
      <View style={styles.avatar}>
        <FontAwesome5 name="hospital" size={20} color={isDark ? "#f6f6f6" : "black"} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.name, isDark && styles.darkText]}>{item.name}</Text>
        <Text style={[styles.action, isDark && styles.darkTextSecondary]}>{item.location}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
          <Feather name="edit" size={19} color="#2ECC71" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleRemove(item.id)}>
          <MaterialIcons name="delete-outline" size={22} color="#E74C3C" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer title="Clinics" lightBgColor={isDark ? "#0D1B2A" : "#F8F8F8"}>

       <View style={styles.container}>
          
            {/* Reusable Modal */}
            <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)} title="Update Hospital Info">

                <CustomInput placeholder="Hospital Name *" icon={<FontAwesome name="hospital-o" size={24} color={isDark ? styles.darkColor.color : styles.lightColor.color} />}  />
                <CustomInput placeholder="Location *" icon={<Entypo name="location-pin" size={24}  color={isDark ? styles.darkColor.color : styles.lightColor.color} />}   />
                <CustomButton title="Submit" />
 
            </Modal>
        </View>


      <FlatList data={feedData} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </ScreenContainer>
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
    borderLeftColor: "#F39C12",
    flexDirection: "row",
    alignItems: "center",
  },
  darkCard: {
    backgroundColor: "#2C3E50",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: "#F39C12",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  darkText: {
    color: "#f6f6f6",
  },
  action: {
    fontSize: 14,
    color: "#555",
  },
  darkTextSecondary: {
    color: "#BBB",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 8,
  },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
// },
openButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
},
buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
},
// image: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 10,
// },
title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
},
description: {
    textAlign: "center",
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
},
actionButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
},

lightColor:{
  color: "black",
},
darkColor:{
  color: "white",

},
});

export default allclinics;
