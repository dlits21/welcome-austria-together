
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getCharacterImage } from '../utils/assistantUtils';
import { getAssistantText } from '../utils/languageUtils';

interface AssistantData {
  name: string;
  firstLine: string;
  imagePath: string;
  languages: string;
  background: string;
}

interface AvatarSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectAssistant: (assistant: AssistantData) => void;
  languageCode: string;
}

const assistants: AssistantData[] = [
  require('../data/virtualAssistant/abdul.json'),
  require('../data/virtualAssistant/amina.json'),
  require('../data/virtualAssistant/arlinda.json'),
  require('../data/virtualAssistant/fatima.json'),
  require('../data/virtualAssistant/giorgi.json'),
  require('../data/virtualAssistant/leila.json'),
  require('../data/virtualAssistant/liridon.json'),
  require('../data/virtualAssistant/maryam.json'),
  require('../data/virtualAssistant/nino.json'),
  require('../data/virtualAssistant/omar.json'),
  require('../data/virtualAssistant/rustam.json'),
  require('../data/virtualAssistant/timur.json'),
  require('../data/virtualAssistant/zainab.json'),
];

// Language to flag mapping
const languageFlags: { [key: string]: string } = {
  'German': '🇩🇪',
  'English': '🇺🇸',
  'Arabic': '🇸🇦',
  'Kurdish': '🟡', // Kurdish flag alternative
  'Persian': '🇮🇷',
  'Dari': '🇦🇫',
  'Pashto': '🇦🇫',
  'Somali': '🇸🇴',
  'Russian': '🇷🇺',
  'Chechen': '🏴',
  'Georgian': '🇬🇪',
  'Albanian': '🇦🇱',
};

const AvatarSelectionModal: React.FC<AvatarSelectionModalProps> = ({
  visible,
  onClose,
  onSelectAssistant,
  languageCode,
}) => {
  const renderLanguageFlags = (languages: string) => {
    const langList = languages.split(', ').map(lang => lang.trim());
    return langList.map((lang, index) => (
      <Text key={index} style={styles.flagText}>
        {languageFlags[lang] || '🌐'} {lang}
      </Text>
    ));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {getAssistantText('selectAssistant', languageCode)}
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.assistantGrid}>
            {assistants.map((assistant, index) => (
              <TouchableOpacity
                key={index}
                style={styles.assistantCard}
                onPress={() => {
                  onSelectAssistant(assistant);
                  onClose();
                }}
              >
                <View style={styles.assistantImageContainer}>
                  <Image
                    source={getCharacterImage(assistant.name)}
                    style={styles.assistantImage}
                    resizeMode="cover"
                  />
                </View>
                
                <View style={styles.assistantInfo}>
                  <Text style={styles.assistantName}>{assistant.name}</Text>
                  <Text style={styles.assistantBackground} numberOfLines={3}>
                    {assistant.background}
                  </Text>
                  
                  <View style={styles.languagesContainer}>
                    <Text style={styles.languagesLabel}>
                      {getAssistantText('languages', languageCode)}:
                    </Text>
                    <View style={styles.flagsContainer}>
                      {renderLanguageFlags(assistant.languages)}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  assistantGrid: {
    padding: 16,
  },
  assistantCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  assistantImageContainer: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 12,
  },
  assistantImage: {
    width: '100%',
    height: '100%',
  },
  assistantInfo: {
    alignItems: 'center',
  },
  assistantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  assistantBackground: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  languagesContainer: {
    alignItems: 'center',
    width: '100%',
  },
  languagesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  flagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  flagText: {
    fontSize: 12,
    color: '#555',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    textAlign: 'center',
  },
});

export default AvatarSelectionModal;
