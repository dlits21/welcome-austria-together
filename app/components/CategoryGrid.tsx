
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
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
  const { width } = useWindowDimensions();
  
  // Determine how many cards per row based on screen width
  let containerStyle = styles.oneColumnGrid; // default for very narrow screens
  
  if (width > 1100) {
    containerStyle = styles.fourColumnGrid; // 4 cards per row for very wide screens
  } else if (width > 800) {
    containerStyle = styles.threeColumnGrid; // 3 cards per row for wide screens
  } else if (width > 500) {
    containerStyle = styles.twoColumnGrid; // 2 cards per row for medium screens
  }
  
  return (
    <View style={[styles.categoryGrid, containerStyle]}>
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
  fourColumnGrid: {
    // No additional styling needed as cards will use their normal width
  },
  threeColumnGrid: {
    // 3 cards per row
  },
  twoColumnGrid: {
    // 2 cards per row
  },
  oneColumnGrid: {
    // 1 card per row
  }
});

export default CategoryGrid;
