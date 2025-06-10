// BabbelCourse.tsx

import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import { getLocation, getEnrollNow, getContactInformation } from '../../../data/languages/common';

const BabbelCourse: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleEnrollPress = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.babbel.mobile.android.en');
  };

  const content = {
    title: {
      en: 'Babbel – Learn German Anytime, Anywhere',
      de: 'Babbel – Deutsch lernen jederzeit und überall',
    },
    subtitle: {
      en: 'German language learning with real-life dialogues',
      de: 'Deutsch lernen mit praxisnahen Dialogen',
    },
    description: {
      en: `Babbel is a premium language learning app that helps users improve their German through short, effective lessons based on real-life situations. Babbel is ideal for learners at levels A1 to B2 and offers customized learning paths, speech recognition, and grammar tips.

Resource Details:
• Level: A1–B2
• Online/Offline: Online (lessons downloadable)
• Price: Subscription-based (from €5.99/month)
• Provider: Private company
• Language support: Interface available in English, Turkish, Arabic, French, and more

What you will learn:
• Conversational German for daily life
• Grammar rules and correct sentence structure
• Pronunciation and listening skills

Type of Materials:
• Interactive lessons
• Real-life dialogues
• Voice recognition for pronunciation
• Grammar and vocabulary training

By the end of this course you'll be able to:
• Communicate effectively in German
• Understand spoken and written German in daily situations
• Speak German with improved confidence`,

      de: `Babbel ist eine Premium-Sprachlern-App, die kurze und effektive Lektionen bietet, basierend auf Alltagssituationen. Der Deutschkurs ist geeignet für Lernende auf den Niveaustufen A1 bis B2 und bietet personalisierte Lernpfade, Spracherkennung und Grammatikhilfen.

Ressourcendetails:
• Niveau: A1–B2
• Online/Offline: Online (Lektionen auch offline verfügbar)
• Preis: Abonnement (ab 5,99 € pro Monat)
• Anbieter: Privatunternehmen
• Sprachunterstützung: Oberfläche auf Englisch, Türkisch, Arabisch, Französisch und mehr

Was Sie lernen werden:
• Deutsch für Alltagssituationen
• Grammatikregeln und Satzbau
• Aussprache und Hörverstehen

Materialien:
• Interaktive Lektionen
• Alltagstaugliche Dialoge
• Spracherkennung zur Ausspracheübung
• Grammatik- und Vokabeltraining

Am Ende dieses Kurses können Sie:
• Sicher auf Deutsch kommunizieren
• Gesprochenes und geschriebenes Deutsch im Alltag verstehen
• Mit mehr Selbstbewusstsein Deutsch sprechen`
    },
    provider: 'Babbel GmbH',
    contact: {
      phone: 'N/A',
      email: 'support@babbel.com',
      website: 'https://www.babbel.com/'
    },
  };

  const getCurrentContent = (contentObj: any) => {
    return contentObj[currentLanguage] || contentObj.en;
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>{getCurrentContent(content.title)}</Text>
        <Text style={styles.subtitle}>{getCurrentContent(content.subtitle)}</Text>

        <View style={styles.providerSection}>
          <Text style={styles.providerLabel}>{currentLanguage === 'de' ? 'Anbieter:' : 'Provider:'}</Text>
          <Text style={styles.providerName}>{content.provider}</Text>
        </View>

        <Text style={styles.description}>{getCurrentContent(content.description)}</Text>

        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>{getContactInformation(currentLanguage)}</Text>

          <View style={styles.contactItem}>
            <MaterialIcons name="phone" size={20} color="#3B82F6" />
            <Text style={styles.contactText}>{content.contact.phone}</Text>
          </View>

          <View style={styles.contactItem}>
            <MaterialIcons name="email" size={20} color="#3B82F6" />
            <Text style={styles.contactText}>{content.contact.email}</Text>
          </View>

          <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL(content.contact.website)}>
            <MaterialIcons name="language" size={20} color="#3B82F6" />
            <Text style={[styles.contactText, styles.linkText]}>{content.contact.website}</Text>
            <MaterialIcons name="open-in-new" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.enrollButton} onPress={handleEnrollPress}>
          <Text style={styles.enrollButtonText}>{getEnrollNow(currentLanguage)}</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>

      <LanguageModal visible={showLanguageModal} onClose={() => setShowLanguageModal(false)} languageCode={language.code} />
      <HelpModal visible={showHelpModal} onClose={() => setShowHelpModal(false)} languageCode={language.code} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: '#1f2937' },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#4b5563', marginBottom: 16 },
  providerSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, backgroundColor: '#f8fafc', padding: 12, borderRadius: 8 },
  providerLabel: { fontSize: 16, fontWeight: '600', color: '#374151', marginRight: 8 },
  providerName: { fontSize: 16, color: '#3B82F6', fontWeight: '600' },
  description: { fontSize: 16, lineHeight: 24, color: '#374151', marginBottom: 32 },
  contactSection: { marginBottom: 32, backgroundColor: '#f8fafc', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#1f2937', marginBottom: 16 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  contactText: { fontSize: 16, color: '#374151', marginLeft: 12, flex: 1 },
  linkText: { color: '#3B82F6', textDecorationLine: 'underline' },
  enrollButton: { backgroundColor: '#3B82F6', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 32 },
  enrollButtonText: { color: '#fff', fontSize: 18, fontWeight: '600', marginRight: 8 },
});

export default BabbelCourse;

