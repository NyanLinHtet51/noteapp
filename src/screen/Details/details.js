import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../components/Logo/logo'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import { NoteContext } from '../../hooks/context/context';
import { postColorList } from '../../util/costant';

const Details = ({ navigation, route }) => {
  const { notes, categoryList, setCategoryList } = useContext(NoteContext);
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

  return (
    <View style={{ flex: 1 }}>
      <Logo showBackBtn={true} navigation={navigation} />

      <View style={styles.cardParent}>
        <View style={styles.card(postColorList[ color % postColorList.length ])}>
          <Text style={[styles.noteTitle, styles.marginTop]}>Title</Text>
          <Text style={styles.text}>{title}</Text>

          <Text style={[styles.noteTitle, styles.marginTop]}>Category</Text>
          <Text style={styles.text}>{categoryList[checked]?.status}</Text>

          <Text style={[styles.noteTitle, styles.marginTop]}>Detail</Text>
          <Text style={styles.text}>{detail}</Text>
          <TouchableOpacity style={styles.editBtnParent} onPress={() => {
            navigation.navigate('UpdateNote', { noteDataID })
          }}>
            <Text style={styles.editText}>Edit</Text>
            <Icon name='create-outline' style={styles.editBtn} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardParent: {
    flex: 1,
    paddingVertical: 50,
    width: '93%',
    alignSelf: 'center', 
  },
  card: (color) => {
    return {
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: color,
    }
  },
  marginTop: {
    marginTop: 30
  },
  noteTitle: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '500',
    paddingLeft: 10
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: '#666666',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    paddingLeft: 10
  },
  editBtnParent: {
    backgroundColor: '#1F2937',
    paddingVertical: 14,
    marginVertical: 14,
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10
  },
  editText: {
    fontSize: 15,
    color: '#FFFFFF'
  },
  editBtn: {
    fontSize: 15,
    marginTop: 2,
    marginLeft: 5,
    color: '#FFFFFF',
  },
})

export default Details