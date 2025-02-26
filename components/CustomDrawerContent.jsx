import { StyleSheet, Text, View, Linking } from 'react-native'
import React, { useState } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useNavigation, useRouter } from 'expo-router'

const CustomDrawerContent = (props) => {
  const [role, setRole] = useState('admin')
  const navigation = useNavigation();
  const router = useRouter();
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props}/> */}
    
      {role === "admin" && (
        <>
          <DrawerItem
            label="Dashboard"
            onPress={() =>
              router.push({
                pathname: `/(${role})/dashboard`,
                params: { userId: "Admin123", data: "Hello world Admin", role },
              })}
          />
          <DrawerItem
            label="All Patients"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
          <DrawerItem
            label="Calender View"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
          <DrawerItem
            label="All Staff"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
          <DrawerItem
            label="All Bills"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
          <DrawerItem
            label="All Clinics"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
        </>
      )}

      {role === "doctor" && (
        <>
          <DrawerItem
            label="Dashboard"
            onPress={() =>
              router.push({
                pathname: `/(${role})/dashboard`,
                params: { userId: `${role}123`, data: `Hello world ${role}`, role },
              })}
          />
          <DrawerItem
            label="All Patients"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
          <DrawerItem
            label="Calender View"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
          <DrawerItem
            label="Billing History"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
          <DrawerItem
            label="Patient History"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
        </>
      )}

      {role === "receptionist" && (
        <>
          <DrawerItem
            label="Dashboard"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
          <DrawerItem
            label="All Patients"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
          <DrawerItem
            label="Calender View"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
          <DrawerItem
            label="Billing History"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
          <DrawerItem
            label="Patient History"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
          <DrawerItem
            label="Billing"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
        </>
      )}

    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent

const styles = StyleSheet.create({})