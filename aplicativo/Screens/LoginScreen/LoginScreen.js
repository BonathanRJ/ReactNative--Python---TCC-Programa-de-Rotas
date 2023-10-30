import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import styles from './styles';


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

export default LoginScreen;
