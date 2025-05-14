
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CategoryCard from './CategoryCard';

interface CategoryGridProps {
  askTitle: string;
  askSubtitle: string;
  infoTitle: string;
  infoSubtitle: string;
  learnTitle: string;
  learnSubtitle: string;
  communityTitle: string;
  communitySubtitle: string;
  onCategoryClick: (category: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  askTitle,
  askSubtitle,
  infoTitle,
  infoSubtitle,
  learnTitle,
  learnSubtitle,
  communityTitle,
  communitySubtitle,
  onCategoryClick
}) => {
  return (
    <View style={styles.categoryGrid}>
      <CategoryCard 
        title={askTitle}
        subtitle={askSubtitle}
        icon="question-answer"
        color="#3B82F6" // blue
        onPress={() => onCategoryClick('ask')}
      />
      
      <CategoryCard 
        title={infoTitle}
        subtitle={infoSubtitle}
        icon="info"
        color="#10B981" // green
        onPress={() => onCategoryClick('information')}
      />
      
      <CategoryCard 
        title={learnTitle}
        subtitle={learnSubtitle}
        icon="menu-book"
        color="#8B5CF6" // purple
        onPress={() => onCategoryClick('learn')}
      />
      
      <CategoryCard 
        title={communityTitle}
        subtitle={communitySubtitle}
        icon="people"
        color="#F97316" // orange
        onPress={() => onCategoryClick('community')}
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
});

export default CategoryGrid;
