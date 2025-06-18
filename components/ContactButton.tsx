
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';

interface ContactButtonProps {
  title: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconPath?: string;
  onPress: () => void;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  title,
  icon,
  iconPath,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.contactButton} onPress={onPress}>
      <View style={styles.iconContainer}>
        {iconPath ? (
          <View style={styles.svgContainer}>
            <MaterialIcons name="chat" size={20} color="#666" />
          </View>
        ) : icon ? (
          <MaterialIcons name={icon} size={20} color="#666" />
        ) : null}
      </View>
      <Text style={styles.contactButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  iconContainer: {
    marginRight: 12,
    width: 24,
    alignItems: 'center',
  },
  svgContainer: {
    width: 20,
    height: 20,
  },
  contactButtonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ContactButton;
