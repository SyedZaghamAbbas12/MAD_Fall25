import React, { useEffect, useState } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  Image, 
  Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getMenuItems } from '../../services/menuService';

export default function MenuScreen({ navigation, route }) {
  const { table } = route.params;
  const [menu, setMenu] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await getMenuItems();
      setMenu(data);
    } catch {
      Alert.alert('Error', 'Failed to load menu');
    }
  };

  // Toggle selection of menu item
  const toggleSelectItem = (item) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // Increase/decrease quantity for selected items
  const updateQuantity = (id, delta) => {
    setSelectedItems(prev =>
      prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)
    );
  };

  const total = selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A01111" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu - {table}</Text>
      </View>

      <FlatList
        data={menu}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = selectedItems.some(i => i.id === item.id);
          const selectedItem = selectedItems.find(i => i.id === item.id);
          return (
            <TouchableOpacity
              style={[styles.card, isSelected && { borderWidth: 2, borderColor: '#A01111' }]}
              onPress={() => toggleSelectItem(item)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price} PKR</Text>
                {isSelected && (
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                      <MaterialIcons name="remove-circle-outline" size={24} color="#A01111" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{selectedItem.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                      <MaterialIcons name="add-circle-outline" size={24} color="#A01111" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {isSelected && <MaterialIcons name="check-circle" size={24} color="#A01111" />}
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{ padding: 15 }}
      />

      {selectedItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Total: {total} PKR</Text>
          <TouchableOpacity
            style={styles.placeButton}
            onPress={() => navigation.navigate('OrderScreen', { table, newItems: selectedItems })}
          >
            <Text style={styles.placeButtonText}>Go to Order</Text>
          </TouchableOpacity>
        </View>
      )}
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
  },
  backButton: { position: 'absolute', left: 15, top: 40, padding: 5 },
  headerTitle: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginTop: 15 },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 15, backgroundColor: '#EEE' },
  info: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '500', marginBottom: 5 },
  price: { fontSize: 14, fontWeight: 'bold', color: '#A01111' },

  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  quantityText: { marginHorizontal: 10, fontSize: 16, fontWeight: 'bold' },

  footer: { padding: 15, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#DDD' },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  placeButton: { backgroundColor: '#A01111', padding: 15, borderRadius: 12, alignItems: 'center' },
  placeButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
