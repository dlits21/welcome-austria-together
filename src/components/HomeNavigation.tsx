
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../data/languages';
import { useNavigation } from '@react-navigation/native';

interface HomeNavigationProps {
  toggleSound: () => void;
  soundEnabled: boolean;
  openLanguageModal: () => void;
  openHelpModal: () => void;
}

const HomeNavigation = ({ 
  toggleSound, 
  soundEnabled, 
  openLanguageModal,
  openHelpModal
}: HomeNavigationProps) => {
  const { currentLanguage } = useLanguage();
  const navigation = useNavigation();
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];
  
  const getTooltipText = (iconName: string): string => {
    if (language.code === 'de') {
      switch (iconName) {
        case 'home': return 'Zur Startseite';
        case 'sound': return soundEnabled ? 'Ton ausschalten' : 'Ton einschalten';
        case 'help': return 'Hilfe anzeigen';
        case 'language': return 'Sprache ändern';
        default: return '';
      }
    } else {
      switch (iconName) {
        case 'home': return 'Go to home page';
        case 'sound': return soundEnabled ? 'Turn sound off' : 'Turn sound on';
        case 'help': return 'Show help';
        case 'language': return 'Change language';
        default: return '';
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Feather name="home" size={24} color="#000" />
      </TouchableOpacity>
      
      <View style={styles.rightButtons}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={toggleSound}
        >
          <Feather name={soundEnabled ? "volume-2" : "volume-x"} size={24} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.iconButton}
          onPress={openLanguageModal}
        >
          <Feather name="globe" size={24} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.iconButton}
          onPress={openHelpModal}
        >
          <Feather name="help-circle" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
});

export default HomeNavigation;
