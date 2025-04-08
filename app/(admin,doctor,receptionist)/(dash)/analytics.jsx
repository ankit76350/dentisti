import { View,  StyleSheet, useColorScheme, StatusBar } from 'react-native';
import DashboardHeader from '../../../components/dashboard/DashboardHeader';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { wp } from '../../../helpers/common';
import BottomNavBar from '../../../components/dashboard/BottomNavBar';
import AnalyticsDashboard from '../../../components/dashboard/AnalyticsDashboard';


export default function analytics() {
  const navigation = useNavigation();
  const theme = useColorScheme(); 

  return (
    <ScreenWrapper>
      <StatusBar
        animated={true}
        backgroundColor={theme === "dark" ? "#0D1B2A" : "#49a3f1"}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />

      <View style={[styles.mainContainer, theme === "dark" ? styles.darkBackground : styles.lightBackground]}>
        <DashboardHeader openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />
        <AnalyticsDashboard />
      </View>
      <BottomNavBar />
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

