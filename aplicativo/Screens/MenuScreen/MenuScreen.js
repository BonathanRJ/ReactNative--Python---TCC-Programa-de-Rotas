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
      <Text >
        Essa tela só pode ser vista por usuários autenticados
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
  button: {
    backgroundColor: 'orange',
    borderRadius: 8,
    padding: 20,
    minWidth: 150,
  },
});

export default MenuScreen;