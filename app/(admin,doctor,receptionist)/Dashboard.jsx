import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DashboardHeader from '../../components/DashboardHeader';
import ScreenWrapper from '../../components/ScreenWrapper';
import Table from '../../components/Table';
import CustomDropDown from '../../components/CustomDropDown';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { catalystURL } from '../../constants';
import { theme } from '../../constants/theme';
import SearchButton from '../../components/SearchButton';
import { BlurView } from 'expo-blur';
import DetailsBottomSheet from '../../components/DetailsBottomSheet';
import Pagination from '../../components/Pagination';

const options = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
];

export default function Dashboard() {
  const navigation = useNavigation();
  const { data: appointmentsData, loading, error } = useFetch(`${catalystURL}admin/appointments`);
  const { data: doctorsData } = useFetch(`${catalystURL}admin/doctors`);

  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const bottomSheetRef = useRef(null);

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

  const totalPages = Math.ceil((filteredData?.length || 1) / parseInt(rowsPerPage, 10));
  const displayedData = filteredData?.slice((currentPage - 1) * parseInt(rowsPerPage, 10), currentPage * parseInt(rowsPerPage, 10));


  const tableHeader = ["Name", "Phone No", "Appointment Date", "Doctor Name", "Status"];
  const tableContentKey = ["name", "phone_no", "date_time", { populdateId: "doctor_id" }, "status"];

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
      {isSheetOpen && (
        <View>
          <BlurView intensity={20} style={styles.blurBackground} tint="dark" />
        </View>
      )}

      <ScrollView style={isSheetOpen ? styles.blurred : null}>
        <DashboardHeader openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />
        <View style={styles.container}>

          <View style={styles.appointmentsHeader}>
            <Text style={styles.appointmentsTitle}>Appointments</Text>
          </View>

 
            <SearchButton query={searchQuery} setQuery={setSearchQuery} />
      
          <View style={styles.tableContainer}>
            <Table
              tableData={displayedData || []}
              loading={loading}
              tableHeader={tableHeader}
              tableContentKey={tableContentKey}
              errorMessage={error}
              populate={populate}
              onRowPress={openDetails}
              style={styles.table}
            />
          </View>

          <View style={styles.selectContainer}>
            <CustomDropDown options={options} value={rowsPerPage} setValue={setRowsPerPage} />
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </View>


        </View>

      </ScrollView>

      <DetailsBottomSheet bottomSheetRef={bottomSheetRef} setIsSheetOpen={setIsSheetOpen} selectedRow={selectedRow} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  appointmentsHeader: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentsTitle: {
    fontSize: 20,
    fontWeight: theme.fonts.semibold,
    color: theme.myColors.titleForTable,
  },
  tableContainer: {
    // backgroundColor: "#fff",
    // borderRadius: 8,
    // padding: 0,
    // marginTop: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // elevation: 3,
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
  paginationButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: theme.myColors.primary,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  paginationText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paginationInfo: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectContainer: {
    flexDirection: 'column',
    justifyContent: 'center',  // Ensures spacing
    alignItems: 'center',  // Aligns items vertically
    paddingHorizontal: 10,
    marginTop: 10,
  },
  
});


