import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

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

export default RegisterScreen;