import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import DashboardHeader from '../../../components/dashboard/DashboardHeader';
import ScreenWrapper from '../../../components/ScreenWrapper';
import SearchBar from '../../../components/SearchBar';
import Item from '../../../components/Item';
import BottomNavBar from '../../../components/dashboard/BottomNavBar';
import BottomSheet from '../../../components/dashboard/BottomSheet';

import { DrawerActions } from '@react-navigation/native';
import { hp, wp } from '../../../helpers/common';
import { fetchAppointmentsData, fetchDoctersData } from '../../../redux/dashboard/dashboardSlice';
import { fetchHospitalData } from '../../../redux/hospital/hospitalSlice';
import { formatDateToIST, formatTimeToIST } from '../../../utils/formatTime';
import { catalystURL } from '../../../constants';
import { role, user } from '../../../assets/json/role';
import Loading from '../../../components/Loading';

export default function appointments() {
  const navigation = useNavigation();
  const router = useRouter();
  const bottomSheetRef = useRef(null);
  const theme = useColorScheme();
  const dispatch = useDispatch();

  const dashboardState = useSelector((state) => state.dashboard);
  const hospitalState = useSelector((state) => state.hospitals);

  const [searchQuery, setSearchQuery] = useState('');

  const appointmentsUrl = useMemo(() => {
    switch (role) {
      case 'admin':
        return `${catalystURL}/admin/appointments`;
      case 'receptionist':
        return `${catalystURL}receptionist/${user.userHospitalId}/appointment/all`;
      default:
        return `${catalystURL}doctor/${user.userId}/appointments/all`;
    }
  }, []);

  useEffect(() => {
    dispatch(fetchAppointmentsData(appointmentsUrl));
    dispatch(fetchDoctersData());
    dispatch(fetchHospitalData());
  }, [appointmentsUrl]);

  const appointmentsData = dashboardState.appointmentState.appointmentsData || [];

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return appointmentsData;
    return appointmentsData.filter((item) =>
      item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, appointmentsData]);

  const openBottomSheet = useCallback(
    (ROWID) => {
      const appointment = filteredData.find((item) => item.ROWID === ROWID);
      if (!appointment) return;

      const doctor = dashboardState.doctorsState.doctorsData?.find((d) => d.ROWID === appointment.doctor_id);
      const hospital = hospitalState.hospitalsState.hospitalsData?.find((h) => h.ROWID === appointment.hospital_id);

      const details = {
        ROWID,
        name: appointment.name,
        email: appointment.email,
        phoneNo: appointment.phone_no,
        address: appointment.address,
        dob: formatDateToIST(appointment.date_of_birth),
        gender: appointment.gender,
        hospital_id: appointment.hospital_id || '',
        hospitalName: hospital?.hospital_name || 'N/A',
        doctorName: doctor?.name || 'N/A',
        doctor_id: appointment.doctor_id || '',
        appointmentDate: `${formatDateToIST(appointment.date_time)}, ${formatTimeToIST(appointment.date_time)}`,
        status: appointment.status,
      };

      bottomSheetRef.current?.openModal();
      bottomSheetRef.current?.getDetails(details);
    },
    [filteredData, dashboardState.doctorsState.doctorsData, hospitalState.hospitalsState.hospitalsData]
  );

  const addNewAppointment = () => {
    navigation.navigate('appointmentform', {
      action: 'POST',
      newAppointmentDetails: {
        hospital_id: user.userHospitalId,
        doctor_id: user.userId,
        status: 'Pending',
      },
    });
  };

  return (
    <ScreenWrapper>
      <StatusBar
        animated
        backgroundColor={theme === 'dark' ? '#0D1B2A' : '#49a3f1'}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />

      <View style={[styles.mainContainer, theme === 'dark' ? styles.darkBackground : styles.lightBackground]}>
        <DashboardHeader openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />

        <View style={[styles.container, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
          <View style={styles.appointmentsHeader}>
            <Text style={[styles.appointmentsTitle, theme === 'dark' ? styles.darkText : styles.lightText]}>
              Appointments
            </Text>
            <TouchableOpacity onPress={addNewAppointment}>
              <Icon name="plus-square" size={24} color={theme === 'dark' ? '#FFF' : '#333'} />
            </TouchableOpacity>
          </View>

          <SearchBar query={searchQuery} setQuery={setSearchQuery} />

          {dashboardState.appointmentState.isLoading ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: hp(5) }}>
              <Loading />
            </View>) : filteredData.length > 0 ? (<Item showDetails={openBottomSheet} data={filteredData} />) : (
              <View style={[{ alignItems: "center" }]}>
                <Text style={[styles.infoText, theme === 'dark' && styles.darkText]}>No appointment found</Text>
              </View>
            )}

        </View>

        <BottomSheet ref={bottomSheetRef} />
      </View>

      <BottomNavBar />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  darkBackground: {
    backgroundColor: '#0D1B2A',
  },
  lightBackground: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingHorizontal: wp(5),
  },
  lightContainer: {
    shadowColor: '#000',
  },
  darkContainer: {
    shadowColor: '#000',
  },
  appointmentsHeader: {
    paddingVertical: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#FFF',
  },
  infoText: {
    fontSize: 13,
    marginLeft: 6,
    color: "#444",
  },
  darkText: {
    color: "#f6f6f6",
  },
});
