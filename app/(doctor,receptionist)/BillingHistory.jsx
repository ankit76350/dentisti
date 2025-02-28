// app/(doctor,receptionist)/BillingHistory.tsx
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function BillingHistory() {
  const navigation = useNavigation();
  return (
    <View>
      <Button title="Open Drawer" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Text>Billing History - Shared by Doctor and Receptionist</Text>
    </View>
  );
}
