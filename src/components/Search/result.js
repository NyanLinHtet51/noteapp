import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Result = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.notFound}>Not Found.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  notFound: {
    opacity: 0.5,
    fontSize: 40
  }
})
export default Result