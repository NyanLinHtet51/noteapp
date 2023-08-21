import { View, TextInput,StyleSheet } from 'react-native'
import React, { useState } from 'react'

const NoteInput = ({getTitleValue }) => {
  const [title, setTitle] = useState("");
  
  const passData = () => {
    getTitleValue(title)
  }
  return (
    <View>
      <TextInput style={styles.textInput} placeholder='Enter Title' value={title} onTextInput={passData} onChangeText={(value) => setTitle(value)} />
    </View>
    
  )
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    padding: 16,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    marginTop: 8,
    width: '96%',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 28
  }
})
export default NoteInput