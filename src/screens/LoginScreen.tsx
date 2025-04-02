import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, Text } from 'react-native';
import { useAuthStore } from '../store/store';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('El email es obligatorio'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
});

type Props = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: Props) {
  const setToken = useAuthStore((state) => state.setToken);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch('https://back-navarro-pos.duckdns.org/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.message || 'Credenciales incorrectas');
        return;
      }

       // Almacenamos el token en el estado global (store) y en AsyncStorage
       setToken(data.token);
       await AsyncStorage.setItem('userToken', data.token);
      Alert.alert('Login exitoso', 'Has iniciado sesión correctamente');
      onLogin();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema con el servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/navarro-pos-logo.png')} style={styles.logo} resizeMode="contain" />
      
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              style={styles.input}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              style={styles.input}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <View style={styles.buttonContainer}>
              <Button title="Login" onPress={() => handleSubmit()} color="#f9af23" />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  logo: { width: 250, height: 250, marginBottom: 20 },
  input: {
    width: '90%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: { width: '30%', marginVertical: 10 },
  errorText: { color: 'red', marginBottom: 10 },
});
