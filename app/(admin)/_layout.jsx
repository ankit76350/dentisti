import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack>

      {/* Common Root */}
      <Stack.Screen
        name="dashboard"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="allPatients"
        options={{ title: 'Admin All Patients' }}
      />
      <Stack.Screen
        name="calendarView"
        options={{ title: 'Admin All Calendar View' }}
      />

      {/* Only In Admin */}
      <Stack.Screen
        name="allStaff"
        options={{ title: 'Admin All Staff' }}
      />
      <Stack.Screen
        name="allBills"
        options={{ title: 'Admin All Bills' }}
      />
      <Stack.Screen
        name="allClinics"
        options={{ title: 'Admin All Clinics' }}
      />

    </Stack>
  );
}