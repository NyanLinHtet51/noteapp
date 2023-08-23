import { Text, TouchableOpacity, StyleSheet, ScrollView, View, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../components/Logo/logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'

const UpdateNote = ({ navigation, route }) => {
  const {noteData } = route.params;
  const [title, setTitle] = useState(noteData.title);
  const [detail, setDetail] = useState(noteData.detail);
  const [checked, setChecked] = useState(noteData.category);
  const [noteList, setNoteList] = useState([]);
  const [errorState, setErrState] = useState(errStateRef);
  const isFocus = useIsFocused()

  useEffect(() => {
    if (isFocus) {
      getNoteList()
    }
  }, [isFocus])

  const getNoteList = async () => {
    const result = await AsyncStorage.getItem('notes');
    if(result !== null) {
      setNoteList(JSON.parse(result));
    }
  }

  const handleSubmit = () => {
    if (isValidate()) {
      const updatedNote = noteList.filter(item => {
        if (item.id === noteData.id) {
          item.title = title
          item.category = checked
          item.detail = detail
        }
        return item;
      })
      AsyncStorage.setItem('notes', JSON.stringify(updatedNote))
      navigation.navigate("Home")
    }
  }

  const isValidate = () => {
    const isTitleValiate = valdateTitle()
    const isDetailValidate = validateDetail()
    setErrState(errStateRef)
    return isTitleValiate && isDetailValidate
  }

  const valdateTitle = () => {
    if (title) {
      errStateRef = { ...errStateRef, titleErrMsg: "" }
      return true
    }
    errStateRef = { ...errStateRef, titleErrMsg: "Title Field is Required" }
    return false
  }

  const validateDetail = () => {
    if (detail) {
      errStateRef = { ...errStateRef, detailErrMsg: "" }
      return true
    }
    errStateRef = { ...errStateRef, detailErrMsg: "Detail Field is Required" }
    return false
  }

  return (
    <View style={{ flex: 1, margin: 10 }}>
      <Logo showBackBtn={true} navigation={navigation} />

      <Text style={[styles.noteTitle, styles.marginTop]}>Title</Text>   
      <TextInput style={styles.textInput} placeholder='Enter Title' value={title} onChangeText={(value) => setTitle(value)} />
      {errorState.titleErrMsg.length > 0 && <Text style={{ color: 'red' }}>{'*' + errorState.titleErrMsg}</Text>}

      <Text style={styles.noteTitle}>Category</Text>
      <View>
        <ScrollView horizontal={true} style={styles.radioParent}>
          <RadioButton
            value="Important" color='#5DB075'
            status={checked === 1 ? 'checked' : 'unchecked'}
            onPress={() => setChecked(1)}
          />
          <Text style={styles.radioTitle}>Important</Text>
          <RadioButton
            value="To do lists" color='#5DB075'
            status={checked === 2 ? 'checked' : 'unchecked'}
            onPress={() => setChecked(2)}
          />
          <Text style={styles.radioTitle}>To Do Lists</Text>
          <RadioButton
            value="Lecture notes" color='#5DB075'
            status={checked === 3 ? 'checked' : 'unchecked'}
            onPress={() => setChecked(3)}
          />
          <Text style={styles.radioTitle}>Lecture Notes</Text>
          <RadioButton
            value="Shopping lists" color='#5DB075'
            status={checked === 4 ? 'checked' : 'unchecked'}
            onPress={() => setChecked(4)}
          />
          <Text style={styles.radioTitle}>Shopping Lists</Text>
        </ScrollView>
      </View>

      <Text style={styles.noteTitle}>Detail</Text>
      <View style={styles.multiParent}>
        <TextInput style={styles.multiText} placeholder='Enter Detail' multiline={true} value={detail} onChangeText={(value) => setDetail(value)} />
      </View>
      {errorState.detailErrMsg.length > 0 && <Text style={{ color: 'red' }}>{'*' + errorState.detailErrMsg}</Text>}

      <TouchableOpacity style={styles.createBtn} onPress={handleSubmit} >
        <Text style={styles.createText}>Update</Text>
      </TouchableOpacity>
    </View>
  )
}

let errStateRef = {
  titleErrMsg: "",
  detailErrMsg: ""
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 10
  },
  noteTitle: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '400',
    marginLeft: 10
  },
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
  },
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
  },
  createBtn: {
    marginTop: 26,
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: '#5DB075',
    borderRadius: 100,
    alignSelf: 'center',
    position: 'relative'
  },
  createText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600'
  },
  radioParent: {
    marginTop: 10,
    marginBottom: 20
  },
  radioTitle: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
    marginTop: 8
  }
})
export default UpdateNote;