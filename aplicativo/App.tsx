// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './Screens/MapScreen/MapScreen';
import SearchScreen from './Screens/SearchScreen/SearchScreen';
import MenuScreen from './Screens/MenuScreen/MenuScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';

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
        <Stack.Screen 
        options={{
          headerShown: false,
        }}
        name="Menu" component={MenuScreen} />
        <Stack.Screen 
          options={{
            headerShown: false,
          }}
          name="Login" component={LoginScreen}
        />
        <Stack.Screen 
          options={{
            headerShown: false,
          }}
          name="Register" component={RegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
