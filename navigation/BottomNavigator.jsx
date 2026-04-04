import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProductosScreen from '../screens/ProductosScreen';
import CarritoScreen from '../screens/CarritoScreen';
import ContactosScreen from '../screens/ContactosScreen';
import HistorialFacturasScreen from '../screens/HistorialFacturasScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarStyle: {
      backgroundColor: '#121212',
      borderTopWidth: 0,
    },
    tabBarActiveTintColor: '#00E676',
    tabBarInactiveTintColor: '#aaa',

    tabBarIcon: ({ color, size }) => {
      let iconName;

      if (route.name === 'Productos') {
        iconName = 'game-controller';
      } else if (route.name === 'Carrito') {
        iconName = 'cart';
      }else if (route.name === 'Facturas') {
        iconName = 'document-text';
      } 
      else if (route.name === 'Contactos') {
        iconName = 'call';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
>
      <Tab.Screen name="Productos" component={ProductosScreen} />
      <Tab.Screen name="Carrito" component={CarritoScreen} />
      <Tab.Screen name="Facturas" component={HistorialFacturasScreen} />
      <Tab.Screen name="Contactos" component={ContactosScreen} />
    </Tab.Navigator>
  );
}