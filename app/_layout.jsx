// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { Drawer } from 'expo-router/drawer';
// import CustomDrawerContent from '../components/CustomDrawerContent'
// import { useRouter } from 'expo-router';
// import { useEffect, useState } from 'react';
// import role from '../assets/json/role'
// const _layout = () => {
//   return (
//    <MainLayout/>
//   );
// }

// const MainLayout = () => {
//   // const [role, setRole] = useState("admin")
//   // const router = useRouter()
//   // useEffect(() => {

//   //     if (role) {
//   //       router.replace(`/(${role})/dashboard`)
//   //     } 

//   // }, [])
// return (  
// <GestureHandlerRootView style={{ flex: 1 }}
// screenOptions={{headerShown:false}}
// >
//   <Drawer
//     drawerContent={CustomDrawerContent}
//     screenOptions={{ headerShown: false }}
//   >
//   </Drawer>
// </GestureHandlerRootView>
// )}

// export default _layout



import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { useRouter } from 'expo-router';
import { BackHandler } from 'react-native';
import { useEffect } from 'react';
import role from '../assets/json/role'
import { hp, wp } from "../helpers/common";

const _layout = () => {
  const router = useRouter();

  useEffect(() => {
    const backAction = () => {
      router.replace(`/(${role})/(dash)/analytics`); // Redirect to dashboard instead of closing app
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
