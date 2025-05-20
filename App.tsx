import { StyleSheet, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from './src/store/store';
import { CustomDrawerContent } from './src/components/CustomDrawerContent';
import InvetoryScreen from './src/screens/InventoryScreen';
import { CheckPricer } from './src/screens/CheckPricer';

// Definir tipos para las rutas
type DrawerParamList = {
  Home: undefined;
  Settings: undefined;
  Products: undefined;
  Inventory: undefined;
};

// Crear el Drawer Navigator
const Drawer = createDrawerNavigator<DrawerParamList>();

export default function App() {
  const { token, user, setToken, logout } = useAuthStore();

console.log(token)
 

  return (
    <>
      {!token ? (
        // Mostrar Login si no está autenticado
        <LoginScreen />
      ) : (
        // Mostrar el NavigationContainer si está autenticado
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home"
              drawerContent={(props) => <CustomDrawerContent {...props} />} // Usar el CustomDrawerContent

          >
            <Drawer.Screen name="Home">
              {(props) => <HomeScreen />}
            </Drawer.Screen>
            <Drawer.Screen name="Inventory">
              {(props) => <InvetoryScreen />}
            </Drawer.Screen>
            <Drawer.Screen name="Check Price">
              {(props) => <CheckPricer />}
            </Drawer.Screen>
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
