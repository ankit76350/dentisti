import React, { useEffect } from "react";
import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CountCard from "./CountCard";
import MonthlyCount from "./MonthlyCount";
import { fetchAppointmentsData } from "../../redux/dashboard/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import useCountCardInfo from './assets/countCardInfo';
import { catalystURL } from "../../constants";
import { role, user } from "../../assets/json/role";
const AnalyticsDashboard = ({ }) => {
  // console.log("countCardInfo", useCountCardInfo());
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";

  //Todo start: redux things
  const dispatch = useDispatch()
  const appointmentsUrl = role === 'admin' ? `${catalystURL}/admin/appointments` : `${catalystURL}/receptionist/${user.userHospitalId}/appointment/all`;
  useEffect(() => {
    dispatch(fetchAppointmentsData(appointmentsUrl))
  }, [])
  const dashboardState = useSelector((state) => state.dashboard);
  //Todo end: redux things

  const countCardData = useCountCardInfo();  

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingBottom: hp(10) }]}
      style={isDarkMode ? styles.darkBackground : styles.lightBackground}
      showsVerticalScrollIndicator={false} // Hides vertical scrollbar
      showsHorizontalScrollIndicator={false} // Hides horizontal scrollbar (if needed)
    >


      {countCardData.map((currItem, index) => (
        <CountCard
          key={index}  
          icon={currItem.icon}
          title={currItem.title}
          totalCount={currItem.totalCount}
          progress={currItem.progress}
          progressColor={currItem.progressColor}
        />
      ))}


      {/* Monthly Appointments Bar Chart */}
      <MonthlyCount dashboardState={dashboardState} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: wp(5) },
  darkBackground: { backgroundColor: "#0D1B2A" },

});

export default AnalyticsDashboard;
