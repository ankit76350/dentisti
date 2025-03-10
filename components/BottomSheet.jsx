import React, { useCallback, useMemo, useRef ,useImperativeHandle, forwardRef } from 'react';
import { View, Text, StyleSheet, Button, useColorScheme, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

const BottomSheet = forwardRef((props, ref) => {
  const theme = useColorScheme();
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const bottomSheetModalRef = useRef(null);

  // const handlePresentModalPress = useCallback(() => {
  //   bottomSheetModalRef.current?.present();
  // }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
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
  // ✅ Expose function to parent
  useImperativeHandle(ref, () => ({
    openModal: () => {
      bottomSheetModalRef.current?.present();
    },
  }));


  return (
    // <GestureHandlerRootView style={[styles.container, theme === "dark" ? styles.darkBackground : styles.lightBackground]}>
    <GestureHandlerRootView >
      {/* <Button
        onPress={handlePresentModalPress}
        title="View Appointment Details"
        color={theme === "dark" ? "#FFD700" : "#49a3f1"}
      /> */}
      <BottomSheetModal
      // ref={bottomSheetModalRef} 
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        index={2}
        backdropComponent={renderBackdrop}
        backgroundStyle={[theme === "dark" ? styles.darkCard : styles.lightCard]}
      >
        <BottomSheetView style={[styles.contentContainer, theme === "dark" ? styles.darkCard : styles.lightCard]}>
          <Text style={styles.heading}>Appointment Details</Text>
          {appointmentDetails.map(({ label, value }) => (
            <View key={label} style={styles.detailRow}>
              <Text style={[styles.label , theme === "dark" ? styles.darkColor : styles.lightColor] }>{label}:</Text>
              <Text style={[styles.value ,theme === "dark" ? styles.darkColor : styles.lightColor]}>{value}</Text>
            </View>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    </GestureHandlerRootView>
  );
});

const appointmentDetails = [
  { label: "Name", value: "Shreyas" },
  { label: "Email", value: "shreyas@gmail.com" },
  { label: "Phone No", value: "2212324565" },
  { label: "Address", value: "Kolhapur" },
  { label: "Gender", value: "Male" },
  { label: "Date of Birth", value: "5/1/1998" },
  { label: "Appointment Date", value: "3/28/2025, 11:52:00 AM" },
  { label: "Doctor Name", value: "Dr Kedar" },
  { label: "Hospital Name", value: "Shri Rama Clinics" },
  { label: "Status", value: "Converted To Patient" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  darkBackground: {
    backgroundColor: "#1B263B",
  },
  lightBackground: {
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    padding: 20,
    // borderRadius: 12,
    ...Platform.select({
      ios: {
        // shadowColor: "#000",
        // shadowOpacity: 0.2,
        // shadowRadius: 5,
        // shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 4,
      },
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
    marginBottom: 10,
    color: "#49a3f1",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center", // Ensures elements are aligned properly
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",

    flex: 1, // Makes sure labels take available space
  },
  value: {
    fontSize: 16,

    flex: 1, // Ensures values align properly
    textAlign: "right", // Aligns text to the right
  },
  lightColor:{
    color: "#33333",
  },
  darkColor:{
    color: "#FFFFFF",
  }
});

export default BottomSheet;