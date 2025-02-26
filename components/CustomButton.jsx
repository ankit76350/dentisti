import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'

const CustomButton = ({
    title = 'Custom Button',
    onPress = () => { },
    textStyle,
    buttonStyle,
    hasShadow = true
}) => {
    const shadowStyle = {
        shadowColor: theme.colors.dark,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8
    };

    return (
        <Pressable onPress={onPress} style={[styles.button, buttonStyle, hasShadow && shadowStyle]}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.myColors.buttonColor,
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderCurve: 'continuous',
        borderRadius: 18,
        marginBottom: 15
    },
    text: {
        fontSize: hp(2.5),
        color: 'white',
        fontWeight: '700'
    }
})