import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/store';

type Props = {
  onLogout: () => void;
};

export default function HomeScreen({ onLogout }: Props) {
  //const logout = useAuthStore((state) => state.logout);
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout(); // Borra token y usuario
    onLogout(); // Llama a la función de `App.tsx` para volver al login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido a la App</Text>
      {user ? (
        <>
         
          <Text style={styles.userInfo}>Email: {user.email}</Text>
        </>
      ) : (
        <Text style={styles.userInfo}>No hay usuario registrado</Text>
      )}
      <Button title="Cerrar Sesión" onPress={handleLogout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  userInfo: { fontSize: 16, marginBottom: 10, color: 'gray' },
  text: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});
