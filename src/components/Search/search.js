import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { useState } from 'react';

const Search = ({ passSearchValue, getSearchValue }) => {
  const [result, setResult] = useState(passSearchValue);

  const passData = () => {
    getSearchValue(result);
  }
  const handleSearchCancel = () => {
    setResult('');
    getSearchValue('');
  }
  return (
    <View style={styles.inputParent}>
      <TouchableOpacity onPress={passData}>
        <Icon name='search-outline' style={styles.button} />
      </TouchableOpacity>

      <TextInput style={styles.inputText} placeholder='Search for notes' onTextInput={passData} value={result} onChangeText={(text) => setResult(text)} />
      {
        !!result.length &&
        <TouchableOpacity onPress={handleSearchCancel}>
          <Icon name='close-outline' style={styles.button} />
        </TouchableOpacity>}
    </View>
  )
}

const styles = StyleSheet.create({
  inputParent: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ECECEC',
    width: '96%',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 18
  },
  inputText: {
    flex: 1,
    height: 40,
    fontSize: 16,
    marginLeft: 12
  },
  button: {
    fontSize: 25,
    color: '#7C7C7C',
    paddingTop: 4
  },
});

export default Search