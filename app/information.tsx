import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  TextInput,
  TouchableOpacity, 
  FlatList,
  useWindowDimensions,
  Modal
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getCategoryLabel } from '../data/languages';
import PageNavigation from '../components/PageNavigation';
import LanguageModal from '../components/LanguageModal';
import HelpModal from '../components/HelpModal';

interface CategoryItem {
  id: string;
  icon: string;
  name: {
    en: string;
    de: string;
  };
  description: {
    en: string;
    de: string;
  };
  color: string;
}

const Information: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const router = useRouter();
  const { width } = useWindowDimensions();
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      console.log('Search query:', searchInput);
      // Search logic here
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    console.log(`Selected: ${categoryId}`);
    // Navigate to the specific information subpage
    router.push(`/information/${categoryId}`);
  };
  
  const informationCategories: CategoryItem[] = [
    { 
      id: 'political-education', 
      icon: '📚', 
      name: { en: 'Political Education', de: 'Politische Bildung' },
      description: { 
        en: 'Learn about the Austrian political system, your rights and responsibilities.', 
        de: 'Erfahren Sie mehr über das österreichische politische System, Ihre Rechte und Pflichten.' 
      },
      color: '#3B82F6'
    },
    { 
      id: 'german-learning', 
      icon: '🇩🇪', 
      name: { en: 'Learn German', de: 'Deutsch Lernen' },
      description: { 
        en: 'Find German language courses, practice materials, and learning resources.', 
        de: 'Finden Sie Deutschkurse, Übungsmaterialien und Lernressourcen.' 
      },
      color: '#EF4444'
    },
    { 
      id: 'work', 
      icon: '💼', 
      name: { en: 'Work and Career', de: 'Arbeit und Beruf' },
      description: { 
        en: 'Job opportunities, work permits, career development, and employment rights.', 
        de: 'Arbeitsangebote, Arbeitsgenehmigungen, Karriereentwicklung und Arbeitnehmerrechte.' 
      },
      color: '#F59E0B'
    },
    { 
      id: 'ask-me', 
      icon: '❓', 
      name: { en: 'Just Ask Me', de: 'Frag mich einfach' },
      description: { 
        en: 'Have a question? Get personalized answers and guidance here.', 
        de: 'Haben Sie eine Frage? Erhalten Sie hier personalisierte Antworten und Anleitungen.' 
      },
      color: '#8B5CF6'
    },
    { 
      id: 'housing', 
      icon: '🏠', 
      name: { en: 'Housing', de: 'Wohnen' },
      description: { 
        en: 'Find information about housing, including apartments, houses, and rental options.', 
        de: 'Finden Sie Informationen über Wohnungen, einschließlich Appartements, Häuser und Mietoptionen.' 
      },
      color: '#228B22'
    },
    { 
      id: 'finance', 
      icon: '💰', 
      name: { en: 'Finance', de: 'Finanzen' },
      description: { 
        en: 'Learn about financial planning, budgeting, and investment options.', 
        de: 'Erfahren Sie mehr über Finanzplanung, Budgetierung und Investitionsmöglichkeiten.' 
      },
      color: '#FF6347'
    },
    { 
      id: 'culture', 
      icon: '🎭', 
      name: { en: 'Culture and Leisure', de: 'Kultur und Freizeit' },
      description: { 
        en: 'Explore cultural events, museums, and leisure activities.', 
        de: 'Entdecken Sie kulturelle Veranstaltungen, Museen und Freizeitaktivitäten.' 
      },
      color: '#007BFF'
    },
    { 
      id: 'mobility', 
      icon: '🚌', 
      name: { en: 'Mobility', de: 'Mobilität' },
      description: { 
        en: 'Learn about public transportation, car insurance, and driving tips.', 
        de: 'Erfahren Sie mehr über öffentliche Verkehrsmittel, Autoversicherung und Fahrtwege.' 
      },
      color: '#FFD700'
    },
    { 
      id: 'health', 
      icon: '🏥', 
      name: { en: 'Health', de: 'Gesundheit' },
      description: { 
        en: 'Find information about healthcare, including medical services and treatments.', 
        de: 'Finden Sie Informationen über Gesundheitsservice und Behandlungen.' 
      },
      color: '#663399'
    },
    { 
      id: 'education', 
      icon: '🎓', 
      name: { en: 'Education and Childcare', de: 'Bildung und Kinderbetreuung' },
      description: { 
        en: 'Learn about education options, including schools, universities, and childcare services.', 
        de: 'Erfahren Sie mehr über Bildungsangebote, einschließlich Schulen, Universitäten und Kindertagesbetreuungsservice.' 
      },
      color: '#4CAF50'
    },
    { 
      id: 'funding', 
      icon: '💶', 
      name: { en: 'Funding', de: 'Förderungen' },
      description: { 
        en: 'Find information about funding opportunities, including grants and scholarships.', 
        de: 'Finden Sie Informationen über Förderungsoffenlichkeiten, einschließlich Grants und Schulden.' 
      },
      color: '#9932CC'
    },
    { 
      id: 'volunteering', 
      icon: '🤝', 
      name: { en: 'Volunteering', de: 'Mithelfen' },
      description: { 
        en: 'Learn about volunteer opportunities, including community service and charitable work.', 
        de: 'Erfahren Sie mehr über Mithelfenangebote, einschließlich Gemeinschaftsdienstleistungen und charitablen Arbeiten.' 
      },
      color: '#FF4500'
    },
    { 
      id: 'contacts', 
      icon: '📞', 
      name: { en: 'Important Contacts and Legal Help', de: 'Wichtige Kontakte und rechtliche Hilfe' },
      description: { 
        en: 'Find information about important contacts and legal help.', 
        de: 'Finden Sie Informationen über wichtige Kontakte und rechtliche Hilfe.' 
      },
      color: '#008000'
    },
    { 
      id: 'translation', 
      icon: '🔄', 
      name: { en: 'Translation', de: 'Übersetzen' },
      description: { 
        en: 'Find translation services and resources.', 
        de: 'Finden Sie Übersetzungsdienstleistungen und Ressourcen.' 
      },
      color: '#FFA500'
    },
  ];
  
  // Calculate how many columns based on screen width - always 2 columns for mobile
  const numColumns = 2;
  
  const renderCategoryItem = ({ item }: { item: CategoryItem }) => {
    return (
      <TouchableOpacity 
        style={[
          styles.categoryItem,
          { borderColor: item.color + '40' }
        ]}
        onPress={() => handleCategoryPress(item.id)}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
          <Text style={styles.categoryIcon}>{item.icon}</Text>
        </View>
        <Text style={styles.categoryTitle}>
          {language.code === 'de' ? item.name.de : item.name.en}
        </Text>
        <Text style={styles.categorySubtitle} numberOfLines={2}>
          {language.code === 'de' 
            ? 'Klicken für Details' 
            : 'Click for details'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{getCategoryLabel(language.code, 'information')}</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={language.code === 'de' ? 'Worüber möchtest du mehr wissen?' : 'What would you like to know more about?'}
            placeholderTextColor="#999"
            value={searchInput}
            onChangeText={setSearchInput}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <MaterialIcons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {/* Categories Grid */}
        <FlatList
          data={informationCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          key={numColumns.toString()} // Force re-render when columns change
          contentContainerStyle={styles.categoriesContainer}
          showsVerticalScrollIndicator={false}
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
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
  categoriesContainer: {
    paddingBottom: 20,
  },
  categoryItem: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  iconContainer: {
    width: '100%',
    aspectRatio: 4/3,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 36,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default Information;
