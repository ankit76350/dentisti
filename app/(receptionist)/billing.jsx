// app/(receptionist)/Billing.tsx
import { useNavigation } from 'expo-router';
import { View, Text,Button } from 'react-native';

export default function Billing() {
    const navigation = useNavigation();
  return (
    <View>
    <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Text>Billing Page - Only for Receptionist</Text>
    </View>
  );
}
