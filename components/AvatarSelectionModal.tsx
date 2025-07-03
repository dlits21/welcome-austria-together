
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
  useWindowDimensions,
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
  'Kurdish': '🟡',
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
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 768;
  const numColumns = isWideScreen ? (width >= 1200 ? 3 : 2) : 1;

  const renderLanguageFlags = (languages: string) => {
    const langList = languages.split(', ').map(lang => lang.trim());
    return langList.map((lang, index) => (
      <View key={index} style={styles.flagItem}>
        <Text style={styles.flagEmoji}>{languageFlags[lang] || '🌐'}</Text>
        <Text style={styles.flagText}>{lang}</Text>
      </View>
    ));
  };

  const renderAssistantCard = (assistant: AssistantData, index: number) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.assistantCard,
        isWideScreen && styles.assistantCardGrid,
        { width: isWideScreen ? `${100 / numColumns - 2}%` : '100%' }
      ]}
      onPress={() => {
        onSelectAssistant(assistant);
        onClose();
      }}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.assistantImageContainer}>
            <Image
              source={getCharacterImage(assistant.name)}
              style={styles.assistantImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.assistantNameContainer}>
            <Text style={styles.assistantName}>{assistant.name}</Text>
          </View>
        </View>
        
        <View style={styles.assistantInfo}>
          <Text style={styles.assistantBackground} numberOfLines={isWideScreen ? 4 : 3}>
            {assistant.background}
          </Text>
        </View>
      </View>
      
      <View style={styles.languagesContainer}>
        <Text style={styles.languagesLabel}>
          {getAssistantText('languages', languageCode)}:
        </Text>
        <View style={styles.flagsContainer}>
          {renderLanguageFlags(assistant.languages)}
        </View>
      </View>
    </TouchableOpacity>
  );

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
          <View style={[
            styles.assistantGrid,
            isWideScreen && styles.assistantGridWide
          ]}>
            {assistants.map((assistant, index) => renderAssistantCard(assistant, index))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  scrollView: {
    flex: 1,
  },
  assistantGrid: {
    padding: 16,
  },
  assistantGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  assistantCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f3f4',
    justifyContent: 'space-between',
    minHeight: 280,
  },
  assistantCardGrid: {
    marginHorizontal: '1%',
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  assistantImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#3b82f6',
  },
  assistantImage: {
    width: '100%',
    height: '100%',
  },
  assistantNameContainer: {
    alignItems: 'center',
  },
  assistantName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
  },
  assistantInfo: {
    alignItems: 'center',
    flex: 1,
  },
  assistantBackground: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  languagesContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  languagesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  flagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  flagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  flagEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  flagText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
});

export default AvatarSelectionModal;
