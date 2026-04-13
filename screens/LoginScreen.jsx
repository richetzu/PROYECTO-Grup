

import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ImageBackground
} from 'react-native';

import { UsuarioContext } from '../context/UsuarioContext';
import { validarLogin } from '../services/authDB';

export default function LoginScreen({ navigation }) {
  const { setUsuarioActivo } = useContext(UsuarioContext);

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    const usuarioLimpio = usuario.trim();
    const passwordLimpio = password.trim();

    if (!usuarioLimpio || !passwordLimpio) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      const resultado = await validarLogin(usuarioLimpio, passwordLimpio);

      if (resultado.success) {
        setUsuarioActivo(usuarioLimpio);

        Alert.alert('Bienvenido 🎉', '', [
          { text: 'OK', onPress: () => navigation.replace('Home') }
        ]);
      } else {
        Alert.alert('Error', resultado.message);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo validar las credenciales');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg' }}
      style={styles.container}
    >
      <View style={styles.overlay}>

        <Text style={styles.title}>Bienvenido</Text>

        <Text style={styles.subtitle}>
          Inicia sesión para continuar
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#aaa"
          value={usuario}
          onChangeText={setUsuario}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#00E676" />
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Registro')}
        >
          <Text style={styles.buttonText}>
            Crear Cuenta
          </Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00E676',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    width: '90%',
    backgroundColor: '#1E1E1E',
    color: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
  },

  loginButton: {
    backgroundColor: '#00E676',
    width: '90%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  registerButton: {
    borderWidth: 1,
    borderColor: '#00E676',
    width: '90%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
