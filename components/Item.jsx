import React from "react";
import { View, Text, FlatList, StyleSheet, useColorScheme, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { hp, wp } from "../helpers/common";
import {formatDateToIST, formatTimeToIST} from '../utils/formatTime'

const Item = ({ showDetails = () => { }  , data=[]}) => {
  const theme = useColorScheme();
  // console.log("data",data);
  
 


  return (
    <View style={[styles.container, theme === "dark" ? styles.darkBackground : styles.lightBackground]}>

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false} // Hides the scrollbar
        keyExtractor={(_, index) => index}
        renderItem={({ item, index }) => (

          <TouchableOpacity
            onPress={()=>showDetails(item.ROWID)}
            style={[
              styles.notificationCard,
              theme === "dark" ? styles.darkCard : styles.lightCard,
              index === data.length - 1 && { marginBottom: hp(70) }, // Add margin to last item
            ]}
          >
            <Ionicons name="person-circle-outline" size={32} color="#49a3f1" />
            <View style={styles.textContainer}>
              <Text style={[styles.title, theme === "dark" ? styles.darkText : styles.lightText]}>{item.name}</Text>
              <Text style={[styles.description]}>
                {item.phone_no}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{formatDateToIST(item.date_time)}</Text>
              <Text style={styles.date}>{formatTimeToIST(item.date_time)}</Text>
            </View>


            {renderStatusIcon(item.status)}
          </TouchableOpacity>
        )}
      />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: wp(3),
    // marginBottom: wp(2), // Ensures proper spacing
    marginHorizontal: wp(5), // Aligns with cards
    // marginBottom: hp(30), // Aligns with cards
    width: wp(90), // Makes width consistent
    alignSelf: "center", // Ensures central alignment
  },
  darkBackground: {
    // backgroundColor: "#1B263B",
  },
  lightBackground: {
    // backgroundColor: "white",
  },
  notificationCard: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    // borderBottomRightRadius: 12,
    // borderBottomLeftRadius: 12,
    marginBottom: hp(1),
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 }, // Adds shadow only at the bottom
    elevation: 4, // For Android
    // marginHorizontal: wp(1),
  },

  darkCard: {
    backgroundColor: "#2C3E50",
  },
  lightCard: {
    backgroundColor: "#FFFFFF",
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lightText: {
    color: "#333",
  },
  darkText: {
    color: "#FFF",
  },
  timeContainer: {
    alignItems: "flex-end",
    marginRight: 12,
  },
  time: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#49a3f1",
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
});

export default Item;

const renderStatusIcon = (status) => {
  switch (status) {
    case "Pending":
      return <MaterialIcons name="pending-actions" size={20} color="orange" />;
    case "cancel":
      return <MaterialCommunityIcons name="cancel" size={20} color="red" />;
    case "Attended":
      return <MaterialIcons name="co-present" size={20} color="blue" />;
    case "Converted To Patient":
      return <Ionicons name="checkmark-circle" size={20} color="green" />;
    default:
      return <MaterialIcons name="help-outline" size={20} color="gray" />;
  }
};
