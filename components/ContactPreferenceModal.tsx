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
import { handleContactClick } from '../utils/contactUtils';
// For React Native, we'll use MaterialIcons instead of SVG imports
// import FacebookIcon from '../assets/images/facebook.svg';
// import SignalIcon from '../assets/images/signal.svg';
// import WhatsAppIcon from '../assets/images/whatsapp.svg';
// import TelegramIcon from '../assets/images/telegram.svg';

// Import general support translations
import generalTranslations from '../data/language/ask/general.json';

const getGeneralText = (key: string, languageCode: string): string => {
  const translation = generalTranslations[key as keyof typeof generalTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.en || key;
};

interface ContactPreferenceModalProps {
  visible: boolean;
  onClose: () => void;
  languageCode: string;
  contactType: 'text' | 'email';
}

const ContactPreferenceModal: React.FC<ContactPreferenceModalProps> = ({
  visible,
  onClose,
  languageCode,
  contactType,
}) => {
  const handleContactSelection = (method: string) => {
    handleContactClick(method, true, languageCode);
    onClose();
  };

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
              {getGeneralText('contactPreferenceTitle', languageCode)}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.content}>
            <Text style={styles.description}>
              {getGeneralText('contactPreferenceText', languageCode)}
            </Text>
            
            {contactType === 'text' && (
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={styles.contactOption}
                  onPress={() => handleContactSelection('whatsapp')}
                >
                  <MaterialIcons name="message" size={24} color="#25D366" />
                  <Text style={styles.optionText}>WhatsApp</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.contactOption}
                  onPress={() => handleContactSelection('signal')}
                >
                  <MaterialIcons name="security" size={24} color="#3A76F0" />
                  <Text style={styles.optionText}>Signal</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.contactOption}
                  onPress={() => handleContactSelection('telegram')}
                >
                  <MaterialIcons name="send" size={24} color="#0088CC" />
                  <Text style={styles.optionText}>Telegram</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.contactOption}
                  onPress={() => handleContactSelection('facebook')}
                >
                  <MaterialIcons name="facebook" size={24} color="#1877F2" />
                  <Text style={styles.optionText}>Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.contactOption}
                  onPress={() => handleContactSelection('email')}
                >
                  <MaterialIcons name="email" size={24} color="#F59E0B" />
                  <Text style={styles.optionText}>Email</Text>
                </TouchableOpacity>
              </View>
            )}
            
            {contactType === 'email' && (
              <View style={styles.optionsContainer}>
                <Text style={styles.emailDescription}>
                  {getGeneralText('emailPreferenceDescription', languageCode)}
                </Text>
                <TouchableOpacity 
                  style={styles.contactOption}
                  onPress={() => handleContactSelection('email')}
                >
                  <MaterialIcons name="email" size={24} color="#3B82F6" />
                  <Text style={styles.optionText}>Email</Text>
                </TouchableOpacity>
              </View>
            )}
            
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>
                {getGeneralText('cancel', languageCode)}
              </Text>
            </TouchableOpacity>
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
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  emailDescription: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
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

export default ContactPreferenceModal;