// app/(admin)/AllStaff.tsx
import { useNavigation } from 'expo-router';
import { View, Text ,Button} from 'react-native';

export default function AllStaff() {
     const navigation = useNavigation();
   return (
     <View>
     <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Text>Manage Staff - Only for Admin</Text>
    </View>
  );
}
