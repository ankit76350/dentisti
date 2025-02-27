import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'

import Dashboard from '../app/(admin,doctor,receptionist)/dashboard'
const index = () => {
  const [datas, setDatas] = useState()

  const fetchData = async () => {
    const response = await fetch("https://dental-management-771555683.development.catalystserverless.com/server/dental_management_function/admin/patients")
    const data = await response.json();
    console.log("Parsed data:", data[0].address);
    setDatas(data[0].address)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (

    <>
      <Dashboard data={datas} />
    </>
  )
}

export default index

const styles = StyleSheet.create({})
