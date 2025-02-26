import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

import Dashboard from '../app/(admin,doctor,receptionist)/dashboard'
const index = () => {
  return (

    <>
   
    <Dashboard/>
   
    </>
  )
}

export default index

const styles = StyleSheet.create({})

 {/* 
    <View>
     <Text>index</Text>
      <Link href={"/(admin)/allStaff"} style={{ marginTop: 16, fontSize: 18 }}>
        <Text style={{ fontWeight: "bold" }}>Go To All Staff Page</Text>
      </Link>
      <Link  href={{
          pathname: "/(admin)/dashboard",
          params: { userId: "Admin123", data: "This is Admin dashboard", role:"admin" },
        }}style={{ marginTop: 16, fontSize: 18 }}>
        <Text style={{ fontWeight: "bold" }}>Go To Admin Dashbaoard</Text>
      </Link>

      <Link
        href={{
          pathname: "/(doctor)/dashboard",
          params: { userId: "Docter123", data: "This is docter dashboard" , role:"doctor" },
        }}
        style={{ marginTop: 16, fontSize: 18 }}
      >
        <Text style={{ fontWeight: "bold" }}>Go To Doctor Dashboard</Text>
      </Link> 
      
    </View> 
*/}