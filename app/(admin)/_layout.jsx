import { Stack } from "expo-router";

export default function AdminLayout() {
  return <Stack   
  // screenOptions={{ headerShown: false }}
  >
       <Stack.Screen   name="allStaff" options={{ title: ' Admin allStaffallStaff' }} />
       <Stack.Screen   name="dashboard" options={{ title: 'Admin dashboard' }} />
       <Stack.Screen   name="allPatients" options={{ title: 'Admin All Patients' }} />
  </Stack>;
}