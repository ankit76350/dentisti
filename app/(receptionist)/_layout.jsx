import { Stack } from "expo-router";

export default function ReceptionistLayout() {
  return <Stack >
    {/* Common Root for all */}
    <Stack.Screen
        name="dashboard"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="allPatients"
        options={{ title: 'Receptionist All Patients' }}
      />
      <Stack.Screen
        name="calendarView"
        options={{ title: 'Receptionist Calendar View' }}
      />

      {/* Common in doctor and receptionist */}
       <Stack.Screen
        name="billingHistory"
        options={{ title: 'Receptionist Billing History' }}
      />
      <Stack.Screen
        name="patientHistory"
        options={{ title: 'Receptionist Patient History' }}
      />
      {/* Only in  Receptionist*/}
      <Stack.Screen
        name="billing"
        options={{ title: 'Receptionist billing' }}
      />

  </Stack>;
}