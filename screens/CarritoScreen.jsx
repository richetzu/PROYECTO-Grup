import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, Alert } from 'react-native'
import React, { useCallback, useState, useContext } from 'react'
import { UsuarioContext } from '../context/UsuarioContext'
import { useFocusEffect } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import { obtenerCarrito, eliminarCarrito, vaciarCarrito } from '../services/carritoDB'
import { guardarCompra } from '../services/comprasDB'

export default function CarritoScreen({ navigation }) {
  const { usuarioActivo } = useContext(UsuarioContext);

  const [carrito, setCarrito] = useState([])
  const [total, setTotal] = useState(0)
  const [successVisible, setSuccessVisible] = useState(false)
  const [facturaTexto, setFacturaTexto] = useState('')
  const [fechaTexto, setFechaTexto] = useState('')

  const cargarCarrito = async () => {
    const data = await obtenerCarrito()
    setCarrito(data)

    const totalCalculado = data.reduce((acc, item) => {
      return acc + (item.precio * item.cantidad)
    }, 0)

    setTotal(totalCalculado)
  }

  useFocusEffect(
    useCallback(() => {
      cargarCarrito()
    }, [])
  )

  const eliminarItem = async (id) => {
    await eliminarCarrito(id)
    cargarCarrito() // refresca UI
  }

  const handleCheckout = async () => {
    const items = await obtenerCarrito()

    if (!items || items.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega productos antes de proceder a factura')
      return
    }

    const detalleProductos = items
      .map(item => `${item.nombre} x${item.cantidad}`)
      .join('\n')

    const fecha = new Date()
    const fechaFormateada = fecha.toLocaleString()

    setFacturaTexto(
      `Usuario: ${usuarioActivo || 'Sin sesión'}\n\nProductos:\n${detalleProductos}\n\nTotal: $${total}\nPago: Transferencia`
    )
    setFechaTexto(fechaFormateada)
    setSuccessVisible(true)
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={carrito}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.imagen }}
              style={styles.itemImage}
            />
            <Text style={styles.itemTitle}>{item.nombre}</Text>
            <Text style={styles.itemPrice}>
              ${item.precio} x {item.cantidad}
            </Text>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => eliminarItem(item.id)}
            >
              <Text style={styles.Remover}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.total}>
        Total: ${total}
      </Text>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={handleCheckout}
        activeOpacity={0.8}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Text style={styles.checkoutButtonText}>Proceder a factura</Text>
      </TouchableOpacity>

      <Modal
        visible={successVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Compra Exitosa</Text>
            <Text style={styles.modalSubtitle}>Factura generada con éxito</Text>
            <Text style={styles.modalText}>{facturaTexto}</Text>
            <Text style={styles.modalDate}>Fecha: {fechaTexto}</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={async () => {
                setSuccessVisible(false)
                
                // Guardar compra en historial
                const productosArray = carrito.map(item => ({
                  nombre: item.nombre,
                  cantidad: item.cantidad
                }))
                await guardarCompra(usuarioActivo, productosArray, total)
                
                // Vaciar carrito
                await vaciarCarrito()
                await cargarCarrito()
                
                navigation.navigate('Facturas')
              }}
              activeOpacity={0.8}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  checkoutButton: {
    backgroundColor: '#00E676',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 180,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#121212',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#00E676',
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00E676',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    color: '#ddd',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  modalDate: {
    color: '#aaa',
    textAlign: 'right',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#00E676',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
})