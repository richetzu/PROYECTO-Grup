import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CarritoProvider } from './context/Carrito.Context';

import IntroScreen from './screens/IntroScreen';
import RegistroScreen from './screens/RegistroScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import CarritoScreen from './screens/CarritoScreen';
import ProductosScreen from './screens/ProductosScreen';
import ContactosScreen from './screens/ContactosScreen'; // 👈 asegúrate que este archivo exista

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MenuTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      children={[
        <Tab.Screen name="Productos" component={ProductosScreen} key="Productos" />,
        <Tab.Screen name="Carrito" component={CarritoScreen} key="Carrito" />,
        <Tab.Screen name="Contactos" component={ContactosScreen} key="Contactos" />,
      ]}
    />
  );
}

export default function App() {
  return (
    <CarritoProvider>
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{ headerShown: false }}
        children={[
          <Stack.Screen name="Intro" component={IntroScreen} key="Intro" />,
          <Stack.Screen name="Registro" component={RegistroScreen} key="Registro" />,
          <Stack.Screen name="Login" component={LoginScreen} key="Login" />,
          <Stack.Screen name="Welcome" component={WelcomeScreen} key="Welcome" />,
          <Stack.Screen name="Menu" component={MenuTabs} key="Menu" />, /* ✅ solo Screens aquí */
        ]}
      >
      </Stack.Navigator>
      </NavigationContainer>
    </CarritoProvider>
  );
}