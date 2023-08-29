import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../components/Logo/logo'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import { NoteContext } from '../../hooks/context/context';
import { postColorList } from '../../util/costant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = ({ navigation, route }) => {
  const { notes, setNotes, categoryList } = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [checked, setChecked] = useState(1);
  const [color, setColor] = useState("");
  const isFocus = useIsFocused();
  const { noteDataID } = route.params;

  useEffect(() => {
    if (isFocus) {
      getNoteList();
    }
  }, [isFocus])

  const getNoteList = () => {
    const findItem = notes.find(item => item.id === noteDataID)
    setTitle(findItem.title);
    setChecked(findItem.category);
    setDetail(findItem.detail);
    setColor(findItem.colorID)
  }

  const deleteNote = () => {
    const updatedNoteList = notes.filter(note => note.id !== noteDataID);
    setNotes(updatedNoteList);
    AsyncStorage.setItem('notes', JSON.stringify(updatedNoteList));
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>
      <Logo showBackBtn={true} navigation={navigation} />
      <View style={styles.cardParent}>
        <View style={styles.card}>

          <View style={styles.paddingHorizontal}>
            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <View style={[styles.categoryTab(postColorList[color % postColorList.length]), styles.categoryParent]}>
                <Text style={styles.categoryText}>{categoryList[checked].status}</Text>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.editBtnParent} onPress={() => {
                  navigation.navigate('UpdateNote', { noteDataID })
                }}>
                  <Icon name='create-outline' style={styles.editBtn} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.editBtnParent, styles.btnRed]} onPress={deleteNote}>
                  <Icon name='trash-outline' style={styles.editBtn} />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.noteTitle}>{title}</Text>

            <Text style={styles.text}>{detail}</Text></View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardParent: {
    flex: 1,
    paddingVertical: 50,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10
  },
  noteTitle: {
    fontSize: 47,
    color: '#000000',
    fontWeight: '700',
    marginTop: 20
  },
  categoryTab: (color) => {
    return {
      justifyContent: 'center',
      borderRadius: 5,
      backgroundColor: color,
      width: '40%',
      paddingVertical: 8,
      paddingHorizontal: 10,
      marginTop: 5
    }
  },
  categoryParent: {
    flexDirection: 'row'
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500'
  },
  text: {
    fontSize: 20,
    color: '#000000',
    paddingTop: 10,
    textAlign: 'left'
  },
  paddingHorizontal: {
    width: '92%',
    alignSelf: 'center'
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFFFFF",
    paddingBottom: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editBtnParent: {
    backgroundColor: '#1F2937',
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: '23%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 10,
  },
  editBtn: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  btnRed: {
    backgroundColor: '#FF0050',
    marginLeft: 10
  }
})

export default Details