import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchSectionProps {
  searchInput: string;
  onSearchInputChange: (text: string) => void;
  onSearch: () => void;
  placeholder: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchInput,
  onSearchInputChange,
  onSearch,
  placeholder
}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#ececec"
        value={searchInput}
        onChangeText={onSearchInputChange}
        onSubmitEditing={onSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
        <MaterialIcons name="search" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    backgroundColor: '#fff',
    fontWeight: 400
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: '#004C84',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
});

export default SearchSection;