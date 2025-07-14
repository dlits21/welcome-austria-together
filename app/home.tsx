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
import { languages } from '../data/languages/common';
import { getHomeText } from '../utils/languageUtils';

// Import refactored components
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import CategoryGrid from '../components/CategoryGrid';
import TutorialModal from '../components/TutorialModal';
import LanguageModal from '../components/LanguageModal';
import VirtualAssistantModal from '../components/VirtualAssistantModal';

const Home: React.FC = () => {
  const { currentLanguage, selectedLanguage } = useLanguage();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
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
      alert('Please enter a search term');
    }
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/${category}`);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    alert(soundEnabled ? 'Sound disabled' : 'Sound enabled');
  };

  const handleVirtualAssistantClose = () => {
    setShowVirtualAssistant(false);
    setSearchQuery('');
  };

  // Get translations using the new utility functions
  const askTitle = getHomeText('categories.ask.title', currentLanguage);
  const askSubtitle = getHomeText('categories.ask.description', currentLanguage);
    
  const infoTitle = getHomeText('categories.information.title', currentLanguage);
  const infoSubtitle = getHomeText('categories.information.description', currentLanguage);
    
  const learnTitle = getHomeText('categories.learn.title', currentLanguage);
  const learnSubtitle = getHomeText('categories.learn.description', currentLanguage);
    
  const communityTitle = getHomeText('categories.community.title', currentLanguage);
  const communitySubtitle = getHomeText('categories.community.description', currentLanguage);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with Logo and Icons */}
      <Header
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowTutorialModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
      />
      
      {/* Main Content */}
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>{getHomeText('howCanIHelp', currentLanguage)}</Text>
        
        {/* Search Bar */}
        <SearchSection 
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onSearch={handleSearch}
          placeholder={getHomeText('searchPlaceholder', currentLanguage)}
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
      
      {/* Tutorial Modal */}
      <TutorialModal 
        visible={showTutorialModal}
        onClose={() => setShowTutorialModal(false)}
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
