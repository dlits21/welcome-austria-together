import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import { getLocation, getEnrollNow, getContactInformation } from '../../../data/languages/common';

const LeVraiOnlineCourse: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleEnrollPress = () => {
    Linking.openURL('https://online-lernen.levrai.de/');
  };

  const content = {
    title: {
      en: 'Le Vrai – Interactive Online Learning for German',
      de: 'Le Vrai – Interaktives Online-Lernen für Deutsch'
    },
    subtitle: {
      en: 'Online learning platform with a focus on integration and language support',
      de: 'Online-Lernplattform mit Fokus auf Integration und Sprachförderung'
    },
    description: {
      en: `Le Vrai is an online learning platform that supports learners in German language acquisition, focusing especially on topics relevant for integration. The platform offers simple explanations, exercises, and videos to help migrants and refugees understand the German language and culture.

Course Details:
• Level: A1–B1
• Online/Offline: Online
• Price: Free
• Provider: NGO / Private Initiative
• Language support: Arabic, Farsi, Turkish, English, and more

What you will learn:
• Basic German for everyday communication
• German culture and social norms
• Key integration-related topics (living, health, work, rights)

Type of Materials:
• Videos and animations
• Interactive exercises
• Multilingual explanations
• Topic-based learning modules

By the end of this course you will be able to:
• Communicate in basic German
• Understand your rights and duties in Germany
• Integrate more easily into daily life in German-speaking society`,

      de: `Le Vrai ist eine Online-Lernplattform zur Unterstützung beim Deutschlernen, insbesondere zu Themen rund um Integration. Die Plattform bietet einfache Erklärungen, Übungen und Videos, um Migrant*innen und Geflüchtete beim Spracherwerb und beim kulturellen Verständnis zu unterstützen.

Kursdetails:
• Niveau: A1–B1
• Online/Offline: Online
• Preis: Kostenlos
• Anbieter: NGO / Private Initiative
• Sprachunterstützung: Arabisch, Farsi, Türkisch, Englisch und mehr

Was Sie lernen werden:
• Grundlegendes Deutsch für die Alltagskommunikation
• Deutsche Kultur und gesellschaftliche Normen
• Wichtige Integrationsthemen (Wohnen, Gesundheit, Arbeit, Rechte)

Materialien:
• Videos und Animationen
• Interaktive Übungen
• Mehrsprachige Erklärungen
• Themenbasierte Lernmodule

Am Ende dieses Kurses können Sie:
• In einfachem Deutsch kommunizieren
• Ihre Rechte und Pflichten in Deutschland verstehen
• Sich leichter in die Gesellschaft integrieren`
    },
    provider: 'Le Vrai (NGO / Private Initiative)',
    contact: {
      phone: 'N/A',
      email: 'info@levrai.de',
      website: 'https://online-lernen.levrai.de/'
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

export default LeVraiOnlineCourse;