import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, useColorScheme } from "react-native";
import Svg, { Path } from "react-native-svg";
import ScreenContainer from "../../components/ScreenContainer";
import SearchBar from "../../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchBills } from "../../redux/bills/billsSlice";
import { hp } from "../../helpers/common";
import Loading from "../../components/Loading";
import { role, user } from "../../assets/json/role";
import { catalystURL } from "../../constants";

const bills = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  //!Redux Start
  const dispatch = useDispatch();

  const url = role === 'admin' ? `${catalystURL}/admin/bills` : `${catalystURL}/receptionist/${user.userHospitalId}/bills/all` 
  
  useEffect(() => {
    dispatch(fetchBills(url));
  }, []);
  const bills = useSelector((state) => state.bills.billsState);
  //!Redux End




  //Todo Start: filter data 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(bills.billsData);
    } else {
      setFilteredData(
        bills.billsData?.filter(
          (item) =>
            item?.patient_name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [bills.billsData, searchQuery]);
  //Todo end: filter data 

  return (
    <ScreenContainer
      title="Bills"
    >
      <View style={styles.container}>
        <View style={{ marginBottom: hp(1) }}>
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
        </View>



        {bills.isLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>
            <Loading />
          </View>
        ) : filteredData.length > 0 ? (
          <FlatList
            data={filteredData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <BillingCard item={item} />}
          />
        ) : (
          <View style={[{ alignItems: "center" }]}>
            <Text style={[styles.infoText, isDark && styles.darkText]}>No bills found</Text>
          </View>
        )}


      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: 'red'
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

  infoText: {
    fontSize: 13,
    marginLeft: 6,
    color: "#444",
  },
  darkText: {
    color: "#f6f6f6",
  },
});

export default bills;



//! logic, function and component
const getCardColor = (status, paymentMethod) => {
  if (status === "Pending") return "#F2C94C"; // Yellow theme
  if (paymentMethod === "Online") return "#56CCF2"; // Blue for online
  if (paymentMethod === "Cash") return "#6FCF97"; // Green for cash
  return "#C4A7E7"; // Default gray
};



const BillingCard = ({ item }) => {
  const cardColor = getCardColor(item.Status, item.PaymentMethod);
  const theme = useColorScheme(); // Detects the theme (light or dark)
  const fillColor = theme === "dark" ? "#0D1B2A" : "#FFFFFF"; // Change fill based on theme
  return (
    <>
      <View style={styles.cardTopBorder} />
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={styles.title}>{item.patient_name}</Text>
        <Text style={styles.subText}>Doctor: {item.doctor_name}</Text>
        <Text style={styles.subText}>Hospital: {item.hospital_name}</Text>
        <Text style={styles.subText}>Admission: {item.date_of_admission}</Text>
        <Text style={styles.subText}>Billing: {item.Billing_Date}</Text>
        <Text style={styles.amount}>₹{item.Amount}</Text>
        <Text style={styles.service}>Service: {item.ServiceDetails}</Text>
        <Text style={styles.visaText}>{item.Status} - {item.PaymentMethod}</Text>

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

