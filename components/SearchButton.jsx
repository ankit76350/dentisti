import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { hp, wp } from "../helpers/common";

const SearchButton = ({ query, setQuery }) => {
  const [loading, setLoading] = useState(false);

  const onSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery} 
      />
      <TouchableOpacity style={styles.button} onPress={onSearch} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#007bff" />
        ) : (
          <AntDesign name="search1" size={24} color="#007bff" />
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
    borderColor: "#ccc",
    borderRadius: wp(3),
    marginHorizontal: wp(3),
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    height: hp(5),
    paddingHorizontal: wp(4),
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: wp(3),
    marginLeft: 5,
  },
});

export default SearchButton;
