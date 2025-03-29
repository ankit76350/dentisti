const { Alert } = require("react-native");

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
  
  // Correct export
module.exports = { validateStaffForm , validateHospitalForm};
  