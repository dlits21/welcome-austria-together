
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../data/languages/common';
import PageNavigation from '../components/PageNavigation';
import LanguageModal from '../components/LanguageModal';
import TutorialModal from '../components/TutorialModal';
import VirtualAssistantModal from '../components/VirtualAssistantModal';
import SearchSection from '../components/SearchSection';
import InformationCategoryGrid from '../components/InformationCategoryGrid';
import { informationCategories } from '../data/information';

// Import language data
import informationLanguageData from '../data/language/information.json';

const Information: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Helper function to get text from language data
  const getText = (key: string) => {
    const keys = key.split('.');
    let value: any = informationLanguageData;
    for (const k of keys) {
      value = value?.[k];
    }
    return value?.[currentLanguage] || value?.en || key;
  };

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
        showHelpModal={() => setShowTutorialModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{getText('title')}</Text>
        
        <SearchSection
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onSearch={handleSearch}
          placeholder={getText('searchPlaceholder')}
        />
        
        <InformationCategoryGrid
          categories={informationCategories}
          onCategoryPress={handleCategoryPress}
          languageCode={language.code}
          getText={getText}
        />
      </View>
      
      {/* Language Modal */}
      <LanguageModal 
        visible={showLanguageModal} 
        onClose={() => setShowLanguageModal(false)} 
        languageCode={language.code}
      />
      
      {/* Tutorial Modal */}
      <TutorialModal
        visible={showTutorialModal}
        onClose={() => setShowTutorialModal(false)}
        languageCode={language.code}
        tutorialData="information"
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
