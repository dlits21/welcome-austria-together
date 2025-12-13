import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface CategoryCardProps {
  title: string;
  subtitle?: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress?: () => void;
  color?: string;
  isInTutorial?: boolean;
  tutorialIconSize ?: number,
  width ?: number,
  columns ?: number,
  height ?: number,
  tileWidth ?: number,
  padding ?: number,
  description?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  color = '#3B82F6',
  tutorialIconSize = 64,
  width = Dimensions.get('window').width,
  columns = 2,
  height = null,
  tileWidth = null,
  padding = null,
  isInTutorial = false
}) => {
  if (isInTutorial) {
    // Fixed sizing for tutorial mode
    return (
      <TouchableOpacity
        style={styles.tutorialCard}
        onPress={onPress}
      >
        <View style={[styles.tutorialIconContainer, { backgroundColor: `${color}15` }]}>
          <MaterialIcons
            name={icon}
            size={tutorialIconSize}
            color={"#fff"}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </TouchableOpacity>
    );
  }

  // Responsive sizing for main grid
  const cardHeight = height ?? (width < 600 ? 300 : 480);
  const cardPadding = padding ?? width < 600 ? 24 : 48;
  const cardWidth = tileWidth ?? (width - cardPadding * columns) / columns; // 2 columns with padding
  const iconSize = Math.min(Math.max(32, cardWidth * 0.3), 200); // Responsive icon size, minimum 32

  if (Platform.OS == 'web') {
    return (
      <TouchableOpacity
        style={[styles.card, { width: cardWidth, height: cardHeight}]}
        onPress={onPress}
      >
        <View style={[styles.iconContainer, { backgroundColor: "#fff", width: cardWidth * 0.9,
            height: Math.min(iconSize*3, 300), borderColor: color, borderWidth: 4}]}>
          <MaterialIcons
            name={icon}
            size={iconSize}
            color={color}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth, height: 250}]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: color, width: 100,
          height: 100, borderRadius: 64}]}>
        <MaterialIcons
          name={icon}
          size={iconSize}
          color={"#fff"}
        />
      </View>
      <Text style={[styles.title, {fontSize: 18}]}>{title}</Text>
      <Text style={[styles.subtitle, {fontSize: 14}]}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  tutorialCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    width: '100%',
    maxWidth: 280,
  },
  iconContainer: {
    height: 64,
    width: 64,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,

  },
  tutorialIconContainer: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default CategoryCard;
