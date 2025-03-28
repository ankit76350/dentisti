import { View, ActivityIndicator, useColorScheme, } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'

const Loading = ({ size = "large", color = theme.colors.primary }) => {
  const theme = useColorScheme();
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={size} color={theme === "dark" ? "#49a3f1" : "#1B263B"} />
    </View>
  )
}

export default Loading