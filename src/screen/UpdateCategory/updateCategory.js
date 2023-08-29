import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../components/Logo/logo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { NoteContext } from '../../hooks/context/context';

const UpdateCategory = ({ navigation, route }) => {
  const { categoryList, setCategoryList } = useContext(NoteContext)
  const [categoryTitle, setCategoryTitle] = useState("")
  const [errorState, setErrState] = useState(errStateRef);
  const { categoryID } = route.params;
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      getCategoryList();
    }
  }, [isFocus])
  
  const getCategoryList = () => {
    const findCategory = categoryList.find((item) => item.id === categoryID)
    setCategoryTitle(findCategory.status)
  }

  const handleSubmit = () => {
    if (isValidate()) {
      const UpdateCategoryList = categoryList.map(item => {
        if (item.id === categoryID) {
          return { ...item, status: categoryTitle };
        }
        return item;
      });
      setCategoryList(UpdateCategoryList)
      AsyncStorage.setItem('category', JSON.stringify(UpdateCategoryList));
      navigation.navigate("Home")
    }
  }


  const isValidate = () => {
    const isCategoryTitleValidate = validateCategoryTitle()
    setErrState(errStateRef)
    return isCategoryTitleValidate
  }

  const validateCategoryTitle = () => {
    if (categoryTitle) {
      errStateRef = { ...errStateRef, categoryTitleErrMsg: "" }
      return true
    }
    errStateRef = { ...errStateRef, categoryTitleErrMsg: "Category Title Field is Required" }
    return false
  }

  return (
    <View style={{ flex: 1 }}>
      <Logo showBackBtn={true} />

      <View style={styles.titleParent}>
        <Text style={[styles.noteTitle, styles.marginTop]}>Category Title</Text>
        <TextInput style={styles.textInput}
          value={categoryTitle}
          onChangeText={(value) => setCategoryTitle(value)}
          placeholder='Enter Category Title'
        />
        {
          errorState.categoryTitleErrMsg.length > 0 &&
          <Text style={{ color: 'red' }}>{'*' + errorState.categoryTitleErrMsg}</Text>
        }
      </View>
      
      <TouchableOpacity style={styles.createBtn} onPress={handleSubmit} >
        <Text style={styles.createText}>Update</Text>
      </TouchableOpacity>
    </View>
  )
}

let errStateRef = {
  categoryTitleErrMsg: ""
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
})

export default UpdateCategory