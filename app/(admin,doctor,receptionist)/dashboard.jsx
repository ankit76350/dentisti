import { Link, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import DashboardHeader from '../../components/DashboardHeader';
import ScreenWrapper from '../../components/ScreenWrapper';
import Table from '../../components/Table';
import { DrawerActions } from '@react-navigation/native';
import {useNavigation} from 'expo-router'
import { useEffect, useState } from 'react';
import role from '../../assets/json/role' 

export default function Dashboard({data}) {
  const navigation =useNavigation()
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
    <ScreenWrapper> 
      <ScrollView>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <DashboardHeader openDrawer={()=>{navigation.dispatch(DrawerActions.openDrawer())}}/>
        <View style={{ marginTop: 0, paddingHorizontal: 10 }}> 
        <Text>Dashboard - Shared among Admin, Doctor, and Receptionist</Text>
        <Text>{datas}</Text>
        </View>
        <Table/> 
        <Table/> 
      </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
