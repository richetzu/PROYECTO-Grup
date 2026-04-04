
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { UsuarioContext } from '../context/UsuarioContext';
import { validarLogin } from '../services/authDB';

export default function LoginScreen({ navigation }) {
  const { setUsuarioActivo } = useContext(UsuarioContext);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    // Limpiar espacios
    const usuarioLimpio = usuario.trim();
    const passwordLimpio = password.trim();

    // Validar campos
    if (!usuarioLimpio || !passwordLimpio) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      console.log('Intentando login con:', usuarioLimpio);
      const resultado = await validarLogin(usuarioLimpio, passwordLimpio);

      if (resultado.success) {
        setUsuarioActivo(usuarioLimpio);
        Alert.alert('Bienvenido', 'Login correcto 🎉', [
          {
            text: 'OK',
            onPress: () => navigation.replace('Home')
          }
        ]);
      } else {
        Alert.alert('Error', resultado.message);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo validar las credenciales');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      {loading ? (
        <ActivityIndicator size="large" color="#0f0" />
      ) : (
        <Button title="Login" onPress={login} color="#0f0" />
      )}

      <View style={{ marginTop: 15 }}>
        <Button
          title="Registrarse"
          onPress={() => navigation.navigate('Registro')}
          color="#0f0"
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
  }
});
