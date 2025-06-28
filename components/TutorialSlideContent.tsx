
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CategoryCard from './CategoryCard';
import { GermanFlag } from './Flags';
import { getGlobalText } from '../utils/languageUtils';

interface TutorialSlideContentProps {
  slide: any;
  languageCode: string;
  tutorialType?: string;
  onVirtualAssistant?: () => void;
}

// Languages for text rotation
const languages = [
  { code: "de", name: "Deutsch" },
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "ce", name: "Нохчийн" },
  { code: "prs", name: "دری" },
  { code: "ps", name: "پښتو" },
  { code: "fa", name: "فارسی" },
  { code: "ar", name: "العربية" },
  { code: "ku", name: "Kurdî" },
  { code: "so", name: "Soomaali" },
  { code: "ka", name: "ქართული" },
  { code: "sq", name: "Shqip" }
];

const TutorialSlideContent: React.FC<TutorialSlideContentProps> = ({ 
  slide, 
  languageCode, 
  tutorialType = 'index',
  onVirtualAssistant
}) => {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);

  // Rotate all text every 5 seconds for assistant slides
  useEffect(() => {
    if (slide?.type === 'assistant') {
      const interval = setInterval(() => {
        setCurrentLanguageIndex((prevIndex) => (prevIndex + 1) % languages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slide?.type]);
  
  if (!slide) {
    return (
      <View style={styles.slideContent}>
        <View style={styles.centerContent}>
          <MaterialIcons name="info" size={80} color="#3B82F6" />
          <Text style={styles.slideTitle}>Tutorial Loading...</Text>
        </View>
      </View>
    );
  }

  const getSlideContent = () => {
    switch (slide.type) {
      case 'assistant':
        const currentLanguage = languages[currentLanguageIndex];
        const currentTitle = slide.title?.[currentLanguage.code] || slide.title?.en || '';
        const currentText = slide.description?.[currentLanguage.code] || slide.description?.en || '';
        const currentButtonText = getGlobalText('help', currentLanguage.code);
        
        return (
          <View style={styles.slideContent}>
            <View style={styles.assistantContainer}>
              <Image 
                source={require('../assets/images/assistant.jpg')}
                style={styles.assistantImage}
                resizeMode="cover"
              />
              <View style={styles.speechBubble}>
                <Text style={styles.speechText}>
                  {currentTitle}
                </Text>
                <View style={styles.speechArrow} />
              </View>
            </View>
            <Text style={styles.assistantDescription}>
              {currentText}
            </Text>
            <TouchableOpacity 
              style={styles.assistantButton}
              onPress={onVirtualAssistant}
            >
              <Text style={styles.assistantButtonText}>
                {currentButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        );
      
      case 'welcome':
      case 'instruction':
      case 'feature':
      case 'category':
      case 'icons':
        return (
          <View style={styles.slideContent}>
            <View style={styles.centerContent}>
              <MaterialIcons 
                name={getIconForSlide(slide.type)} 
                size={80} 
                color={getColorForSlide(slide.type)} 
              />
              <Text style={styles.slideTitle}>
                {slide.title?.[languageCode] || slide.title?.en || 'Tutorial'}
              </Text>
              <Text style={styles.slideText}>
                {slide.description?.[languageCode] || slide.description?.en || 'Loading content...'}
              </Text>
            </View>
          </View>
        );
      
      default:
        return (
          <View style={styles.slideContent}>
            <View style={styles.centerContent}>
              <MaterialIcons name="info" size={80} color="#3B82F6" />
              <Text style={styles.slideTitle}>
                {slide.title?.[languageCode] || slide.title?.en || 'Tutorial'}
              </Text>
              <Text style={styles.slideText}>
                {slide.description?.[languageCode] || slide.description?.en || 'Loading content...'}
              </Text>
            </View>
          </View>
        );
    }
  };

  const getIconForSlide = (type: string) => {
    switch (type) {
      case 'welcome':
        return 'waving-hand';
      case 'instruction':
        return 'touch-app';
      case 'feature':
        return 'star';
      case 'category':
        return 'category';
      case 'icons':
        return 'navigation';
      default:
        return 'info';
    }
  };

  const getColorForSlide = (type: string) => {
    switch (type) {
      case 'welcome':
        return '#3B82F6';
      case 'instruction':
        return '#10B981';
      case 'feature':
        return '#F59E0B';
      case 'category':
        return '#8B5CF6';
      case 'icons':
        return '#EF4444';
      default:
        return '#3B82F6';
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  assistantContainer: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  assistantImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  speechBubble: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 20,
    maxWidth: 280,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  speechText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  speechArrow: {
    position: 'absolute',
    top: -10,
    left: '50%',
    marginLeft: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#f0f0f0',
  },
  assistantDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  assistantButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'center',
  },
  assistantButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
    paddingHorizontal: 20,
  },
});

export default TutorialSlideContent;
