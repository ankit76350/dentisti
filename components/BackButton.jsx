import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { role } from '../assets/json/role';

const BackButton = ({screen="analytics"}) => {
    const navigation = useNavigation();
      const router = useRouter();

    const navgateTo = ()=>{
        navigation.goBack()
        // router.replace(`/(${role})/(dash)/${screen}`);

    }
    return (

        <TouchableOpacity style={styles.backButton} onPress={() => navgateTo() }>
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

    )
}

export default BackButton


const styles = StyleSheet.create({

    backButton: {
        position: "absolute",
        left: 20,
        // paddingTop: Platform.OS === "ios" ? 80 : 40, // 80 for iOS, 40 for Android
        top: Platform.OS === "ios" ? 70 : 25, // 80 for iOS, 40 for Android
        // top: 45,
    },

});


