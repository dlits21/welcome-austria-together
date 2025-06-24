
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface TutorialIndicatorsProps {
  totalSlides: number;
  currentSlide: number;
}

const TutorialIndicators: React.FC<TutorialIndicatorsProps> = ({ 
  totalSlides, 
  currentSlide 
}) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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
});

export default TutorialIndicators;
