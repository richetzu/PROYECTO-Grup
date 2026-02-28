import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quitox Games 🎮</Text>

      
      <Image
        source={{ uri: 'https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg' }}
        style={styles.image}
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Registro')}
        >
          <Text style={styles.buttonText}>Registrate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.altButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#0d0d0d' 
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#00ffcc', 
    textShadowColor: '#ff00ff', 
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 5 
  },
  image: { 
    width: 200, 
    height: 200, 
    marginBottom: 30, 
    borderRadius: 20 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '80%' 
  },
  button: { 
    backgroundColor: '#66ff00c0', 
    paddingVertical: 15, 
    paddingHorizontal: 25, 
    borderRadius: 8, 
    marginHorizontal: 5, 
    borderWidth: 2, 
    borderColor: '#00ffcc' 
  },
  altButton: { 
    backgroundColor: '#a6ff00' 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold', 
    textTransform: 'uppercase' 
  }
});