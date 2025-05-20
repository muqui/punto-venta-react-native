import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, Text } from 'react-native';
import { useAuthStore } from '../store/store';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { buildUrl, API_URLS } from '../config/apiConfig';

const validationSchema = Yup.object().shape({
  identifier: Yup.string().email('Email inválido').required('El email es obligatorio'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
});

export default function LoginScreen() {
  const setToken = useAuthStore((state) => state.setToken);

  const handleLogin = async (values: { identifier: string; password: string }) => {
    console.log(`Valores ${values.identifier}`);
    try {
      const response = await axios.post(buildUrl(API_URLS.auth), values, {
        headers: { 'Content-Type': 'application/json' },
      });

      const data = response.data;

      // Guardar token en estado global (store)
      setToken(data.token);
      // await AsyncStorage.setItem('userToken', data.token);
      // Alert.alert('Login exitoso', 'Has iniciado sesión correctamente');
      
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Credenciales incorrectas';
        Alert.alert('Error', message);
      } else {
        Alert.alert('Error', 'Hubo un problema con el servidor');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/navarro-pos-logo.png')} style={styles.logo} resizeMode="contain" />
      
      <Formik
        initialValues={{ identifier: 'muqui@hotmail.com', password: '123456' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="identifier"
              value={values.identifier}
              onChangeText={handleChange('identifier')}
              onBlur={handleBlur('identifier')}
              style={styles.input}
            />
            {touched.identifier && errors.identifier && <Text style={styles.errorText}>{errors.identifier}</Text>}

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
