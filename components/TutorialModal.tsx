
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TutorialSlideContent from './TutorialSlideContent';
import TutorialIndicators from './TutorialIndicators';
import TutorialNavigation from './TutorialNavigation';

interface TutorialModalProps {
  visible: boolean;
  onClose: () => void;
  languageCode: string;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ visible, onClose, languageCode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { width } = useWindowDimensions();
  const isWideScreen = width > 768;

  const totalSlides = 7;

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

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, isWideScreen && styles.modalContentWide]}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {languageCode === 'de' ? 'Tutorial' : 'Tutorial'}
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
