import { StyleSheet, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from './src/store/store';

// Definir tipos para las rutas
type DrawerParamList = {
  Home: undefined;
  Settings: undefined;
  Products: undefined;
};

// Crear el Drawer Navigator
const Drawer = createDrawerNavigator<DrawerParamList>();

export default function App() {
  const { token, user, setToken, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        setToken(storedToken); // Actualiza el estado global de Zustand
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) return null; // Evita renderizar mientras se carga el token

  return (
    <>
      {!token ? (
        // Mostrar Login si no está autenticado
        <LoginScreen onLogin={() => {}} />
      ) : (
        // Mostrar el NavigationContainer si está autenticado
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home">
              {(props) => <HomeScreen {...props} onLogout={logout} />}
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
