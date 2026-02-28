import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import IntroScreen from '../screens/IntroScreen';
import RegistroScreen from '../screens/RegistroScreen';
import LoginScreen from '../screens/LoginScreen';
import ProductosScreen from '../screens/ProductosScreen';
import CarritoScreen from '../screens/CarritoScreen';
import ContactosScreen from '../screens/ContactosScreen'; // 👈 corregido nombre plural y ruta

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      children={[
        <Tab.Screen name="Productos" component={ProductosScreen} key="Productos" />,
        <Tab.Screen name="Contactos" component={ContactosScreen} key="Contactos" />,
        <Tab.Screen name="Carrito" component={CarritoScreen} key="Carrito" />,
        <Tab.Screen name="Login" component={LoginScreen} key="Login" />,
      ]}
    />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{ headerShown: false }}
        children={[
          <Stack.Screen name="Intro" component={IntroScreen} key="Intro" />,
          <Stack.Screen name="Registro" component={RegistroScreen} key="Registro" />,
          <Stack.Screen name="Menu" component={MyTabs} key="Menu" /> {/* ✅ aquí va el Tab Navigator */},
        ]}
      >
      </Stack.Navigator>
    </NavigationContainer>
  );
}