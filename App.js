import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigation/navigation';

export default function App() {
  return (
    <>
      <StatusBar barStyle='dark-content' hidden={false} backgroundColor='#ffffff' translucent={false} />
      <AppNavigator/>
    </>
  );
}


