import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { postColorList } from '../../util/costant';
const Notes = ({item, index, onPress}) => {
  const { title, detail } = item;

  return (
    <TouchableOpacity style={styles.textParent(postColorList[index%5])} onPress={() => {onPress(item)}}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.details}>{detail.length > 20 ? detail.slice(0, 20) + "..." : detail}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  noteParent: {
    paddingTop: 18,
    marginHorizontal: 10
  },
  textParent: (color) => {
    return {
      paddingHorizontal: 16,
      paddingVertical: 18,
      marginBottom: 18,
      marginRight: 18,
      width: '47%',
      borderRadius: 16,
      backgroundColor: color,
    }
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#131313',
    marginBottom: 9
  },
  details: {
    fontSize: 12,
    color: '#131313',
    fontWeight: '400'
  }

})

export default Notes