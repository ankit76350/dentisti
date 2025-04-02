import 'react-native-gesture-handler';
import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { role } from '../assets/json/role'
import Loading from "../components/Loading";

const index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // const [role , setRole] = useState(role?.role)

  console.log("role", role);


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      // router.replace(`/(${role})/(dash)/analytics`); // Replace so it removes i from stack
      router.replace(`/(${role})/(dash)/revenue`); // Replace so it removes i from stack
      // router.replace(`/(${role})/(dash)/appointments`); // Replace so it removes index from stack
      // router.replace(`/(${role})/profiles`); // Replace so it removes index from stack
      // router.replace(`/(${role})/notification`); // Replace so it removes index from stack
      // router.replace(`/(${role})/staffs`); // Replace so it removes index from stack
      // router.replace(`/(${role})/stafform`); // Replace so it removes index from stack
      // router.replace(`/(${role})/patients`); // Replace so it removes index from stack
      // router.replace(`/(${role})/bills`); // Replace so it removes index from stack
      // router.replace(`/(${role})/clinics`); // Replace so it removes index from stack
      // router.replace(`/(${role})/(clinics)/doctors`); // Replace so it removes index from stack
      // router.replace(`/(${role})/calendarview`); // Replace so it removes index from stack
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Text>Loading...</Text> */}
        <Loading />
      </View>
    );
  }

  return null;
};

export default index;
