import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

interface AccordionContentProps {
  title: string;
  subtitle: string;
  icon: string;
  iconSize: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  icon,
  iconSize = 64,
}) => {
  const parts = icon.split('.');

  return (
    <View style={styles.accordionContent}>
        <View style={{marginLeft: 16}}>
        {parts[0] == "material" &&
          <MaterialIcons
            name={parts[1]}
            size={iconSize}
            color={"#000"}
        />}
        {parts[0] == "awesome6" && (
          <FontAwesome6
            name={parts[1]}
            size={iconSize}
            color={"#000"}
        />)}
        {parts[0] == "community" && (
          <MaterialCommunityIcons
            name={parts[1]}
            size={iconSize}
            color={"#000"}
        />)}
        </View>
      <View style={styles.accordionTextContainer}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Text style={styles.accordionSubtitle}>{subtitle}</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  accordionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionTextContainer: {
   flexDirection: 'column',
   marginTop: 8,
   gap: 8,
   marginLeft: 16,
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
});

export default AccordionItem;
