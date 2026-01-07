import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, ViewStyle, StyleProp } from 'react-native';

interface IconTitleSubtitleCardProps {
  /**
   * The icon to display. Can be a React Node (e.g. SVG) or an ImageSource (e.g. require('./image.png')).
   * If not provided, the icon area will be hidden.
   */
  icon?: React.ReactNode | ImageSourcePropType;
  /**
   * Main title text.
   */
  title: string;
  /**
   * Subtitle text displayed below the title.
   */
  subtitle: string;
  /**
   * Optional custom styles for the card container.
   */
  style?: StyleProp<ViewStyle>;
}

export const IconTitleSubtitleCard: React.FC<IconTitleSubtitleCardProps> = ({
  icon,
  title,
  subtitle,
  style,
}) => {
  const isReactElement = React.isValidElement(icon);

  return (
    <View style={[styles.container, style]}>
      {/* Icon Area */}
      {icon && (
      <View style={styles.iconContainer}>
        {isReactElement ? (
          icon
        ) : (
          <Image 
            source={icon as ImageSourcePropType} 
            style={styles.iconImage} 
            resizeMode="contain" 
            accessibilityRole="image"
          />
        )}
      </View>
      )}

      {/* Text Area */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // Requires React Native 0.71+ or Expo SDK 48+ for gap in Flexbox
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECECEC',
    minHeight: 60, // Ensure touch target size and visual balance
    backgroundColor: 'transparent', 
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // Ensures the icon area doesn't shrink improperly
    minWidth: 32, 
  },
  iconImage: {
    width: 32, // "quadratisch (ca. 24–32 px)"
    height: 32,
  },
  textContainer: {
    flex: 1, // Takes remaining width
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16, // slightly larger
    fontWeight: '600', // semibold/medium
    color: '#000000',
    flexWrap: 'wrap',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400', // normal
    color: '#666666', // subtle gray
    marginTop: 2, 
    flexWrap: 'wrap',
  },
});

export default IconTitleSubtitleCard;
