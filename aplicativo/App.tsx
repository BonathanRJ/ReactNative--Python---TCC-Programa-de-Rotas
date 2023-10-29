// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './Screens/MapScreen/MapScreen';
import SearchScreen from './Screens/SearchScreen/SearchScreen';
import MenuScreen from './Screens/MenuScreen/MenuScreen.js';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
import SplashScreen from 'react-native-splash-screen'
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);
  
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
