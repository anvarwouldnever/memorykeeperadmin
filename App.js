import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Verification from './components/Verification/Verification';
import DeadUser from './components/Verification/DeadUser';
import Orders from './components/Orders/Orders';
import Order from './components/Orders/Order';
import QRcode from './components/QRcode/QRcode';
import QRinput from './components/QRcode/QRinput';
import Rooms from './components/Messages/Rooms';
import Room from './components/Messages/Room';
import Notifications from './components/Notifications/Notifications';
import NotifyUser from './components/Notifications/NotifyUser';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='dark' translucent={true}/>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Verification' component={Verification}/>
            <Stack.Screen name='DeadUser' component={DeadUser}/>
            <Stack.Screen name='Orders' component={Orders}/>
            <Stack.Screen name='Order' component={Order}/>
            <Stack.Screen name='QRcode' component={QRcode}/>
            <Stack.Screen name='QRinput' component={QRinput}/>
            <Stack.Screen name='Rooms' component={Rooms}/>
            <Stack.Screen name='Room' component={Room}/>
            <Stack.Screen name='Notifications' component={Notifications}/>
            <Stack.Screen name='Notify' component={NotifyUser}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
