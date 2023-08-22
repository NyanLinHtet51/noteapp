import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../components/Logo/logo'
import Content from '../../components/Content/content'
import styles from './home.style'
import Search from '../../components/Search/search'
import Categories from '../../components/Categories/categories'
import Result from '../../components/Search/result'
import Notes from '../../components/Notes/notes'
import Icon from 'react-native-vector-icons/Ionicons';
import CreateNote from '../CreateNote/createNote'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'


const Home = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [filteredNote, setFilteredNote] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const [resultNotFound, setResultNotFound] = useState(false);
  const [tabValue, setTabValue] = useState("All");
  const [arr, setArr] = useState('');
  const isFocus = useIsFocused()

  useEffect(() => {
    if (isFocus) {
      createNotes()
    }
  }, [isFocus])

  /**
   * search post by text if specific category is selected, 
   * it will search only the post bsasee on the cohose category
   * @param {*} text 
   * @returns 
   */
  const getSearchValue = async (text) => {
    if (tabValue === 'All') {
      if (!text.trim()) {
        setSearchValue('');
        setResultNotFound(false);
        return await createNotes();
      } else {
        setSearchValue(text);
        setResultNotFound(false);
        const searchNote = notes.filter(note => {
          if (note.title.toLowerCase().includes(text.toLowerCase())) {
            return note;
          }
        })
        if (!!searchNote.length) {
          setNotes([...searchNote]);
        } else {
          setResultNotFound(true);
        }
      }
    } else {
      if (!text.trim()) {
        setSearchValue('');
        setResultNotFound(false);
        const allNote = arr.map(item => item)
        setNotes([...allNote])
      } else {
        setSearchValue(text);
        setResultNotFound(false);
        const searchNote = arr.filter(note => {
          if (note.title.toLowerCase().includes(text.toLowerCase())) {
            return note;
          }
        })
        if (!!searchNote.length) {
          setNotes([...searchNote]);
        } else {
          setResultNotFound(true);
        }
      }
    }
  }

  const getCategoryValue = async (categoryValue) => {
    if (categoryValue !== 'All') {
      setTabValue(categoryValue);
      const arr = filteredNote;
      //setNotes([...arr.filter(note => (note.category.toLowerCase().includes(categoryValue.toLowerCase())))]);
      const filt = arr.filter(note => (note.category.toLowerCase().includes(categoryValue.toLowerCase())));
      setNotes([...filt])
      setArr([...filt])
    } else {
      setTabValue(categoryValue);
      return await createNotes();
    }
  }


  const createNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) {
      setNotes(JSON.parse(result));
      setFilteredNote(JSON.parse(result));
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Logo />
        <Search passSearchValue={searchValue} getSearchValue={getSearchValue} />
        <Categories passValue={tabValue} getCategoryValue={getCategoryValue} />
        {
          resultNotFound ? <Result /> :
            <FlatList
              style={styles.noteParent} numColumns={2} data={notes}
              renderItem={({ item, index }) => <Notes item={item} index={index} />}
              keyExtractor={item => item.id}
            />
        }
        <TouchableOpacity style={styles.addBtnParent} onPress={() => {
          navigation.navigate('CreateNote')
        }}>
          <Icon name='add-outline' style={styles.addBtn} />
        </TouchableOpacity>
        {/* <CreateNote visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={createSubmit} /> */}
      </View>
    </>
  )
}

export default Home;