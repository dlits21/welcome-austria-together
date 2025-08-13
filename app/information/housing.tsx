
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages, getWhatWouldYouWantToKnow } from '../../data/languages/common';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import HelpModal from '../../components/HelpModal';
import VirtualAssistantModal from '../../components/VirtualAssistantModal';

interface HousingTile {
  id: string;
  title: {
    en: string;
    de: string;
  };
  color: string;
  icon: string;
}

const housingTiles: HousingTile[] = [
  {
    id: 'landlords-rights',
    title: { en: 'Landlords Rights', de: 'Vermieterrechte' },
    color: '#3B82F6',
    icon: '🏠'
  },
  {
    id: 'renters-rights',
    title: { en: 'Renters Rights', de: 'Mieterrechte' },
    color: '#10B981',
    icon: '🔑'
  },
  {
    id: 'looking-for-housing',
    title: { en: 'Looking for Housing', de: 'Wohnungssuche' },
    color: '#F59E0B',
    icon: '🔍'
  },
  {
    id: 'general-information',
    title: { en: 'General Information', de: 'Allgemeine Informationen' },
    color: '#EF4444',
    icon: 'ℹ️'
  },
  {
    id: 'rental-contracts',
    title: { en: 'Rental Contracts', de: 'Mietverträge' },
    color: '#8B5CF6',
    icon: '📄'
  },
  {
    id: 'housing-subsidies',
    title: { en: 'Housing Subsidies', de: 'Wohnbeihilfen' },
    color: '#F97316',
    icon: '💰'
  },
  {
    id: 'moving-checklist',
    title: { en: 'Moving Checklist', de: 'Umzugs-Checkliste' },
    color: '#06B6D4',
    icon: '📋'
  },
  {
    id: 'housing-types',
    title: { en: 'Housing Types', de: 'Wohnungstypen' },
    color: '#84CC16',
    icon: '🏢'
  }
];

const HousingPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();
  
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

  const handleTilePress = (tileId: string) => {
    console.log(`Selected tile: ${tileId}`);
    router.push(`/information/housing/${tileId}`);
  };

  const handleVirtualAssistantClose = () => {
    setShowVirtualAssistant(false);
    setSearchQuery('');
  };

  const pageTitle = language.code === 'de' ? 'Wohnen' : 'Housing';
  const pageDescription = language.code === 'de' 
    ? 'Wohnungssuche, Mietrecht, Wohnbeihilfen und Mieterrechte.'
    : 'Finding accommodation, rental laws, housing subsidies, and tenant rights.';

  const renderTile = ({ item }: { item: HousingTile }) => (
    <TouchableOpacity 
      style={[styles.tile, { borderColor: item.color + '40' }]}
      onPress={() => handleTilePress(item.id)}
    >
      <View style={[styles.tileIconContainer, { backgroundColor: item.color + '20' }]}>
        <Text style={styles.tileIcon}>{item.icon}</Text>
      </View>
      <Text style={styles.tileTitle}>
        {language.code === 'de' ? item.title.de : item.title.en}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{pageTitle}</Text>
        <Text style={styles.description}>{pageDescription}</Text>
        
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

        {/* Tiles Grid */}
        <FlatList
          data={housingTiles}
          renderItem={renderTile}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.tilesContainer}
          scrollEnabled={false}
        />
      </ScrollView>
      
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
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 24,
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
  tilesContainer: {
    paddingBottom: 20,
  },
  tile: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    borderWidth: 2,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    minHeight: 120,
  },
  tileIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  tileIcon: {
    fontSize: 24,
  },
  tileTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default HousingPage;
