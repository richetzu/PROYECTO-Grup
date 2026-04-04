
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { initDB } from './database/db';
import { UsuarioProvider } from './context/UsuarioContext';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  useEffect(() => {
    const inicializar = async () => {
      try {
        await initDB();
        console.log('Base de datos inicializada correctamente ✅');
      } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
      }
    };
    
    inicializar();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UsuarioProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </UsuarioProvider>
    </GestureHandlerRootView>
  );
}

