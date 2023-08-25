import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screen/Home/home';
import CreateNote from '../screen/CreateNote/createNote';
import UpdateNote from '../screen/UpdateNote/updateNote';
import Details from '../screen/Details/details';
import { createContext, useState } from 'react';

const Stack = createNativeStackNavigator();

export const NoteContext = createContext({});

const AppNavigator = () => {
  const [notes,setNotes] = useState([])
  return (
    <NoteContext.Provider value={{notes,setNotes}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='CreateNote' component={CreateNote} />
          <Stack.Screen name='UpdateNote' component={UpdateNote} />
          <Stack.Screen name='Details' component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </NoteContext.Provider>
    
  );
}

export default AppNavigator;