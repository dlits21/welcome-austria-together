
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface CategoryCardProps {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  subtitle, 
  icon, 
  color, 
  onPress 
}) => {
  const { width } = useWindowDimensions();
  
  // Calculate card width based on screen width
  let cardWidth = width - 32; // Default: full width for narrow screens
  
  if (width > 1100) {
    cardWidth = (width - 80) / 4; // 4 cards per row with spacing
  } else if (width > 800) {
    cardWidth = (width - 64) / 3; // 3 cards per row with spacing
  } else if (width > 500) {
    cardWidth = (width - 48) / 2; // 2 cards per row with spacing
  }

  return (
    <TouchableOpacity 
      style={[
        styles.categoryCard, 
        { borderColor: color + '40', width: cardWidth }
      ]} 
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <MaterialIcons name={icon} size={36} color={color} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle} numberOfLines={2}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    marginBottom: 16,
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
  },
  iconContainer: {
    width: '100%',
    aspectRatio: 4/3,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center', // Center title text
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center', // Center subtitle text
  },
});

export default CategoryCard;
