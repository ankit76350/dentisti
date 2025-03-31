import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

import { hp } from '../helpers/common'
import { theme } from '../constants/theme'
import { getUserImageSrc } from '../services/imageService'


const Avatar = ({uri , size=hp(4.5), rounded =  theme.radius.md , style={}}) => {
  return (
    <>
   <Image source={require('../assets/images/defaultuser.png')} transition={100}
    style={[styles.avatar, {height:size ,width:size,borderRadius:rounded}, style]}
    />
    </>
  )
}

export default Avatar

const styles = StyleSheet.create({
    avatar:{
        borderCurve:'continuous',
        borderColor:"#FFFFFF",
        border:1
    }
})