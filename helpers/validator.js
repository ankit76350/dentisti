import { Alert } from "react-native";


const validateStaffForm = (form) => {
  const { name, email, password, username, phone, hospitalName, role } = form;

  if (!name || !email || !password || !username || !phone || !hospitalName || !role) {
    Alert.alert("Error", "All fields are required.");
    return false;
  }

  // Email Validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    Alert.alert("Error", "Invalid email format.");
    return false;
  }

  // Phone Number Validation (Only digits, 10-15 characters)
  const phoneRegex = /^[0-9]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    Alert.alert("Error", "Invalid phone number. Must be 10-15 digits.");
    return false;
  }

  return true;
};


const validateHospitalForm = (form) => {
  const { hospital_name, location } = form;

  if (!hospital_name || !location) {
    Alert.alert("Error", "All fields are required.");
    return false;
  }

  return true;
};



const validateAppointmentForm = (form) => {
  const {
    name,
    email,
    phone,
    address,
    dob,
    gender,
    hospitalName,
    doctorName,
    date,
    time,
  } = form;

  // Check required fields
  if (
    !name ||
    !address ||
    !gender ||
    !hospitalName ||
    !doctorName
  ) {
    Alert.alert("Error", "All fields are required.");
    return false;
  }

  if (!dob) {
    Alert.alert("Error", "Please fill valid date of birth.");
    return false;
  }

  if (!date || !time) {
    Alert.alert("Error", "Please valid fill Appoinments date.");
    return false;
  }

  // Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    Alert.alert("Error", "Invalid email format.");
    return false;
  }

  // Phone number validation
  const phoneRegex = /^[0-9]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    Alert.alert("Error", "Invalid phone number. Must be 10-15 digits.");
    return false;
  }



  // Date validation (YYYY-MM-DD)
  const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dobRegex.test(dob)) {
    Alert.alert("Error", "Invalid date of birth format. Use YYYY-MM-DD.");
    return false;
  }


  // Date validation (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    Alert.alert("Error", "Invalid date format. Use YYYY-MM-DD.");
    return false;
  }

  // Time validation (HH:MM:SS in 24-hour format)
  const timeRegex = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
  if (!timeRegex.test(time)) {
    Alert.alert("Error", "Invalid time format. Use HH:MM:SS in 24-hour format.");
    return false;
  }

  return true;
};







export { validateStaffForm, validateHospitalForm, validateAppointmentForm };

