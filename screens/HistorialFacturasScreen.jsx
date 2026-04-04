import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import React, { useCallback, useState, useContext } from 'react';
import { UsuarioContext } from '../context/UsuarioContext';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerHistorialCompras } from '../services/comprasDB';

export default function HistorialFacturasScreen() {
  const { usuarioActivo } = useContext(UsuarioContext);
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarHistorial = async () => {
    setLoading(true);
    const historial = await obtenerHistorialCompras(usuarioActivo);
    setCompras(historial);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (usuarioActivo) {
        cargarHistorial();
      }
    }, [usuarioActivo])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Compras</Text>
      
      {compras.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay compras registradas</Text>
        </View>
      ) : (
        <FlatList
          data={compras}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const fecha = new Date(item.fechaCompra).toLocaleString();
            const productosTexto = item.productos
              .map(p => `${p.nombre} x${p.cantidad}`)
              .join(', ');

            return (
              <View style={styles.compraItem}>
                <View style={styles.compraHeader}>
                  <Text style={styles.fechaTexto}>{fecha}</Text>
                  <Text style={styles.totalTexto}>Total: ${item.total}</Text>
                </View>
                <Text style={styles.productosTexto}>Productos: {productosTexto}</Text>
                <Text style={styles.metoPagoTexto}>Método: {item.metoPago}</Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00E676',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#aaa',
    fontSize: 16,
  },
  compraItem: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#00E676',
  },
  compraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  fechaTexto: {
    color: '#aaa',
    fontSize: 12,
    flex: 1,
  },
  totalTexto: {
    color: '#00E676',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productosTexto: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  metoPagoTexto: {
    color: '#ccc',
    fontSize: 12,
    fontStyle: 'italic',
  },
});
