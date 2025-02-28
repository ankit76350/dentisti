// app/(admin)/AllBills.tsx
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { View, Text, Button, ScrollView } from 'react-native';
import { useFetch } from '../../hooks/useFetch';
import Table from '../../components/Table';
import { catalystURL } from '../../constants';

export default function AllBills() {
  const navigation = useNavigation()

  const { data: billsData, loading, error } = useFetch(`${catalystURL}admin/bills`);
  const { data: doctorsData } = useFetch(`${catalystURL}admin/doctors`);
  const tableHeader = ["Patient Name", "Consulting Doctor", "Hospital", "Date of Admission", "Billing Date", "Amount", "Status", "Payment Method", "Service Details"]
  const tableContentKey = ["patient_name", { populdateId: "doctor_id" }, "hospital_name", "date_of_admission", "Billing_Date", "Amount", "Status", "PaymentMethod", "ServiceDetails"]

  function populate(rowId) {
    const result = doctorsData?.find(item => item.ROWID === rowId);
    return result ? result.name : "Not Found";
  }
  
  return (
    <>

      <Button title="Open Drawer" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />

      <ScrollView>
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <Table tableData={billsData || []} loading={loading} tableHeader={tableHeader} tableContentKey={tableContentKey} errorMessage={error} populate={populate} />
        </View>
      </ScrollView>
    </>
  );
}
