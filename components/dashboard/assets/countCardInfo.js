import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAppointmentsData, fetchDoctersData } from '../../../redux/dashboard/dashboardSlice';
import { fetchHospitalData } from '../../../redux/hospital/hospitalSlice';
import { fetchPatientsData } from '../../../redux/patients/patientsSlice';
import { useColorScheme } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import { wp } from '../../../helpers/common';
import { role, user } from '../../../assets/json/role';
import { catalystURL } from '../../../constants';

const CountCardInfo = () => {
    const dispatch = useDispatch();
    const dashboardState = useSelector((state) => state.dashboard);
    const hospitalState = useSelector((state) => state.hospitals);
    const patientsState = useSelector((state) => state.patients);

    const [totalAppointment, setTotalAppointment] = useState(0);
    const [totalClinics, setTotalClinics] = useState(0);
    const [totalDoctors, setTotalDoctors] = useState(0);
    const [totalPatients, setTotalPatients] = useState(0);

    const theme = useColorScheme();
    const isDarkMode = theme === "dark";

    const appointmentsUrl = role === 'admin' ? `${catalystURL}/admin/appointments` : `${catalystURL}/receptionist/${user.userHospitalId}/appointment/all`;
    const patientstsUrl = `${catalystURL}/receptionist/${user.userHospitalId}/patient/all`;

    useEffect(() => {
        dispatch(fetchAppointmentsData(appointmentsUrl));

        if (role !== 'admin') {
            dispatch(fetchPatientsData(patientstsUrl));
        }
        if (role === 'admin') {
            dispatch(fetchHospitalData());
            dispatch(fetchDoctersData());
        }

    }, [dispatch]);

    useEffect(() => {

        //!(Hospitals) ==> Admin  
        setTotalClinics(hospitalState.hospitalsState.hospitalsData.length || 0);

        //! (Appointment , doctors) ==> Admin / Doctors / Receptionist
        setTotalAppointment(dashboardState.appointmentState.appointmentsData.length || 0);
        setTotalDoctors(dashboardState.doctorsState.doctorsData.length || 0);

        //!  (Patients) ==> Doctors / Receptionist 
        setTotalPatients(patientsState.patientsState.patientsData.length || 0);

    }, [dashboardState, hospitalState, patientsState]);


    //Todo : Admin
    const adminCountCardData = [
        {
            icon: <FontAwesome5 name="calendar-day" size={wp(7)} color={isDarkMode ? `rgba(255, 255, 255, 0.9)` : `rgba(0, 0, 0, 1)`} />,
            title: 'Total Appointments',
            totalCount: totalAppointment,
            progress: 0.7,
            progressColor: "#49a3f1",
        },
        {
            icon: <MaterialCommunityIcons name="office-building-outline" size={wp(7)} color={isDarkMode ? `rgba(255, 255, 255, 0.9)` : `rgba(0, 0, 0, 1)`} />,
            title: 'Total Clinics',
            totalCount: totalClinics,
            progress: 0.5,
            progressColor: "#28a745",
        },
        {
            icon: <Fontisto name="doctor" size={wp(7)} color={isDarkMode ? `rgba(255, 255, 255, 0.9)` : `rgba(0, 0, 0, 1)`} />,
            title: 'Total Doctors',
            totalCount: totalDoctors,
            progress: 0.6,
            progressColor: "#f39c12",
        },
    ];

    //Todo : Doctors
    const doctorsCountCardData = [
        {
            icon: <FontAwesome5 name="calendar-day" size={wp(7)} color={isDarkMode ? `rgba(255, 255, 255, 0.9)` : `rgba(0, 0, 0, 1)`} />,
            title: 'Total Appointments',
            totalCount: totalAppointment,
            progress: 0.7,
            progressColor: "#49a3f1",
        },
        {
            icon: <Fontisto name="bed-patient" size={wp(7)} color={isDarkMode ? `rgba(255, 255, 255, 0.9)` : `rgba(0, 0, 0, 1)`} />,
            title: 'Total Patients',
            totalCount: totalPatients,
            progress: 0.5,
            progressColor: "#28a745",
        },
        {
            icon: <Fontisto name="doctor" size={wp(7)} color={isDarkMode ? `rgba(255, 255, 255, 0.9)` : `rgba(0, 0, 0, 1)`} />,
            title: 'Total Doctors',
            totalCount: 2,
            progress: 0.6,
            progressColor: "#f39c12",
        },
    ];


    //Todo : Receptionist
    const receptionistCountCardData = [
        {
            icon: <FontAwesome5 name="calendar-day" size={wp(7)} color={isDarkMode ? `rgba(255, 255, 255, 0.9)` : `rgba(0, 0, 0, 1)`} />,
            title: 'Total Appointments',
            totalCount: totalAppointment,
            progress: 0.7,
            progressColor: "#49a3f1",
        },
        {
            icon: <Fontisto name="bed-patient" size={wp(7)} color={isDarkMode ? `rgba(255, 255, 255, 0.9)` : `rgba(0, 0, 0, 1)`} />,
            title: 'Total Patients',
            totalCount: totalPatients,
            progress: 0.5,
            progressColor: "#28a745",
        },
        {
            icon: <Fontisto name="doctor" size={wp(7)} color={isDarkMode ? `rgba(255, 255, 255, 0.9)` : `rgba(0, 0, 0, 1)`} />,
            title: 'Total Doctors',
            totalCount: 2,
            progress: 0.6,
            progressColor: "#f39c12",
        },
    ];

    switch (role) {
        case 'admin':
            return adminCountCardData;
        case 'doctor':
            return doctorsCountCardData;
        case 'receptionist':
            return receptionistCountCardData;
        default:
            return [];
    }
};

export default CountCardInfo;
