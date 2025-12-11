
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  useWindowDimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import TutorialSlideContent from './tutorial/TutorialSlideContent';
import TutorialIndicators from './tutorial/TutorialIndicators';
import TutorialNavigation from './tutorial/TutorialNavigation';
import { PanGestureHandler, GestureHandlerRootView, State } from 'react-native-gesture-handler';
import homeTutorialData from '../data/tutorial/home.json';
import indexTutorialData from '../data/tutorial/index.json';
import emergencyTutorial from '../data/tutorial/emergency.json';

export const getTutorialData = (tutorialData: string) => {
  switch (tutorialData) {
    case 'index':
      return indexTutorialData;
    case 'emergency':
      return emergencyTutorial;
    default:
      return homeTutorialData;
  }
};

interface TutorialModalProps {
  visible: boolean;
  onClose: () => void;
  tutorialData?: string
}

const TutorialModal: React.FC<TutorialModalProps> = ({
  visible,
  onClose,
  tutorialData = 'home'
}) => {
  const { t } = useTranslation('common');

  const [currentSlide, setCurrentSlide] = useState(0);
  const { width } = useWindowDimensions();
  const isWideScreen = width > 768;

  const data = getTutorialData(tutorialData);
  const totalSlides = data.length;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      console.log("currentSlide", currentSlide)
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

  const onSwipeGestureStateChange = (event: any) => {
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
        else if (translationX < -50) {
            handleClose();
        }
      }
    }
  };

  const modalContent = (
    <View style={[styles.modalContent, isWideScreen && styles.modalContentWide]}>
      {/* Header */}
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>
          {t('tutorial')}
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
          data={data}
          currentSlide={currentSlide}
          isWideScreen={isWideScreen}
        />
      </ScrollView>

      {/* Navigation */}
      <TutorialNavigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onDone={handleClose}
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
            <PanGestureHandler onHandlerStateChange={onSwipeGestureStateChange}>
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
    paddingHorizontal: 10,
  },
  gestureContainer: {
    width: '100%',
    maxWidth: 400,
    height: '80%',
    alignSelf: 'center',
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'center',
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
