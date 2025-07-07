import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal, 
  ScrollView, 
  useWindowDimensions,
  PanGestureHandler,
  GestureHandlerRootView,
  State
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TutorialSlideContent from './TutorialSlideContent';
import TutorialIndicators from './TutorialIndicators';
import TutorialNavigation from './TutorialNavigation';
import { getGlobalText } from '../utils/languageUtils';

interface TutorialModalProps {
  visible: boolean;
  onClose: () => void;
  languageCode: string;
  tutorialData?: string;
  onVirtualAssistant?: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ 
  visible, 
  onClose, 
  languageCode, 
  tutorialData = 'home',
  onVirtualAssistant
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { width } = useWindowDimensions();
  const isWideScreen = width > 768;

  // Different slide counts based on tutorial type
  const getTotalSlides = () => {
    switch (tutorialData) {
      case 'virtualAssistant':
        return 6;
      case 'index':
        return 6;
      case 'ask':
        return 12;
      case 'ask-general':
        return 9;
      case 'ask-emergency':
        return 12;
      case 'ask-legal-support':
        return 16;
      case 'ask-health':
        return 14; // New case for health tutorial
      default:
        return 8;
    }
  };

  const totalSlides = getTotalSlides();

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleClose = () => {
    setCurrentSlide(0);
    onClose();
  };

  const playAudio = () => {
    // TODO: Implement audio playback functionality
    console.log('Play audio for current slide:', currentSlide);
  };

  const onSwipeGesture = (event: any) => {
    if (!isWideScreen) {
      const { translationX, state } = event.nativeEvent;
      
      if (state === State.END) {
        if (translationX > 50 && currentSlide > 0) {
          // Swipe right - go to previous slide
          prevSlide();
        } else if (translationX < -50 && currentSlide < totalSlides - 1) {
          // Swipe left - go to next slide
          nextSlide();
        }
      }
    }
  };

  const modalContent = (
    <View style={[styles.modalContent, isWideScreen && styles.modalContentWide]}>
      {/* Header */}
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>
          {getGlobalText('tutorial', languageCode)}
        </Text>
        <TouchableOpacity onPress={handleClose}>
          <MaterialIcons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Slide Indicators */}
      <TutorialIndicators 
        totalSlides={totalSlides}
        currentSlide={currentSlide}
      />

      {/* Slide Content */}
      <ScrollView style={styles.slideContainer} showsVerticalScrollIndicator={false}>
        <TutorialSlideContent 
          currentSlide={currentSlide}
          languageCode={languageCode}
          isWideScreen={isWideScreen}
          tutorialData={tutorialData}
          onVirtualAssistant={onVirtualAssistant}
        />
      </ScrollView>

      {/* Navigation */}
      <TutorialNavigation 
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onPlayAudio={playAudio}
        onDone={handleClose}
        languageCode={languageCode}
      />
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        {isWideScreen ? (
          modalContent
        ) : (
          <GestureHandlerRootView style={styles.gestureContainer}>
            <PanGestureHandler onGestureEvent={onSwipeGesture}>
              {modalContent}
            </PanGestureHandler>
          </GestureHandlerRootView>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gestureContainer: {
    width: '95%',
    height: '85%',
  },
  modalContent: {
    width: '95%',
    maxWidth: 600,
    height: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalContentWide: {
    maxWidth: 900,
    height: '90%',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  slideContainer: {
    flex: 1,
  },
});

export default TutorialModal;
