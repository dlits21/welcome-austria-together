import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import CategoryCard from './CategoryCard';
import { useTranslation, Trans } from 'react-i18next';
import * as Speech from 'expo-speech';

interface CategoryGridProps {
  onCategoryClick: (category: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryClick }) => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation('home');

  // Determine how many cards per row based on screen width
  let containerStyle = styles.oneColumnGrid; // default for very narrow screens

  if (width > 1100) {
    containerStyle = styles.fourColumnGrid; // 4 cards per row
  } else if (width > 800) {
    containerStyle = styles.threeColumnGrid; // 3 cards per row
  } else if (width > 500) {
    containerStyle = styles.twoColumnGrid; // 2 cards per row
  }
  const size = width < 420 ? 'small' : width < 800 ? 'medium' : 'large';

  const speak = (text: string) => {
    if (text) {
      Speech.speak(text, { language: t('tts_lang', { defaultValue: 'de-DE' }) });
    }
  };

  return (
    <View style={[styles.categoryGrid, containerStyle]}>
      <CategoryCard
        title={t('support_title')}
        subtitle={<Trans i18nKey="support_subtitle" ns="home" />}
        icon="record-voice-over" // changed to speaking person
        color="#3B82F6" // blue
        onPress={() => onCategoryClick('ask')}
        onLongPress={() => speak(`${t('support_title')} ${t('support_subtitle')}`)}
      />

      <CategoryCard
        title={t('guide_title')}
        subtitle={<Trans i18nKey="guide_subtitle" ns="home" />}
        icon="map" // MaterialIcons "map" for journey/guide
        color="#F59E0B" // amber
        onPress={() => onCategoryClick('guide')}
        onLongPress={() => speak(`${t('guide_title')} ${t('guide_subtitle')}`)}
      />

      <CategoryCard
        title={t('info_title')}
        subtitle={<Trans i18nKey="info_subtitle" ns="home" />}
        icon="info"
        color="#10B981" // green
        onPress={() => onCategoryClick('information')}
        onLongPress={() => speak(`${t('info_title')} ${t('info_subtitle')}`)}
      />

      <CategoryCard
        title={t('learn_title')}
        subtitle={<Trans i18nKey="learn_subtitle" ns="home" />}
        icon="menu-book"
        color="#8B5CF6" // purple
        onPress={() => onCategoryClick('learn')}
        onLongPress={() => speak(`${t('learn_title')} ${t('learn_subtitle')}`)}
      />

      <CategoryCard
        title={t('community_title')}
        subtitle={<Trans i18nKey="community_subtitle" ns="home" />}
        icon="people"
        color="#F97316" // orange
        onPress={() => onCategoryClick('community')}
        onLongPress={() => speak(`${t('community_title')} ${t('community_subtitle')}`)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fourColumnGrid: {},
  threeColumnGrid: {},
  twoColumnGrid: {},
  oneColumnGrid: {}
});

export default CategoryGrid;
