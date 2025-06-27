
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CategoryCard from './CategoryCard';
import homeTutorialData from '../data/tutorial/home.json';
import indexTutorialData from '../data/tutorial/index.json';

interface TutorialSlideContentProps {
  currentSlide: number;
  languageCode: string;
  isWideScreen: boolean;
  tutorialData?: string;
}

const TutorialSlideContent: React.FC<TutorialSlideContentProps> = ({ 
  currentSlide, 
  languageCode, 
  isWideScreen,
  tutorialData = 'home'
}) => {
  const data = tutorialData === 'index' ? indexTutorialData : homeTutorialData;
  const slide = data.slides.find(s => s.id === currentSlide);
  
  if (!slide) {
    return null;
  }

  const getSlideContent = () => {
    switch (slide.type) {
      case 'welcome':
      case 'instruction':
      case 'feature':
        return (
          <View style={styles.slideContent}>
            <View style={styles.centerContent}>
              <MaterialIcons 
                name={getIconForSlide(slide.type, currentSlide)} 
                size={80} 
                color={getColorForSlide(slide.type, currentSlide)} 
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
      
      case 'confirmation':
        return (
          <View style={[styles.slideContent, isWideScreen && styles.slideContentWide]}>
            <View style={[styles.confirmationDemo, isWideScreen && styles.confirmationDemoWide]}>
              <View style={styles.mockConfirmationWindow}>
                <View style={styles.mockHeader}>
                  <Text style={styles.mockTitle}>Deutsch</Text>
                </View>
                <Text style={styles.mockMessage}>
                  Verstehst du Deutsch?{'\n'}Diese App wird ab jetzt auf Deutsch sein.{'\n'}Du kannst das später ändern.
                </Text>
                <View style={styles.mockButtons}>
                  <View style={[styles.mockButton, styles.mockDeclineButton]}>
                    <Text style={styles.mockButtonText}>Nein</Text>
                  </View>
                  <View style={[styles.mockButton, styles.mockAcceptButton]}>
                    <Text style={styles.mockButtonTextWhite}>Ja</Text>
                  </View>
                </View>
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
                  isInTutorial={true}
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
      
      default:
        return null;
    }
  };

  const getIconForSlide = (type: string, slideIndex: number) => {
    switch (type) {
      case 'welcome':
        return 'info';
      case 'instruction':
        return 'touch-app';
      case 'confirmation':
        return 'check-circle';
      case 'feature':
        return slideIndex === 3 ? 'record-voice-over' : slideIndex === 4 ? 'help' : 'mic';
      default:
        return 'info';
    }
  };

  const getColorForSlide = (type: string, slideIndex: number) => {
    switch (type) {
      case 'welcome':
        return '#3B82F6';
      case 'instruction':
        return '#10B981';
      case 'confirmation':
        return '#F59E0B';
      case 'feature':
        return slideIndex === 3 ? '#10B981' : slideIndex === 4 ? '#8B5CF6' : '#10B981';
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
  confirmationDemo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  confirmationDemoWide: {
    flex: 1,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
    maxWidth: '50%',
  },
  mockConfirmationWindow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    minWidth: 250,
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  mockHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  mockTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  mockMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  mockButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  mockButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  mockDeclineButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mockAcceptButton: {
    backgroundColor: '#10B981',
  },
  mockButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  mockButtonTextWhite: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
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
