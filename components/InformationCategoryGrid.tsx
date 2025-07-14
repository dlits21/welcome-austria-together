import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  useWindowDimensions 
} from 'react-native';
import { CategoryItem } from '../data/information';

interface InformationCategoryGridProps {
  categories: CategoryItem[];
  onCategoryPress: (categoryId: string) => void;
  getClickForDetails: (languageCode: string) => string;
  languageCode: string;
}

const InformationCategoryGrid: React.FC<InformationCategoryGridProps> = ({
  categories,
  onCategoryPress,
  getClickForDetails,
  languageCode
}) => {
  const { width } = useWindowDimensions();
  
  // Calculate columns based on screen width - more columns for larger screens
  let numColumns = 2; // default for mobile
  if (width > 1100) {
    numColumns = 4; // 4 columns for very wide screens
  } else if (width > 800) {
    numColumns = 3; // 3 columns for wide screens
  }
  
  const renderCategoryItem = ({ item }: { item: CategoryItem }) => {
    return (
      <TouchableOpacity 
        style={[
          styles.categoryItem,
          { borderColor: item.color + '40' },
          numColumns > 2 && styles.smallerTile
        ]}
        onPress={() => onCategoryPress(item.id)}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
          <Text style={styles.categoryIcon}>{item.icon}</Text>
        </View>
        <Text style={styles.categoryTitle}>
          {languageCode === 'de' ? item.name.de : item.name.en}
        </Text>
        <Text style={styles.categorySubtitle} numberOfLines={2}>
          {getClickForDetails(languageCode)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={categories}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      key={numColumns.toString()} // Force re-render when columns change
      contentContainerStyle={styles.categoriesContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    paddingBottom: 20,
  },
  categoryItem: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    minHeight: 140,
  },
  smallerTile: {
    minHeight: 120,
    padding: 10,
  },
  iconContainer: {
    width: '100%',
    aspectRatio: 4/3,
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 80,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default InformationCategoryGrid;