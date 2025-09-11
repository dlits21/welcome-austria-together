import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Modal,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
  ScrollView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/language/common';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import VirtualAssistantModal from '../../components/VirtualAssistantModal';
import TutorialModal from '../../components/TutorialModal';

// Import emergency data
import emergencyData from '../../data/ask/emergency.json';

interface EmergencyContact {
  name: { [key: string]: string };
  phone: string;
  description: { [key: string]: string };
  type: string;
}

interface EmergencyCategory {
  key: string;
  emoji: string;
  titleKey: string;
  subtitleKey: string;
  contacts: EmergencyContact[];
}

const EmergencySupport: React.FC = () => {
  const { t } = useTranslation('askEmergency');
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyContact | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Load emergency categories from external data
  const emergencyCategories: EmergencyCategory[] = emergencyData.emergencyCategories;

  const handleCategoryPress = (category: EmergencyCategory) => {
    if (category.contacts.length === 1) {
      setSelectedEmergency(category.contacts[0]);
      setShowContactModal(true);
    }
  };

  const handleCall = (phoneNumber: string) => {
    const phoneUrl = `tel:${phoneNumber}`;
    
    if (Platform.OS === 'web') {
      window.open(phoneUrl, '_self');
    } else {
      Linking.canOpenURL(phoneUrl)
        .then((supported) => {
          if (supported) {
            Linking.openURL(phoneUrl);
          } else {
            Alert.alert(
              t('error'),
              t('phoneNotSupported')
            );
          }
        })
        .catch(() => {
          Alert.alert(
            t('error'),
            t('phoneError')
          );
        });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setShowContactModal(false);
    setSelectedEmergency(null);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>
          {t('emergencyContacts')}
        </Text>
        <Text style={styles.description}>
          {t('quickAccess')}
        </Text>

        <ScrollView style={styles.gridContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.emergencyGrid}>
            {emergencyCategories.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={styles.emergencyCard}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={styles.emergencyEmoji}>{category.emoji}</Text>
                <Text style={styles.emergencyTitle}>
                  {t(category.titleKey)}
                </Text>
                <Text style={styles.emergencySubtitle}>
                  {t(category.subtitleKey)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Emergency Contact Modal */}
        <Modal
          visible={showContactModal}
          transparent={true}
          animationType="slide"
          statusBarTranslucent={Platform.OS === 'android'}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.contactModal}>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setShowContactModal(false)}
              >
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>

              {selectedEmergency && (
                <>
                  <Text style={styles.contactTitle}>
                    {selectedEmergency.name[currentLanguage] || selectedEmergency.name.en}
                  </Text>
                  
                  <Text style={styles.contactDescription}>
                    {selectedEmergency.description[currentLanguage] || selectedEmergency.description.en}
                  </Text>

                  <TouchableOpacity 
                    style={styles.callButton}
                    onPress={() => handleCall(selectedEmergency.phone)}
                  >
                    <MaterialIcons name="phone" size={24} color="#fff" />
                    <Text style={styles.callButtonText}>
                      {selectedEmergency.phone}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.callInstruction}>
                    {t('tapToCall')}
                  </Text>
                </>
              )}

              <TouchableOpacity 
                style={styles.resetButton}
                onPress={resetQuiz}
              >
                <Text style={styles.resetButtonText}>
                  {t('chooseDifferentEmergency')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
       
      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        languageCode={language.code}
      />

      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
        languageCode={language.code}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={language.code}
        tutorialData="ask-emergency"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  gridContainer: {
    flex: 1,
  },
  emergencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  emergencyCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  emergencyEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1e293b',
    lineHeight: 18,
  },
  emergencySubtitle: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  contactModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 1,
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
    marginTop: 20,
  },
  contactDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  callButton: {
    backgroundColor: '#dc2626',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    minWidth: 200,
    justifyContent: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  callInstruction: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default EmergencySupport;
