import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

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
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            {Platform.OS === 'web' ? (
              <iframe
                src="https://calendly.com/dlits2111"
                style={{
                  width: '80%',
                  height: '80%',
                  minHeight: 500,
                  border: 'none',
                  transform: 'scale(0.9)',
                  transformOrigin: 'top left',
                  margin: '20px auto'
                }}
                frameBorder="0"
              />
            ) : (
              <WebView
                source={{ uri: 'https://calendly.com/dlits2111' }}
                style={styles.calendly}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
                mixedContentMode="compatibility"
              />
            )}
          </View>
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
    maxHeight: '90%',
    width: '95%',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    minHeight: 500,
  },
  calendly: {
    flex: 1,
    minHeight: 500,
    width: '100%',
  },
});

export default BookAppointmentModal;