import { View, StyleSheet } from 'react-native'
import React from 'react'
import Logo from '../../components/Logo/logo'
import Content from '../../components/Content/content'


const Home = () => {

  return (
    <>
      <View style={styles.container}>
        <Logo />
        <Content/>
      </View> 
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Home;