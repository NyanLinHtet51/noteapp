import { categoryArray } from '../../util/costant';
import React, { useState } from 'react';
import { NoteContext } from '../context/context';

export const NoteContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [categoryList, setCategoryList] = useState(categoryArray);

  return (
      <NoteContext.Provider value={{ notes, setNotes, categoryList, setCategoryList }}>
        {children}
      </NoteContext.Provider>
  );
};