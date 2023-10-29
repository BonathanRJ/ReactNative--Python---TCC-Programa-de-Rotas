import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ code: '', message: '' });
  const [isAlertVisible, setAlertVisible] = useState(false);
  const navigation = useNavigation();

  function signIn() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Map');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-login') {
          setError({
            code: 'auth/invalid-login',
            message: 'Login inválido!',
          });
          setAlertVisible(true);
        } 
      });
  }

  function closeAlert() {
    setAlertVisible(false);
    setError({ code: '', message: '' });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.login_logo} source={require('../../assets/welcome_waze.png')} />
      <Text style={styles.text}>Bem vindo de volta!</Text>

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
        onPress={signIn}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.line_container}>
        <View style={styles.line} />
        <Text style={styles.line_text}>OU</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <CustomAlert
        visible={isAlertVisible}
        error={error}
        onClose={closeAlert}
      />
    </View>
  );
}

function CustomAlert({ visible, error, onClose }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.error_container}>
      <View
          style={styles.error_transparent}
        />
        <View
          style={styles.error_msg}
        >
          <Text style={styles.error_title}>{error.message}</Text>
          <Text style={styles.error_sub_title}>
            {error.code === 'auth/invalid-login' ? 'Por favor, verifique seu email ou senha.' : ''}
          </Text>
          <TouchableOpacity
            style={styles.error_button}
            onPress={() => onClose()}>
            <Text style={styles.error_text}>Fechar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  login_logo: {
    width: '80%',
    height: 90,
    marginTop: 75,
    marginBottom: 30,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
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
    margin: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  line_container:{
    flexDirection: 'row', 
    alignItems: 'center',
  },
  line: {
    height: 3,
    width: '20%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    margin: 10
  },
  line_text:{
    fontSize: 18,
  },
  error_container:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    
  },
  error_transparent:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  error_msg:{
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    
  },
  error_title:{
    color: '#0c97ed', 
    fontSize: 22,
    fontWeight: 'bold',
  },
  error_sub_title:{
    color: 'gray', 
    fontSize: 16,
    marginTop: 10 ,
  },
  error_button:{
    backgroundColor: '#0c97ed',
    paddingVertical: 15,
    paddingHorizontal: 45,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
    borderRadius: 15
  },
  error_text:{
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold',
  },
});

export default LoginScreen;
