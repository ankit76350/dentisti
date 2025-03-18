// // import 'react-native-gesture-handler';
// // import { StyleSheet, Text, View } from 'react-native'
// // import React, { useEffect, useState } from 'react'
// // import { Link } from 'expo-router'
// // import Dashboard from '../app/(admin,doctor,receptionist)/dashboard'
// // import role from '../assets/json/role'
// // const index = () => {
  
// //   return (

// //     <>
// //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// //         <Text>Loading...</Text>
// //       </View>
// //     </>
// //   )
// // }

// // export default index

// // const styles = StyleSheet.create({})




import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {role} from '../assets/json/role'

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // const [role , setRole] = useState(role?.role)

  console.log("role",role);
  

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      router.replace(`/(${role})/(dash)/analytics`); // Replace so it removes index from stack
      // router.replace(`/(${role})/(dash)/appointments`); // Replace so it removes index from stack
      // router.replace(`/(${role})/profiles`); // Replace so it removes index from stack
      // router.replace(`/(${role})/notification`); // Replace so it removes index from stack
      // router.replace(`/(${role})/allstaff`); // Replace so it removes index from stack
      // router.replace(`/(${role})/addataffform`); // Replace so it removes index from stack
      // router.replace(`/(${role})/allpatients`); // Replace so it removes index from stack
      // router.replace(`/(${role})/allbills`); // Replace so it removes index from stack
      // router.replace(`/(${role})/allclinics`); // Replace so it removes index from stack
    }, 1000); 
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return null;
};

export default Index;
