import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StaffStack from './navigation/StaffStack';
import AdminStack from './navigation/AdminStack';

export default function App() {
  // For now, we can switch between staff/admin manually
  const userRole = 'staff'; // change to 'admin' to test admin screens

  return (
    <NavigationContainer>
      {userRole === 'staff' ? <StaffStack /> : <AdminStack />}
    </NavigationContainer>
  );
}
