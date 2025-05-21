
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { languages } from '../data/languages/common';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
  languageCode: string;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ visible, onClose, languageCode }) => {
  const { setSelectedLanguage } = useLanguage();

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {languageCode === 'de' ? 'Sprache ändern' : 'Change Language'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <ScrollView>
            <View style={styles.languageGrid}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageItem,
                    language.code === languageCode && styles.selectedLanguageItem
                  ]}
                  onPress={() => handleLanguageSelect(language.code)}
                >
                  <Text style={styles.languageEmoji}>{language.flag}</Text>
                  <Text style={[
                    styles.languageName,
                    language.code === languageCode && styles.selectedLanguageText
                  ]}>
                    {language.nativeName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  languageItem: {
    width: '30%',
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  selectedLanguageItem: {
    backgroundColor: '#9b87f5',
  },
  languageEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  languageName: {
    fontSize: 14,
    textAlign: 'center',
  },
  selectedLanguageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LanguageModal;
