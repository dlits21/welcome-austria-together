
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
                {slide.title[languageCode] || slide.title.en}
              </Text>
              <Text style={styles.slideText}>
                {slide.text[languageCode] || slide.text.en}
              </Text>
            </View>
          </View>
        );
      
      case 'category':
        return (
          <View style={[styles.slideContent, isWideScreen && styles.slideContentWide]}>
            <View style={[styles.tileShowcase, isWideScreen && styles.tileShowcaseWide]}>
              <View style={[styles.categoryCardContainer, isWideScreen && styles.categoryCardContainerWide]}>
                <CategoryCard 
                  title={slide.category!.title[languageCode] || slide.category!.title.en}
                  description={slide.category!.description[languageCode] || slide.category!.description.en}
                  icon={slide.category!.icon as keyof typeof MaterialIcons.glyphMap}
                  color={slide.category!.color}
                  onPress={() => {}}
                />
              </View>
            </View>
            <View style={[styles.slideInfo, isWideScreen && styles.slideInfoWide]}>
              <Text style={[styles.slideTitle, isWideScreen && styles.slideTitleWide]}>
                {slide.title[languageCode] || slide.title.en}
              </Text>
              <Text style={[styles.slideText, isWideScreen && styles.slideTextWide]}>
                {slide.text[languageCode] || slide.text.en}
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
                {slide.title[languageCode] || slide.title.en}
              </Text>
              <Text style={styles.slideText}>
                {slide.text[languageCode] || slide.text.en}
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
    alignItems: 'stretch',
    gap: 0,
    minHeight: 500,
    padding: 16,
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
    flex: 1,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
    maxWidth: '50%',
  },
  categoryCardContainer: {
    width: '100%',
    maxWidth: 280,
  },
  categoryCardContainerWide: {
    width: '100%',
    maxWidth: 240,
    transform: [{ scale: 0.75 }],
  },
  slideInfo: {
    flex: 1,
  },
  slideInfoWide: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
    maxWidth: '50%',
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  slideTitleWide: {
    textAlign: 'left',
    fontSize: 26,
  },
  slideText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign: 'center',
  },
  slideTextWide: {
    textAlign: 'left',
    fontSize: 17,
    lineHeight: 25,
  },
});

export default TutorialSlideContent;
