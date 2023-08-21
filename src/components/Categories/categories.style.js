import { StyleSheet } from 'react-native'
import React from 'react'

const CategoriesStyles = StyleSheet.create({
  categoriesParent: {
    marginHorizontal: 10
  },
  categoriesTab: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    marginRight: 10
  },
  activeTab: {
    backgroundColor: '#1F2937',
  },
  text: {
    color: '#7C7C7C',
  },
  activeText: {
    color: '#FFFFFF',
  }
});

export default CategoriesStyles