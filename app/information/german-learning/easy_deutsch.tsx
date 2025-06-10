import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import { getLocation, getEnrollNow, getContactInformation } from '../../../data/languages/common';

const EasyDeutschCourse: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleEnrollPress = () => {
    Linking.openURL('https://easy-deutsch.de/');
  };

  const content = {
    title: {
      en: 'Easy Deutsch – Practical German Grammar Help',
      de: 'Easy Deutsch – Praktische Hilfe zur deutschen Grammatik'
    },
    subtitle: {
      en: 'Understand German grammar simply and clearly',
      de: 'Deutsch Grammatik einfach und verständlich erklärt'
    },
    description: {
      en: `Easy Deutsch is an online platform designed to make German grammar easier to understand for learners at all levels. The website offers free grammar guides, examples, explanations, and downloadable materials for independent learning. It’s ideal for anyone looking to strengthen their grammar skills or prepare for exams.

Course details:
• Level: A1–C1
• Online/Offline: Online
• Price: Free (premium options available)
• Provider: Private (independent platform)
• Language support: English, some content in Spanish, Russian, Turkish

What you will learn:
• Key German grammar rules
• Sentence structure and verb usage
• Practical usage through examples

Type of Materials:
• Grammar explanations
• Example sentences
• PDF downloads
• Video lessons (YouTube)

At the end of this course you will be able to:
• Better understand and apply German grammar rules
• Write and speak more accurately in German
• Learn independently using structured guides and examples`,

      de: `Easy Deutsch ist eine Online-Plattform, die es sich zum Ziel gemacht hat, deutsche Grammatik für Lernende aller Stufen einfach und verständlich zu erklären. Die Webseite bietet kostenlose Grammatikerklärungen, Beispiele, Übungen und herunterladbare Materialien für das Selbststudium.

Kursdetails:
• Niveau: A1–C1
• Online/Offline: Online
• Preis: Kostenlos (mit Premium-Angeboten)
• Anbieter: Privat (unabhängige Plattform)
• Sprachunterstützung: Englisch, teilweise Spanisch, Russisch, Türkisch

Was Sie lernen werden:
• Wichtige deutsche Grammatikregeln
• Satzbau und Verbverwendung
• Praktische Anwendung durch Beispiele

Materialien:
• Grammatikerklärungen
• Beispielsätze
• PDF-Downloads
• Video-Lektionen (YouTube)

Am Ende dieses Kurses können Sie:
• Deutsche Grammatik besser verstehen und anwenden
• Richtig schreiben und sprechen
• Selbstständig mit strukturierten Anleitungen lernen`
    },
    provider: 'Easy Deutsch (independent)',
    contact: {
      phone: 'N/A',
      email: 'support@easy-deutsch.de',
      website: 'https://easy-deutsch.de/'
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

export default EasyDeutschCourse;
