
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getMainCategories } from '../data/language/common';
import PageNavigation from '../components/PageNavigation';
import LanguageModal from '../components/LanguageModal';
import HelpModal from '../components/HelpModal';

const Community: React.FC = () => {
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      console.log('Search query:', searchInput);
      // Search logic here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{getMainCategories(language.code, 'community')}</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={language.code === 'de' ? 'Was möchtest du lernen?' : 'What would you like to learn?'}
            placeholderTextColor="#999"
            value={searchInput}
            onChangeText={setSearchInput}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <MaterialIcons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Community Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, styles.needHelpButton]}
            onPress={() => router.push('/community/need-help')}
          >
            <MaterialIcons name="people" size={48} color="#3B82F6" />
            <Text style={styles.optionButtonText}>
              {language.code === 'de' ? 'Ich brauche Hilfe mit...' : 'I need help with...'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, styles.canHelpButton]}
            onPress={() => router.push('/community/can-help')}
          >
            <MaterialIcons name="volunteer-activism" size={48} color="#10B981" />
            <Text style={styles.optionButtonText}>
              {language.code === 'de' ? 'Ich kann helfen mit...' : 'I can help with...'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, styles.mapButton]}
            onPress={() => router.push('/community/map')}
          >
            <MaterialIcons name="map" size={48} color="#7E69AB" />
            <Text style={styles.optionButtonText}>
              {language.code === 'de' ? 'Karte' : 'Map'}
            </Text>
          </TouchableOpacity>
        </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
    flexGrow: 1,
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
  optionsContainer: {
    marginTop: 20,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    aspectRatio: 16/9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 16,
    padding: 20,
    borderWidth: 2,
    backgroundColor: '#fff',
    width: Platform.OS === 'web' ? '31%' : '100%',
  },
  needHelpButton: {
    borderColor: '#3B82F6',
  },
  canHelpButton: {
    borderColor: '#10B981',
  },
  mapButton: {
    borderColor: '#7E69AB',
  },
  optionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
});

export default Community;
