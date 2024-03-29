import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './Components/Home';
import MovieDetails from './Components/MovieDetails'
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
    </Stack.Navigator> 
    </NavigationContainer>
  );
}


