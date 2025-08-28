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

// Import refactored components
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import CategoryGrid from '../components/CategoryGrid';
import TutorialModal from '../components/TutorialModal';
import LanguageModal from '../components/LanguageModal';
import VirtualAssistantModal from '../components/VirtualAssistantModal';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation('home');
  const router = useRouter();

  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);

  const handleSearch = () => {
    if (searchInput.trim()) {
      setSearchQuery(searchInput);
      setShowVirtualAssistant(true);
      setSearchInput('');
    }
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/${category}`);
  };

  const handleVirtualAssistantClose = () => {
    setShowVirtualAssistant(false);
    setSearchQuery('');
  };

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
        <Text style={styles.title}>
          {t('howCanIHelp')}
        </Text>

        {/* Search Bar */}
        <SearchSection
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onSearch={handleSearch}
          placeholder={t('searchPlaceholder')}
        />

        {/* Category Cards with extra "Guide" tile */}
        <CategoryGrid
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
