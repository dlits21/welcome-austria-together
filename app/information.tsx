
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView 
} from 'react-native';
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
import SearchSection from '../components/SearchSection';
import InformationCategoryGrid from '../components/InformationCategoryGrid';
import { informationCategories } from '../data/information'

const Information: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
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

  const handleCategoryPress = (categoryId: string) => {
    console.log(`Selected: ${categoryId}`);
    // Navigate to the specific information subpage
    router.push(`/information/${categoryId}`);
  };

  const handleVirtualAssistantClose = () => {
    setShowVirtualAssistant(false);
    setSearchQuery('');
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
        
        <SearchSection
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onSearch={handleSearch}
          placeholder={getWhatWouldYouWantToKnow(language.code)}
        />
        
        <InformationCategoryGrid
          categories={informationCategories}
          onCategoryPress={handleCategoryPress}
          getClickForDetails={getClickForDetails}
          languageCode={language.code}
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
});

export default Information;
