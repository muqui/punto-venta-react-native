// src/components/CustomDrawerContent.tsx
import React from 'react';
import { View, Button } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useAuthStore } from '../store/store'; // Ajusta la ruta si es necesario

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const logout = useAuthStore((state) => state.logout);

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      {/* Lista de rutas del Drawer */}
      {props.state.routeNames.map((name, index) => (
        <Button
          key={index}
          title={name}
          onPress={() => props.navigation.navigate(name)}
        />
      ))}

      {/* Botón de cerrar sesión */}
      <View style={{ marginTop: 'auto', padding: 20 }}>
        <Button title="Cerrar sesión" color="red" onPress={logout} />
      </View>
    </View>
  );
}
