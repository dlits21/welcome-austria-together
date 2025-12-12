import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  ScrollView, 
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';

// Import refactored components
import PageNavigation from '../components/PageNavigation';
import Menu from '../components/Menu';
import LanguageModal from '../components/LanguageModal';
import TutorialModal from '../components/TutorialModal';
import SearchSection from '../components/SearchSection';
import CategoryGrid from '../components/CategoryGrid';
import { CircleBorder } from '../components/CircleIcon';
import { MaterialIcons } from '@expo/vector-icons';
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

  const isWeb  = Platform.OS == 'web'
  const iconSize = isWeb ? 36 : 24
  const iconContainerSize = isWeb ? 60 : 50

  const handleSearch = () => {
    // Empty Functionality
    if (searchInput.trim()) {
      setSearchQuery(searchInput);
      setShowVirtualAssistant(true);
      setSearchInput('');
    }
  };

  // switch to home page
  const onContinue = () => {
    player.pause()
    router.push("/home");
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/${category}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
        showTutorial={() => setShowTutorial(true)}
        showBackButton={false}
      />

      <StatusBar barStyle="dark-content" />
      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>
          {t('howCanIHelp')}
        </Text>

        <View style={styles.ButtonContainer}>
          <TouchableOpacity onPress={onContinue} style={styles.button}>
            <CircleBorder
              size={iconContainerSize}
              borderWidth={2}
              borderColor={'#fff'}
            >
              <MaterialIcons name="record-voice-over" size={iconSize} color="#000" />
            </CircleBorder>
          </TouchableOpacity>

          <TouchableOpacity onPress={onContinue} style={styles.button}>
            <CircleBorder
              size={iconContainerSize}
              borderWidth={2}
              borderColor={'#fff'}
            >
              <MaterialIcons name="volume-up" size={iconSize} color="#000" />
            </CircleBorder>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <SearchSection
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onSearch={handleSearch}
          placeholder={t('searchPlaceholder')}
        />

        {/* Category Cards */}
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

      {!isWeb && (<Menu />)}
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
    fontSize: 29,
    textAlign: 'center',
    fontWeight: "700",
    marginTop: 24,
  },
  ButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 96,
    marginVertical: 12,
  },
  button: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});

export default Home;
