import { View, Text, FlatList } from 'react-native'
import React from 'react'
import NotesStyles from './notes.style'
import { postColorList } from '../../util/costant';
const Notes = ({item, index}) => {
  const { title, category, detail } = item;

  return (
    <View style={NotesStyles.textParent(postColorList[index%5])}>
      <Text style={NotesStyles.title}>{title}</Text>
      <Text style={NotesStyles.details}>{detail.length > 20 ? detail.slice(0, 20) + "..." : detail}</Text>
    </View>
  )
}

export default Notes