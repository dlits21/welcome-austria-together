import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { languages, Language } from '../data/languages/common';

interface VirtualAssistantLanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (languageCode: string) => void;
  isWideScreen?: boolean;
}

const VirtualAssistantLanguageSwitcher: React.FC<VirtualAssistantLanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
  isWideScreen = false,
}) => {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const { width, height } = useWindowDimensions();
  
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageSelect = (language: Language) => {
    onLanguageChange(language.code);
    setShowLanguageModal(false);
  };

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <Pressable
      style={[
        styles.languageItem,
        item.code === currentLanguage && styles.languageItemSelected,
        isWideScreen && styles.languageItemWide
      ]}
      onPress={() => handleLanguageSelect(item)}
    >
      <Text style={[styles.languageFlag, isWideScreen && styles.languageFlagWide]}>
        {item.flag}
      </Text>
      <View style={styles.languageInfo}>
        <Text style={[
          styles.languageName, 
          item.code === currentLanguage && styles.languageNameSelected,
          isWideScreen && styles.languageNameWide
        ]}>
          {item.nativeName}
        </Text>
        <Text style={[
          styles.languageNameEnglish,
          isWideScreen && styles.languageNameEnglishWide
        ]}>
          {item.name}
        </Text>
      </View>
      {item.code === currentLanguage && (
        <MaterialIcons 
          name="check" 
          size={isWideScreen ? 28 : 20} 
          color="#3B82F6" 
        />
      )}
    </Pressable>
  );

  return (
    <>
      <TouchableOpacity
        style={[styles.languageButton, isWideScreen && styles.languageButtonWide]}
        onPress={() => setShowLanguageModal(true)}
      >
        <Text style={[styles.languageFlag, isWideScreen && styles.languageFlagWide]}>
          {currentLang.flag}
        </Text>
        <MaterialIcons 
          name="expand-more" 
          size={isWideScreen ? 20 : 16} 
          color="#666" 
        />
      </TouchableOpacity>

      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowLanguageModal(false)}
        >
          <View style={[
            styles.modalContent,
            isWideScreen && styles.modalContentWide,
            { maxHeight: height * 0.7 }
          ]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, isWideScreen && styles.modalTitleWide]}>
                Select Language / Sprache auswählen
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowLanguageModal(false)}
              >
                <MaterialIcons 
                  name="close" 
                  size={isWideScreen ? 28 : 24} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={languages}
              renderItem={renderLanguageItem}
              keyExtractor={(item) => item.code}
              style={styles.languageList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.languageListContent}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    minWidth: 60,
    justifyContent: 'center',
  },
  languageButtonWide: {
    padding: 12,
    minWidth: 80,
  },
  languageFlag: {
    fontSize: 16,
    marginRight: 4,
  },
  languageFlagWide: {
    fontSize: 20,
    marginRight: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContentWide: {
    maxWidth: 500,
    borderRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  modalTitleWide: {
    fontSize: 18,
  },
  closeButton: {
    padding: 4,
  },
  languageList: {
    maxHeight: 400,
  },
  languageListContent: {
    paddingVertical: 8,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  languageItemWide: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  languageItemSelected: {
    backgroundColor: '#f0f8ff',
  },
  languageInfo: {
    flex: 1,
    marginLeft: 12,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  languageNameWide: {
    fontSize: 18,
  },
  languageNameSelected: {
    color: '#3B82F6',
  },
  languageNameEnglish: {
    fontSize: 14,
    color: '#666',
  },
  languageNameEnglishWide: {
    fontSize: 16,
  },
});

export default VirtualAssistantLanguageSwitcher;