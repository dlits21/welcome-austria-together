
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
  languageCode: string;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ visible, onClose, languageCode }) => {
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
            {/* Language selection would go here */}
            <Text style={styles.modalText}>Language selection goes here</Text>
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
  modalText: {
    padding: 16,
  },
});

export default LanguageModal;
