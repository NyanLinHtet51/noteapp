import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NoteContext } from '../../navigation/navigation'
import Logo from '../../components/Logo/logo'
import { useIsFocused } from '@react-navigation/native'
import { categoryArray } from '../../util/costant'
import Icon from 'react-native-vector-icons/Ionicons';

const Details = ({ navigation, route }) => {
  const { notes, setNotes } = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [checked, setChecked] = useState(1);
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
  }

  return (
    <View style={{ flex: 1, margin: 10 }}>
      <Logo showBackBtn={true} navigation={navigation} />

      <Text style={[styles.noteTitle, styles.marginTop]}>Title</Text>
      <Text style={styles.text}>{title}</Text>

      <Text style={styles.noteTitle}>Category</Text>
      <Text style={styles.text}>{categoryArray[checked].status}</Text>

      <Text style={styles.noteTitle}>Detail</Text>
      <Text style={styles.text}>{detail}</Text>

      <TouchableOpacity style={styles.editBtnParent} onPress={() => {
        navigation.navigate('UpdateNote', { noteDataID })
      }}>
        <Icon name='pencil-outline' style={styles.editBtn} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 10
  },
  noteTitle: {
    marginTop: 30,
    fontSize: 20,
    color: '#B0E9CA',
    fontWeight: '700',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D9E8FC"
  },
  editBtnParent: {
    backgroundColor: '#1F2937',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 14,
    width: 60,
    shadowColor: 'rgba(0, 0, 0, 0.20)',
    elevation: 20,
    position: 'absolute',
    bottom: 34,
    right: 20
  },
  editBtn: {
    fontSize: 30,
    color: '#FFFFFF',
  },
})

export default Details