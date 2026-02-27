import { 
  Modal, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Image
} from 'react-native'

import React, { useContext, useState } from 'react'
import { CarritoContext } from '../context/Carrito.Context';
export default function TarjetaProductos(props) {

const [visible, setVisible] = useState(false);
const { agregarAlCarrito } = useContext(CarritoContext);
return (
    <View> 

      {/* TARJETA */}
    <TouchableOpacity 
        style={styles.card}
        onPress={() => setVisible(true)}
    >
        <Image 
        source={{ uri: props.item.imagen }}
        style={styles.image}
        />
        <Text style={styles.title}>{props.item.titulo}</Text>
        <Text style={styles.price}>${props.item.precio}</Text>
        </TouchableOpacity>

      {/* MODAL */}
        <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        >
        <View style={styles.modalContainer}>
        <Image 
            source={{ uri: props.item.imagen }}
            style={styles.modalImage}
        />
        <Text style={styles.modalTitle}>{props.item.titulo}</Text>
        <Text style={styles.modalDescription}>
            {props.item.descripcion}
        </Text>
        <Text style={styles.modalPrice}>
            ${props.item.precio}
        </Text>

        {/* BOTÓN CERRAR */}
<TouchableOpacity 
  style={styles.closeButton}
  onPress={() => setVisible(false)}
>
  <Text style={styles.closeButtonText}>
    Cerrar
  </Text>
</TouchableOpacity>

{/* BOTÓN AGREGAR AL CARRITO */}
<TouchableOpacity 
  style={styles.agregarAlCarrito}
  onPress={() => {
    agregarAlCarrito(props.item);
    setVisible(false);
  }}
>
  <Text style={styles.AgregarButtonText}>
    Agregar al Carrito
  </Text>
</TouchableOpacity>
        </View>
        </Modal>

    </View>
    )
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F1F1F',
    margin: 10,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: 160,
    height: 240,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: '#00E676',
    fontWeight: '600',
    marginTop: 6,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
modalImage: {
    width: 220,
    height: 320,
    borderRadius: 15,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 15,
    color: '#DDD',
    marginVertical: 10,
    textAlign: 'center',
  },
  modalPrice: {
    fontSize: 19,
    color: '#00E676',
    fontWeight: '700',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#E53935',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  agregarAlCarrito: {
     backgroundColor: '#00E676',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
  },
  AgregarButtonText: {
    color: '#ffffff',
    fontWeight: 'bold', 
  }
});