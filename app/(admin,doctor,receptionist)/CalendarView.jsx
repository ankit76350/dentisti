// app/(admin,doctor,receptionist)/CalendarView.tsx
import { useNavigation } from 'expo-router';
import { View, Text ,Button} from 'react-native';

export default function CalendarView() {
    const navigation = useNavigation();
  return (
    <View>
    <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Text>Calendar View - Shared among Admin, Doctor, and Receptionist</Text>

    </View>
  );
}
