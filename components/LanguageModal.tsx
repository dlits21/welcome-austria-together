
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  useWindowDimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { languages } from '../data/languages/common';
import { useLanguage } from '../contexts/LanguageContext';
import { getGlobalText } from '../utils/languageUtils';

const numColumns = 3;
const itemMargin = 12;


interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
  languageCode: string;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ visible, onClose, languageCode }) => {
  const { setSelectedLanguage } = useLanguage();
  const { width: screenWidth } = useWindowDimensions();

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    onClose();
  };

  const renderItem = ({ item }) => {
    const itemSize = (screenWidth * 0.9 - itemMargin * (numColumns + 1)) / numColumns;
    const isSelected = item.code === languageCode;
    return (
      <TouchableOpacity
        style={[
          styles.languageItem,
          isSelected && styles.selectedLanguageItem,
          { width: itemSize, margin: itemMargin / 2 },
        ]}
        onPress={() => handleLanguageSelect(item.code)}
      >
        <Text style={styles.languageEmoji}>{item.flag}</Text>
        <Text
          style={[
            styles.languageName,
            isSelected && styles.selectedLanguageText,
          ]}
        >
          {item.nativeName}
        </Text>
      </TouchableOpacity>
    );
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
              {getGlobalText('changeLanguage', languageCode)}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={languages}
            keyExtractor={(item) => item.code}
            renderItem={renderItem}
            numColumns={numColumns}
            contentContainerStyle={styles.languageGrid}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    padding: itemMargin,
    justifyContent: 'center',
  },
  languageItem: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 16,
    borderRadius: 10,
  },
  selectedLanguageItem: {
    backgroundColor: '#4F46E5',
  },
  languageEmoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  languageName: {
    fontSize: 14,
    textAlign: 'center',
    color: '#111827',
  },
  selectedLanguageText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default LanguageModal;
