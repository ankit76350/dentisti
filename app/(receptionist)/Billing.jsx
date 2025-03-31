// app/(receptionist)/Billing.tsx
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { View, Text,Button } from 'react-native';

export default function billing() {
    const navigation = useNavigation();
  return (
    <View>
          <Button title="Open Drawer" onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/>
    <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Text>Billing Page - Only for Receptionist</Text>
    </View>
  );
}
