import { Stack } from "expo-router";


export default function _layout() {
  return (

    <Stack
      screenOptions={{

        headerShown: false,

      }}>
      {/* Common Root for all */}
      <Stack.Screen name="(dash)" options={{ headerShown: false }} />
      <Stack.Screen name="patients" options={{ title: "Receptionist All Patients" }} />
      <Stack.Screen name="calendarview" options={{ title: "Receptionist Calendar View" }} />

      {/* Common in doctor and receptionist */}
      <Stack.Screen name="bills" options={{ title: "Receptionist Billing History" }} />
      <Stack.Screen name="billingform" options={{ title: "Receptionist Billing form" }} />
      <Stack.Screen name="patienthistory" options={{ title: "Receptionist Patient History" }} />

      {/* Only in Receptionist */}
      <Stack.Screen name="billing" options={{ title: "Receptionist Billing" }} />
      <Stack.Screen
        name="patienttreatmentinfo"
        options={{ title: 'Receptionist patient treatment info' }}
      />
    </Stack>

  );
}
