
import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (text: string) => void;
  handleSearch: () => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchInput, 
  setSearchInput, 
  handleSearch,
  placeholder
}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={searchInput}
        onChangeText={setSearchInput}
      />
      <TouchableOpacity 
        style={styles.searchButton} 
        onPress={handleSearch}
      >
        <MaterialIcons name="search" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
