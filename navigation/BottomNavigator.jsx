import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductosScreen from '../screens/ProductosScreen';
import ContactoScreen from '../screens/ContactoScreen';
import CarritoScreen from '../screens/CarritoScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Productos" component={ProductosScreen} />
      <Tab.Screen name="Contacto" component={ContactoScreen} />
      <Tab.Screen name="Carrito" component={CarritoScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
}