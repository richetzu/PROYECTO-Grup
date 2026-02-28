import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function IntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenidos a Quitox Games </Text>
      <Text style={styles.subtitle}>Pulse continuar para realizar su registrarte</Text>

      
      <View style={{ marginTop: 20 }}>
        <Button title="Continuar" onPress={() => navigation.replace('Registro')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#0f0', marginBottom: 20 },
  subtitle: { fontSize: 18, color: '#fff' }
}); 