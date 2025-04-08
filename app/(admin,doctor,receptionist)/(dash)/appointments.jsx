import { View, Text, StyleSheet, useColorScheme, StatusBar, TouchableOpacity, Alert, ScrollView, } from 'react-native';
import DashboardHeader from '../../../components/dashboard/DashboardHeader';
import ScreenWrapper from '../../../components/ScreenWrapper';
import SearchBar from '../../../components/SearchBar';
import { useNavigation, useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import Item from '../../../components/Item';
import { DrawerActions } from '@react-navigation/native';
import { hp, wp } from '../../../helpers/common';
import BottomNavBar from '../../../components/dashboard/BottomNavBar';
import BottomSheet from '../../../components/dashboard/BottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointmentsData, fetchDoctersData } from '../../../redux/dashboard/dashboardSlice'
import { formatDateToIST, formatTimeToIST } from '../../../utils/formatTime'
import { fetchHospitalData } from '../../../redux/hospital/hospitalSlice';
import { catalystURL } from '../../../constants';
import { role, user } from '../../../assets/json/role';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function appointments() {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);

  const theme = useColorScheme(); // Detects system theme (light/dark)  

  // Todo start: redux things
  const dispatch = useDispatch()
  const appointmentsUrl = role === 'admin'
    ? `${catalystURL}/admin/appointments`
    : role === 'receptionist'
      ? `${catalystURL}receptionist/${user.userId}/appointment/all`
      : `${catalystURL}doctor/${user.userId}/appointments/all`;



  useEffect(() => {
    dispatch(fetchAppointmentsData(appointmentsUrl))
    dispatch(fetchDoctersData())
    dispatch(fetchHospitalData())
  }, [])
  const stateDashboard = useSelector((state) => state.dashboard);
  const hospitalState = useSelector((state) => state.hospitals);
  //Todo end: redux things


  //Todo Start: filter data 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(stateDashboard.appointmentState.appointmentsData);
    } else {
      setFilteredData(
        stateDashboard.appointmentState.appointmentsData?.filter(
          (item) =>
            item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [stateDashboard.appointmentState.appointmentsData, searchQuery]);
  //Todo end: filter data 


  //Todo start: show details 
  var selectedDetails = {}
  const openBottomSheet = async (ROWID) => {

    const selectedAppointment = filteredData.find((currItem) => { return currItem.ROWID === ROWID })
    const selectedDoctor = stateDashboard?.doctorsState?.doctorsData?.find(item => item.ROWID === selectedAppointment.doctor_id);
    const selectedHospital = hospitalState?.hospitalsState?.hospitalsData?.find(item => item.ROWID === selectedAppointment.hospital_id);

    selectedDetails = {
      name: selectedAppointment.name,
      email: selectedAppointment.email,
      phoneNo: selectedAppointment.phone_no,
      address: selectedAppointment.address,
      gender: selectedAppointment.gender,
      dob: formatDateToIST(selectedAppointment.date_of_birth),
      appointmentDate: `${formatDateToIST(selectedAppointment.date_time)}, ${formatTimeToIST(selectedAppointment.date_time)} `,
      doctorName: selectedDoctor?.name || "N/A",
      hospitalName: selectedHospital?.hospital_name || "N/A",
      status: selectedAppointment.status,
    };

    bottomSheetRef.current?.openModal();
    bottomSheetRef.current?.getDetails(selectedDetails);
  };
  //Todo end: show details 


  //Todo: Next Page
  const router = useRouter();
  const navigateTo = () => {
    router.replace(`/(${role})/(dash)/appointmentform`);

  }
  //Todo: Next Page








  return (
    <ScreenWrapper>



      <StatusBar
        animated={true}
        backgroundColor={theme === "dark" ? "#0D1B2A" : "#49a3f1"}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />

      <View style={[styles.mainContainer, theme === "dark" ? styles.darkBackground : styles.lightBackground]}>
        <DashboardHeader openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />


        <View style={[styles.container, theme === "dark" ? styles.darkContainer : styles.lightContainer]}>

          <View style={styles.appointmentsHeader}>
          </View>






          <View style={{ paddingVertical: 5, }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
              <Text style={[styles.appointmentsTitle, theme === "dark" ? styles.darkText : styles.lightText]}>
                Appointments
              </Text>
              <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }} onPress={navigateTo}>
                <Icon name="plus-square" size={24} color={theme === "dark" ? '#FFF' : '#333'} />
              </TouchableOpacity>
            </View>


            {/* //! search button */}
            <View style={{ marginBottom: hp(1), }}>
              <SearchBar query={searchQuery} setQuery={setSearchQuery} />
            </View>

            {/* //! apponment data */}
            <Item showDetails={openBottomSheet} data={filteredData} />

          </View>
        </View>


        <BottomSheet ref={bottomSheetRef} />

      </View>


      {/* Bottom Navbar */}
      <BottomNavBar />

    </ScreenWrapper>
  );


}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // ✅ Ensures full width & height for dark mode
    // marginBottom:hp(63)
    // paddingBottom:hp(63)
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
    // marginBottom:hp(61)
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
    paddingVertical: 1,
    // alignSelf: 'flex-start',
    marginBottom: 5,
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#FFF',
  },
});





