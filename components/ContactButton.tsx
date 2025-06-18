
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ContactButtonProps {
  title: string;
  icon?: string;
  iconPath?: string;
  onPress: () => void;
}

const ContactButton: React.FC<ContactButtonProps> = ({ title, icon, iconPath, onPress }) => {
  return (
    <TouchableOpacity style={styles.contactButton} onPress={onPress}>
      <View style={styles.contactButtonLeft}>
        {iconPath ? (
          <Image source={{ uri: iconPath }} style={styles.contactIcon} />
        ) : (
          <MaterialIcons name={icon || "message"} size={20} color="#666" />
        )}
        <Text style={styles.contactButtonText}>{title}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={20} color="#666" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  contactButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactButtonText: {
    fontSize: 16,
    marginLeft: 12,
  },
  contactIcon: {
    width: 20,
    height: 20,
  },
});

export default ContactButton;
