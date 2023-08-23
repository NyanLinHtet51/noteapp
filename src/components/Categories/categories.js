import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const Categories = ({ passValue, getCategoryValue }) => {
  const arr = [
    {
      id: 0,
      status: 'All'
    },
    {
      id: 1,
      status: 'Important'
    },
    {
      id: 2,
      status: 'Lecture Notes'
    },
    {
      id: 3,
      status: 'To Do Lists'
    },
    {
      id: 4,
      status: 'Shopping Lists'
    }
  ]
  const [active, setActive] = useState(passValue);

  const passData = () => {
    getCategoryValue(active);
  }
  return (
    <View>
      <ScrollView horizontal={true} style={styles.categoriesParent}>
        {
          arr.map((item) => {
            return (
              <TouchableOpacity style={[styles.categoriesTab, active === item.id && styles.activeTab]} onPress={passData} onPressIn={() => { setActive(item.id) }} key={item.id}>
                <Text style={[styles.text, active === item.id && styles.activeText]}>{item.status}</Text>
              </TouchableOpacity>
            )
          })
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
})

export default Categories