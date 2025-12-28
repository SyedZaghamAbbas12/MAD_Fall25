import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminLogin from '../screens/admin/AdminLogin';
import Dashboard from '../screens/admin/Dashboard';
import OrdersHistory from '../screens/admin/OrdersHistory';
import SalesReports from '../screens/admin/SalesReports';

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator initialRouteName="AdminLogin">
      <Stack.Screen name="AdminLogin" component={AdminLogin} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="OrdersHistory" component={OrdersHistory} />
      <Stack.Screen name="SalesReports" component={SalesReports} />
    </Stack.Navigator>
  );
}
