
// SchubertVerlagCourse.tsx

import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import { getLocation, getEnrollNow, getContactInformation } from '../../../data/languages/common';

const SchubertVerlagCourse: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleEnrollPress = () => {
    Linking.openURL('https://www.aufgaben.schubert-verlag.de/');
  };

  const content = {
    title: {
      en: 'Schubert Verlag – Online German Exercises',
      de: 'Schubert Verlag – Online-Übungen Deutsch'
    },
    subtitle: {
      en: 'Practice German from A1 to C1 with interactive tasks',
      de: 'Deutsch üben von A1 bis C1 mit interaktiven Übungen'
    },
    description: {
      en: `Schubert Verlag offers a wide range of free online exercises for German learners from A1 to C1 level. The content includes grammar, vocabulary, reading, and listening tasks based on textbooks like “Begegnungen”. Exercises are chapter-based and include immediate feedback, sample solutions, and PDFs.

Resource Details:
• Level: A1–C1
• Online/Offline: Online
• Price: Free
• Provider: Public / Publisher
• Language support: German interface; useful for learners with basic English

What you will learn:
• Grammar structures and sentence building
• Topic-specific vocabulary
• Reading comprehension
• Listening comprehension

Type of Materials:
• Interactive quizzes
• Fill-in-the-blanks
• Matching exercises
• PDF downloads with answer keys

By the end of this course you will be able to:
• Consolidate your German skills up to C1
• Understand and apply advanced grammar rules
• Improve comprehension and self-study ability`,
      de: `Der Schubert Verlag bietet eine große Auswahl kostenloser Online-Übungen für Deutschlernende der Niveaustufen A1 bis C1. Die Inhalte umfassen Grammatik-, Wortschatz-, Lese- und Hörübungen, basierend auf bekannten Lehrwerken wie „Begegnungen“. Die Übungen sind kapitelweise gegliedert und bieten direkte Rückmeldung, Musterlösungen und PDFs.

Ressourcendetails:
• Niveau: A1–C1
• Online/Offline: Online
• Preis: Kostenlos
• Anbieter: Öffentlich / Verlag
• Sprachunterstützung: Interface auf Deutsch; geeignet für Lernende mit Grundkenntnissen in Englisch

Was Sie lernen werden:
• Grammatikstrukturen und Satzbildung
• Themenbezogener Wortschatz
• Leseverstehen
• Hörverstehen

Materialien:
• Interaktive Quizfragen
• Lückentexte
• Zuordnungsübungen
• PDF-Downloads mit Lösungen

Am Ende dieses Kurses können Sie:
• Ihre Deutschkenntnisse bis C1 festigen
• Fortgeschrittene Grammatik anwenden
• Ihr Verständnis verbessern und selbstständig lernen`
    },
    provider: 'Schubert Verlag Online',
    contact: {
      phone: 'N/A',
      email: 'N/A',
      website: 'https://www.aufgaben.schubert-verlag.de/'
    }
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

export default SchubertVerlagCourse;
