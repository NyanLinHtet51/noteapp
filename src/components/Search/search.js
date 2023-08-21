import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { useState } from 'react';
import SearchStyles from './search.style';

const Search = ({ passSearchValue, getSearchValue }) => {
  const [result, setResult] = useState(passSearchValue);
  const passData = () => {
    getSearchValue(result);
  }
  return (
    <View style={SearchStyles.inputParent}>
      <TouchableOpacity onPress={passData}>
        <Icon name='search-outline' style={SearchStyles.button} />
      </TouchableOpacity>

      <TextInput style={SearchStyles.inputText} placeholder='Search for notes' onTextInput={passData} value={result} onChangeText={(text) => setResult(text)} />
      {
        !!result.length &&
        <TouchableOpacity onPress={() => setResult('')}>
          <Icon name='close-outline' style={SearchStyles.button} />
        </TouchableOpacity>}
    </View>
  )
}

export default Search