// DeutschlernerblogCourse.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import { getLocation, getEnrollNow, getContactInformation } from '../../../data/languages/common';

const DeutschlernerblogCourse: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];
  const toggleSound = () => setSoundEnabled(!soundEnabled);
  const handleEnrollPress = () => Linking.openURL('https://deutschlernerblog.de/');

  const content = {
    title: {
      en: 'Deutschlernerblog – Free German Learning Resources',
      de: 'Deutschlernerblog – Kostenlose Deutsch-Lernmaterialien'
    },
    subtitle: {
      en: 'Grammar, vocabulary, listening, reading & more from A1 to C2',
      de: 'Grammatik, Wortschatz, Hörverstehen, Leseverstehen & mehr von A1 bis C2'
    },
    description: {
      en: `Deutschlernerblog offers a comprehensive collection of free, high‑quality materials for learners at levels A1 to C2. You’ll find grammar explanations and exercises, vocabulary exercises, listening and reading comprehension, writing tips, quizzes, music and video resources. Content is well-organized by level, skill, and topic.

Resource Details:
• Level: A1–C2
• Online/Offline: Online
• Price: Free
• Provider: Independent Educational Blog
• Language support: German interface; some bilingual (e.g. English)

What you'll learn:
• German grammar across all levels
• Topic-based vocabulary
• Listening and reading comprehension
• Writing & exam preparation skills

Type of Materials:
• Online quizzes & exercises
• Fill‑in‑the‑blank, matching, multiple‑choice
• Reading texts and analysis
• Audio clips, videos, e‑books

By the end:
• Strengthen German skills up to C2
• Gain confidence in reading, listening, writing
• Self-study independently with rich, structured content`,
      de: `Deutschlernerblog bietet eine umfassende Sammlung kostenloser, hochwertiger Lernmaterialien für Deutschlernende von A1 bis C2. Enthalten sind Grammatik‑Erklärungen und Übungen, Wortschatz-Aufgaben, Hör- und Leseverstehen, Schreibtipps, Quiz, Musik- und Videomaterial. Die Inhalte sind nach Niveau, Fertigkeit und Thema strukturiert.

Ressourcendetails:
• Niveau: A1–C2
• Online/Offline: Online
• Preis: Kostenlos
• Anbieter: Unabhängiger Lernblog
• Sprachunterstützung: Deutsch; teils bilingual (z. B. Englisch)

Was Sie lernen werden:
• Deutsche Grammatik auf allen Niveaus
• Themenbezogener Wortschatz
• Hör- und Leseverstehen
• Schreiben & Prüfungsvorbereitung

Materialien:
• Online-Quiz & Übungen
• Lückentexte, Zuordnungen, Multiple‑Choice
• Lesetexte mit Analyse
• Audioclips, Videos, E‑Books

Am Ende können Sie:
• Ihre Deutschkenntnisse bis C2 festigen
• Selbstbewusst lesen, hören und schreiben
• Eigenständig mit strukturierten Lerninhalten lernen`
    },
    provider: 'Deutschlernerblog',
    contact: {
      website: 'https://deutschlernerblog.de/'
    }
  };

  const getCurrentContent = (obj: any) => obj[currentLanguage] || obj.en;

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

export default DeutschlernerblogCourse;