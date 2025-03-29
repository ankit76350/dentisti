import { Entypo, Feather, FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, useColorScheme, Alert } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import { useNavigation, useRouter } from "expo-router";
import Modal from "../../components/Modal";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar";
import { hp } from "../../helpers/common";
import { catalystURL } from "../../constants";
import usePost from "../../hooks/usePost";
import { validateHospitalForm } from "../../helpers/validator";
import usePut from "../../hooks/usePut";
import useDelete from "../../hooks/useDelete";
import Loading from "../../components/Loading.jsx";
import { fetchHospitalData } from "../../redux/hospital/hospitalSlice.js";

const clinics = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const router = useRouter();

  //! Redux State Management
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHospitalData());
  }, [dispatch]);

  const hospitalsState = useSelector((state) => state.hospitals.hospitalsState);

  // Search and Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(
      !searchQuery.trim()
        ? hospitalsState.hospitalsData
        : hospitalsState.hospitalsData?.filter((item) =>
          item?.hospital_name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [hospitalsState.hospitalsData, searchQuery]);


  //! Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [form, setForm] = useState({
    hospital_name: "",
    location: "",
    isUpdating: false,
  });
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);

  const openModal = (isOpen, item = null, title, isUpdating = false) => {
    setTitle(title);
    setModalVisible(isOpen);
    setSelectedHospitalId(item ? item.ROWID : null);
    setForm({
      hospital_name: item?.hospital_name || "",
      location: item?.location || "",
      isUpdating: isUpdating,
    });
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  //! API Calls
  const { loading, error, postData } = usePost();
  const { isUpdating, updateData } = usePut();

  const removeIsUpdatingField = (obj) => {
    const { isUpdating, ...rest } = obj;
    return rest;
  };

  const submit = async () => {
    if (validateHospitalForm(form)) {
      const url = form.isUpdating
        ? `${catalystURL}admin/hospital/${selectedHospitalId}`
        : `${catalystURL}admin/hospital`;

      const updatedData = removeIsUpdatingField(form);

      try {
        const response = form.isUpdating ? await updateData(url, updatedData) : await postData(url, updatedData);

        if (response && response.success) {
          setForm({ hospital_name: "", location: "", isUpdating: false });
          dispatch(fetchHospitalData());
          setModalVisible(false);
          Alert.alert("Success", form.isUpdating ? "Hospital info updated successfully." : "New hospital added successfully.");
        } else {
          Alert.alert("Error", "Something went wrong.");
        }
      } catch (err) {
        Alert.alert("Error", err.message || "Failed to submit data.");
      }
    }
  };

  const closeModal = () => {
    setForm({ hospital_name: "", location: "", isUpdating: false });
    setModalVisible(false);
  };


  //Todo: Start Delete Data
  const { deleteData } = useDelete();
  const [deletingId, setDeletingId] = useState(null); // Track which item is being deleted

  const confirmDelete = (item) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete "${item.hospital_name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => removeData(item), // Call removeData only if user confirms
          style: "destructive",
        },
      ]
    );
  };

  const removeData = async (item) => {
    setDeletingId(item.ROWID);
    const url = `${catalystURL}admin/hospital/${item.ROWID}`;
    try {
      const response = await deleteData(url);
      if (response && response.success) {
        dispatch(fetchHospitalData());
        Alert.alert("Success", "Hospital data deleted successfully!");
      } else {
        Alert.alert("Error", "Something went wrong.");
      }
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to submit data.");
    } finally {
      setDeletingId(null); // Reset loading state after deletion
    }


  };
  //Todo: Start Delete Data


  const navigateTo = (id) => {
    router.push("/(clinics)/doctors");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, isDark && styles.darkCard]} onPress={() => navigateTo(item.id)}>
      <View style={styles.avatar}>
        <FontAwesome5 name="hospital" size={20} color={isDark ? "#f6f6f6" : "black"} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.name, isDark && styles.darkText]}>{item.hospital_name}</Text>
        <Text style={[styles.action, isDark && styles.darkTextSecondary]}>{item.location}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => openModal(false, item, "Update Hospital Info", true)}>
          <Feather name="edit" size={19} color="#2ECC71" />
        </TouchableOpacity >
        <TouchableOpacity style={styles.iconButton}  onPress={() => confirmDelete(item)}>
          {deletingId === item.ROWID ? <Loading size="small" /> : <MaterialIcons name="delete-outline" size={22} color="#E74C3C" />}
        </TouchableOpacity>
      
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer
      title="Clinics"
      lightBgColor={isDark ? "#0D1B2A" : "#F8F8F8"}
      addIconComponent={<MaterialIcons name="local-hospital" size={24} color={isDark ? "white" : "black"} />}
      navigateTo={() => openModal(true, null, "Add New Hospital")}
    >
      <View style={styles.container}>
        <Modal isVisible={isModalVisible} onClose={closeModal} title={title}>
          <CustomInput value={form.hospital_name} onChangeText={(text) => handleChange("hospital_name", text)} placeholder="Hospital Name *" icon={<FontAwesome name="hospital-o" size={24} color={isDark ? styles.darkColor.color : styles.lightColor.color} />} />
          <CustomInput value={form.location} onChangeText={(text) => handleChange("location", text)} placeholder="Location *" icon={<Entypo name="location-pin" size={24} color={isDark ? styles.darkColor.color : styles.lightColor.color} />} />
          {loading ?(<Loading/>):(<CustomButton title={loading ? "Submiting..." : "Submit"} onPress={submit} />)}
        </Modal>
      </View>

      <View style={{ marginVertical: hp(0.5) }}>
        <SearchBar query={searchQuery} setQuery={setSearchQuery} />
      </View>

      <FlatList data={filteredData} renderItem={renderItem} keyExtractor={(item) => item.ROWID || item.id.toString()} showsVerticalScrollIndicator={false} />
    </ScreenContainer>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#F39C12",
    flexDirection: "row",
    alignItems: "center",
  },
  darkCard: {
    backgroundColor: "#2C3E50",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: "#F39C12",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  darkText: {
    color: "#f6f6f6",
  },
  action: {
    fontSize: 14,
    color: "#555",
  },
  darkTextSecondary: {
    color: "#BBB",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 8,
  },
  //   container: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "#f5f5f5",
  // },
  openButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  // image: {
  //     width: 80,
  //     height: 80,
  //     borderRadius: 40,
  //     marginBottom: 10,
  // },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
  },

  lightColor: {
    color: "black",
  },
  darkColor: {
    color: "white",

  },
});

export default clinics;
