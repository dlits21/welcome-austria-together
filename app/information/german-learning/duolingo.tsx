// DuolingoCourse.tsx

import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import { getLocation, getEnrollNow, getContactInformation } from '../../../data/languages/common';

const DuolingoCourse: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleEnrollPress = () => {
    Linking.openURL('https://www.duolingo.com/');
  };

  const content = {
    title: {
      en: 'Duolingo – Fun and Free Language Learning',
      de: 'Duolingo – Spaß beim kostenlosen Sprachenlernen',
    },
    subtitle: {
      en: 'Interactive language learning with game like lessons',
      de: 'Interaktives Sprachenlernen mit spielerischen Lektionen',
    },
    description: {
      en: `Duolingo is a globally popular language learning platform offering free, interactive lessons designed like games to help users stay motivated. With German courses ranging from beginner (A1) to intermediate (B1), Duolingo provides a fun and engaging way to learn vocabulary, grammar, pronunciation, and sentence structure.

Resource Details:
• Level: A1–B1
• Online/Offline: Online
• Price: Free (with optional paid version)
• Provider: Private company
• Language support: English, Arabic, Farsi, Turkish, Russian, and many more

What you will learn:
• Basic vocabulary and grammar
• Sentence structure and pronunciation
• Everyday communication in German

Type of Materials:
• Interactive lessons
• Quizzes and review exercises
• Listening and speaking practice
• Achievement rewards and streak system

By the end of this course you'll be able to:
• Understand and use common German phrases
• Form basic sentences in German
• Communicate in simple, everyday situations
• Continue learning independently with strong motivation`,
      de: `Duolingo ist eine weltweit beliebte Sprachlernplattform mit kostenlosen, interaktiven Lektionen in spielerischer Form, die den Lernprozess unterhaltsam und motivierend gestalten. Der Deutschkurs reicht von A1 bis B1 und hilft beim Lernen von Vokabeln, Grammatik, Aussprache und Satzbau.

Ressourcendetails:
• Niveau: A1–B1
• Online/Offline: Online
• Preis: Kostenlos (mit optionaler Bezahlversion)
• Anbieter: Privatunternehmen
• Sprachunterstützung: Englisch, Arabisch, Farsi, Türkisch, Russisch und viele weitere

Was Sie lernen werden:
• Grundwortschatz und Grammatik
• Satzbau und Aussprache
• Alltagskommunikation auf Deutsch

Materialien:
• Interaktive Lektionen
• Quizze und Wiederholungsübungen
• Hör- und Sprechtraining
• Belohnungssystem und Lernfortschritt-Anzeige

Am Ende dieses Kurses können Sie:
• Gängige deutsche Redewendungen verstehen und verwenden
• Einfache Sätze auf Deutsch bilden
• In alltäglichen Situationen kommunizieren
• Selbstständig mit Freude weiterlernen`
    },
    provider: 'Duolingo Inc.',
    contact: {
      email: 'support@duolingo.com',
      website: 'https://www.duolingo.com/'
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

export default DuolingoCourse;

