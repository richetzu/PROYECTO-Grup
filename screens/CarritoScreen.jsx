import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { CarritoContext } from '../context/Carrito.Context';

export default function CarritoScreen() {
  const { carrito, eliminarDelCarrito } = useContext(CarritoContext);

  // 👇 Convertimos cada precio a número y sumamos
  const total = carrito.reduce((acc, item) => {
    const precio = Number(item.precio); // 👈 asegura que sea número
    return acc + (isNaN(precio) ? 0 : precio);
  }, 0);

  return (
    <View style={styles.container}>
      {carrito.map((item, index) => (
        <View key={index} style={styles.item}>
          <Image
            source={{ uri: item.imagen }}
            style={{ width: 100, height: 100, marginBottom: 10 }}
          />
          <Text style={styles.text}>{item.titulo}</Text>
          <Text style={styles.text}>${item.precio}</Text>
          <Button title="Eliminar" onPress={() => eliminarDelCarrito(index)} />
        </View>
      ))}
      <Text style={styles.total}>Total: ${total}</Text>
      <Button title="CERRAR SESIÓN" onPress={() => console.log('Cerrar sesión')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    padding: 20,
     backgroundColor: '#111' ,
     alignItems: 'center' },
  item: { marginBottom: 15 },
  text: { color: '#fff', fontSize: 18 },
  total: { fontSize: 22, fontWeight: 'bold', color: '#0f0', marginTop: 20 }

});