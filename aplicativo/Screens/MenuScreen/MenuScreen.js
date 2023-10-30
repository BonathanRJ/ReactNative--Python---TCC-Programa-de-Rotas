// MenuScreen
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

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

export default MenuScreen;