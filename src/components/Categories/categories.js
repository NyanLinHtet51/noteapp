import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CategoriesStyles from './categories.style'

const Categories = ({passValue,getCategoryValue }) => {
  const arr = [
    {
      id: 1,
      status: 'All'
    },
    {
      id: 2,
      status: 'Important'
    },
    {
      id: 3,
      status: 'Lecture Notes'
    },
    {
      id: 4,
      status: 'To Do Lists'
    },
    {
      id: 5,
      status: 'Shopping Lists'
    }
  ]
  const [active, setActive] = useState(passValue);

  const passData = () => {
    getCategoryValue(active);
  }
  const setActiveFilter = (active) => {
    setActive(active);
  }
  return (
    <View>
      <ScrollView horizontal={true} style={CategoriesStyles.categoriesParent}>
        {
          arr.map((item) => {
            return (
              <TouchableOpacity style={[CategoriesStyles.categoriesTab, active === item.status && CategoriesStyles.activeTab]} onPress={passData} onPressIn={() => { setActiveFilter(item.status) }} key={item.id}>
                <Text style={[CategoriesStyles.text, active === item.status && CategoriesStyles.activeText]}>{item.status}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default Categories