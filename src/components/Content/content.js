import { TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import ContentStyles from './content.style';
import CreateNote from '../../screen/CreateNote/createNote';
import NotesStyles from '../Notes/notes.style';
import Search from '../Search/search'
import Categories from '../Categories/categories'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notes from '../Notes/notes';
import Result from '../Search/result';

const Content = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredNote, setFilteredNote] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const [resultNotFound, setResultNotFound] = useState(false);
  const [tabValue, setTabValue] = useState("All");
  const [arr, setArr] = useState('');
  
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

  useEffect(() => {
    createNotes()
  }, [])

  const createSubmit = async (title, category, detail) => {
    const note = { id: notes.length + 1, title: title, category: category, detail: detail }

    const updateNote = [...notes, note];
    setNotes(updateNote);
    await AsyncStorage.setItem('notes', JSON.stringify(updateNote));
  };

  return (
    <>
      <Search passSearchValue={searchValue} getSearchValue={getSearchValue} />

      <Categories passValue={tabValue} getCategoryValue={getCategoryValue} />

      {resultNotFound ? <Result /> : <FlatList style={NotesStyles.noteParent} numColumns={2} data={notes} renderItem={({ item }) => <Notes item={item} />
      } keyExtractor={item => item.id} />}

      <TouchableOpacity style={ContentStyles.addBtnParent} onPress={() => { setModalVisible(true) }}>
        <Icon name='add-outline' style={ContentStyles.addBtn} />
      </TouchableOpacity>

      <CreateNote visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={createSubmit} />
    </>
  )
}

export default Content