// app/(doctor,receptionist)/BillingHistory.tsx
import { useNavigation } from 'expo-router';
import { View, Text,Button } from 'react-native';

export default function PatientHistory() {
     const navigation = useNavigation();
   return (
     <View>
     <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Text>Patient History- Shared by Doctor and Receptionist</Text>
    </View>
  );
}
