import { Stack } from "expo-router";

export default function DoctorLayout() {
  return <Stack   
  // screenOptions={{ headerShown: false }}
  >
       {/* Common Root for all */}
       <Stack.Screen
        name="dashboard"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="allPatients"
        options={{ title: 'Docter All Patients' }}
      />
      <Stack.Screen
        name="calendarView"
        options={{ title: 'Docter Calendar View' }}
      />

      {/* Common in docter and receptionist */}
       <Stack.Screen
        name="billingHistory"
        options={{ title: 'Docter Billing History' }}
      />
      <Stack.Screen
        name="patientHistory"
        options={{ title: 'Docter Patient History' }}
      />

     

  </Stack>;
}