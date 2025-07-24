import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Import general support translations
import generalTranslations from '../data/language/ask/general.json';

const getGeneralText = (key: string, languageCode: string): string => {
  const translation = generalTranslations[key as keyof typeof generalTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.en || key;
};

interface BookAppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  languageCode: string;
  expertName: string;
}

const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  visible,
  onClose,
  languageCode,
  expertName,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>
              {getGeneralText('bookAppointmentTitle', languageCode)}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.content}>
            <View style={styles.expertInfo}>
              <MaterialIcons name="person" size={48} color="#3B82F6" />
              <Text style={styles.expertName}>{expertName}</Text>
            </View>
            
            <Text style={styles.description}>
              {getGeneralText('bookAppointmentDescription', languageCode)}
            </Text>
            
            <View style={styles.calendarPlaceholder}>
              <MaterialIcons name="calendar-month" size={48} color="#3B82F6" />
              <Text style={styles.calendarText}>
                {getGeneralText('selectAppointmentTime', languageCode)}
              </Text>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
                <Text style={styles.confirmButtonText}>
                  {getGeneralText('getAppointment', languageCode)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>
                  {getGeneralText('cancel', languageCode)}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
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
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    padding: 20,
  },
  expertInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  expertName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  calendarPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 40,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
  },
  calendarText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
    textAlign: 'center',
  },
  actionButtons: {
    gap: 12,
  },
  confirmButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookAppointmentModal;