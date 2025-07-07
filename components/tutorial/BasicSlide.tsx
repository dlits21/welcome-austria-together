
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getSlideIconAndColor } from '../../utils/tutorialUtils';

interface BasicSlideProps {
  slide: any;
  currentSlide: number;
  languageCode: string;
  tutorialData: string;
}

const BasicSlide: React.FC<BasicSlideProps> = ({ 
  slide, 
  currentSlide, 
  languageCode, 
  tutorialData 
}) => {
  const { icon, color } = getSlideIconAndColor(slide.type, currentSlide, tutorialData);

  return (
    <View style={styles.slideContent}>
      <View style={styles.centerContent}>
        <MaterialIcons 
          name={icon} 
          size={80} 
          color={color} 
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
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 34,
    marginBottom: 34,
    textAlign: 'center',
    color: '#333',
  },
  slideText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign: 'center',
  },
});

export default BasicSlide;
