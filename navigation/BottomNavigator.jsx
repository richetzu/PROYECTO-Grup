import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProductosScreen from '../screens/ProductosScreen';
import CarritoScreen from '../screens/CarritoScreen';
import ContactosScreen from '../screens/ContactosScreen';
import HistorialFacturasScreen from '../screens/HistorialFacturasScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 0
        },
        tabBarActiveTintColor: '#00E676',
        tabBarInactiveTintColor: '#aaa'
      }}
    >
      <Tab.Screen name="Productos" component={ProductosScreen} />
      <Tab.Screen name="Carrito" component={CarritoScreen} />
      <Tab.Screen name="Facturas" component={HistorialFacturasScreen} />
      <Tab.Screen name="Contactos" component={ContactosScreen} />
    </Tab.Navigator>
  );
}