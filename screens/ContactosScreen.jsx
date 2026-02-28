import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Contactos</Text>
      <Text style={styles.contact}>Juan Pérez</Text>
      <Text style={styles.contact}>María Gómez</Text>
    </View>
  );
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contact: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ContactosScreen;