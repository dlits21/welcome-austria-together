
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
  Platform 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/languages/common';
import PageNavigation from '../../components/PageNavigation';
import BaseQuizModal from '../../components/BaseQuizModal';

interface EmergencyContact {
  name: { en: string; de: string };
  phone: string;
  description: { en: string; de: string };
  type: string;
}

const EmergencySupport: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showQuiz, setShowQuiz] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyContact | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const emergencyContacts: { [key: string]: EmergencyContact[] } = {
    fire: [
      {
        name: { en: 'Fire Department', de: 'Feuerwehr' },
        phone: '122',
        description: { en: 'For fires, explosions, and rescue operations', de: 'Für Brände, Explosionen und Rettungsoperationen' },
        type: 'fire'
      }
    ],
    police: [
      {
        name: { en: 'Police', de: 'Polizei' },
        phone: '133',
        description: { en: 'For crimes, accidents, and security emergencies', de: 'Für Verbrechen, Unfälle und Sicherheitsnotfälle' },
        type: 'police'
      }
    ],
    medical: [
      {
        name: { en: 'Emergency Medical Services', de: 'Rettungsdienst' },
        phone: '144',
        description: { en: 'For medical emergencies and ambulance', de: 'Für medizinische Notfälle und Krankenwagen' },
        type: 'medical'
      }
    ],
    violence: [
      {
        name: { en: 'Women\'s Emergency Hotline', de: 'Frauen-Notruf' },
        phone: '01 71719',
        description: { en: 'For domestic violence and sexual assault', de: 'Für häusliche Gewalt und sexuelle Übergriffe' },
        type: 'violence'
      },
      {
        name: { en: 'Police', de: 'Polizei' },
        phone: '133',
        description: { en: 'For immediate danger situations', de: 'Für akute Gefahrensituationen' },
        type: 'violence'
      }
    ],
    mental: [
      {
        name: { en: 'Crisis Intervention Center', de: 'Kriseninterventionszentrum' },
        phone: '01 406 95 95',
        description: { en: 'For psychological crises and suicide prevention', de: 'Für psychische Krisen und Suizidprävention' },
        type: 'mental'
      }
    ],
    general: [
      {
        name: { en: 'European Emergency Number', de: 'Europäische Notrufnummer' },
        phone: '112',
        description: { en: 'Universal emergency number for all services', de: 'Universelle Notrufnummer für alle Dienste' },
        type: 'general'
      }
    ]
  };

  const quizQuestions = [
    {
      question: language.code === 'de' 
        ? 'Welche Art von Notfall haben Sie?' 
        : 'What type of emergency do you have?',
      answers: [
        { key: 'fire', en: 'Fire or explosion', de: 'Brand oder Explosion' },
        { key: 'medical', en: 'Medical emergency', de: 'Medizinischer Notfall' },
        { key: 'police', en: 'Crime or accident', de: 'Verbrechen oder Unfall' },
        { key: 'violence', en: 'Violence or harassment', de: 'Gewalt oder Belästigung' },
        { key: 'mental', en: 'Mental health crisis', de: 'Psychische Krise' },
        { key: 'general', en: 'Other emergency', de: 'Anderer Notfall' }
      ],
      key: 'emergencyType'
    }
  ];

  const handleQuizAnswer = (answer: string | { key: string; en: string; de: string }) => {
    const answerValue = typeof answer === 'string' ? answer : answer.key;
    const contacts = emergencyContacts[answerValue] || emergencyContacts.general;
    
    if (contacts.length === 1) {
      setSelectedEmergency(contacts[0]);
      setShowContactModal(true);
      setShowQuiz(false);
    } else {
      // Show selection if multiple contacts
      setSelectedEmergency(contacts[0]); // For now, show first one
      setShowContactModal(true);
      setShowQuiz(false);
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
              language.code === 'de' ? 'Fehler' : 'Error',
              language.code === 'de' 
                ? 'Anrufe werden auf diesem Gerät nicht unterstützt'
                : 'Phone calls are not supported on this device'
            );
          }
        })
        .catch(() => {
          Alert.alert(
            language.code === 'de' ? 'Fehler' : 'Error',
            language.code === 'de' 
              ? 'Fehler beim Öffnen der Telefon-App'
              : 'Error opening phone app'
          );
        });
    }
  };

  const resetQuiz = () => {
    setShowQuiz(true);
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
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>
          {language.code === 'de' ? 'Notfall-Kontakte' : 'Emergency Contacts'}
        </Text>
        <Text style={styles.description}>
          {language.code === 'de' 
            ? 'Schneller Zugang zu wichtigen Notfall-Kontakten'
            : 'Quick access to important emergency contacts'}
        </Text>

        <BaseQuizModal
          visible={showQuiz}
          currentQuestion={currentQuestion}
          questions={quizQuestions}
          languageCode={language.code}
          title={language.code === 'de' ? 'Notfall-Assistent' : 'Emergency Assistant'}
          subtitle={language.code === 'de' 
            ? 'Wählen Sie Ihren Notfall-Typ für sofortige Hilfe'
            : 'Select your emergency type for immediate help'}
          onAnswer={handleQuizAnswer}
          onSkip={() => setShowQuiz(false)}
          onClose={() => setShowQuiz(false)}
        />

        {/* Emergency Contact Modal */}
        <Modal
          visible={showContactModal}
          transparent={true}
          animationType="slide"
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
                    {language.code === 'de' ? selectedEmergency.name.de : selectedEmergency.name.en}
                  </Text>
                  
                  <Text style={styles.contactDescription}>
                    {language.code === 'de' ? selectedEmergency.description.de : selectedEmergency.description.en}
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
                    {language.code === 'de' 
                      ? 'Tippen Sie auf die Nummer, um anzurufen'
                      : 'Tap the number to call'}
                  </Text>
                </>
              )}

              <TouchableOpacity 
                style={styles.resetButton}
                onPress={resetQuiz}
              >
                <Text style={styles.resetButtonText}>
                  {language.code === 'de' ? 'Anderen Notfall wählen' : 'Choose Different Emergency'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contactModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    position: 'relative',
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
