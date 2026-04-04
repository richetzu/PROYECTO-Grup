import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { registrarUsuario, obtenerTodosUsuarios } from '../services/authDB';

export default function RegistroScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const registrar = async () => {
    // Limpiar espacios
    const usuarioLimpio = usuario.trim();
    const passwordLimpio = password.trim();
    const confirmPasswordLimpio = confirmPassword.trim();

    // Validaciones básicas
    if (!usuarioLimpio || !passwordLimpio) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (passwordLimpio !== confirmPasswordLimpio) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (passwordLimpio.length < 4) {
      Alert.alert('Error', 'La contraseña debe tener al menos 4 caracteres');
      return;
    }

    setLoading(true);

    try {
      console.log('Registrando:', usuarioLimpio);
      const resultado = await registrarUsuario(usuarioLimpio, passwordLimpio);

      if (resultado.success) {
        Alert.alert('Éxito', 'Registro completado ✅', [
          {
            text: 'OK',
            onPress: () => {
              setUsuario('');
              setPassword('');
              setConfirmPassword('');
              navigation.replace('Login');
            }
          }
        ]);
      } else {
        Alert.alert('Error', resultado.message);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg' }}
        style={styles.image}
      />
      <Text style={styles.title}>Registro</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#888"
        value={usuario}
        onChangeText={setUsuario}
        editable={!loading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        editable={!loading}
      />
      
      {loading ? (
        <ActivityIndicator size="large" color="#0f0" />
      ) : (
        <Button title="Registrar" onPress={registrar} color="#0f0" />
      )}

      <View style={{ marginTop: 15 }}>
        <Button
          title="Ver Usuarios Registrados"
          onPress={async () => {
            const usuarios = await obtenerTodosUsuarios();
            if (usuarios.length > 0) {
              const lista = usuarios.map(u => `${u.usuario} (${u.fechaRegistro})`).join('\n');
              Alert.alert('Usuarios Registrados', lista);
            } else {
              Alert.alert('Usuarios Registrados', 'No hay usuarios registrados aún');
            }
          }}
          color="#666"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#111' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0f0',
    textAlign: 'center'
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#0f0', 
    padding: 10, 
    marginBottom: 15, 
    color: '#fff',
    borderRadius: 5,
    backgroundColor: '#1a1a1a'
  },
  image: { 
    width: 200, 
    height: 200, 
    marginBottom: 30, 
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
});
