
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
  useWindowDimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getCategoryLabel } from '../data/languages';
import PageNavigation from '../components/PageNavigation';

interface CategoryItem {
  id: string;
  icon: string;
  name: {
    en: string;
    de: string;
  };
}

const Information: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
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
    
    if (categoryId === 'german-learning') {
      router.push('/german-learning');
    } else {
      // For other categories, navigate to a new empty page with the category ID
      router.push(`/${categoryId}`);
    }
  };
  
  const informationCategories: CategoryItem[] = [
    { id: 'political-education', icon: '📚', name: { en: 'Political Education', de: 'Politische Bildung' } },
    { id: 'german-learning', icon: '🇩🇪', name: { en: 'Learn German', de: 'Deutsch Lernen' } },
    { id: 'work', icon: '💼', name: { en: 'Work and Career', de: 'Arbeit und Beruf' } },
    { id: 'ask-me', icon: '❓', name: { en: 'Just Ask Me', de: 'Frag mich einfach' } },
    { id: 'housing', icon: '🏠', name: { en: 'Housing', de: 'Wohnen' } },
    { id: 'finance', icon: '💰', name: { en: 'Finance', de: 'Finanzen' } },
    { id: 'culture', icon: '🎭', name: { en: 'Culture and Leisure', de: 'Kultur und Freizeit' } },
    { id: 'mobility', icon: '🚌', name: { en: 'Mobility', de: 'Mobilität' } },
    { id: 'health', icon: '🏥', name: { en: 'Health', de: 'Gesundheit' } },
    { id: 'education', icon: '🎓', name: { en: 'Education and Childcare', de: 'Bildung und Kinderbetreuung' } },
    { id: 'funding', icon: '💶', name: { en: 'Funding', de: 'Förderungen' } },
    { id: 'volunteering', icon: '🤝', name: { en: 'Volunteering', de: 'Mithelfen' } },
    { id: 'contacts', icon: '📞', name: { en: 'Important Contacts and Legal Help', de: 'Wichtige Kontakte und rechtliche Hilfe' } },
    { id: 'translation', icon: '🔄', name: { en: 'Translation', de: 'Übersetzen' } },
  ];
  
  // Calculate how many columns based on screen width
  const getNumColumns = () => {
    if (width > 1100) return 4;
    if (width > 800) return 3;
    if (width > 500) return 2;
    return 1;
  };
  
  const numColumns = getNumColumns();
  
  const renderCategoryItem = ({ item }: { item: CategoryItem }) => {
    // Calculate item width based on number of columns
    const itemWidth = (width - ((numColumns + 1) * 16)) / numColumns;
    
    return (
      <TouchableOpacity 
        style={[styles.categoryItem, { width: itemWidth }]}
        onPress={() => handleCategoryPress(item.id)}
      >
        <Text style={styles.categoryIcon}>{item.icon}</Text>
        <Text style={styles.categoryTitle}>
          {language.code === 'de' ? item.name.de : item.name.en}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
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
    margin: 8,
    aspectRatio: 1,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default Information;
