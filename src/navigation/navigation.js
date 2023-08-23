import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screen/Home/home';
import CreateNote from '../screen/CreateNote/createNote';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='CreateNote' component={CreateNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;