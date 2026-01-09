import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next';

interface AccordionContentProps {
  title: string;
  subtitle: string;
  icon: string;
  iconSize: number;
  nameSpace: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  icon,
  iconSize = 24,
  nameSpace = "common"
}) => {
  const parts = icon ? icon.split('.') : null;
  const { t, i18n } = useTranslation(nameSpace);

  return (
    <View style={styles.accordionContent}>
        <View style={{marginLeft: 16}}>
        {icon && parts[0] == "material" &&
          <MaterialIcons
            name={parts[1]}
            size={iconSize}
            color={"#000"}
        />}
        {icon && parts[0] == "awesome6" && (
          <FontAwesome6
            name={parts[1]}
            size={iconSize}
            color={"#000"}
        />)}
        {icon && parts[0] == "community" && (
          <MaterialCommunityIcons
            name={parts[1]}
            size={iconSize}
            color={"#000"}
        />)}
        </View>
      <View style={styles.accordionTextContainer}>
        <Text style={styles.accordionTitle}>{t(title)}</Text>
        {subtitle && (<Text style={styles.accordionSubtitle}>{t(subtitle)}</Text>)}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  accordionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: "wrap"
  },
  accordionTextContainer: {
   flexDirection: 'column',
   marginTop: 8,
   gap: 8,
   marginLeft: 16,
   flexShrink: 1,
   flexBasis: 'auto',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  accordionSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 24,
    lineHeight: 30,
    marginBottom: 24,
  },
});

export default AccordionItem;
