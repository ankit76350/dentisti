import { Link, useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import DashboardHeader from '../../components/DashboardHeader';
import ScreenWrapper from '../../components/ScreenWrapper';
import { DrawerActions } from '@react-navigation/native';
import {useNavigation} from 'expo-router'

export default function Dashboard() {
  const navigation =useNavigation()
  return (
    <ScreenWrapper> 
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <DashboardHeader openDrawer={()=>{navigation.dispatch(DrawerActions.openDrawer())}}/>
        <View style={{ marginTop: 0, paddingHorizontal: 10 }}> 
        <Text>Dashboard - Shared among Admin, Doctor, and Receptionist</Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}
