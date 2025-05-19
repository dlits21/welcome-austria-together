
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages, getCategoryLabel } from '../../data/languages';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import HelpModal from '../../components/HelpModal';

const NeedHelp: React.FC = () => {
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
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
        <Text style={styles.title}>
          {language.code === 'de' ? 'Ich brauche Hilfe mit...' : 'I need help with...'}
        </Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={language.code === 'de' ? 'Suchen...' : 'Search...'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton}>
            <MaterialIcons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryCard}>
            <MaterialIcons name="translate" size={40} color="#4CAF50" />
            <Text style={styles.categoryText}>
              {language.code === 'de' ? 'Übersetzung' : 'Translation'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryCard}>
            <MaterialIcons name="home" size={40} color="#2196F3" />
            <Text style={styles.categoryText}>
              {language.code === 'de' ? 'Wohnung' : 'Housing'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryCard}>
            <MaterialIcons name="school" size={40} color="#FF9800" />
            <Text style={styles.categoryText}>
              {language.code === 'de' ? 'Bildung' : 'Education'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryCard}>
            <MaterialIcons name="healing" size={40} color="#F44336" />
            <Text style={styles.categoryText}>
              {language.code === 'de' ? 'Gesundheit' : 'Health'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryCard}>
            <MaterialIcons name="work" size={40} color="#9C27B0" />
            <Text style={styles.categoryText}>
              {language.code === 'de' ? 'Arbeit' : 'Work'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryCard}>
            <MaterialIcons name="more-horiz" size={40} color="#607D8B" />
            <Text style={styles.categoryText}>
              {language.code === 'de' ? 'Andere' : 'Other'}
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
    textAlign: 'center',
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
    backgroundColor: '#9b87f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: Platform.OS === 'web' ? '30%' : '45%',
    aspectRatio: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default NeedHelp;
