import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  StatusBar, 
  SafeAreaView 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createReservation } from '../../services/reservationService';

export default function ReservationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('');
  const [date, setDate] = useState('');

  const handleReserve = async () => {
    try {
      await createReservation({ name, guests, date });
      Alert.alert('Success', 'Reservation created!');
      setName(''); setGuests(''); setDate('');
    } catch {
      Alert.alert('Error', 'Failed to create reservation');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A01111" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Reservation</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <TextInput 
          placeholder="Name" 
          style={styles.input} 
          value={name} 
          onChangeText={setName} 
        />
        <TextInput 
          placeholder="Guests" 
          style={styles.input} 
          value={guests} 
          onChangeText={setGuests} 
          keyboardType="numeric" 
        />
        <TextInput 
          placeholder="Date & Time" 
          style={styles.input} 
          value={date} 
          onChangeText={setDate} 
        />
        <TouchableOpacity style={styles.button} onPress={handleReserve}>
          <Text style={styles.buttonText}>Reserve</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: {
    backgroundColor: '#A01111',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 40,
    padding: 5,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 15,
    letterSpacing: 1,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
    elevation: 2,
  },
  button: {
    backgroundColor: '#A01111',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    marginTop: 10,
  },
  buttonText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});
