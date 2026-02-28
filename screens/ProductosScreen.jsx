import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import videojuegos from '../assets/video_juegos.json'; // 👈 ajusta la ruta si es necesario
import TarjetaProductos from '../components/TarjetaProductos';

export default function ProductosScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={videojuegos.videojuegos} // 👈 asegúrate que tu JSON tenga esta clave
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TarjetaProductos item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 10,
  },
});