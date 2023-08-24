import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../components/Logo/logo'
import Search from '../../components/Search/search'
import Categories from '../../components/Categories/categories'
import Notes from '../../components/Notes/notes'
import Icon from 'react-native-vector-icons/Ionicons'
import NoResult from '../../components/Search/result'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'



const Home = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [allNote, setAllNote] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const [resultNotFound, setResultNotFound] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [categoryFiltered, setCategoryFiltered] = useState([]);
  const isFocus = useIsFocused()

  useEffect(() => {
    if (isFocus) {
      getNoteList()
    }
  }, [isFocus])

  console.log("HOME NOTES",notes);
  const getNoteList = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) {
      setNotes(JSON.parse(result));
      setAllNote(JSON.parse(result));
    }
  }

  /**
   * search post by text if specific category is selected, 
   * it will search only the post bsasee on the cohose category
   * @param {*} text 
   * @returns 
   */

  const getSearchValue = (text) => {
    if (tabValue === 0) {
      !text.trim() ? allNoteList(allNote) : filteredNoteList(allNote, text)
    } else {
      !text.trim() ? allNoteList(categoryFiltered) : filteredNoteList(categoryFiltered, text)
    }
  }

  const allNoteList = (arrayList) => {
    setSearchValue('');
    setResultNotFound(false);
    setNotes([...arrayList])
  }

  const filteredNoteList = (arrayList, text) => {
    setSearchValue(text);
    setResultNotFound(false);
    const searchNote = arrayList.filter(note => (
      note.title.toLowerCase().includes(text.toLowerCase())
    ));
    searchNote.length > 0 ? setNotes([...searchNote]) : setResultNotFound(true)
  }

  const getCategoryValue = async (categoryValue) => {
    if (categoryValue !== 0) {
      setTabValue(categoryValue);
      const newArray = allNote;
      const filteredArray = newArray.filter(note => (note.category === categoryValue));
      setNotes([...filteredArray])
      setCategoryFiltered([...filteredArray])
    } else {
      setTabValue(categoryValue);
      return await getNoteList();
    }
  }

  const openNote = (noteDataID) => {
    navigation.navigate('UpdateNote',{noteDataID})
  }

  return (
    <>
      <View style={styles.container}>
        <Logo />
        <Search passSearchValue={searchValue} getSearchValue={getSearchValue} />
        <Categories passValue={tabValue} getCategoryValue={getCategoryValue} />
        {
          resultNotFound ? <NoResult/> :

            <FlatList
              style={styles.noteParent} numColumns={2} data={notes}
              renderItem={({ item, index }) => <Notes item={item} index={index} onPress={(item) => openNote(item.id)} />}
              keyExtractor={item => item.id}
            />
        }
        <TouchableOpacity style={styles.addBtnParent} onPress={() => {
          navigation.navigate('CreateNote')
        }}>
          <Icon name='add-outline' style={styles.addBtn} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  logoParent: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 18,
      marginTop: 18
  },
  logoText: {
      color: "#1F2937",
      fontSize: 24,
      fontWeight: '600',
      marginLeft: 10
  },
  logoTextColor: {
      color: "#B0E9CA",
      fontSize: 24,
      fontWeight: '600',
      marginLeft: 10
  },
  addBtnParent: {
      backgroundColor: '#1F2937',
      borderRadius: 50,
      paddingHorizontal: 11,
      paddingVertical: 9,
      width: 60,
      shadowColor: 'rgba(0, 0, 0, 0.20)',
      elevation: 20,
      position: 'absolute',
      bottom: 34,
      right: 20
  },
  addBtn: {
      fontSize: 39,
      color: '#FFFFFF',
  },
  noteParent: {
      paddingTop: 18,
      marginHorizontal: 10
  },
  textParent: {
      paddingHorizontal: 16,
      paddingVertical: 18,
      marginBottom: 18,
      marginRight: 18,
      width: '47%',
      borderRadius: 16,
      backgroundColor: '#D9E8FC',
  },
  title: {
      fontSize: 14,
      fontWeight: '700',
      color: '#131313',
      marginBottom: 9
  },
  details: {
      fontSize: 12,
      color: '#131313',
      fontWeight: '400'
  }
})


export default Home;