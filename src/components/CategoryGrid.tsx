
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getCategoryLabel } from '../data/languages';
import CategoryCard from './CategoryCard';

interface CategoryGridProps {
  handleCategoryClick: (category: string) => void;
}

const CategoryGrid = ({ handleCategoryClick }: CategoryGridProps) => {
  const { currentLanguage } = useLanguage();
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const getCardDescription = (category: string) => {
    // Placeholder descriptions - these would come from a language file in a real app
    switch (category) {
      case 'information':
        return language.code === 'de' ? 'Informationen über das Programm' : 'Information about the program';
      case 'courses':
        return language.code === 'de' ? 'Verfügbare Kurse' : 'Available courses';
      case 'community':
        return language.code === 'de' ? 'Gemeinschaftsaktivitäten' : 'Community activities';
      case 'videos':
        return language.code === 'de' ? 'Lernvideos' : 'Learning videos';
      default:
        return '';
    }
  };

  return (
    <View style={styles.grid}>
      <View style={styles.row}>
        <CategoryCard
          icon="info"
          title={getCategoryLabel(language.code, 'information')}
          category="information"
          color="#3b82f6"
          description={getCardDescription('information')}
          onPress={handleCategoryClick}
        />
        
        <CategoryCard
          icon="book-open"
          title={getCategoryLabel(language.code, 'courses')}
          category="courses"
          color="#10b981"
          description={getCardDescription('courses')}
          onPress={handleCategoryClick}
        />
      </View>
      
      <View style={styles.row}>
        <CategoryCard
          icon="users"
          title={getCategoryLabel(language.code, 'community')}
          category="community"
          color="#8b5cf6"
          description={getCardDescription('community')}
          onPress={handleCategoryClick}
        />
        
        <CategoryCard
          icon="play-square"
          title={language.code === 'de' ? 'Videos' : 'Videos'}
          category="videos"
          color="#ef4444"
          description={getCardDescription('videos')}
          onPress={handleCategoryClick}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    width: '100%',
    maxWidth: 600,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
});

export default CategoryGrid;
