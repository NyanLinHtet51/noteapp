import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper'
const RadioBtn = ({ getRadioValue }) => {
  const [checked, setChecked] = React.useState('Important');

  const passData = () => {
    getRadioValue(checked);
  }
  
  return (
    <View>
      <ScrollView horizontal={true} style={styles.radioParent}>
        <RadioButton
          value="Important" color='#5DB075' onPress={(passData)}
          status={checked === 'Important' ? 'checked' : 'unchecked'}
          onPressIn={() => setChecked('Important')}
        />
        <Text style={styles.radioTitle}>Important</Text>
        <RadioButton
          value="To do lists" color='#5DB075' onPress={(passData)}
          status={checked === 'To do lists' ? 'checked' : 'unchecked'}
          onPressIn={() => setChecked('To do lists')}
        />
        <Text style={styles.radioTitle}>To Do Lists</Text>
        <RadioButton
          value="Lecture notes" color='#5DB075' onPress={(passData)}
          status={checked === 'Lecture notes' ? 'checked' : 'unchecked'}
          onPressIn={() => setChecked('Lecture notes')}
        />
        <Text style={styles.radioTitle}>Lecture Notes</Text>
        <RadioButton
          value="Shopping lists" color='#5DB075' onPress={(passData)}
          status={checked === 'Shopping lists' ? 'checked' : 'unchecked'}
          onPressIn={() => setChecked('Shopping lists')}
        />
        <Text style={styles.radioTitle}>Shopping Lists</Text>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  radioParent: {
    marginTop: 10,
    marginBottom: 20
  },
  radioTitle: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
    marginTop: 8
  }
})
export default RadioBtn