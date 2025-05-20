import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CameraScanner from '../components/CameraScanner';

export const CheckPricer = () => {
    const [apiUrl, setApiUrl] = useState('');
    const [scannedData, setScannedData] = useState('');
    const [showDetails, setShowDetails] = useState(false);
  
    const handleScan = (data: string) => {
      setScannedData(data);
      setShowDetails(true);
    };
  
    const handleBackToScanner = () => {
      setScannedData('');
      setShowDetails(false);
    };
  return (
    <View style={styles.container}>
     <CameraScanner onScanned={handleScan} />
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 16,
      borderRadius: 5,
      paddingHorizontal: 8,
    },
  });
