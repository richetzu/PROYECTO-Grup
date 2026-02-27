import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function RegistroScreen({ navigation }) {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')

  const registrar = async () => {
    if (!usuario || !password) {
      Alert.alert('Error', 'Campo Obligatorio ')
      return
    }
    try {
      const userData = { usuario, password }
      await AsyncStorage.setItem('userData', JSON.stringify(userData))
      Alert.alert('Éxito', 'Usuario registrado con éxito 🚀')
      navigation.navigate('Login')
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar 😢')
    }
  }

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
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#111' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#0f0' },
  input: { borderWidth: 1, borderColor: '#0f0', padding: 10, marginBottom: 15, color: '#fff' }
})