import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function IntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenidos a Quitox Games :) </Text>
      <Text style={styles.subtitle}>Lo mejor app de juegos actuales y retro  </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#48ff00',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: '#00ffd6',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subtitle: {
    color: '#594dff',
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: '#ff6bff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  button: {
    backgroundColor: '#00ff99',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
})
