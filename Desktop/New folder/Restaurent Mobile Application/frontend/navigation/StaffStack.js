import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StaffLogin from '../screens/staff/StaffLogin';
import HomeScreen from '../screens/staff/HomeScreen';
import TableSelection from '../screens/staff/TableSelection';
import MenuScreen from '../screens/staff/MenuScreen';
import OrderScreen from '../screens/staff/OrderScreen';
import BillingScreen from '../screens/staff/BillingScreen';
import ReservationScreen from '../screens/staff/ReservationScreen';

const Stack = createNativeStackNavigator();

export default function StaffStack() {
  return (
    <Stack.Navigator
      initialRouteName="StaffLogin"
      screenOptions={{ headerShown: false }} // Hide all headers
    >
      <Stack.Screen name="StaffLogin" component={StaffLogin} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="TableSelection" component={TableSelection} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="BillingScreen" component={BillingScreen} />
      <Stack.Screen name="ReservationScreen" component={ReservationScreen} />
    </Stack.Navigator>
  );
}
