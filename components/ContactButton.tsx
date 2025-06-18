
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { Asset } from 'expo-asset';

interface ContactButtonProps {
  title: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconPath?: any;
  onPress: () => void;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  title,
  icon,
  iconPath,
  onPress
}) => {
  const [svgXml, setSvgXml] = useState<string | null>(null);

  useEffect(() => {
    if (iconPath) {
      const loadSvg = async () => {
        try {
          // Dynamically load the SVG file using Expo Asset
          const asset = Asset.fromModule(iconPath);
          await asset.downloadAsync();

          const svgUri = asset.localUri;
          if (svgUri) {
            const response = await fetch(svgUri);
            const text = await response.text();
            setSvgXml(text);
          }
        } catch (error) {
          console.error('Error loading SVG:', error);
        }
      };

      loadSvg();
    }
  }, [iconPath]);

  return (
    <TouchableOpacity style={styles.contactButton} onPress={onPress}>
      <Text style={styles.contactButtonText}>{title}</Text>
      <View style={styles.iconContainer}>
        {iconPath ? (
          <View style={styles.svgContainer}>
            <SvgXml xml={svgXml} width={20} height={20} />
          </View>
        ) : icon ? (
          <MaterialIcons name={icon} size={20} color="#666" />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  iconContainer: {
    marginLeft: 12,
    width: 24,
    alignItems: 'center',
  },
  svgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
  },
  contactButtonText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
});

export default ContactButton;
