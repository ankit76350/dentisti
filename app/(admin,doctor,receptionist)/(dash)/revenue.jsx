import { View, StyleSheet, useColorScheme} from 'react-native';
import DashboardHeader from '../../../components/dashboard/DashboardHeader';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { hp, wp } from '../../../helpers/common';
import BottomNavBar from '../../../components/dashboard/BottomNavBar';
import RevenueList from '../../../components/dashboard/RevenueList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchHospitalRevenue } from '../../../redux/hospital/hospitalSlice';
import { catalystURL } from '../../../constants';
import { role, user } from '../../../assets/json/role';
import RevenueChart from '../../../components/dashboard/RevenueChart';


export default function revenue() {
  const navigation = useNavigation();
  const theme = useColorScheme(); 

  //Todo start: redux things
  const dispatch = useDispatch()
  const revenueUrl = role === 'admin' ? `${catalystURL}/admin/revenue` : `${catalystURL}/admin/${user.userHospitalId}/revenue`
  useEffect(() => {
    dispatch(fetchHospitalRevenue(revenueUrl))
  }, [])
  const hospitalState = useSelector((state) => state.hospitals);
  //Todo end: redux things

  
 

  return (
    <>
     <ScreenWrapper>

      <View style={[styles.mainContainer, theme === "dark" ? styles.darkBackground : styles.lightBackground]}>
        <DashboardHeader openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />

        {/* Revenue */}
        <View style={{marginHorizontal:10 , marginTop:10, marginBottom:hp(35)}}>
          {role === 'admin' ? <RevenueList revenueData={hospitalState.hospitalsRevenueState.revenueData || []}/> : <RevenueChart revenueAmount={hospitalState.hospitalsRevenueState.revenueData}/>}
        </View>
      </View>
    
      <BottomNavBar />
    </ScreenWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // ✅ Ensures full width & height for dark mode
  },
  darkBackground: {
    backgroundColor: "#0D1B2A", // ✅ Matches dark theme
  },
  lightBackground: {
    backgroundColor: "#FFFFFF",
  },
  container: {
    // flex: 1,
    paddingHorizontal: wp(5),
    // paddingVertical: 20,
    // gap: 9,
    // borderRadius: 12,
    // marginVertical: 10,
    // marginHorizontal: 10,
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.3,
    // shadowRadius: 6,
    // elevation: 6,
  },
  lightContainer: {
    // backgroundColor: '#F9F9F9',
    shadowColor: '#000',
  },
  darkContainer: {
    // backgroundColor: '#1B263B',
    shadowColor: '#000',
  },
  appointmentsHeader: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingVertical: 1
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#FFF',
  },
});














// export default Analytics