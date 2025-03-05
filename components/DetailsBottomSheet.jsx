import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function DetailsBottomSheet({ bottomSheetRef, setIsSheetOpen, selectedRow }) {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['25%', '50%']}
      enablePanDownToClose={true}
      onChange={(index) => {
        setIsSheetOpen(index !== -1);
      }}
    >
      <BottomSheetView style={styles.bottomSheetContent}>
        <Text style={styles.sheetTitle}>Details</Text>
        {selectedRow ? (
          <View>
            {/* <Text>Row: {selectedRow}</Text> */}
            <Text>Name: {selectedRow.name}</Text>
            <Text>Phone No: {selectedRow.phone_no}</Text>
            <Text>Appointment Date: {selectedRow.date_time}</Text>
            <Text>Doctor Name: {selectedRow.doctor_id}</Text>
            <Text>Status: {selectedRow.status}</Text>
          </View>
        ) : (
          <Text>No details available</Text>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
