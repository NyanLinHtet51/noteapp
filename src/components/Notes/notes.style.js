import { StyleSheet } from 'react-native'
import React from 'react'

const NotesStyles = StyleSheet.create({
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

});

export default NotesStyles