import { Text, Modal, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../components/Logo/logo';
import RadioBtn from '../../components/RadioBtn/radioBtn';
import NoteInput from '../../components/NoteInput/noteInput';
import Multiline from '../../components/NoteInput/multiline';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateNote = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [checked, setChecked] = useState("");
  const [noteList, setNoteList] = useState([])
  const [errorState, setErrState] = useState(errStateRef)
  

  useEffect(() => {
    AsyncStorage.getItem('notes').then(res => {
      const noteList = JSON.parse(res)
      setNoteList(noteList)
    })
  }, [])

  const handleSubmit = async () => {
    if (isValidate()) {
      const note = { id: noteList.length + 1, title, category: checked, detail }
      const totalNoteList = [...noteList, note];
      AsyncStorage.setItem('notes', JSON.stringify(totalNoteList));
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
      <Logo />
      <Text style={[styles.noteTitle, styles.marginTop]}>Title</Text>
      <NoteInput getTitleValue={(value) => setTitle(value)} />
      {errorState.titleErrMsg.length > 0 && <Text style={{ color: 'red' }}>{'*' + errorState.titleErrMsg}</Text>}

      <Text style={styles.noteTitle}>Category</Text>
      <RadioBtn getRadioValue={(value) => setChecked(value)} />

      <Text style={styles.noteTitle}>Detail</Text>
      <Multiline getDetailValue={(value) => setDetail(value)} />
      {errorState.detailErrMsg.length >0 && <Text style={{ color: 'red' }}>{'*' + errorState.detailErrMsg}</Text>}

      <TouchableOpacity style={styles.createBtn} onPress={handleSubmit} >
        <Text style={styles.createText}>Create</Text>
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
  errorMessage: {
    color: '#ff0000',
    textAlign: 'center',
    fontSize: 12,
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
})
export default CreateNote;