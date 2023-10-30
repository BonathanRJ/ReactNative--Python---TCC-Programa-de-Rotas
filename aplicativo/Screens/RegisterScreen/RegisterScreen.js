import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import styles from './styles';

export function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ code: '', message: '' });
  const [isAlertVisible, setAlertVisible] = useState(false);
  const navigation = useNavigation();

  function signUp() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Conta criada com sucesso!!');
        navigation.navigate('Map');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
            setError({
              code: 'auth/email-already-in-use',
              message: 'Email já está em uso',
            });
            setAlertVisible(true);
          }
        if (error.code === 'auth/invalid-email') {
            setError({
              code: 'auth/invalid-email',
              message: 'Email inválido',
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
        <View style={styles.error_transparent} />
        <View style={styles.error_msg}>
          <Text style={styles.error_title}>{error.message}</Text>
          <Text style={styles.error_sub_title}>
            {error.code === 'auth/email-already-in-use'
              ? 'Por favor, utilize outro email!'
              : error.code === 'auth/invalid-email'
              ? 'Por favor, utilize um email válido!'
              : ''}
          </Text>
          <TouchableOpacity
            style={styles.error_button}
            onPress={() => onClose()}
          >
            <Text style={styles.error_text}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default RegisterScreen;