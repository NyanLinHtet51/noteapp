import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { categoryArray } from '../../util/costant';
import Icon from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { CategoryContext } from '../../navigation/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Categories = ({ passValue, getCategoryValue, navigation }) => {

  const [active, setActive] = useState(passValue);
  const [editBtnID, setEditBtnID] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const { categoryList, setCategoryList } = useContext(CategoryContext)
  const isFocus = useIsFocused()

  useEffect(() => {
    if (isFocus) {
      getCategoryList()
    }
  })

  const getCategoryList = async () => {
    const result = await AsyncStorage.getItem('category');
    if (result != null) {
      setCategoryList(JSON.parse(result))
    }
  }

  const handlePress = (categoryID) => {
    setActive(categoryID)
    getCategoryValue(categoryID)
    setEditBtnID('')
    setIsEdit(false)
  }

  const handleLongPress = (categoryID) => {
    setEditBtnID(categoryID);
    setIsEdit(true)
  }

  const updateCategory = (categoryID) => {
    navigation.navigate("UpdateCategory", {categoryID})
  }

  return (
    <View>
      <ScrollView horizontal={true} style={styles.categoriesParent}>
        {
          categoryList.map((item) => {
            return (
              <TouchableOpacity style={[styles.categoriesTab, active === item.id && styles.activeTab]}
                onPress={() => handlePress(item.id)}
                onLongPress={() => handleLongPress(item.id)}
                delayLongPress={500}
                key={item.id}
              >
                <Text style={[styles.text, active === item.id && styles.activeText]}>{item.status}</Text>
                {
                  editBtnID == item.id && isEdit &&
                  <TouchableOpacity style={styles.editCategoryBtn}
                    onPress={() => {updateCategory(item.id)}}
                  >
                    <Icon name="pencil-outline" style={styles.editCategoryIcon} />
                  </TouchableOpacity>
                }
              </TouchableOpacity>
            )
          })
        }

        {
          isEdit &&
          <TouchableOpacity style={styles.addCategoryBtn} onPress={() => { navigation.navigate("CreateCategory") }}>
            <Icon name="add-outline" style={styles.addCategoryIcon} />
          </TouchableOpacity>
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  categoriesParent: {
    marginHorizontal: 10
  },
  categoriesTab: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    marginRight: 10,
    flexDirection: 'row'
  },
  activeTab: {
    backgroundColor: '#1F2937',
  },
  text: {
    color: '#7C7C7C',
  },
  activeText: {
    color: '#FFFFFF',
  },
  editCategoryBtn: {
    paddingHorizontal: 4,
    paddingVertical: 3,
    backgroundColor: '#666666',
    marginLeft: 6,
    borderRadius: 50
  },
  editCategoryIcon: {
    color: '#FFFFFF',
    fontSize: 12
  },
  addCategoryBtn: {
    paddingHorizontal: 6,
    paddingVertical: 5,
    backgroundColor: '#666666',
    borderRadius: 50
  },
  addCategoryIcon: {
    color: '#FFFFFF',
    fontSize: 20
  },
})

export default Categories