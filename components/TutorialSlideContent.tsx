
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getGlobalText } from '../utils/languageUtils';

interface TutorialSlideContentProps {
  currentSlide: number;
  languageCode: string;
  isWideScreen: boolean;
  tutorialData: string;
  onVirtualAssistant?: () => void;
}

const TutorialSlideContent: React.FC<TutorialSlideContentProps> = ({
  currentSlide,
  languageCode,
  isWideScreen,
  tutorialData,
  onVirtualAssistant,
}) => {
  const getTutorialContent = () => {
    try {
      let tutorialFile;
      
      switch (tutorialData) {
        case 'virtualAssistant':
          tutorialFile = require('../data/tutorial/virtualAssistant.json');
          break;
        case 'index':
          tutorialFile = require('../data/tutorial/index.json');
          break;
        case 'ask':
          tutorialFile = require('../data/tutorial/ask.json');
          break;
        case 'ask-general':
          tutorialFile = require('../data/tutorial/ask/general.json');
          break;
        case 'ask-emergency':
          tutorialFile = require('../data/tutorial/ask/emergency.json');
          break;
        case 'ask-legal-support':
          tutorialFile = require('../data/tutorial/ask/legal-support.json');
          break;
        default:
          tutorialFile = require('../data/tutorial/home.json');
      }

      const slides = tutorialFile[languageCode]?.slides || tutorialFile['en']?.slides || [];
      return slides[currentSlide] || { title: 'Tutorial', content: 'Welcome to the tutorial!' };
    } catch (error) {
      console.error('Error loading tutorial content:', error);
      return { title: 'Tutorial', content: 'Welcome to the tutorial!' };
    }
  };

  const slideContent = getTutorialContent();

  return (
    <View style={[styles.slideContent, isWideScreen && styles.slideContentWide]}>
      <Text style={styles.slideTitle}>
        {slideContent.title}
      </Text>
      
      <Text style={styles.slideText}>
        {slideContent.content}
      </Text>

      {tutorialData === 'home' && currentSlide === 6 && onVirtualAssistant && (
        <TouchableOpacity
          style={styles.virtualAssistantButton}
          onPress={onVirtualAssistant}
        >
          <MaterialIcons name="record-voice-over" size={24} color="#fff" />
          <Text style={styles.virtualAssistantButtonText}>
            {getGlobalText('tryVirtualAssistant', languageCode)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  slideContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  slideContentWide: {
    padding: 40,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  slideText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  virtualAssistantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    gap: 8,
  },
  virtualAssistantButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TutorialSlideContent;
