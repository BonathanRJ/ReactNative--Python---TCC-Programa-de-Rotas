// MenuScreen
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


export function MenuScreen() {
  const navigation = useNavigation();
  function signOut() {
    auth().signOut();
    navigation.navigate('Login');
  }
  return (
    <View >
      <Text style={styles.text1}>
        Tela de configuração
      </Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={signOut}
      >
        <Text style={styles.text}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  text1: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    margin: 25
  },
  button: {
    backgroundColor: '#0c97ed', 
    borderRadius: 30,
    padding: 13,
    width: '60%',
    alignItems: 'center',
    margin: 15,
    alignSelf: 'center'
  },
});

export default MenuScreen;