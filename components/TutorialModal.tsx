
import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, Dimensions, Platform } from 'react-native';
import TutorialSlideContent from './TutorialSlideContent';
import TutorialNavigation from './TutorialNavigation';
import TutorialIndicators from './TutorialIndicators';

// Import tutorial data
import indexTutorialData from '../data/tutorial/index.json';
import askTutorialData from '../data/tutorial/ask.json';
import askGeneralTutorialData from '../data/tutorial/ask/general.json';

interface TutorialModalProps {
  visible: boolean;
  onClose: () => void;
  languageCode: string;
  tutorialType?: 'index' | 'ask' | 'ask-general';
}

const TutorialModal: React.FC<TutorialModalProps> = ({
  visible,
  onClose,
  languageCode,
  tutorialType = 'index'
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { width, height } = Dimensions.get('window');
  const isWideScreen = width > 768;

  // Get tutorial data based on type
  let tutorialData;
  switch (tutorialType) {
    case 'ask-general':
      tutorialData = askGeneralTutorialData;
      break;
    case 'ask':
      tutorialData = askTutorialData;
      break;
    default:
      tutorialData = indexTutorialData;
  }
  
  const slides = tutorialData.slides;

  useEffect(() => {
    if (visible) {
      setCurrentSlide(0);
    }
  }, [visible]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      statusBarTranslucent={Platform.OS === 'android'}
    >
      <View style={[styles.container, isWideScreen && styles.wideContainer]}>
        <View style={[styles.content, isWideScreen && styles.wideContent]}>
          <TutorialSlideContent
            slide={slides[currentSlide]}
            languageCode={languageCode}
            tutorialType={tutorialType}
            onVirtualAssistant={onClose}
          />
        </View>
        
        <View style={styles.footer}>
          <TutorialIndicators
            totalSlides={slides.length}
            currentSlide={currentSlide}
            onSlidePress={goToSlide}
          />
          
          <TutorialNavigation
            currentSlide={currentSlide}
            totalSlides={slides.length}
            onNext={nextSlide}
            onPrev={prevSlide}
            onClose={onClose}
            languageCode={languageCode}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  wideContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  wideContent: {
    maxWidth: 800,
    maxHeight: 600,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});

export default TutorialModal;
