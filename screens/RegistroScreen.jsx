import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function RegistroScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const registrar = () => {
    // Sin validación, pasa directo al menú con tabs
    navigation.replace('Menu'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Registrar" onPress={registrar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#111' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#0f0' },
  input: { borderWidth: 1, borderColor: '#0f0', padding: 10, marginBottom: 15, color: '#fff' }
});