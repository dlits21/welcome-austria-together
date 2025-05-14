
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
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
  return (
    <TouchableOpacity 
      style={[styles.categoryCard, { borderColor: color + '40' }]} 
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

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  categoryCard: {
    width: windowWidth > 600 ? 
      (windowWidth - 48) / 2 - 8 : 
      windowWidth - 32,
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
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default CategoryCard;
