import { View, Text, FlatList } from 'react-native'
import React from 'react'
import NotesStyles from './notes.style'
const Notes = ({ item }) => {
  const { title, category, detail } = item;

  return (
    <View style={NotesStyles.textParent}>
      <Text style={NotesStyles.title}>{title}</Text>
      <Text style={NotesStyles.details}>{detail.length > 20 ? detail.slice(0, 20) + "..." : detail}</Text>
    </View>
  )
}

export default Notes