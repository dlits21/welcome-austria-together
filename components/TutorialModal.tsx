
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CategoryCard from './CategoryCard';

interface TutorialModalProps {
  visible: boolean;
  onClose: () => void;
  languageCode: string;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ visible, onClose, languageCode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { width } = useWindowDimensions();
  const isWideScreen = width > 768;

  const totalSlides = 6;

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

  const getSlideContent = () => {
    switch (currentSlide) {
      case 0:
        return (
          <View style={styles.slideContent}>
            <View style={styles.centerContent}>
              <MaterialIcons name="info" size={80} color="#3B82F6" />
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? 'Willkommen zur Plattform!' : 'Welcome to the Platform!'}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' 
                  ? 'Diese Plattform bietet Ihnen Zugang zu wichtigen Informationen, Lernmaterialien und Community-Ressourcen. Navigieren Sie durch die verschiedenen Bereiche, um die Unterstützung zu finden, die Sie benötigen.'
                  : 'This platform provides you with access to important information, learning materials, and community resources. Navigate through the different sections to find the support you need.'}
              </Text>
            </View>
          </View>
        );
      case 1:
        return (
          <View style={[styles.slideContent, isWideScreen && styles.slideContentWide]}>
            <View style={[styles.tileShowcase, isWideScreen && styles.tileShowcaseWide]}>
              <CategoryCard 
                title={languageCode === 'de' ? 'Fragen' : 'Ask'}
                description={languageCode === 'de' ? 'Stellen Sie Fragen' : 'Ask questions'}
                icon="question-answer"
                color="#3B82F6"
                onPress={() => {}}
              />
            </View>
            <View style={styles.slideInfo}>
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? 'Fragen Bereich' : 'Ask Section'}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' 
                  ? 'Hier können Sie Fragen zu verschiedenen Themen stellen und Unterstützung von Experten erhalten.'
                  : 'Here you can ask questions on various topics and get support from experts.'}
              </Text>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={[styles.slideContent, isWideScreen && styles.slideContentWide]}>
            <View style={[styles.tileShowcase, isWideScreen && styles.tileShowcaseWide]}>
              <CategoryCard 
                title={languageCode === 'de' ? 'Informationen' : 'Information'}
                description={languageCode === 'de' ? 'Wichtige Informationen' : 'Important information'}
                icon="info"
                color="#10B981"
                onPress={() => {}}
              />
            </View>
            <View style={styles.slideInfo}>
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? 'Informationen Bereich' : 'Information Section'}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' 
                  ? 'Finden Sie wichtige Informationen zu Gesundheit, Bildung, Finanzen und mehr.'
                  : 'Find important information about health, education, finances, and more.'}
              </Text>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={[styles.slideContent, isWideScreen && styles.slideContentWide]}>
            <View style={[styles.tileShowcase, isWideScreen && styles.tileShowcaseWide]}>
              <CategoryCard 
                title={languageCode === 'de' ? 'Lernen' : 'Learn'}
                description={languageCode === 'de' ? 'Lernmaterialien' : 'Learning materials'}
                icon="menu-book"
                color="#8B5CF6"
                onPress={() => {}}
              />
            </View>
            <View style={styles.slideInfo}>
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? 'Lernen Bereich' : 'Learn Section'}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' 
                  ? 'Zugang zu Kursen, Sprachlernmaterialien und Bildungsressourcen.'
                  : 'Access courses, language learning materials, and educational resources.'}
              </Text>
            </View>
          </View>
        );
      case 4:
        return (
          <View style={[styles.slideContent, isWideScreen && styles.slideContentWide]}>
            <View style={[styles.tileShowcase, isWideScreen && styles.tileShowcaseWide]}>
              <CategoryCard 
                title={languageCode === 'de' ? 'Community' : 'Community'}
                description={languageCode === 'de' ? 'Gemeinschaftsressourcen' : 'Community resources'}
                icon="people"
                color="#F97316"
                onPress={() => {}}
              />
            </View>
            <View style={styles.slideInfo}>
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? 'Community Bereich' : 'Community Section'}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' 
                  ? 'Verbinden Sie sich mit anderen, teilen Sie Erfahrungen und finden Sie lokale Unterstützung.'
                  : 'Connect with others, share experiences, and find local support.'}
              </Text>
            </View>
          </View>
        );
      case 5:
        return (
          <View style={styles.slideContent}>
            <View style={styles.centerContent}>
              <MaterialIcons name="mic" size={80} color="#10B981" />
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? 'Sprach-Assistent' : 'Voice Assistant'}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' 
                  ? 'Verwenden Sie das Mikrofon-Symbol oben rechts, um mit dem Sprach-Assistenten zu sprechen. Er kann Ihnen bei der Navigation helfen und Fragen beantworten.'
                  : 'Use the microphone icon in the top right to speak with the voice assistant. It can help you navigate and answer questions.'}
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
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
          <View style={styles.slideIndicators}>
            {Array.from({ length: totalSlides }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentSlide && styles.activeIndicator
                ]}
              />
            ))}
          </View>

          {/* Slide Content */}
          <ScrollView style={styles.slideContainer} showsVerticalScrollIndicator={false}>
            {getSlideContent()}
          </ScrollView>

          {/* Navigation */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[styles.navButton, currentSlide === 0 && styles.navButtonDisabled]}
              onPress={prevSlide}
              disabled={currentSlide === 0}
            >
              <MaterialIcons 
                name="arrow-back" 
                size={24} 
                color={currentSlide === 0 ? "#ccc" : "#333"} 
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.audioButton}
              onPress={playAudio}
            >
              <MaterialIcons name="volume-up" size={24} color="#fff" />
              <Text style={styles.audioButtonText}>
                {languageCode === 'de' ? 'Anhören' : 'Listen'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, currentSlide === totalSlides - 1 && styles.navButtonDisabled]}
              onPress={nextSlide}
              disabled={currentSlide === totalSlides - 1}
            >
              <MaterialIcons 
                name="arrow-forward" 
                size={24} 
                color={currentSlide === totalSlides - 1 ? "#ccc" : "#333"} 
              />
            </TouchableOpacity>
          </View>
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
  slideIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  activeIndicator: {
    backgroundColor: '#3B82F6',
    width: 24,
  },
  slideContainer: {
    flex: 1,
  },
  slideContent: {
    flex: 1,
    padding: 24,
    minHeight: 400,
  },
  slideContentWide: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 1,
    marginBottom: 0,
  },
  slideInfo: {
    flex: 1,
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
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#f8f8f8',
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  audioButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TutorialModal;
