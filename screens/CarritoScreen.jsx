import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { CarritoContext } from '../context/Carrito.Context';
import { FlatList } from 'react-native-gesture-handler';


export default function CarritoScreen() {

  const { carrito, eliminarDelCarrito, total } = useContext(CarritoContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={carrito}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.imagen }}
              style={styles.itemImage}
            />
            <Text style={styles.itemTitle}>{item.titulo}</Text>
            <Text style={styles.itemPrice}>${item.precio} x {item.cantidad}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => eliminarDelCarrito(item.titulo)}
              >
                <Text style={styles.Remover}>Eliminar</Text>
              </TouchableOpacity>
          </View>
        )}
        
      ></FlatList>
      <Text style={styles.total}>
        Total: ${total}</Text>
    </View>
  )
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  itemContainer: {
    backgroundColor: '#1E1E1E',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemPrice: {
    fontSize: 20,
    color: '#ccc',
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  Remover: {
    color: '#fff',
    fontWeight: 'bold',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  itemImage: {
    width: 100,
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    
  },
})