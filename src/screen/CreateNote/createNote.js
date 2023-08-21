import { Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../components/Logo/logo';
import RadioBtn from '../../components/RadioBtn/radioBtn';
import NoteInput from '../../components/NoteInput/noteInput';
import Multiline from '../../components/NoteInput/multiline';

const CreateNote = ({ visible, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [checked, setChecked] = useState("");
  const [validate,setValidate] = useState(false)

  const getRadioValue = (value) => {
    setChecked(value);
  }

  const getTitleValue = (text) => {
    setTitle(text)
  }

  const getDetailValue = (desc) => {
    setDetail(desc);
  }
  
  const handleSubmit = () => {
    if (!title.trim() || !detail.trim()) {
      setTitle(title);
      setChecked(checked);
      setDetail(detail);
      //setValidate(true);
      onClose();
    } else {
      onSubmit(title, checked, detail);
      setTitle('');
      setChecked('Important');
      setDetail('');
      setValidate(false);
      onClose();
    }
  }

  return (
    <Modal visible={visible} animationType='fade' style={styles.noteContainer}>
      <Logo />
      {validate && <Text  style={styles.errorMessage}>Input Fields Required !!!</Text>}
      <Text style={[styles.noteTitle,styles.marginTop]}>Title</Text>
      <NoteInput getTitleValue={getTitleValue } />

      <Text style={styles.noteTitle}>Category</Text>
      <RadioBtn getRadioValue={getRadioValue} />

      <Text style={styles.noteTitle}>Detail</Text>
      <Multiline getDetailValue={getDetailValue} />

      <TouchableOpacity style={styles.createBtn} onPress={handleSubmit} >
        <Text style={styles.createText}>Create</Text>
      </TouchableOpacity>
    </Modal>
  )
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