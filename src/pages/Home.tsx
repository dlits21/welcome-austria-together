
import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../data/languages';
import HomeHeader from '../components/HomeHeader';
import SearchBar from '../components/SearchBar';
import CategoryGrid from '../components/CategoryGrid';
import HomeNavigation from '../components/HomeNavigation';
import LanguageGrid from '../components/LanguageGrid';

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleSearch = () => {
    if (searchInput.trim()) {
      console.log('Search query:', searchInput);
      // Navigate to search results page or handle search
    }
  };

  const handleCategoryClick = (category: string) => {
    // @ts-ignore - Navigation prop type needs to be fixed
    navigation.navigate(category.charAt(0).toUpperCase() + category.slice(1));
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // Sound toggle logic would be implemented here
  };

  return (
    <View 
      style={[
        styles.container, 
        // Handle RTL layout
        language.rtl ? { flexDirection: 'row-reverse' } : {}
      ]}
    >
      <HomeNavigation 
        toggleSound={toggleSound} 
        soundEnabled={soundEnabled}
        openLanguageModal={() => setIsLanguageModalVisible(true)}
        openHelpModal={() => setIsHelpModalVisible(true)}
      />
      
      <HomeHeader />
      
      <SearchBar 
        searchInput={searchInput} 
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />
      
      <CategoryGrid handleCategoryClick={handleCategoryClick} />
      
      {/* Language Modal */}
      <Modal
        visible={isLanguageModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsLanguageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {language.code === 'de' ? 'Sprache ändern' : 'Change Language'}
            </Text>
            <ScrollView style={styles.modalScroll}>
              <LanguageGrid inDialog={true} />
            </ScrollView>
          </View>
        </View>
      </Modal>
      
      {/* Help Modal */}
      <Modal
        visible={isHelpModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsHelpModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {language.code === 'de' ? 'Hilfe' : 'Help'}
            </Text>
            <Text style={styles.modalText}>
              {language.code === 'de' 
                ? 'Hier finden Sie hilfreiche Informationen über die Startseite.' 
                : 'Here you will find helpful information about the home page.'}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalScroll: {
    maxHeight: 400,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  }
});

export default Home;
