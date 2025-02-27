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
        name="allpatients"
        options={{ title: 'Admin All Patients' }}
      />
      <Stack.Screen
        name="calendarview"
        options={{ title: 'Admin All Calendar View' }}
      />

      {/* Only In Admin */}
      <Stack.Screen
        name="allstaff"
        options={{ title: 'Admin All Staff' }}
      />
      <Stack.Screen
        name="allbills"
        options={{ title: 'Admin All Bills' }}
      />
      <Stack.Screen
        name="allclinics"
        options={{ title: 'Admin All Clinics' }}
      />

    </Stack>
  );
}