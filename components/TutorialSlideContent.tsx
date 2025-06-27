
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CategoryCard from './CategoryCard';
import tutorialData from '../data/tutorial/home.json';

interface TutorialSlideContentProps {
  currentSlide: number;
  languageCode: string;
  isWideScreen: boolean;
}

const TutorialSlideContent: React.FC<TutorialSlideContentProps> = ({ 
  currentSlide, 
  languageCode, 
  isWideScreen 
}) => {
  const slide = tutorialData.slides.find(s => s.id === currentSlide);
  
  if (!slide) {
    return null;
  }

  const getSlideContent = () => {
    switch (slide.type) {
      case 'welcome':
        return (
          <View style={styles.slideContent}>
            <View style={styles.centerContent}>
              <MaterialIcons name="info" size={80} color="#3B82F6" />
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? slide.title.de : slide.title.en}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' ? slide.text.de : slide.text.en}
              </Text>
            </View>
          </View>
        );
      
      case 'category':
        return (
          <View style={[styles.slideContent, isWideScreen && styles.slideContentWide]}>
            <View style={[styles.tileShowcase, isWideScreen && styles.tileShowcaseWide]}>
              <View style={styles.smallCategoryCard}>
                <CategoryCard 
                  title={languageCode === 'de' ? slide.category!.title.de : slide.category!.title.en}
                  description={languageCode === 'de' ? slide.category!.description.de : slide.category!.description.en}
                  icon={slide.category!.icon as keyof typeof MaterialIcons.glyphMap}
                  color={slide.category!.color}
                  onPress={() => {}}
                />
              </View>
            </View>
            <View style={styles.slideInfo}>
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? slide.title.de : slide.title.en}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' ? slide.text.de : slide.text.en}
              </Text>
            </View>
          </View>
        );
      
      case 'feature':
        return (
          <View style={styles.slideContent}>
            <View style={styles.centerContent}>
              <MaterialIcons 
                name={currentSlide === 5 ? "mic" : "language"} 
                size={80} 
                color={currentSlide === 5 ? "#10B981" : "#8B5CF6"} 
              />
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? slide.title.de : slide.title.en}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' ? slide.text.de : slide.text.en}
              </Text>
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return getSlideContent();
};

const styles = StyleSheet.create({
  slideContent: {
    flex: 1,
    padding: 24,
    minHeight: 400,
  },
  slideContentWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 32,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  tileShowcase: {
    alignItems: 'center',
    marginBottom: 24,
  },
  tileShowcaseWide: {
    flex: 0.4,
    marginBottom: 0,
    maxWidth: '40%',
  },
  smallCategoryCard: {
    transform: [{ scale: 0.7 }],
    maxWidth: 200,
  },
  slideInfo: {
    flex: 0.6,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  slideText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign: 'center',
  },
});

export default TutorialSlideContent;
