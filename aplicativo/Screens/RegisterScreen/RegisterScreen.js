import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

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

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>


      <View style={styles.container_register}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
          <Image source={require('../../assets/seta_esquerda.png')} style={{ width: 35, height: 35 }} />
        </TouchableOpacity>
      </View>

      <Image style={styles.register_icon} source={require('../../assets/register_icon.png')} />

      <Text style={styles.join_text}>Seja um membro da Waze!</Text>

      <EmailInput />
      <PasswordInput />
      
      <TouchableOpacity
        style={styles.button}
        
      >
        <Text style={styles.buttonText}>Cadastro</Text>
      </TouchableOpacity>
      
    </View>
  );
};

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
