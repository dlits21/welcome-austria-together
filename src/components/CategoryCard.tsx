
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

interface CategoryCardProps {
  icon: string;
  title: string;
  category: string;
  color: string;
  description: string;
  onPress: (category: string) => void;
}

const CategoryCard = ({
  icon, 
  title, 
  category, 
  color, 
  description,
  onPress
}: CategoryCardProps) => {
  
  const getIconComponent = (iconName: string, color: string) => {
    switch (iconName) {
      case 'info':
        return <Feather name="info" size={32} color={color} />;
      case 'book-open':
        return <Feather name="book-open" size={32} color={color} />;
      case 'users':
        return <Feather name="users" size={32} color={color} />;
      case 'play-square':
        return <Feather name="play" size={32} color={color} />;
      default:
        return <Feather name="help-circle" size={32} color={color} />;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onPress(category)}
    >
      <View style={styles.cardContent}>
        {getIconComponent(icon, color)}
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 150,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    margin: 6,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  }
});

export default CategoryCard;
