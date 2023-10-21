import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';

const EmailInput = () => {
  return (
    <View style={styles.inputContainer}>
      <Image source={require('../../assets/email.png')} style={styles.inputIcon} />
      <TextInput placeholder="Email" style={styles.input} />
    </View>
  );
};

const PasswordInput = () => {
  return (
    <View style={styles.inputContainer}>
      <Image source={require('../../assets/password.png')} style={styles.inputIcon} />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry={true} />
    </View>
  );
};

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        
      <Image style={styles.login_logo} source={require('../../assets/welcome_waze.png')} />
      <Text style={styles.text}>Bem vindo de volta!</Text>

      <EmailInput />
      <PasswordInput />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Implement your login logic here
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

        <View style={styles.line_container}>
            <View style={styles.line} />  
            <Text style={styles.line_text}>OR</Text>
            <View style={styles.line} />  
        </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Cadastro</Text>
      </TouchableOpacity>
      </View>
  );
};

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
});

export default LoginScreen;
