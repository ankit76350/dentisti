// app/(admin)/AllBills.tsx
import { useNavigation } from 'expo-router';
import { View, Text ,Button} from 'react-native';

export default function AllBills() {
    const navigation = useNavigation();
  return (
    <View>
    <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Text>Manage Bills - Only for Admin</Text>
    </View>
  );
}
