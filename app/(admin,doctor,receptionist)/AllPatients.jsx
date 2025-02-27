// app/(admin,doctor,receptionist)/AllPatients.tsx
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function AllPatients() {
    const { userId, data , role } = useLocalSearchParams();
    
    const navigation = useNavigation();
  return (
    <View>
    <Button title="Go Back" onPress={() => navigation.goBack()} />
       
 
      <Text>All Patients - Shared among Admin, Doctor, and Receptionist</Text>
      <Text>User ID: {userId}</Text>
    <Text>Name: {data}</Text>
    <Text>Role: {role}</Text>
    </View>
  );
}
