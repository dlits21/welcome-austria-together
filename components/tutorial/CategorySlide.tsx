
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CategoryCard from '../CategoryCard';

interface CategorySlideProps {
  slide: any;
  languageCode: string;
  isWideScreen: boolean;
  getCategoryHelper: (key: string, languageCode: string) => string;
}

const CategorySlide: React.FC<CategorySlideProps> = ({ 
  slide, 
  languageCode, 
  isWideScreen,
  getCategoryHelper
}) => {
  return (
    <View style={[styles.slideContent, isWideScreen && styles.slideContentWide]}>
      <View style={[styles.tileShowcase, isWideScreen && styles.tileShowcaseWide]}>
        <View style={[styles.categoryCardContainer, isWideScreen && styles.categoryCardContainerWide]}>
          <CategoryCard 
            title={getCategoryHelper(slide.category!.title, languageCode)}
            description={getCategoryHelper(slide.category!.description, languageCode)}
            icon={slide.category!.icon as keyof typeof MaterialIcons.glyphMap}
            color={slide.category!.color}
            onPress={() => {}}
            isInTutorial={true}
          />
        </View>
      </View>
      <View style={[styles.slideInfo, isWideScreen && styles.slideInfoWide]}>
        <Text style={[styles.slideTitle, isWideScreen && styles.slideTitleWide]}>
          {slide.title[languageCode] || slide.title.en}
        </Text>
        <Text style={[styles.slideText, isWideScreen && styles.slideTextWide]}>
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
  slideContentWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 0,
    minHeight: 500,
    padding: 16,
  },
  tileShowcase: {
    alignItems: 'center',
    marginBottom: 24,
  },
  tileShowcaseWide: {
    flex: 1,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
    maxWidth: '50%',
  },
  categoryCardContainer: {
    width: '100%',
    maxWidth: 280,
  },
  categoryCardContainerWide: {
    width: '100%',
    maxWidth: 240,
  },
  slideInfo: {
    flex: 1,
  },
  slideInfoWide: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
    maxWidth: '50%',
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 34,
    marginBottom: 34,
    textAlign: 'center',
    color: '#333',
  },
  slideTitleWide: {
    textAlign: 'left',
    fontSize: 26,
  },
  slideText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign: 'center',
  },
  slideTextWide: {
    textAlign: 'left',
    fontSize: 17,
    lineHeight: 25,
  },
});

export default CategorySlide;
