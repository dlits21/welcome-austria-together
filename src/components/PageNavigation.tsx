
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../data/languages';
import { Feather } from '@expo/vector-icons';
import LanguageGrid from './LanguageGrid';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  LanguageSelection: undefined;
  Information: undefined;
  Courses: undefined;
  Community: undefined;
  Videos: undefined;
  GermanLearning: undefined;
  NotFound: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PageNavigationProps {
  toggleSound: () => void;
  soundEnabled: boolean;
  helpContent?: React.ReactNode;
}

const PageNavigation: React.FC<PageNavigationProps> = ({ toggleSound, soundEnabled, helpContent }) => {
  const { currentLanguage } = useLanguage();
  const navigation = useNavigation<NavigationProp>();
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];
  const [isLanguageModalVisible, setIsLanguageModalVisible] = React.useState(false);
  const [isHelpModalVisible, setIsHelpModalVisible] = React.useState(false);

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
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Feather name="home" size={16} color="#000" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>
          {language.rtl ? 'رجوع' : 'Back'}
        </Text>
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
          onPress={() => setIsLanguageModalVisible(true)}
        >
          <Feather name="globe" size={24} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setIsHelpModalVisible(true)}
        >
          <Feather name="help-circle" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Language Modal */}
      <Modal
        visible={isLanguageModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsLanguageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {language.code === 'de' ? 'Sprache ändern' : 'Change Language'}
            </Text>
            <LanguageGrid inDialog={true} />
          </View>
        </View>
      </Modal>
      
      {/* Help Modal */}
      <Modal
        visible={isHelpModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsHelpModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {language.code === 'de' ? 'Hilfe' : 'Help'}
            </Text>
            {helpContent || (
              <Text style={styles.modalText}>
                {language.code === 'de' 
                  ? 'Hier finden Sie hilfreiche Informationen.' 
                  : 'Here you will find helpful information.'}
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    width: '100%'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  }
});

export default PageNavigation;
