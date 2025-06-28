
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

interface TutorialIndicatorsProps {
  totalSlides: number;
  currentSlide: number;
  onSlidePress: (index: number) => void;
}

const TutorialIndicators: React.FC<TutorialIndicatorsProps> = ({ 
  totalSlides, 
  currentSlide,
  onSlidePress
}) => {
  return (
    <View style={styles.slideIndicators}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSlidePress(index)}
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
