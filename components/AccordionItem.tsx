import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AccordionContent from './AccordionContent'

interface TilesContent {
  key: string;
  title: string;
  subtitle: string;
  icon: string;
  iconSize;
}

interface AccordionItemProps {
  title: string;
  subtitle: string;
  icon: string;
  iconColor: string;
  expanded: boolean;
  onPress: () => void;
  content: TilesContent;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  icon,
  iconColor,
  expanded,
  onPress,
  content,
}) => {
  const parts = icon ? icon.split('.') : ['material', 'help'];
  const iconSet = parts.length > 1 ? parts[0] : 'material';
  const iconName = parts.length > 1 ? parts[1] : icon;

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={onPress}
        activeOpacity={0.7}
      >
      <View style={styles.accordionTitleContainer}>
        {iconSet === 'material' && (
          <MaterialIcons name={iconName as any} size={24} color={iconColor} />
        )}
        {iconSet === 'awesome6' && (
          <FontAwesome6 name={iconName as any} size={24} color={iconColor} />
        )}
        {iconSet === 'community' && (
             <MaterialCommunityIcons name={iconName as any} size={24} color={iconColor} />
        )}
        <View style={styles.accordionTextContainer}>
          <Text style={styles.accordionTitle}>{title}</Text>
          <Text style={styles.accordionSubtitle}>{subtitle}</Text>
        </View>
      </View>
        <MaterialIcons
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#666"
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.accordionContent}>
          {content.map((entry) => (
            <AccordionContent
              title={entry.title}
              subtitle={entry.subtitle}
              icon={entry.icon}
              iconSize={entry.iconSize}
              >
            </AccordionContent>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    justifyContent: "space-between",
  },
  accordionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionTextContainer: {
   flexDirection: 'column',
   gap: 8,
   marginLeft: 8
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  accordionSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 12,
  },
  accordionContent: {
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default AccordionItem;
