// src/screens/ProductEntriesScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { buildUrl } from '../config/apiConfig'; // Usa tu buildUrl si quieres
import { useAuthStore } from '../store/store';

export default function InvetoryScreen() {
    const token = useAuthStore((state) => state.token);
  const [startDate, setStartDate] = useState(new Date('2025-01-01'));
  const [endDate, setEndDate] = useState(new Date('2025-04-01'));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [department, setDepartment] = useState('papeleria');
  const [products, setProducts] = useState([]);
    console.log(`token desde el inventario= ${token}`)
  const fetchEntries = async () => {
    try {
      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];

      const url = `https://back-navarro-pos.duckdns.org/products/entries?startDate=${start}&endDate=${end}&departmentName=${department}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en el header
        },
      });

      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    fetchEntries(); // Llama al cargar por primera vez
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Desde:</Text>
      <Button title={startDate.toDateString()} onPress={() => setShowStartPicker(true)} />
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Hasta:</Text>
      <Button title={endDate.toDateString()} onPress={() => setShowEndPicker(true)} />
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Departamento:</Text>
      <Picker
        selectedValue={department}
        onValueChange={(itemValue) => setDepartment(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Papelería" value="papeleria" />
        <Picker.Item label="Electrónica" value="electronica" />
        <Picker.Item label="Limpieza" value="limpieza" />
        {/* Agrega más departamentos según tu API */}
      </Picker>

      <Button title="Buscar productos" onPress={fetchEntries} />

      <FlatList
  data={products}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.product?.name}</Text>
      <Text>Código: {item.product?.barcode}</Text>
      <Text>Proveedor: {item.supplier || 'N/A'}</Text>
      <Text>Fecha: {new Date(item.date).toLocaleDateString()}</Text>
      <Text>Cantidad: {item.amount}</Text>
      <Text>Precio unitario: ${item.purchasePrice}</Text>
      <Text>Total: ${item.purchaseTotalPrice}</Text>
    </View>
  )}
/>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  label: { marginTop: 10, fontWeight: 'bold' },
  picker: { height: 50, width: '100%' },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
