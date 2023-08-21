import { View, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const Multiline = ({getDetailValue}) => {
  const [detail, setDetail] = useState("");

  const passData = () => {
    getDetailValue(detail);
  }

  return (
    <View style={styles.multiParent}>
      <TextInput style={styles.multiText} placeholder='Enter Detail' multiline={true} onTextInput={passData} value={detail} onChangeText={(value) => setDetail(value)} />
    </View>
  )
}
const styles = StyleSheet.create({
  multiParent: {
    padding: 15,
    flex: 1,
    width: '96%',
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 10
  },
  multiText: {
    fontSize: 16
  }
})
export default Multiline