import React from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  SafeAreaView, 
  Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function BillingScreen({ route, navigation }) {
  const { order } = route.params;
  const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePrint = () => Alert.alert('Billing', 'Printing bill...');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A01111" />

      {/* Red Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Billing</Text>
      </View>

      {/* Order List */}
      <FlatList
        data={order}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name} x {item.quantity}</Text>
            <Text style={styles.itemText}>${item.price * item.quantity}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 15 }}
      />

      {/* Total and Print Button */}
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total}</Text>
        <TouchableOpacity style={styles.button} onPress={handlePrint}>
          <Text style={styles.buttonText}>Print Bill</Text>
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  itemText: { fontSize: 16, color: '#333' },
  footer: { padding: 15 },
  total: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  button: {
    backgroundColor: '#A01111',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
