
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ImageBackground
} from 'react-native';

import { registrarUsuario, obtenerTodosUsuarios } from '../services/authDB';

export default function RegistroScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const registrar = async () => {
    const usuarioLimpio = usuario.trim();
    const passwordLimpio = password.trim();
    const confirmPasswordLimpio = confirmPassword.trim();

    if (!usuarioLimpio || !passwordLimpio) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    if (passwordLimpio !== confirmPasswordLimpio) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (passwordLimpio.length < 4) {
      Alert.alert('Error', 'Mínimo 4 caracteres');
      return;
    }

    setLoading(true);

    try {
      const resultado = await registrarUsuario(usuarioLimpio, passwordLimpio);

      if (resultado.success) {
        Alert.alert('Éxito 🎉', 'Registro completado', [
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
      Alert.alert('Error', 'No se pudo registrar');
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

        <Text style={styles.title}>Crear Cuenta</Text>

        <Text style={styles.subtitle}>
          Regístrate para comenzar
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

        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          editable={!loading}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#00E676" />
        ) : (
          <TouchableOpacity style={styles.registerButton} onPress={registrar}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>

        {/* DEBUG OPCIONAL */}
        <TouchableOpacity
          onPress={async () => {
            const usuarios = await obtenerTodosUsuarios();
            console.log("Usuarios:", usuarios);
            Alert.alert('Usuarios', JSON.stringify(usuarios, null, 2));
          }}
        >
          <Text style={styles.debug}>Ver usuarios</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00E676',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 25,
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

  registerButton: {
    backgroundColor: '#00E676',
    width: '90%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },

  link: {
    color: '#00E676',
    marginTop: 20,
  },

  debug: {
    color: '#888',
    marginTop: 10,
    fontSize: 12,
  }
});

