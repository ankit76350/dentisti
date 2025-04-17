import React, {
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { hp, wp } from "../../helpers/common";
import useDelete from "../../hooks/useDelete";
import Loading from "../Loading";
import { catalystURL } from "../../constants";
import { role } from "../../assets/json/role";

const BottomSheet = forwardRef((props, ref ) => {
  const { setFetchNewData, fetchNewData } = props;
  const [details, setDetails] = useState(null);
  const theme = useColorScheme();
  const navigation = useNavigation();

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["30%", "50%", "80%"], []);

  const isDarkTheme = theme === "dark";

  const handleSheetChanges = useCallback((index) => {
    console.log("Sheet changed:", index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={2}
      />
    ),
    []
  );

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

  const appointmentDetails = useMemo(() => {
    if (!details) return [];
    return [
      { label: "Name", value: details.name, icon: <Ionicons name="person" size={20} color="#49a3f1" /> },
      { label: "Email", value: details.email, icon: <MaterialIcons name="email" size={20} color="#F8B400" /> },
      { label: "Phone", value: details.phoneNo, icon: <FontAwesome5 name="phone-alt" size={18} color="#49a3f1" /> },
      { label: "Address", value: details.address, icon: <Ionicons name="location" size={20} color="#F8B400" /> },
      { label: "Gender", value: details.gender, icon: <FontAwesome5 name="venus-mars" size={18} color="#49a3f1" /> },
      { label: "DOB", value: details.dob, icon: <MaterialIcons name="cake" size={20} color="#F8B400" /> },
      { label: "Appointment Date", value: details.appointmentDate, icon: <Ionicons name="calendar" size={20} color="#49a3f1" /> },
      { label: "Doctor", value: details.doctorName, icon: <FontAwesome5 name="user-md" size={18} color="#F8B400" /> },
      { label: "Hospital", value: details.hospitalName, icon: <MaterialIcons name="local-hospital" size={20} color="#49a3f1" /> },
      { label: "Status", value: details.status, icon: renderStatusIcon(details.status) },
    ];
  }, [details]);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    openModal: () => {
      bottomSheetModalRef.current?.present();
    },
    getDetails: (selectedDetails) => {
      setDetails(selectedDetails);
    },
  }));

  const editAppointment = () => {
    if (!details) return;
    bottomSheetModalRef.current.close()
    navigation.navigate("appointmentform", {
 
      action: "PUT",
      newAppointmentDetails: { ...details },
    });
  };


  //Todo delete appointment
  const { deleteData, isDeleting, deleteError, deleteResponse } = useDelete()


  const confirmDelete = () => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete "${details.name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => removeData(details.ROWID), // Call removeData only if user confirms
          style: "destructive",
        },
      ]
    );
  };

  const removeData = async (ROWID) => {

    const url = `${catalystURL}admin/appointment/${ROWID}`;
    try {
      const response = await deleteData(url);
      if (!deleteError) {
        Alert.alert("Success", `${response.message}`);
        setFetchNewData(!fetchNewData)
        bottomSheetModalRef.current.close()
      } else {
        Alert.alert("Error", "Something went wrong.");
      }
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to submit data.");
    }
  }
  //Todo delete appointment

  return (
    <GestureHandlerRootView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        index={2}
        backdropComponent={renderBackdrop}
        backgroundStyle={isDarkTheme ? styles.darkCard : styles.lightCard}
      >
        <BottomSheetView
          style={[
            styles.contentContainer,
            isDarkTheme ? styles.darkCard : styles.lightCard,
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: hp(1)
            }}
          >
            <Text style={[styles.heading, { marginLeft: wp(-3), }]}>Appointment Details</Text>
            
            
            {role !=='admin' && <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity onPress={editAppointment}>
                <Feather name="edit" size={21} color="#007BFF" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons
                  name="published-with-changes"
                  size={24}
                  color="#FFC107"
                />
              </TouchableOpacity>

              {isDeleting ? (<Loading size="small" />) : (<TouchableOpacity onPress={confirmDelete}>
                <MaterialIcons
                  name="delete-outline"
                  size={24}
                  color="#DC3545"
                />
              </TouchableOpacity>)}


            </View>}
          </View>

          {appointmentDetails.length > 0 ? (
            appointmentDetails.map(({ label, value, icon }) => (
              <View
                key={label}
                style={[
                  styles.infoRow,
                  isDarkTheme ? styles.darkRow : styles.lightRow,
                ]}
              >
                {icon}
                <Text
                  style={[
                    styles.value,
                    isDarkTheme ? styles.darkColor : styles.lightColor,
                  ]}
                >
                  {value}
                </Text>
              </View>
            ))
          ) : (
            <Text
              style={[
                styles.value,
                isDarkTheme ? styles.darkColor : styles.lightColor,
              ]}
            >
              No details available.
            </Text>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </GestureHandlerRootView>
  );
});

export default BottomSheet;

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
    color: "#49a3f1",
  },
  value: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
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
  },
});
