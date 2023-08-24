import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { categoryArray } from '../../util/costant';
const Categories = ({ passValue, getCategoryValue }) => {
 
  const [active, setActive] = useState(passValue);

  const passData = () => {
    getCategoryValue(active);
  }
  return (
    <View>
      <ScrollView horizontal={true} style={styles.categoriesParent}>
        {
          categoryArray.map((item) => {
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