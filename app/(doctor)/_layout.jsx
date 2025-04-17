import { Stack } from "expo-router";

export default function _layout() {
  return (<Stack
    screenOptions={{

      headerShown: false,

    }}
  >
    {/* Common Root for all */}
    <Stack.Screen
      name="(dash)"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="patients"
      options={{ title: 'Docter All Patients' }}
    />

    <Stack.Screen
      name="calendarview"
      options={{ title: 'Docter Calendar View' }}
    />

    <Stack.Screen
      name="bills"
      options={{ title: 'Doctor All Bills' }}
    />
    <Stack.Screen
      name="patienttreatmentinfo"
      options={{ title: 'Doctor patient treatment info' }}
    />



  </Stack>);
}