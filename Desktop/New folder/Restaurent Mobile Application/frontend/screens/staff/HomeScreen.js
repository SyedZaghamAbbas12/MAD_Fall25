import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const buttons = [
    { title: 'Select Table', icon: 'table-restaurant', screen: 'TableSelection' },
    { title: 'Reservations', icon: 'event-note', screen: 'ReservationScreen' },
    { title: 'Orders', icon: 'receipt-long', screen: 'OrderScreen' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A01111" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HAKS</Text>
        <Text style={styles.headerSubtitle}>Staff Dashboard</Text>
      </View>

      <View style={styles.cardsContainer}>
        {buttons.map((btn, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.cardButton}
            onPress={() => navigation.navigate(btn.screen)}
          >
            <MaterialIcons name={btn.icon} size={32} color="#FFF" />
            <Text style={styles.cardText}>{btn.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: {
    backgroundColor: '#A01111',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  headerTitle: { fontSize: 36, fontWeight: 'bold', color: '#FFF', letterSpacing: 2 },
  headerSubtitle: { fontSize: 16, color: '#FFF', marginTop: 5, fontWeight: '600' },
  cardsContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A01111',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
  },
  cardText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
});
