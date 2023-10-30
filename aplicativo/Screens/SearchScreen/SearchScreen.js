//SearchScreen
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import axios from 'axios'; 
import { useNavigation } from '@react-navigation/native';
import Voice from '@react-native-voice/voice';
import styles from './styles';

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

export default SearchScreen;