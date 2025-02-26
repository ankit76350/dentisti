import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent'

const _layout = () => {
  return (
   <MainLayout/>
  );
}

const MainLayout = () => {
return (  
<GestureHandlerRootView style={{ flex: 1 }}
screenOptions={{headerShown:false}}
>
  <Drawer
    drawerContent={CustomDrawerContent}
    screenOptions={{ headerShown: false }}
  >
  </Drawer>
</GestureHandlerRootView>
)}

export default _layout