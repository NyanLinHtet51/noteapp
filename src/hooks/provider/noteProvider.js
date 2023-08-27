import { categoryArray } from '../../util/costant';
import React, { useState } from 'react';
import { NoteContext, CategoryContext } from '../context/context';

export const ContextProviders = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [categoryList, setCategoryList] = useState(categoryArray);

  return (
    <CategoryContext.Provider value={{ categoryList, setCategoryList }}>
      <NoteContext.Provider value={{ notes, setNotes }}>
        {children}
      </NoteContext.Provider>
    </CategoryContext.Provider>
  );
};