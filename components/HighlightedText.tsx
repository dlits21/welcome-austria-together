import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface HighlightedTextProps {
  children: string;
  definitions: { [key: string]: { en: string; de: string } };
  language: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ children, definitions, language }) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderTextWithHighlights = () => {
    let text = children;
    const highlightedWords = Object.keys(definitions);
    
    // Split text into words and check for highlights
    const words = text.split(' ');
    const elements: JSX.Element[] = [];
    
    words.forEach((word, index) => {
      // Remove punctuation for matching
      const cleanWord = word.toLowerCase().replace(/[.,!?;:]$/, '');
      const isHighlighted = highlightedWords.some(hw => hw.toLowerCase() === cleanWord);
      
      if (isHighlighted) {
        const originalWord = highlightedWords.find(hw => hw.toLowerCase() === cleanWord) || word;
        elements.push(
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedWord(originalWord);
              setModalVisible(true);
            }}
            style={styles.highlightedWord}
          >
            <Text style={styles.highlightedText}>{word}</Text>
          </TouchableOpacity>
        );
      } else {
        elements.push(
          <Text key={index} style={styles.normalText}>{word}</Text>
        );
      }
      
      // Add space between words except for the last word
      if (index < words.length - 1) {
        elements.push(<Text key={`space-${index}`} style={styles.normalText}> </Text>);
      }
    });
    
    return elements;
  };

  const getDefinition = () => {
    if (!selectedWord || !definitions[selectedWord]) return '';
    return language === 'de' ? definitions[selectedWord].de : definitions[selectedWord].en;
  };

  return (
    <View>
      <View style={styles.textContainer}>
        {renderTextWithHighlights()}
      </View>
      
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedWord}</Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalText}>{getDefinition()}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  normalText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  highlightedWord: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 3,
  },
  highlightedText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1E40AF',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    maxWidth: '90%',
    width: 300,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#374151',
  },
});

export default HighlightedText;