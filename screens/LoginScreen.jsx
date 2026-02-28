import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        const { usuario: savedUser, password: savedPass } = JSON.parse(data);
        if (usuario === savedUser && password === savedPass) {
          Alert.alert('Bienvenido', 'Login correcto 🎉');
          // Navegar al Carrito después de login correcto
          navigation.navigate('Carrito');
        } else {
          Alert.alert('Error', 'Credenciales inválidas ❌');
        }
      } else {
        Alert.alert('Error', 'No hay usuarios registrados 😢');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo validar 😢');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Login" onPress={login} />

      {/* Botón para ir al Registro */}
      <View style={{ marginTop: 15 }}>
        <Button title="Registrarse" onPress={() => navigation.navigate('Registro')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#111' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#0f0' },
  input: { borderWidth: 1, borderColor: '#0f0', padding: 10, marginBottom: 15, color: '#fff' }
});