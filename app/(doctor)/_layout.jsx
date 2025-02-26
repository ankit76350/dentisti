import { Stack } from "expo-router";

export default function DoctorLayout() {
  return <Stack   
  // screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="dashboard" options={{ title: 'Docter dashboard' }} />
    <Stack.Screen   name="allPatients" options={{ title: 'Docter All Patients' }} />
  </Stack>;
}