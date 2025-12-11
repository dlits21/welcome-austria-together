
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from "../../contexts/LanguageContext";

export const getIconForSlide = (type: string, slideIndex: number) => {
    switch (type) {
      case 'welcome':
        return 'info';
      case 'instruction':
        return 'touch-app';
      case 'confirmation':
        return 'check-circle';
      case 'language':
        return 'language';
      case 'icons':
        return 'help';
      case 'feature':
        return 'record-voice-over';
      default:
        return 'info';
    }
};

export const getColorForSlide = (type: string, slideIndex: number) => {
    switch (type) {
      case 'welcome':
        return '#3B82F6';
      case 'instruction':
        return '#10B981';
      case 'confirmation':
        return '#F59E0B';
      case 'icons':
        return '#8B5CF6';
      case 'feature':
        return '#10B981';
      default:
        return '#3B82F6';
    }
};

interface BasicSlideProps {
  slide: any;
  currentSlide: number;
}

const BasicSlide: React.FC<BasicSlideProps> = ({ 
  slide, 
  currentSlide
}) => {
  const { icon } = getIconForSlide(slide.type, currentSlide);
  const { color } = getColorForSlide(slide.type, currentSlide)
  const { currentLanguage } = useLanguage();

  return (
    <View style={styles.slideContent}>
      <View style={styles.centerContent}>
        <MaterialIcons 
          name={icon} 
          size={80} 
          color={color} 
        />
        <Text style={styles.slideTitle}>
          {slide.title[currentLanguage.code] || slide.title.de}
        </Text>
        <Text style={styles.slideText}>
          {slide.text[currentLanguage.code] || slide.text.de}
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
