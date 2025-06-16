
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface HelpModalProps {
  visible: boolean;
  onClose: () => void;
  languageCode: string;
}

const HelpModal: React.FC<HelpModalProps> = ({ visible, onClose, languageCode }) => {
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
              {languageCode === 'de' ? 'Hilfe' : 'Help'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={[
              languageCode === 'de'
                ? 'Diese Seite bietet Zugang zu Informationen, Lernmaterialien und Community-Ressourcen.'
                : 'This page provides access to information, learning materials, and community resources.',
              languageCode === 'de'
                ? 'Sie können die Suchleiste verwenden, um spezifische Informationen zu finden.'
                : 'You can use the search bar to find specific information.',
              languageCode === 'de'
                ? 'Die vier Kacheln unten bieten direkten Zugang zu wichtigen Bereichen der Website.'
                : 'The four tiles below provide direct access to important areas of the website.',
            ]}
            keyExtractor={(item, index) => `help-${index}`}
            renderItem={({ item }) => <Text style={styles.helpText}>{item}</Text>}
            contentContainerStyle={styles.helpContent}
          />
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
  helpContent: {
    padding: 16,
  },
  helpText: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 22,
  },
});

export default HelpModal;
