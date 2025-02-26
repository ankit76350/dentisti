import Icon from '../assets/icons/Index'
import ScreenWrapper from '../components/ScreenWrapper'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
// above Import these thing first

import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';  // ✅ Use expo-linear-gradient
import AnimatedText from '../components/AnimatedText';


const Login = () => {
    return (
        <ScreenWrapper>
            <LinearGradient
                colors={[
                    'rgb(227, 242, 253)',
                    'rgb(187, 222, 251)',
                    'rgb(187, 222, 251)',
                    'rgb(227, 242, 253)',
                    'rgb(227, 242, 253)',
                    'rgb(187, 222, 251)',
                    'rgb(187, 222, 251)'
                ]}
                locations={[0, 0.25, 0.25, 0.5, 0.5, 0.75, 1]}
                start={{ x: 0.25, y: 0 }}
                end={{ x: 0.75, y: 1 }}
                style={styles.gradient}
            >
                <StatusBar style="dark" />

                <View style={styles.container}>
                    <View>
                        <Text style={styles.text}>Welcome To Our Dentisti App</Text>
                    </View>

                    {/* animation */}

                    <View>
                        <AnimatedText delay={500} />
                    </View>

                    {/* image logo */}
                    <View style={styles.imageContainer}>
                        <Image style={styles.welcomeImage} source={require('../assets/images/logo.jpg')} />
                    </View>


                    <View>
                        <Text style={styles.text}>Sign in to your account</Text>
                    </View>

                    {/* form */}
                    <View style={[styles.loginForm]}>
                        <CustomInput
                            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
                            placeholder='Enter your email'
                            onChangeText={value => { }}
                        />
                        <CustomInput
                            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
                            placeholder='Enter your password'
                            secureTextEntry
                            onChangeText={value => { }}
                        />
                        <Text style={styles.noAccount}>
                            no account? contact to admin
                        </Text>
                        <CustomButton title='Login' />
                    </View>
                </View>
            </LinearGradient>
        </ScreenWrapper>
    )
}

export default Login



const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: wp(5),
        marginTop: 18,
        gap: 10
    },
    text: {
        fontSize: wp(6),
        fontWeight: theme.fonts.bold,
        color: theme.colors.text,
        textAlign: 'center'
    },
    welcomeImage: {
        width: 90,
        height: 90,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: theme.myColors.borderColor,
        borderRadius: 50,
        padding: 2,
    },


    loginForm: {
        backgroundColor: 'white',
        paddingHorizontal: wp(4),
        gap: 25,
        paddingVertical: hp(5),
        borderRadius: theme.radius.lg
    }

});

