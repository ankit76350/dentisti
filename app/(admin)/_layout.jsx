import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack
      screenOptions={{

        headerShown: false,

      }}
    >

      {/* Common Root */}
      <Stack.Screen
        name="(dash)"
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="dashboard"
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="patients"
        options={{ title: 'Admin All Patients' }}
      />
      <Stack.Screen
        name="calendarview"
        options={{ title: 'Admin All Calendar View' }}
      />

      {/* Only In Admin */}
      <Stack.Screen
        name="staffs"
        options={{ title: 'Admin All Staff' }}
      />
      <Stack.Screen
        name="stafform"
        options={{ title: 'Add/Updating Staff' }}
      />
      <Stack.Screen
        name="bills"
        options={{ title: 'Admin All Bills' }}
      />
      <Stack.Screen
        name="clinics"
        options={{ title: 'Admin All Clinics' }}
      />

    </Stack>
  );
}