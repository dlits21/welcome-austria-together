
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  TextInput,
  TouchableOpacity, 
  FlatList,
  useWindowDimensions,
  Modal
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import {
    languages,
    getMainCategories,
    getWhatWouldYouWantToKnow,
    getClickForDetails } from '../data/languages/common';
import PageNavigation from '../components/PageNavigation';
import LanguageModal from '../components/LanguageModal';
import HelpModal from '../components/HelpModal';
import VirtualAssistantModal from '../components/VirtualAssistantModal';
import {CategoryItem, informationCategories} from '../data/information'

const Information: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();
  const { width } = useWindowDimensions();
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      setSearchQuery(searchInput);
      setShowVirtualAssistant(true);
      setSearchInput('');
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    console.log(`Selected: ${categoryId}`);
    // Navigate to the specific information subpage
    router.push(`/information/${categoryId}`);
  };

  const handleVirtualAssistantClose = () => {
    setShowVirtualAssistant(false);
    setSearchQuery('');
  };

  // Calculate columns based on screen width - more columns for larger screens
  let numColumns = 2; // default for mobile
  if (width > 1100) {
    numColumns = 4; // 4 columns for very wide screens
  } else if (width > 800) {
    numColumns = 3; // 3 columns for wide screens
  }
  
  const renderCategoryItem = ({ item }: { item: CategoryItem }) => {
    return (
      <TouchableOpacity 
        style={[
          styles.categoryItem,
          { borderColor: item.color + '40' },
          numColumns > 2 && styles.smallerTile
        ]}
        onPress={() => handleCategoryPress(item.id)}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
          <Text style={styles.categoryIcon}>{item.icon}</Text>
        </View>
        <Text style={styles.categoryTitle}>
          {language.code === 'de' ? item.name.de : item.name.en}
        </Text>
        <Text style={styles.categorySubtitle} numberOfLines={2}>
          {getClickForDetails(language.code)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{getMainCategories(language.code, 'information')}</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={getWhatWouldYouWantToKnow(language.code)}
            placeholderTextColor="#999"
            value={searchInput}
            onChangeText={setSearchInput}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <MaterialIcons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {/* Categories Grid */}
        <FlatList
          data={informationCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          key={numColumns.toString()} // Force re-render when columns change
          contentContainerStyle={styles.categoriesContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
      
      {/* Language Modal */}
      <LanguageModal 
        visible={showLanguageModal} 
        onClose={() => setShowLanguageModal(false)} 
        languageCode={language.code}
      />
      
      {/* Help Modal */}
      <HelpModal
        visible={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        languageCode={language.code}
      />

      {/* Virtual Assistant Modal */}
      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={handleVirtualAssistantClose}
        languageCode={language.code}
        initialMessage={searchQuery}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
  categoriesContainer: {
    paddingBottom: 20,
  },
  categoryItem: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    minHeight: 140,
  },
  smallerTile: {
    minHeight: 120,
    padding: 10,
  },
  iconContainer: {
    width: '100%',
    aspectRatio: 4/3,
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 80,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default Information;
