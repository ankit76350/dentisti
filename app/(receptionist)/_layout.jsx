import { Stack } from "expo-router";

export default function ReceptionistLayout() {
  return <Stack >
    {/* Common Root for all */}
    <Stack.Screen
        name="dashboard"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="allpatients"
        options={{ title: 'Receptionist All Patients' }}
      />
      <Stack.Screen
        name="calendarview"
        options={{ title: 'Receptionist Calendar View' }}
      />

      {/* Common in doctor and receptionist */}
       <Stack.Screen
        name="billinghistory"
        options={{ title: 'Receptionist Billing History' }}
      />
      <Stack.Screen
        name="patienthistory"
        options={{ title: 'Receptionist Patient History' }}
      />
      {/* Only in  Receptionist*/}
      <Stack.Screen
        name="billing"
        options={{ title: 'Receptionist billing' }}
      />

  </Stack>;
}