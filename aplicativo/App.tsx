// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './Screens/MapScreen/MapScreen';
import SearchScreen from './Screens/SearchScreen/SearchScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen 
        options={{
          headerShown: false,
        }}
        name="Map" component={MapScreen} />
        <Stack.Screen 
        options={{
          headerShown: false,
        }}
        name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
