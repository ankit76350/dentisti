import React from "react";
import { View, Text, FlatList, StyleSheet, useColorScheme } from "react-native";
import Svg, { Path } from "react-native-svg";
import ScreenContainer from "../../components/ScreenContainer";

const billingData = [
  {
    patient: "Happy Kada",
    doctor: "Dr Kedar",
    hospital: "Rama Clinics",
    admissionDate: "8/16/2024",
    billingDate: "8/29/2024",
    amount: "2000",
    status: "Paid",
    paymentMethod: "Cash",
    service: "Teeth Whitening",
  },
  {
    patient: "Neha Sonia",
    doctor: "Dr Pavan",
    hospital: "Shree Clinic",
    admissionDate: "7/25/2024",
    billingDate: "8/29/2024",
    amount: "700",
    status: "Paid",
    paymentMethod: "Cash",
    service: "Fillings",
  },
  {
    patient: "Rudra",
    doctor: "Dr Hitesh Garg",
    hospital: "Apollo Hospital",
    admissionDate: "5/7/2024",
    billingDate: "8/29/2024",
    amount: "6000",
    status: "Pending",
    paymentMethod: "",
    service: "Gum Surgery",
  },
  {
    patient: "Pavan DKurdekar",
    doctor: "Dr Kedar",
    hospital: "Rama Clinics",
    admissionDate: "8/27/2024",
    billingDate: "8/29/2024",
    amount: "2000",
    status: "Paid",
    paymentMethod: "Online",
    service: "Teeth Whitening",
  },
  {
    patient: "Happy Kada",
    doctor: "Dr Kedar",
    hospital: "Rama Clinics",
    admissionDate: "8/16/2024",
    billingDate: "8/29/2024",
    amount: "2000",
    status: "Paid",
    paymentMethod: "Cash",
    service: "Teeth Whitening",
  },
  {
    patient: "Neha Sonia",
    doctor: "Dr Pavan",
    hospital: "Shree Clinic",
    admissionDate: "7/25/2024",
    billingDate: "8/29/2024",
    amount: "700",
    status: "Paid",
    paymentMethod: "Cash",
    service: "Fillings",
  },
  {
    patient: "Rudra",
    doctor: "Dr Hitesh Garg",
    hospital: "Apollo Hospital",
    admissionDate: "5/7/2024",
    billingDate: "8/29/2024",
    amount: "6000",
    status: "Pending",
    paymentMethod: "",
    service: "Gum Surgery",
  },
  {
    patient: "Pavan DKurdekar",
    doctor: "Dr Kedar",
    hospital: "Rama Clinics",
    admissionDate: "8/27/2024",
    billingDate: "8/29/2024",
    amount: "2000",
    status: "Paid",
    paymentMethod: "Online",
    service: "Teeth Whitening",
  },
];

const getCardColor = (status, paymentMethod) => {
  if (status === "Pending") return "#F2C94C"; // Yellow theme
  if (paymentMethod === "Online") return "#56CCF2"; // Blue for online
  if (paymentMethod === "Cash") return "#6FCF97"; // Green for cash
  return "#E0E0E0"; // Default gray
};

const BillingCard = ({ item }) => {
  const cardColor = getCardColor(item.status, item.paymentMethod);
  const theme = useColorScheme(); // Detects the theme (light or dark)
  const fillColor = theme === "dark" ? "#0D1B2A" : "#FFFFFF"; // Change fill based on theme

  return (
    <>
      <View style={styles.cardTopBorder} />
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={styles.title}>{item.patient}</Text>
        <Text style={styles.subText}>Doctor: {item.doctor}</Text>
        <Text style={styles.subText}>Hospital: {item.hospital}</Text>
        <Text style={styles.subText}>Admission: {item.admissionDate}</Text>
        <Text style={styles.subText}>Billing: {item.billingDate}</Text>
        <Text style={styles.amount}>₹{item.amount}</Text>
        <Text style={styles.service}>Service: {item.service}</Text>
        <Text style={styles.visaText}>{item.status} - {item.paymentMethod}</Text>

        <View style={styles.jaggedBorderContainer}>
          <Svg height={20} width="300%" viewBox="-10 0 3281 40" preserveAspectRatio="none">
            <Path
              fill={fillColor}
              d="M0,40 L50,20 L100,40 L150,20 L200,40 L250,20 L300,40 L350,20 L400,40 L450,20 L500,40 L550,20 
                L600,40 L650,20 L700,40 L750,20 L800,40 L850,20 L900,40 L950,20 L1000,40 L1050,20 L1100,40 L1150,20 L1200,40 
                V40 H0 Z"
            />
          </Svg>
        </View>

      </View>
    </>
  );
};

const allbills = () => {
  return (
      <ScreenContainer
           title="Bills"
      >

    {/* <View style={styles.container}> */}
      <FlatList
        data={billingData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <BillingCard item={item} />}
        />
    {/* </View> */}
      </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: {
    fontSize: 14,
    color: "#fff",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
  service: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#fff",
  },
  visaText: {
    position: "absolute",
    bottom: 10,
    right: 15,
    fontSize: 24,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.3)",
  },
  card: {
    padding: 20,
    // borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginVertical: 10,
    position: "relative",
    overflow: "visible",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.3,
    // shadowRadius: 5,
    // elevation: 6,
  },
  jaggedBorderContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 20,
    color:'red'
  },
  cardTopBorder: {
    position: "absolute",
    top: 8,
    height: 14,
    backgroundColor: "silver",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 2,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
});

export default allbills;
