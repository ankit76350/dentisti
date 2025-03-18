import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import React from 'react';
import Header from './Header';

const ScreenContainer = ({
    title = "",
    addIconComponent = null,
    children,
    backScreen,
    lightBgColor = 'white',
    navigateTo = () => {}
}) => {
    const theme = useColorScheme();
    const isDark = theme === "dark";

    return (
        <View style={[styles.container, { backgroundColor: isDark ? "#0D1B2A" : lightBgColor }]}>
            <StatusBar
                animated={true}
                backgroundColor={isDark ? "#0D1B2A" : lightBgColor}
                barStyle={isDark ? "light-content" : "dark-content"}
            />

            <Header
                title={title}
                showBackButton={true}
                showAddButton={true}
                onAddPress={navigateTo}
                addIconComponent={addIconComponent}
                screen={backScreen}
            />

            {children}
        </View>
    );
};

export default ScreenContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
});
