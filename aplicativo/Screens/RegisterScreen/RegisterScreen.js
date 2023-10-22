// RegisterScreen
import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  function signUp() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Conta criada com sucesso!!');
        navigation.navigate('Map'); 
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Esse email já está em uso!'); 
        }

        if (error.code === 'auth/invalid-email') {
          console.log('Esse email é inválido!'); 
        }

        console.error(error);
      });
  }

  function signIn() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('user is authenticated');
        navigation.navigate('Map');
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.container_register}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
        <Image source={require('../../assets/seta_esquerda.png')} style={{ width: 35, height: 35 }} />
        </TouchableOpacity>
      </View>

      <Image style={styles.register_icon} source={require('../../assets/register_icon.png')} />
      
      <Text style={styles.join_text}>Seja um membro da Waze!</Text>

      <View style={styles.inputContainer}>
        <Image source={require('../../assets/email.png')} style={styles.inputIcon} />
        <TextInput
        placeholder="E-mail" 
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholderTextColor="#727272"
        style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={require('../../assets/password.png')} style={styles.inputIcon} />
        <TextInput
        placeholder="Senha" 
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        secureTextEntry
        placeholderTextColor="#727272"
        style={styles.input}
        />
      </View>
      
    <TouchableOpacity
      style={styles.button}
      onPress={signUp}
      >
      <Text style={styles.buttonText}>Cadastrar</Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_register:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
    justifyContent: 'center',
  },
  register_icon:{
    width: 150,
    height: 150,
    alignSelf: 'flex-start',
    margin: 30,
  },
  join_text:{
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 5,
  },
  container_input:{
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    height: 55,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 15,
    backgroundColor: '#9cdde6',
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
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
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',

  },

});

export default RegisterScreen;