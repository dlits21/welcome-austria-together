
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
import BaseQuizModal from '../../components/BaseQuizModal';
import LanguageModal from '../../components/LanguageModal';
import HelpModal from '../../components/HelpModal';

interface EmergencyContact {
  name: { en: string; de: string };
  phone: string;
  description: { en: string; de: string };
  type: string;
}

interface EmergencyCategory {
  key: string;
  emoji: string;
  title: { en: string; de: string };
  subtitle: { en: string; de: string };
  contacts: EmergencyContact[];
}

const EmergencySupport: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const [showQuiz, setShowQuiz] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyContact | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const emergencyCategories: EmergencyCategory[] = [
    {
      key: 'fire',
      emoji: '🔥',
      title: { en: 'Fire Emergency', de: 'Feuer-Notfall' },
      subtitle: { en: 'Fires, explosions, rescue', de: 'Brände, Explosionen, Rettung' },
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
      title: { en: 'Police Emergency', de: 'Polizei-Notfall' },
      subtitle: { en: 'Crime, accidents, security', de: 'Verbrechen, Unfälle, Sicherheit' },
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
      title: { en: 'Medical Emergency', de: 'Medizinischer Notfall' },
      subtitle: { en: 'Health emergencies, ambulance', de: 'Gesundheitsnotfälle, Krankenwagen' },
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
      title: { en: 'Violence/Harassment', de: 'Gewalt/Belästigung' },
      subtitle: { en: 'Domestic violence, assault', de: 'Häusliche Gewalt, Übergriffe' },
      contacts: [
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
      ]
    },
    {
      key: 'mental',
      emoji: '🧠',
      title: { en: 'Mental Health Crisis', de: 'Psychische Krise' },
      subtitle: { en: 'Psychological crisis, suicide prevention', de: 'Psychische Krise, Suizidprävention' },
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
      key: 'general',
      emoji: '📞',
      title: { en: 'General Emergency', de: 'Allgemeiner Notfall' },
      subtitle: { en: 'Universal emergency number', de: 'Universelle Notrufnummer' },
      contacts: [
        {
          name: { en: 'European Emergency Number', de: 'Europäische Notrufnummer' },
          phone: '112',
          description: { en: 'Universal emergency number for all services', de: 'Universelle Notrufnummer für alle Dienste' },
          type: 'general'
        }
      ]
    }
  ];

  const handleCategoryPress = (category: EmergencyCategory) => {
    if (category.contacts.length === 1) {
      setSelectedEmergency(category.contacts[0]);
      setShowContactModal(true);
    } else {
      // Show quiz for categories with multiple contacts
      setShowQuiz(true);
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
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
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
                  {language.code === 'de' ? category.title.de : category.title.en}
                </Text>
                <Text style={styles.emergencySubtitle}>
                  {language.code === 'de' ? category.subtitle.de : category.subtitle.en}
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
       {/* Language Modal */}
        <LanguageModal
          visible={showLanguageModal}
          onClose={() => setShowLanguageModal(false)}
          languageCode={language.code}
        />

        {/* Help Modal */}
        <HelpModal
          visible={showHelpModal}
          onClose={() => setShowHelpModal(false)}
          languageCode={language.code}
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
