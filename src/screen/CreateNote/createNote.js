import { Text, TouchableOpacity, StyleSheet, ScrollView, View, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../components/Logo/logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper'
import { v4 as uuidv4 } from 'uuid'
import 'react-native-get-random-values'
import { NoteContext } from '../../hooks/context/context';

const CreateNote = ({ navigation }) => {
  const { notes, setNotes, categoryList } = useContext(NoteContext)
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [checked, setChecked] = useState(1);
  const [errorState, setErrState] = useState(errStateRef);

  const handleSubmit = () => {
    if (isValidate()) {
      const note = { id: uuidv4(), title, category: checked, detail, colorID:notes.length }
      const totalNoteList = [...notes, note];
      AsyncStorage.setItem('notes', JSON.stringify(totalNoteList));
      navigation.navigate("Home")
    }
  }

  const isValidate = () => {
    const isTitleValidate = validateTitle()
    const isDetailValidate = validateDetail()
    setErrState(errStateRef)
    return isTitleValidate && isDetailValidate
  }

  const validateTitle = () => {
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
    <View style={{ flex: 1 }}>
      <Logo showBackBtn={true} navigation={navigation} />

      <View style={styles.titleParent}>
        <Text style={[styles.noteTitle, styles.marginTop]}>Title</Text>
        <TextInput style={styles.textInput}
          placeholder='Enter Title'
          value={title}
          onChangeText={(value) => setTitle(value)}
        />
        {
          errorState.titleErrMsg.length > 0 &&
          <Text style={{ color: 'red' }}>{'*' + errorState.titleErrMsg}</Text>
        }
      </View>

      <Text style={styles.noteTitle}>Category</Text>
      <View>
        <ScrollView horizontal={true} style={styles.radioParent} showsHorizontalScrollIndicator={false}>
          {
            categoryList.slice(1).map((item) => {
              return (
                <TouchableOpacity key={item.id} style={styles.radioBtn}>
                  <RadioButton value="item.status"
                    color='#5DB075'
                    status={checked === item.id ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(item.id)}
                  />
                  <Text style={styles.radioTitle}>{item.status}</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>

      <Text style={styles.noteTitle}>Detail</Text>
      <View style={styles.multiParent}>
        <TextInput style={styles.multiText}
          placeholder='Enter Detail'
          multiline={true} value={detail}
          onChangeText={(value) => setDetail(value)}
        />
      </View>
      {
        errorState.detailErrMsg.length > 0 &&
        <Text style={{ color: 'red' }}>{'*' + errorState.detailErrMsg}</Text>
      }

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
  titleParent: {
    marginBottom: 28
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
  radioBtn: {
    flexDirection: 'row'
  },
  radioTitle: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
    marginTop: 8
  }
})
export default CreateNote;