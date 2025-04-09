import React, { useCallback, useMemo, useRef, useImperativeHandle, forwardRef, useState } from "react";
import { View, Text, StyleSheet, useColorScheme, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const AppointmentBottomSheet = forwardRef((props, ref) => {
  const [details, setDetails] = useState(null);
  const theme = useColorScheme();
  const snapPoints = useMemo(() => ["30%", "50%", "80%"], []);
  const bottomSheetModalRef = useRef(null);

  const handleSheetChanges = useCallback((index) => {
    console.log("Sheet changed:", index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={2} />
    ),
    []
  );

  // Expose function to parent
  useImperativeHandle(ref, () => ({
    openModal: () => {
      bottomSheetModalRef.current?.present();
    },
    getDetails: (selectedDetails) => {
      setDetails(selectedDetails)
    },
  }));


  const appointmentDetails = [
    { label: "Name", value: details?.name, icon: <Ionicons name="person" size={20} color="#49a3f1" /> },
    { label: "Email", value: details?.email, icon: <MaterialIcons name="email" size={20} color="#F8B400" /> },
    { label: "Phone", value: details?.phoneNo, icon: <FontAwesome5 name="phone-alt" size={18} color="#49a3f1" /> },
    { label: "Address", value: details?.address, icon: <Ionicons name="location" size={20} color="#F8B400" /> },
    { label: "Gender", value: details?.gender, icon: <FontAwesome5 name="venus-mars" size={18} color="#49a3f1" /> },
    { label: "DOB", value: details?.dob, icon: <MaterialIcons name="cake" size={20} color="#F8B400" /> },
    { label: "Appointment Date", value: details?.appointmentDate, icon: <Ionicons name="calendar" size={20} color="#49a3f1" /> },
    { label: "Doctor", value: details?.doctorName, icon: <FontAwesome5 name="user-md" size={18} color="#F8B400" /> },
    { label: "Hospital", value: details?.hospitalName, icon: <MaterialIcons name="local-hospital" size={20} color="#49a3f1" /> },
    { label: "Status", value: details?.status, icon: renderStatusIcon(details?.status) },
  ];

  return (
    <GestureHandlerRootView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        index={2}
        backdropComponent={renderBackdrop}
        backgroundStyle={theme === "dark" ? styles.darkCard : styles.lightCard}
      >
        <BottomSheetView style={[styles.contentContainer, theme === "dark" ? styles.darkCard : styles.lightCard]}>
          <View>
            <Text style={styles.heading}>Appointment Details</Text>
          </View>

          {
            details ? (appointmentDetails.map(({ label, value, icon }) => (
              <View key={label} style={[styles.infoRow, theme === "dark" ? styles.darkRow : styles.lightRow]}>
                {icon}
                {/* <Text style={[styles.label, theme === "dark" ? styles.darkColor : styles.lightColor]}>{label}:</Text> */}
                <Text style={[styles.value, theme === "dark" ? styles.darkColor : styles.lightColor]}>{value}</Text>
              </View>
            ))) : (<Text style={[styles.value, theme === "dark" ? styles.darkColor : styles.lightColor]}>
              No details available.
            </Text>)
          }
        </BottomSheetView>
      </BottomSheetModal>
    </GestureHandlerRootView>
  );
});



const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    borderRadius: 15,
    ...Platform.select({
      android: { elevation: 5 },
    }),
  },
  darkCard: {
    backgroundColor: "#2C3E50",
  },
  lightCard: {
    backgroundColor: "#FFFFFF",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#49a3f1",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 8,
  },
  value: {
    fontSize: 16,
    flex: 1,
    // padding:2
    // textAlign: "right",
    marginLeft: 12,
  },
  lightColor: {
    color: "#333",
  },
  darkColor: {
    color: "#FFFFFF",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,

    marginVertical: 1,
    width: "100%",
  },
  darkRow: {
    backgroundColor: "#0D1B2A",
  },
  lightRow: {
    backgroundColor: "#f1f1f1",
  }
});

export default AppointmentBottomSheet;


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