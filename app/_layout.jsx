

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { useRouter ,useNavigation} from 'expo-router';
import { BackHandler } from 'react-native';
import { useEffect } from 'react';
import {role} from '../assets/json/role'
import { hp, wp } from "../helpers/common";
import { rdxStore } from '../redux/rdxStore';
import { Provider } from "react-redux"

const _layout = () => {
  return (
    <Provider store={rdxStore}>

   <MainLayout/>
    </Provider>
  );
}




const MainLayout = () => {

  const router = useRouter();
  const navigation = useNavigation();
  

  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      // router.replace(`/(${role})/(dash)/analytics`); // Redirect to dashboard instead of closing app
      return true; // Prevent default behavior (exiting the app)
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={CustomDrawerContent} screenOptions={
        {
          headerShown: false,
          drawerStyle: {
            width: wp(75), 
          },
        }}></Drawer>
    </GestureHandlerRootView>
  );
};




export default _layout;
