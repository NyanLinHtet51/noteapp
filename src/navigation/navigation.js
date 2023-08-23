import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screen/Home/home';
import CreateNote from '../screen/CreateNote/createNote';
import UpdateNote from '../screen/UpdateNote/updateNote';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='CreateNote' component={CreateNote} />
        <Stack.Screen name='UpdateNote' component={UpdateNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;