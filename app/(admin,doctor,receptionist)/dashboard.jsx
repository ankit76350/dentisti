// app/(admin)/dashboard.jsx

import { Link, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import DashboardHeader from '../../components/DashboardHeader';
import ScreenWrapper from '../../components/ScreenWrapper';
import Table from '../../components/Table';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router'
import { useEffect, useState } from 'react';
import role from '../../assets/json/role'
import { useFetch } from '../../hooks/useFetch';
import { catalystURL } from '../../constants';

export default function Dashboard() {
  const navigation = useNavigation()

  const { data: appointmentsData, loading, error } = useFetch(`${catalystURL}admin/appointments`);
  const { data: doctorsData } = useFetch(`${catalystURL}admin/doctors`);
  
  const tableHeader = ["Name", "Phone No", "Appointment Date", "Doctor Name", "Status"];
  const tableContentKey = ["name", "phone_no", "date_time", { populdateId: "doctor_id" }, "status"];

  function populate(rowId) {
    const result = doctorsData?.find(item => item.ROWID === rowId);
    return result ? result.name : "Not Found";
  }

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <DashboardHeader openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />
          <View style={{ marginTop: 0, paddingHorizontal: 10 }}>
            <Text>Dashboard - Shared among Admin, Doctor, and Receptionist</Text>
          </View>
          <Table tableData={appointmentsData || []} loading={loading} tableHeader={tableHeader} tableContentKey={tableContentKey} errorMessage={error} populate={populate} />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
