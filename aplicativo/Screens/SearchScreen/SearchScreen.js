//SearchScreen
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import axios from 'axios'; 
import { useNavigation } from '@react-navigation/native';
import Voice from '@react-native-voice/voice';

const SearchScreen = ({ route }) => {
  const navigation = useNavigation();
  const textInputRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');

  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleInputChange = async (text) => {
    setSearchText(text);
    setTranscribedText(text);

    try {
      const apiKey = route.params ? route.params.apiKey : '';
      const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${apiKey}&types=address`;

      const response = await axios.get(apiUrl);

      if (response.data.predictions) {
        setSuggestions(response.data.predictions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  Voice.onSpeechResults = (e) => {
    const transcribedText = e.value[0];
    setTranscribedText(transcribedText);
    handleInputChange(transcribedText);
    
  };

  const startListening = async () => {
    try {
      await Voice.start('pt-BR'); 
      setIsListening(true);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={styles.container_topo}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
              <Image source={require('../../assets/seta_esquerda.png')} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
            <TextInput
              ref={textInputRef}
              style={styles.textButton}
              placeholder="Para onde?"
              placeholderTextColor="#696969"
              value={searchText || transcribedText }
              onChangeText={handleInputChange}
            />
            <TouchableOpacity style={styles.micButton} 
            onPress={() => {
              if (isListening) {
                stopListening();
              } else {
                startListening();
              }
              
            }}
            >
            <Image source={require('../../assets/microphone.png')} style={{ width: 20, height: 25 }} />
            </TouchableOpacity>
          </View>
        </View>

        
        <Text style={styles.sugestao}>Sugestões</Text>
        <View style={styles.sugestao_container}>
        
        {suggestions.map((suggestion) => (
          <TouchableOpacity
            key={suggestion.place_id}
            onPress={() => {
              navigation.navigate('Map', { selectedAddress: suggestion.description });
            }}
            style={styles.sugues_espaco}
          > 
            <View style={styles.container_campo}>
              <View style={styles.container_endereco}>
                <Text style={styles.suges_Titulo}>{suggestion.structured_formatting.main_text}</Text>
                
              </View>  
                <Text style={styles.suges_Desc}>{suggestion.structured_formatting.secondary_text}</Text>
              
                
            </View>  
            <View style={styles.line} />
          </TouchableOpacity>
          ))}
        </View>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_topo: {
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 3
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 25,
    height: 45,
  },
  backButton: {
    paddingHorizontal: 10,
    backgroundColor: '#dfe2eb',
    height: 45,
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  textButton: {
    backgroundColor: '#dfe2eb',
    width: '80%',
    height: 45,
    justifyContent: 'center',
    fontSize: 18,
  },
  micButton: {
    paddingHorizontal: 13,
    height: 45,
    backgroundColor: '#dfe2eb',
    justifyContent: 'center',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  sugestao:{
    fontSize: 16,
    margin: 10, 
  },
  sugestao_container:{
    margin: 10,
    paddingBottom: 18,
    flexDirection: 'column',
  },
  cloButton:{
    width: 30, 
    height: 30,
    margin: 15,
  },
  sugues_espaco:{
    marginBottom: 15,
  },
  suges_Titulo:{
    marginTop: 4,
    fontSize: 20,
    fontWeight: 'bold',
    width: '85%',
  },
  suges_Desc:{
    fontSize: 15,
    marginBottom: 15,
    width: '85%',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
  },
  container_endereco:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container_campo:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    
  },
  TextKM:{
    fontSize: 19,
    color: 'gray', 
  }
});

export default SearchScreen;