import React from 'react';
import { StyleSheet, View, useWindowDimensions, Platform } from 'react-native';
import CategoryCard from './CategoryCard';
import { useTranslation, Trans } from 'react-i18next';

interface CategoryGridProps {
  onCategoryClick: (category: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryClick }) => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation('home');

  let cardHeight = 400;
  if (width > 1100) cardHeight= 420;
  else if (width > 800) cardHeight= 440;
  else if (width > 500) cardHeight= 400;
  else cardHeight= 350;

  return (
    <View style={[styles.categoryGrid]}>
      <CategoryCard
        title={t('support_title')}
        subtitle={<Trans i18nKey="support_subtitle" ns="home" />}
        icon="groups" // changed to speaking person
        color="rgba(210, 141, 14, 0.5)"
        onPress={() => onCategoryClick('support')}
        height={cardHeight}
      />

      <CategoryCard
        title={t('guide_title')}
        subtitle={<Trans i18nKey="guide_subtitle" ns="home" />}
        icon="map" // MaterialIcons "map" for journey/guide
        color="rgba(74, 118, 52, 0.5)"
        onPress={() => onCategoryClick('guide')}
        height={cardHeight}
      />

      <CategoryCard
        title={t('info_title')}
        subtitle={<Trans i18nKey="info_subtitle" ns="home" />}
        icon="info-outline"
        color="rgba(221, 7, 121, 0.5)"
        onPress={() => onCategoryClick('information')}
        height={cardHeight}
      />

      <CategoryCard
        title={t('emergency_title')}
        subtitle={<Trans i18nKey="emergency_subtitle" ns="home" />}
        icon="emergency"
        color="rgba(166, 11, 15, 1)"
        onPress={() => onCategoryClick('emergency')}
        height={cardHeight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default CategoryGrid;
