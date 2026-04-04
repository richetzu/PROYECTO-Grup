import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import BottomNavigator from './BottomNavigator';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* Pantalla inicial */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />

      {/* Auth */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />

      {/* App */}
      <Stack.Screen name="Home" component={BottomNavigator} />

    </Stack.Navigator>
  );
}