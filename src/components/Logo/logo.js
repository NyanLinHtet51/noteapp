import { View, Text } from 'react-native'
import React from 'react'
import LogoStyles from './logo.style'

const Logo = () => {
  return (
    <View style={LogoStyles.logoParent}>
      <Text style={LogoStyles.logoText}>N O T E</Text>
      <Text style={LogoStyles.logoTextColor}>A P P</Text>
      <Text style={LogoStyles.logoText}>.</Text>
    </View>
  )
}

export default Logo