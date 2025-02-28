import { StyleSheet, Text, View, Linking } from 'react-native'
import React, { useState } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useNavigation, useRouter } from 'expo-router'
import role from '../assets/json/role'



const CustomDrawerContent = (props) => {
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
            onPress={() =>
              router.push({
                pathname: `/(${role})/allpatients`,
                params: { userId: "Admin123", data: "Hello world Admin", role },
              })}
          />
          <DrawerItem
            label="Calender View"
            onPress={() =>
              router.push({
                pathname: `/(${role})/calendarview`,
                params: { userId: "Admin123", data: "Hello world Admin", role },
              })}
          />
          <DrawerItem
            label="All Staff"
            onPress={() =>
              router.push({
                pathname: `/(${role})/allstaff`,
                params: { userId: "Admin123", data: "Hello world Admin", role },
              })}
          />
          <DrawerItem
            label="All Bills"
            onPress={() =>
              router.push({
                pathname: `/(${role})/allbills`,
                params: { userId: "Admin123", data: "Hello world Admin", role },
              })}
          />
          <DrawerItem
            label="All Clinics"
            onPress={() =>
              router.push({
                pathname: `/(${role})/allclinics`,
                params: { userId: "Admin123", data: "Hello world Admin", role },
              })}
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
            onPress={() =>
              router.push({
                pathname: `/(${role})/allpatients`,
                params: { userId: "Admin123", data: "Hello world Admin", role },
              })}
          />
          <DrawerItem
            label="Calender View"
            onPress={() =>
              router.push({
                pathname: `/(${role})/calendarview`,
                params: { userId: "Admin123", data: "Hello world Admin", role },
              })}
          />
          <DrawerItem
            label="Billing History"
            onPress={() =>
              router.push({
                pathname: `/(${role})/billinghistory`,
                params: { userId: "Admin123", data: "Hello world Admin", role },
              })}
          />
          <DrawerItem
            label="Patient History"
            onPress={() =>
              router.push({
                pathname: `/(${role})/patienthistory`,
                params: { userId: "Admin123", data: "Hello world Admin", role },
              })}
          />
        </>
      )}

      {role === "receptionist" && (
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
            onPress={() =>
              router.push({
                pathname: `/(${role})/allpatients`,
                params: { userId: "Admin123", data: "Hello world Admin", role },
              })}
          />
          <DrawerItem
            label="Calender View"
            onPress={() =>
              router.push({
                pathname: `/(${role})/calendarview`,
                params: { userId: "Admin123", data: "Hello world Admin", role },
              })}
          />
          <DrawerItem
            label="Billing History"
            onPress={() =>
              router.push({
                pathname: `/(${role})/billinghistory`,
                params: { userId: "Admin123", data: "Hello world Admin", role },
              })}
          />
          <DrawerItem
            label="Patient History"
            onPress={() =>
              router.push({
                pathname: `/(${role})/patienthistory`,
                params: { userId: "Admin123", data: "Hello world Admin", role },
              })}
          />
          <DrawerItem
            label="Billing"
            onPress={() =>
              router.push({
                pathname: `/(${role})/billing`,
                params: { userId: "Admin123", data: "Hello world Admin", role },
              })}
          />
        </>
      )}

    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent

const styles = StyleSheet.create({})