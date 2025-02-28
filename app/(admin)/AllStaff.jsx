// app/(admin)/AllStaff.jsx
import { DrawerActions, useNavigationBuilder } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { catalystURL } from '../../constants/index';
import Table from '../../components/Table';
import { useFetch } from '../../hooks/useFetch';
import ScreenWrapper from '../../components/ScreenWrapper';

export default function AllStaff() {

  const navigation = useNavigation()

  const { data : allStaffData, loading, error } = useFetch(`${catalystURL}admin/users`);
  const { data : hospitalsData} = useFetch(`${catalystURL}admin/hospitals`);
  const tableHeader = ["Name", "Email", "Username", "Phone", "Hospital", "Role"]
  const tableContentKey = ["name", "email", "username", "phone", {populdateId :"hospital_id"}, "role"]

  function populate(rowId) {
    const result = hospitalsData?.find(item => item.ROWID === rowId);
    return result ? result.hospital_name : "Not Found";
  }
  return (
    <>

      <Button title="Open Drawer" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />

      <ScrollView>
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <Table tableData={allStaffData || []} loading={loading} tableHeader={tableHeader} tableContentKey={tableContentKey} errorMessage={error} populate={populate} />
        </View>
      </ScrollView>
    </>
  );
}
