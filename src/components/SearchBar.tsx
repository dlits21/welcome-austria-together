
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getSearchPlaceholder } from '../data/languages';

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (text: string) => void;
  handleSearch: () => void;
}

const SearchBar = ({ searchInput, setSearchInput, handleSearch }: SearchBarProps) => {
  const { currentLanguage } = useLanguage();
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={getSearchPlaceholder(language.code)}
        value={searchInput}
        onChangeText={setSearchInput}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Feather name="search" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginLeft: 8,
  },
});

export default SearchBar;
