import React, { useEffect, useState } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createOrder } from '../../services/orderService';

export default function OrderScreen({ route, navigation }) {
  const { table, newItems } = route.params || {};
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (newItems && newItems.length > 0) {
      setOrders(prev => mergeOrders(prev, newItems));
    }
  }, [newItems]);

  const mergeOrders = (existing, added) => {
    const merged = [...existing];
    added.forEach(item => {
      const index = merged.findIndex(o => o.id === item.id);
      if (index >= 0) merged[index].quantity += item.quantity;
      else merged.push(item);
    });
    return merged;
  };

  const updateQuantity = (id, delta) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, quantity: Math.max(1, o.quantity + delta) } : o));
  };

  const total = orders.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handlePlaceOrder = async () => {
    if (orders.length === 0) return Alert.alert('No items', 'Please add some items.');
    try {
      const res = await createOrder({ table, items: orders });
      if (res.success) {
        Alert.alert('Success', 'Order placed successfully!');
        setOrders([]);
        navigation.navigate('HomeScreen');
      }
    } catch {
      Alert.alert('Error', 'Failed to place order');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
          <MaterialIcons name="remove-circle-outline" size={24} color="#A01111" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
          <MaterialIcons name="add-circle-outline" size={24} color="#A01111" />
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>{item.price * item.quantity} PKR</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A01111" />
      <Text style={styles.header}>Order - {table}</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15 }}
      />
      {orders.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Total: {total} PKR</Text>
          <TouchableOpacity style={styles.placeButton} onPress={handlePlaceOrder}>
            <Text style={styles.placeButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#A01111', textAlign: 'center', marginVertical: 15 },
  card: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, padding: 12, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between', elevation: 2 },
  name: { fontSize: 16, fontWeight: '500', flex: 1 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 },
  quantityText: { marginHorizontal: 10, fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#A01111' },
  footer: { padding: 15, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#DDD' },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  placeButton: { backgroundColor: '#A01111', padding: 15, borderRadius: 12, alignItems: 'center' },
  placeButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
