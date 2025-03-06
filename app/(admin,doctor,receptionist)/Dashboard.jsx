import { View, Text, FlatList, StyleSheet, useColorScheme, StatusBar } from 'react-native';
import DashboardHeader from '../../components/DashboardHeader';
import ScreenWrapper from '../../components/ScreenWrapper';
import SearchButton from '../../components/SearchButton';
import { useNavigation } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { catalystURL } from '../../constants';
import { BlurView } from 'expo-blur';
import DetailsBottomSheet from '../../components/DetailsBottomSheet';
import Item from '../../components/Item';
import { DrawerActions } from '@react-navigation/native';
import { wp } from '../../helpers/common';
import BottomNavBar from '../../components/BottomNavBar';
import AnalyticsDashboard from '../../components/AnalyticsDashboard';

export default function Dashboard() {
  const navigation = useNavigation();
  const { data: appointmentsData } = useFetch(`${catalystURL}admin/appointments`);
  const { data: doctorsData } = useFetch(`${catalystURL}admin/doctors`);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const bottomSheetRef = useRef(null);

  const theme = useColorScheme(); // Detects system theme (light/dark)

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(appointmentsData);
    } else {
      setFilteredData(
        appointmentsData?.filter(
          (item) =>
            item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item?.phone_no?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [appointmentsData, searchQuery]);

  function populate(rowId) {
    const result = doctorsData?.find(item => item.ROWID === rowId);
    return result ? result.name : "Not Found";
  }

  const openDetails = (rowData) => {
    setSelectedRow(rowData);
    setIsSheetOpen(true);
    bottomSheetRef.current?.expand();
  };

  return (
    <ScreenWrapper>
      {/* ✅ Fixed Status Bar */}
      <StatusBar
        animated={true}
        backgroundColor={theme === "dark" ? "#0D1B2A" : "#49a3f1"}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />

      <View style={[styles.mainContainer, theme === "dark" ? styles.darkBackground : styles.lightBackground]}>
        <DashboardHeader openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />

        {/* Analytics */}
        {/* <View style={{marginTop:20}}> */}

        <AnalyticsDashboard />
        {/* </View> */}



        {/* Appointments */}
        {/* 
        <View style={[styles.container, theme === "dark" ? styles.darkContainer : styles.lightContainer]}>

          <View style={styles.appointmentsHeader}>
            <Text style={[styles.appointmentsTitle, theme === "dark" ? styles.darkText : styles.lightText]}>
              Appointments
            </Text>
          </View>

         <View style={{ alignItems: 'center', justifyContent: 'center' , padding:5}}>
            <SearchButton query={searchQuery} setQuery={setSearchQuery} />
            <Item />
          </View>
        </View> 
        */}






      </View>
      {/* <View style={{marginTop:20}}> */}

      <BottomNavBar />
      {/* </View> */}

    </ScreenWrapper>
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
