import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import {
    languages,
    getHowCanIHelpText,
    getSearchPlaceholder,
    getSoundEnabled,
    getSearchTerm,
    getMainCategories,
    getMainCategoriesSubtitles } from '../data/languages/common';

// Import refactored components
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryGrid from '../components/CategoryGrid';
import HelpModal from '../components/HelpModal';
import LanguageModal from '../components/LanguageModal';
import VirtualAssistantModal from '../components/VirtualAssistantModal';

const Home: React.FC = () => {
  const { currentLanguage, selectedLanguage } = useLanguage();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Find the current language object, but don't default to English
  const language = languages.find(lang => lang.code === currentLanguage);
  
  // If no language is found, something is wrong with the language context
  if (!language) {
    console.error('No language found for code:', currentLanguage);
  }
  else {console.log('Language:', language, "found for code", currentLanguage, selectedLanguage);}

  const handleSearch = () => {
    if (searchInput.trim()) {
      setSearchQuery(searchInput);
      setShowVirtualAssistant(true);
      setSearchInput('');
    } else {
      alert(getSearchTerm(currentLanguage));
    }
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/${category}`);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    alert(soundEnabled 
      ? getSoundEnabled(currentLanguage, 'disabled') 
      : getSoundEnabled(currentLanguage, 'enabled')
    );
  };

  const handleVirtualAssistantClose = () => {
    setShowVirtualAssistant(false);
    setSearchQuery('');
  };

  // Prepare translations and text content
  const askTitle = getMainCategories(currentLanguage, 'ask');
  const askSubtitle = getMainCategoriesSubtitles(currentLanguage, 'ask');
    
  const infoTitle = getMainCategories(currentLanguage, 'information');
  const infoSubtitle = getMainCategoriesSubtitles(currentLanguage, 'information');
    
  const learnTitle = getMainCategories(currentLanguage, 'learn');
  const learnSubtitle = getMainCategoriesSubtitles(currentLanguage, 'learn');
    
  const communityTitle = getMainCategories(currentLanguage, 'community');
  const communitySubtitle = getMainCategoriesSubtitles(currentLanguage, 'community');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with Logo and Icons */}
      <Header 
        toggleSound={toggleSound}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        soundEnabled={soundEnabled}
      />
      
      {/* Main Content */}
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>{getHowCanIHelpText(currentLanguage)}</Text>
        
        {/* Search Bar */}
        <SearchBar 
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearch}
          placeholder={getSearchPlaceholder(currentLanguage)}
        />
        
        {/* Category Cards */}
        <CategoryGrid 
          askTitle={askTitle}
          askSubtitle={askSubtitle}
          infoTitle={infoTitle}
          infoSubtitle={infoSubtitle}
          learnTitle={learnTitle}
          learnSubtitle={learnSubtitle}
          communityTitle={communityTitle}
          communitySubtitle={communitySubtitle}
          onCategoryClick={handleCategoryClick}
        />
      </ScrollView>
      
      {/* Language Modal */}
      <LanguageModal 
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        languageCode={currentLanguage}
      />
      
      {/* Help Modal */}
      <HelpModal 
        visible={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        languageCode={currentLanguage}
      />

      {/* Virtual Assistant Modal */}
      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={handleVirtualAssistantClose}
        languageCode={currentLanguage}
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
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 24,
  },
});

export default Home;
