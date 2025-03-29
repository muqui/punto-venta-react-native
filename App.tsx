import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  return (
    <View style={styles.container}>
     <LoginScreen onLogin={function (): void {
        
        
      } } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
    justifyContent: 'center',
  },
});
