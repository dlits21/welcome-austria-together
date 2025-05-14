
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  SafeAreaView,
  StatusBar, 
  TextInput,
  Dimensions,
  Pressable,
  Modal
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getHowCanIHelpText, getSearchPlaceholder } from '../data/languages';
import { MaterialIcons } from '@expo/vector-icons';

// Card component for category tiles
const CategoryCard = ({ 
  title, 
  subtitle, 
  icon, 
  color, 
  onPress 
}: { 
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity 
      style={[styles.categoryCard, { borderColor: color + '40' }]} 
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <MaterialIcons name={icon} size={36} color={color} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle} numberOfLines={2}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

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
      <View style={styles.header}>
        <Image 
          source={require('../assets/images/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <View style={styles.headerButtons}>
          {/* Sound Toggle */}
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={toggleSound}
          >
            <MaterialIcons 
              name={soundEnabled ? "volume-up" : "volume-off"} 
              size={24} 
              color="#333" 
            />
          </TouchableOpacity>
          
          {/* Language Button */}
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => setShowLanguageModal(true)}
          >
            <MaterialIcons name="language" size={24} color="#333" />
          </TouchableOpacity>
          
          {/* Help Button */}
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => setShowHelpModal(true)}
          >
            <MaterialIcons name="help" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Main Content */}
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>{getHowCanIHelpText(language.code)}</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={getSearchPlaceholder(language.code)}
            value={searchInput}
            onChangeText={setSearchInput}
          />
          <TouchableOpacity 
            style={styles.searchButton} 
            onPress={handleSearch}
          >
            <MaterialIcons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {/* Category Cards */}
        <View style={styles.categoryGrid}>
          <CategoryCard 
            title={askTitle}
            subtitle={askSubtitle}
            icon="question-answer"
            color="#3B82F6" // blue
            onPress={() => handleCategoryClick('ask')}
          />
          
          <CategoryCard 
            title={infoTitle}
            subtitle={infoSubtitle}
            icon="info"
            color="#10B981" // green
            onPress={() => handleCategoryClick('information')}
          />
          
          <CategoryCard 
            title={learnTitle}
            subtitle={learnSubtitle}
            icon="menu-book"
            color="#8B5CF6" // purple
            onPress={() => handleCategoryClick('learn')}
          />
          
          <CategoryCard 
            title={communityTitle}
            subtitle={communitySubtitle}
            icon="people"
            color="#F97316" // orange
            onPress={() => handleCategoryClick('community')}
          />
        </View>
      </ScrollView>
      
      {/* Language Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {language.code === 'de' ? 'Sprache ändern' : 'Change Language'}
              </Text>
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView>
              {/* Language selection would go here */}
              <Text style={styles.modalText}>Language selection goes here</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
      
      {/* Help Modal */}
      <Modal
        visible={showHelpModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowHelpModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {language.code === 'de' ? 'Hilfe' : 'Help'}
              </Text>
              <TouchableOpacity onPress={() => setShowHelpModal(false)}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView contentContainerStyle={styles.helpContent}>
              <Text style={styles.helpText}>
                {language.code === 'de' 
                  ? 'Diese Seite bietet Zugang zu Informationen, Lernmaterialien und Community-Ressourcen.' 
                  : 'This page provides access to information, learning materials, and community resources.'}
              </Text>
              <Text style={styles.helpText}>
                {language.code === 'de'
                  ? 'Sie können die Suchleiste verwenden, um spezifische Informationen zu finden.'
                  : 'You can use the search bar to find specific information.'}
              </Text>
              <Text style={styles.helpText}>
                {language.code === 'de'
                  ? 'Die vier Kacheln unten bieten direkten Zugang zu wichtigen Bereichen der Website.'
                  : 'The four tiles below provide direct access to important areas of the website.'}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
      
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    width: 80,
    height: 40,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
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
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: windowWidth > 600 ? 
      (windowWidth - 48) / 2 - 8 : 
      windowWidth - 32,
    marginBottom: 16,
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
  },
  iconContainer: {
    width: '100%',
    aspectRatio: 4/3,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText: {
    padding: 16,
  },
  helpContent: {
    padding: 16,
  },
  helpText: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 22,
  },
});

export default Home;
