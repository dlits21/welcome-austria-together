
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface TutorialNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onPlayAudio: () => void;
  onDone: () => void;
  languageCode: string;
}

const TutorialNavigation: React.FC<TutorialNavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onPlayAudio,
  onDone,
  languageCode
}) => {
  const isLastSlide = currentSlide === totalSlides - 1;

  return (
    <View style={styles.navigationContainer}>
      <TouchableOpacity
        style={[styles.navButton, currentSlide === 0 && styles.navButtonDisabled]}
        onPress={onPrevious}
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
        onPress={onPlayAudio}
      >
        <MaterialIcons name="volume-up" size={24} color="#fff" />
        <Text style={styles.audioButtonText}>
          {languageCode === 'de' ? 'Anhören' : 'Listen'}
        </Text>
      </TouchableOpacity>

      {isLastSlide ? (
        <TouchableOpacity
          style={styles.doneButton}
          onPress={onDone}
        >
          <Text style={styles.doneButtonText}>
            {languageCode === 'de' ? 'Fertig' : 'Done'}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.navButton}
          onPress={onNext}
        >
          <MaterialIcons name="arrow-forward" size={24} color="#333" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  doneButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TutorialNavigation;
