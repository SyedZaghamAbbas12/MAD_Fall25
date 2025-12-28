import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TableCard({ table, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(table)}>
      <Text style={styles.text}>{table}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
