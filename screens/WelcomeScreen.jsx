import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg' }}
      style={styles.container}
    >
      <View style={styles.overlay}>

        <Text style={styles.title}>Quitox Games 🎮</Text>

        <Text style={styles.subtitle}>
          Los mejores Videojuegos
        </Text>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Registro')}
        >
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00E676',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 40,
    textAlign: 'center',
  },

  loginButton: {
    backgroundColor: '#00E676',
    width: '80%',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },

  registerButton: {
    borderWidth: 1,
    borderColor: '#00E676',
    width: '80%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


//https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg
//Quitox Games 🎮