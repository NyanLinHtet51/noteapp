import { Text, TouchableOpacity, StyleSheet, ScrollView, View, TextInput } from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import Logo from '../../components/Logo/logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'
import { NoteContext } from '../../hooks/context/context';

const UpdateNote = ({ navigation, route }) => {
  const { notes, setNotes ,categoryList } = useContext(NoteContext)
  const { noteDataID } = route.params;
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [checked, setChecked] = useState(1);
  const [errorState, setErrState] = useState(errStateRef);
  const isFocus = useIsFocused()

  useEffect(() => {
    if (isFocus) {
      getNoteList()
    }
  }, [isFocus])

  const getNoteList = () => {
    const findItem = notes.find(item => item.id === noteDataID);
    setTitle(findItem.title);
    setChecked(findItem.category);
    setDetail(findItem.detail);
  }

  const handleSubmit = () => {
    if (isValidate()) {
      const updatedNoteList = notes.map(item => {
        if (item.id === noteDataID) {
          return { ...item, title, category: checked, detail };
        }
        return item;
      });
      setNotes(updatedNoteList);
      AsyncStorage.setItem('notes', JSON.stringify(updatedNoteList));
      navigation.navigate("Details",{noteDataID});
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
    <View style={{ flex: 1 }}>
      <Logo showBackBtn={true} />

      <View style={styles.titleParent}>
        <Text style={[styles.noteTitle, styles.marginTop]}>Title</Text>
        <TextInput style={styles.textInput}
          placeholder='Enter Title' value={title}
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
export default UpdateNote;