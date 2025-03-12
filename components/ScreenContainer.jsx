import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import Header from './Header'

const ScreenContainer = ({
    title="",
    addIconComponent= null,
     children ,
     backScreen
    }) => {
    const theme = useColorScheme();
    const isDark = theme === "dark";
    return (
        <View style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>

            <StatusBar
                animated={true}
                backgroundColor={theme === "dark" ? "#0D1B2A" : "white"}
                barStyle={theme === "dark" ? "light-content" : "dark-content"}
            />

            <Header
                title={title}
                showBackButton={true}
                showAddButton={true}
                onAddPress={() => console.log("Add User Pressed")}
                addIconComponent={addIconComponent}
                screen={backScreen}
            />

            {children}
        </View>
    )
}

export default ScreenContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
 
    },
    lightContainer:{
        backgroundColor: "white",
    },
    darkContainer: {
        backgroundColor: "#0D1B2A",
    },
})