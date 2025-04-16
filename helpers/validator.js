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
  const requiredFields = ["name", "address", "gender", "hospitalName", "doctorName"];
  for (const field of requiredFields) {
    if (!form[field]) {
      Alert.alert("Error", `Please fill the ${field}.`);
      return false;
    }
  }

  const {
    email,
    phone,
    dob,
    date,
    time,
  } = form;

  const validations = [
    {
      valid: !!dob,
      message: "Please fill valid date of birth.",
    },
    {
      valid: /^\d{4}-\d{2}-\d{2}$/.test(dob),
      message: "Invalid date of birth format. Use YYYY-MM-DD.",
    },
    {
      valid: !!date && !!time,
      message: "Please fill valid appointment date and time.",
    },
    {
      valid: /^\d{4}-\d{2}-\d{2}$/.test(date),
      message: "Invalid appointment date format. Use YYYY-MM-DD.",
    },
    {
      valid: /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(time),
      message: "Invalid time format. Use HH:MM:SS in 24-hour format.",
    },
    {
      valid: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
      message: "Invalid email format.",
    },
    {
      valid: /^[0-9]{10,15}$/.test(phone),
      message: "Invalid phone number. Must be 10-15 digits.",
    },
  ];

  for (const { valid, message } of validations) {
    if (!valid) {
      Alert.alert("Error", message);
      return false;
    }
  }

  return true;
};


const validatePatientForm = (form) => {
  const requiredFields = ["patient_name", "address", "gender", "hospitalName", "doctorName"];
  for (const field of requiredFields) {
    if (!form[field]) {
      Alert.alert("Error", `Please fill the ${field}.`);
      return false;
    }
  }

  const {
    phone,
    dob,
    date,
    time,
  } = form;

  const validations = [
    {
      valid: !!dob,
      message: "Please fill valid date of birth.",
    },
    {
      valid: /^\d{4}-\d{2}-\d{2}$/.test(dob),
      message: "Invalid date of birth format. Use YYYY-MM-DD.",
    },
    {
      valid: !!date && !!time,
      message: "Please fill valid date and time of admission.",
    },
    {
      valid: /^\d{4}-\d{2}-\d{2}$/.test(date),
      message: "Invalid admission date format. Use YYYY-MM-DD.",
    },
    {
      valid: /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(time),
      message: "Invalid time format. Use HH:MM or HH:MM:SS in 24-hour format.",
    },
    {
      valid: /^[0-9]{10,15}$/.test(phone),
      message: "Invalid phone number. Must be 10-15 digits.",
    },
  ];

  for (const { valid, message } of validations) {
    if (!valid) {
      Alert.alert("Error", message);
      return false;
    }
  }

  return true;
};



const validateBillingForm = (form) => {
  const requiredFields = [
    "Amount",
    "Billing_Date",
    "PaymentMethod",
    "ServiceDetails",
    "Status",
    "date_of_admission",
    "doctor_id",
    "doctor_name",
    "hospital_name",
    "patient_id",
    "patient_name",
    "phone",
    "receptionist_id",
  ];

  for (const field of requiredFields) {
    if (!form[field]) {
      Alert.alert("Error", `Please fill the ${field.replace(/_/g, " ")}.`);
      return false;
    }
  }

  const {
    Amount,
    Billing_Date,
    date_of_admission,
    phone,
  } = form;

  const validations = [
    {
      valid: /^[0-9]+$/.test(Amount),
      message: "Invalid amount. It must be a number.",
    },
    {
      valid: /^\d{4}-\d{2}-\d{2}$/.test(Billing_Date),
      message: "Invalid billing date format. Use YYYY-MM-DD.",
    },
    {
      valid: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(date_of_admission),
      message: "Invalid admission date format. Use YYYY-MM-DD HH:MM:SS.",
    },
    {
      valid: /^[0-9]{10,15}$/.test(phone),
      message: "Invalid phone number. Must be 10-15 digits.",
    },
  ];

  for (const { valid, message } of validations) {
    if (!valid) {
      Alert.alert("Error", message);
      return false;
    }
  }

  return true;
};







export { validateStaffForm, validateHospitalForm, validateAppointmentForm ,validatePatientForm, validateBillingForm};

