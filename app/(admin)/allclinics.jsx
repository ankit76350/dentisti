// app/(admin)/AllClinics.tsx
import { useNavigation } from 'expo-router';
import { View, Text ,Button} from 'react-native';

export default function AllClinics() {
     const navigation = useNavigation();
   return (
     <View>
     <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Text>Manage Clinics - Only for Admin</Text>
    </View>
  );
}
