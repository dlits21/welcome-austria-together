
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface AccordionItemProps {
  title: string;
  icon: string;
  iconColor: string;
  expanded: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  icon,
  iconColor,
  expanded,
  onPress,
  children
}) => {
  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity 
        style={styles.accordionHeader} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.accordionTitleContainer}>
          <MaterialIcons name={icon} size={24} color={iconColor} />
          <Text style={styles.accordionTitle}>{title}</Text>
        </View>
        <MaterialIcons 
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={24} 
          color="#666" 
        />
      </TouchableOpacity>
      
      {expanded && (
        <View style={styles.accordionContent}>
          {children}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  accordionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  accordionContent: {
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default AccordionItem;
