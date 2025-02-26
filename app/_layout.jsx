import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name="(admin,doctor,receptionist)/Dashboard" options={{ title: 'Dashboard' }} />
        <Drawer.Screen name="(admin,doctor,receptionist)/AllPatients" options={{ title: 'All Patients' }} />
        <Drawer.Screen name="(admin,doctor,receptionist)/CalendarView" options={{ title: 'Calendar' }} />
        <Drawer.Screen name="(doctor,receptionist)/BillingHistory" options={{ title: 'Billing History' }} />
        <Drawer.Screen name="(doctor,receptionist)/PatientHistory" options={{ title: 'Patient History' }} />
        <Drawer.Screen name="(receptionist)/Billing" options={{ title: 'Receptionist Billing' }} />
        <Drawer.Screen name="(admin)/AllStaff" options={{ title: 'Manage Staff' }} />
        <Drawer.Screen name="(admin)/AllBills" options={{ title: 'Manage Bills' }} />
        <Drawer.Screen name="(admin)/AllClinics" options={{ title: 'Manage Clinics' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
