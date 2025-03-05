import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet, useColorScheme } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { hp, wp } from "../helpers/common";

const SearchButton = ({ query, setQuery }) => {
  const [loading, setLoading] = useState(false);
  const theme = useColorScheme(); // Detects system theme (light/dark)

  const onSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={[styles.container, theme === "dark" ? styles.darkContainer : styles.lightContainer]}>
      <TextInput
        style={[styles.input, theme === "dark" ? styles.darkText : styles.lightText]}
        placeholder="Search..."
        placeholderTextColor={theme === "dark" ? "#bbb" : "#666"}
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity
        style={[styles.button, theme === "dark" ? styles.darkButton : styles.lightButton]}
        onPress={onSearch}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme === "dark" ? "#4DA8DA" : "#007bff"} />
        ) : (
          <AntDesign name="search1" size={24} color={theme === "dark" ? "#4DA8DA" : "#007bff"} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: wp(3),
    marginHorizontal: wp(3),
    width: wp(90), 
    marginBottom: hp(2)
  },
  lightContainer: {
    backgroundColor: "white",
    borderColor: "#ccc",
  },
  darkContainer: {
    backgroundColor: "#1B263B",
    borderColor: "#4DA8DA",
  },
  input: {
    flex: 1,
    height: hp(5),
    paddingHorizontal: wp(4),
  },
  lightText: {
    color: "black",
  },
  darkText: {
    color: "white",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: wp(3),
    marginLeft: 5,
  },
  lightButton: {
    backgroundColor: "white",
  },
  darkButton: {
    backgroundColor: "#1B263B",
  },
});

export default SearchButton;
