
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView,
  StatusBar, 
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getHowCanIHelpText, getSearchPlaceholder } from '../data/languages';

// Import refactored components
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryGrid from '../components/CategoryGrid';
import HelpModal from '../components/HelpModal';
import LanguageModal from '../components/LanguageModal';

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1]; // Default to English

  const handleSearch = () => {
    if (searchInput.trim()) {
      router.push({
        pathname: '/search',
        params: { query: searchInput }
      });
    } else {
      // Toast would go here with a native implementation
      alert(language.code === 'de' 
        ? 'Bitte geben Sie einen Suchbegriff ein' 
        : 'Please enter a search term'
      );
    }
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/${category}`);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // Sound toggle logic would be implemented here
    
    // Toast message would go here with a native implementation
    alert(soundEnabled 
      ? (language.code === 'de' ? 'Ton ausgeschaltet' : 'Sound disabled') 
      : (language.code === 'de' ? 'Ton eingeschaltet' : 'Sound enabled')
    );
  };

  // Prepare translations and text content
  const askTitle = language.code === 'de' ? 'Fragen' : 'Ask';
  const askSubtitle = language.code === 'de' 
    ? 'Haben Sie eine Frage? Kontaktieren Sie uns!' 
    : 'Do you have a question? Get in touch with us!';
    
  const infoTitle = language.code === 'de' ? 'Informationen' : 'Information';
  const infoSubtitle = language.code === 'de'
    ? 'Hier bieten wir spezifische Informationen zu verschiedenen Themen'
    : 'Here we offer specific information to various topics';
    
  const learnTitle = language.code === 'de' ? 'Lernen' : 'Learn';
  const learnSubtitle = language.code === 'de'
    ? 'Klicken Sie hier für Kurse, Ressourcen oder Klassen'
    : 'Click here for courses, resources or classes';
    
  const communityTitle = language.code === 'de' ? 'Gemeinschaft' : 'Community';
  const communitySubtitle = language.code === 'de'
    ? 'Brauchen Sie Hilfe oder möchten Sie anderen helfen? Klicken Sie hier'
    : 'Do you need help or do you want to help others? Click here';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with Logo and Icons */}
      <Header 
        toggleSound={toggleSound}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
        soundEnabled={soundEnabled}
      />
      
      {/* Main Content */}
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>{getHowCanIHelpText(language.code)}</Text>
        
        {/* Search Bar */}
        <SearchBar 
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearch}
          placeholder={getSearchPlaceholder(language.code)}
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
