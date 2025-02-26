// app/(admin,doctor,receptionist)/AllPatients.tsx
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function AllPatients() {
    const { userId, data , role } = useLocalSearchParams();
  return (
    <View>
       
 
      <Text>All Patients - Shared among Admin, Doctor, and Receptionist</Text>
      <Text>User ID: {userId}</Text>
    <Text>Name: {data}</Text>
    <Text>Role: {role}</Text>
    </View>
  );
}
