import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';

type SearchBarProps = {
  placeholder?: string;
};

export function SearchBar({ placeholder = 'Search for courses, topics...' }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search size={20} color="#71717A" style={styles.icon} />
      <TextInput 
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#71717A"
      />
      <TouchableOpacity style={styles.button}>
        <View style={styles.buttonInner} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333333',
    padding: 0,
  },
  button: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInner: {
    width: 4,
    height: 16,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
});