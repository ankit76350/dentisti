import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent'

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        // screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="index" options={{ title: 'Loading' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}

