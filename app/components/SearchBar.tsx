
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
        placeholderTextColor="#999"
        value={searchInput}
        onChangeText={setSearchInput}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <MaterialIcons name="search" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
});

export default SearchBar;
