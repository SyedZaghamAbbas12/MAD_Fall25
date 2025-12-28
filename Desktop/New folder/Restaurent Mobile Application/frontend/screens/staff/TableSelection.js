import React from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  StatusBar, 
  SafeAreaView, 
  TouchableOpacity, 
  Text 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TableCard from '../../components/TableCard';

const tables = Array.from({ length: 20 }, (_, i) => `Table ${i + 1}`);

export default function TableSelection({ navigation }) {
  const handleSelect = (table) => {
    navigation.navigate('MenuScreen', { table });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A01111" />

      {/* Red Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Table</Text>
      </View>

      {/* Table List */}
      <FlatList
        data={tables}
        numColumns={2}
        keyExtractor={(item) => item}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <TableCard table={item} onPress={handleSelect} />
        )}
      />
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
    letterSpacing: 1,
    marginTop: 15,
  },
});
