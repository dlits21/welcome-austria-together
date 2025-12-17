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
import { useLanguage } from '../contexts/LanguageContext';
import PageNavigation from '../components/PageNavigation';
import LanguageModal from '../components/LanguageModal';
import TutorialModal from '../components/TutorialModal';
import Menu from '../components/Menu';

// Import emergency data
import emergencyData from '../data/emergency.json';

interface EmergencyContact {
  nameKey: string;
  phone: string;
  descriptionKey: string;
  type: string;
}

interface EmergencyCategory {
  key: string;
  icon: string;
  titleKey: string;
  subtitleKey: string;
  contacts: EmergencyContact[];
}

const EmergencySupport: React.FC = () => {
  const { t } = useTranslation('emergency');
  const { currentLanguage } = useLanguage();
  const [showLanguage, setShowLanguage] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyContact | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const isWeb  = Platform.OS == 'web'

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

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguage={() => setShowLanguage(true)}
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
                <View style={[styles.emergencyIcon, { backgroundColor: '#fff' }]}>
                  <MaterialIcons
                    name={category.icon}
                    size={64}
                    color={"#A60B33"}
                  />
                </View>
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
                    {t(selectedEmergency.nameKey)}
                  </Text>

                  <Text style={styles.contactDescription}>
                    {t(selectedEmergency.descriptionKey)}
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
            </View>
          </View>
        </Modal>
      </View>

      <LanguageModal
        visible={showLanguage}
        onClose={() => setShowLanguage(false)}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        tutorialData="emergency"
      />
    {!isWeb && (<Menu />)}
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
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#A60B33',
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  emergencyIcon: {
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
