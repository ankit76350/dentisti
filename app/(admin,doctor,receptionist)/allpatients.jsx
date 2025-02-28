// app/(admin,doctor,receptionist)/AllPatients.tsx
import { DrawerActions } from '@react-navigation/native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { View, Text, Button, ScrollView } from 'react-native';
import Table from '../../components/Table';
import { useFetch } from '../../hooks/useFetch';
import { catalystURL } from '../../constants';

export default function AllPatients() {
  const navigation = useNavigation()

  const { data: patientsData, loading, error } = useFetch(`${catalystURL}admin/patients`);
  const { data: doctorsData } = useFetch(`${catalystURL}admin/doctors`);
  const { data: hospitalsData } = useFetch(`${catalystURL}admin/hospitals`);
  const tableHeader = ["Name", "DOB", "Gender", "Date of Admission", "Doctor", "Hospital", "Phone", "Address"]
  const tableContentKey = ["patient_name", "date_of_birth", "gender", "date_of_admission", { populdateId: "doctor_id" }, { populdateId: "hospital_id" }, "phone", "address"]

  function populate(rowId) {
    const doctorName = doctorsData?.find(item => item.ROWID === rowId)?.name;
    const hospitalName = hospitalsData?.find(item => item.ROWID === rowId)?.hospital_name;

    if (!doctorName && !hospitalName) {
      return "Not Found"
    }

    if (doctorName) {
      return doctorName
    }
    if (hospitalName) {
      return hospitalName
    }

  }
  return (
    <>

      <Button title="Open Drawer" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />

      <ScrollView>
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <Table tableData={patientsData || []} loading={loading} tableHeader={tableHeader} tableContentKey={tableContentKey} errorMessage={error} populate={populate} />
        </View>
      </ScrollView>
    </>
  );
}
