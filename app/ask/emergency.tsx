
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
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/languages/common';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import VirtualAssistantModal from '../../components/VirtualAssistantModal';
import TutorialModal from '../../components/TutorialModal';

// Import emergency translations
import emergencyTranslations from '../../data/language/ask/emergency.json';

const getEmergencyText = (key: string, languageCode: string): string => {
  const translation = emergencyTranslations[key as keyof typeof emergencyTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.en || key;
};

interface EmergencyContact {
  name: { en: string; de: string };
  phone: string;
  description: { en: string; de: string };
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
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyContact | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const emergencyCategories: EmergencyCategory[] = [
    {
      key: 'general',
      emoji: '📞',
      titleKey: 'generalEmergency',
      subtitleKey: 'universalEmergencyNumber',
      contacts: [
        {
          name: { en: 'European Emergency Number', de: 'Europäische Notrufnummer' },
          phone: '112',
          description: { en: 'Universal emergency number for all services', de: 'Universelle Notrufnummer für alle Dienste' },
          type: 'general'
        }
      ]
    },
    {
      key: 'fire',
      emoji: '🔥',
      titleKey: 'fireEmergency',
      subtitleKey: 'firesExplosionsRescue',
      contacts: [
        {
          name: { en: 'Fire Department', de: 'Feuerwehr' },
          phone: '122',
          description: { en: 'For fires, explosions, and rescue operations', de: 'Für Brände, Explosionen und Rettungsoperationen' },
          type: 'fire'
        }
      ]
    },
    {
      key: 'police',
      emoji: '🚔',
      titleKey: 'policeEmergency',
      subtitleKey: 'crimeAccidentsSecurity',
      contacts: [
        {
          name: { en: 'Police', de: 'Polizei' },
          phone: '133',
          description: { en: 'For crimes, accidents, and security emergencies', de: 'Für Verbrechen, Unfälle und Sicherheitsnotfälle' },
          type: 'police'
        }
      ]
    },
    {
      key: 'medical',
      emoji: '🚑',
      titleKey: 'medicalEmergency',
      subtitleKey: 'healthEmergenciesAmbulance',
      contacts: [
        {
          name: { en: 'Emergency Medical Services', de: 'Rettungsdienst' },
          phone: '144',
          description: { en: 'For medical emergencies and ambulance', de: 'Für medizinische Notfälle und Krankenwagen' },
          type: 'medical'
        }
      ]
    },
    {
      key: 'violence',
      emoji: '🆘',
      titleKey: 'violenceHarassment',
      subtitleKey: 'domesticViolenceAssault',
      contacts: [
        {
          name: { en: 'Women\'s Emergency Hotline', de: 'Frauen-Notruf' },
          phone: '0800 222 555',
          description: { en: 'For domestic violence and sexual assault', de: 'Für häusliche Gewalt und sexuelle Übergriffe' },
          type: 'violence'
        },
        {
          name: { en: 'Police', de: 'Polizei' },
          phone: '133',
          description: { en: 'For immediate danger situations', de: 'Für akute Gefahrensituationen' },
          type: 'violence'
        }
      ]
    },
    {
      key: 'mental',
      emoji: '🧠',
      titleKey: 'mentalHealthCrisis',
      subtitleKey: 'psychologicalCrisisSuicidePrevention',
      contacts: [
        {
          name: { en: 'Crisis Intervention Center', de: 'Kriseninterventionszentrum' },
          phone: '01 406 95 95',
          description: { en: 'For psychological crises and suicide prevention', de: 'Für psychische Krisen und Suizidprävention' },
          type: 'mental'
        }
      ]
    },
    {
      key: 'soul-care',
      emoji: '🕊️',
      titleKey: 'careOfSoul',
      subtitleKey: 'spiritualEmotionalSupport',
      contacts: [
        {
          name: { en: 'Telefonseelsorge', de: 'Telefonseelsorge' },
          phone: '142',
          description: { en: 'Spiritual care and emotional support', de: 'Seelsorge und emotionale Unterstützung' },
          type: 'soul-care'
        }
      ]
    },
    {
      key: 'youth',
      emoji: '👨‍👩‍👧‍👦',
      titleKey: 'youthCare',
      subtitleKey: 'supportForChildrenAndYouth',
      contacts: [
        {
          name: { en: 'Rat auf Draht', de: 'Rat auf Draht' },
          phone: '147',
          description: { en: 'Emergency hotline for children and youth', de: 'Notruf für Kinder und Jugendliche' },
          type: 'youth'
        }
      ]
    }
  ];

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
              getEmergencyText('error', currentLanguage) || (language.code === 'de' ? 'Fehler' : 'Error'),
              getEmergencyText('phoneNotSupported', currentLanguage) || (language.code === 'de' 
                ? 'Anrufe werden auf diesem Gerät nicht unterstützt'
                : 'Phone calls are not supported on this device')
            );
          }
        })
        .catch(() => {
          Alert.alert(
            getEmergencyText('error', currentLanguage) || (language.code === 'de' ? 'Fehler' : 'Error'),
            getEmergencyText('phoneError', currentLanguage) || (language.code === 'de' 
              ? 'Fehler beim Öffnen der Telefon-App'
              : 'Error opening phone app')
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
          {getEmergencyText('emergencyContacts', currentLanguage)}
        </Text>
        <Text style={styles.description}>
          {getEmergencyText('quickAccess', currentLanguage)}
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
                  {getEmergencyText(category.titleKey, currentLanguage)}
                </Text>
                <Text style={styles.emergencySubtitle}>
                  {getEmergencyText(category.subtitleKey, currentLanguage)}
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
                    {currentLanguage === 'de' ? selectedEmergency.name.de : selectedEmergency.name.en}
                  </Text>
                  
                  <Text style={styles.contactDescription}>
                    {currentLanguage === 'de' ? selectedEmergency.description.de : selectedEmergency.description.en}
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
                    {getEmergencyText('tapToCall', currentLanguage) || (currentLanguage === 'de' 
                      ? 'Tippen Sie auf die Nummer, um anzurufen'
                      : 'Tap the number to call')}
                  </Text>
                </>
              )}

              <TouchableOpacity 
                style={styles.resetButton}
                onPress={resetQuiz}
              >
                <Text style={styles.resetButtonText}>
                  {getEmergencyText('chooseDifferentEmergency', currentLanguage) || (currentLanguage === 'de' ? 'Anderen Notfall wählen' : 'Choose Different Emergency')}
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
