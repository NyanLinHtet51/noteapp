import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screen/Home/home';
import CreateNote from '../screen/CreateNote/createNote';
import UpdateNote from '../screen/UpdateNote/updateNote';
import Details from '../screen/Details/details';
import CreateCategory from '../screen/CreateCategory/createCategory';
import UpdateCategory from '../screen/UpdateCategory/updateCategory';
import { ContextProviders } from '../hooks/provider/noteProvider';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <ContextProviders> 
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='CreateNote' component={CreateNote} />
          <Stack.Screen name='UpdateNote' component={UpdateNote} />
          <Stack.Screen name='Details' component={Details} />
          <Stack.Screen name='CreateCategory' component={CreateCategory} />
          <Stack.Screen name='UpdateCategory' component={UpdateCategory} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProviders>
  );
};

export default AppNavigator;