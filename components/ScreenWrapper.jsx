import { Platform, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ScreenWrapper = ({ children, bg , padding=null }) => {
    const { top } = useSafeAreaInsets();
    const paddingTop = padding ? padding : Platform.OS === 'ios' ? (top > 0 ? 40 : 20) : 0;


    
const theme = useColorScheme();

    return (
        <View style={[ {flex: 1, paddingTop} , !padding && theme === "dark" ?  styles.darkHeader : styles.lightHeader]}>
            {children}
        </View>
    )
}

export default ScreenWrapper

const styles = StyleSheet.create({
    lightHeader: {
        backgroundColor: "#49a3f1", // Light mode navbar color
    },
    darkHeader: {
        backgroundColor: "#1B263B", // Dark mode navbar color
    },
})