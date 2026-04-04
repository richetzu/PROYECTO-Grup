import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import videojuegos from '../assets/video_juegos.json';
import TarjetaProductos from '../components/TarjetaProductos';

export default function ProductosScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={videojuegos.videojuegos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TarjetaProductos item={item} navigation={navigation} />
        )}
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