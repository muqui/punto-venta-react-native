import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      // Simulación del inicio de sesión exitoso
      //await AsyncStorage.setItem('userToken', 'dummyToken');
      Alert.alert("Login exitoso", "Has iniciado sesión correctamente");
      onLogin(); // Notificar que el usuario ha iniciado sesión
    } catch (error) {
      console.log('Login failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/navarro-pos-logo.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
    
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonContainer}> <Button title="Login" onPress={handleLogin}  color="#f9af23" /> </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  centerText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: { 
    width: '30%',
    marginVertical: 10, },
});
