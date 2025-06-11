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
    Linking.openURL('https://www.dvv-international.de/en/our-work/stories/detail/einstieg-deutsch-a-language-learning-app-for-refugees');
  };

  const content = {
    title: {
      en: 'Einstieg Deutsch – A Language Learning App for Refugees',
      de: 'Einstieg Deutsch – Eine Sprachenlern-App für Immigrant:innen',
    },
    subtitle: {
      en: 'Bridging the Gap to Basic German Communication Skills',
      de: 'Grundlegende Deutsche Alltagskommunikation lernen',
    },
    description: {
      en: `The "Einstieg Deutsch" app is a free German language learning tool developed by the German Adult Education Association (DVV) and funded by the German Federal Ministry of Education and Research (BMBF). Designed specifically for refugees and immigrants, the app provides an accessible introduction to the German language, focusing on essential phrases and vocabulary for everyday situations. It aims to bridge the gap for those awaiting formal integration courses or those excluded due to legal status or country of origin. The app employs a "chunk learning" method, teaching fixed expressions like "How are you?" and polite requests such as "Could you please...?" to facilitate quick acquisition of basic communication skills. With over 37,000 downloads since its launch in 2016, the app has been widely used in language classes, volunteer work, and as a self-directed learning resource in adult education centers, community centers, and public libraries.

Resource Details:
• Level: A1
• Online/Offline: Both (downloadable for offline use)
• Price: Free
• Provider: Public (funded by the German government)
• Language support: Arabic, Dari, English, Farsi, French, Kurmanci, Pashto, Tigrinya, Turkish, Urdu

What you will learn:
• Basic German vocabulary and phrases for everyday situations
• Listening comprehension and oral reproduction of common expressions
• Cultural insights through scenarios featuring individuals from Eritrea, Syria, and Afghanistan

Type of Materials:
• Slide shows with subtitles and audio support
• Interactive exercises focusing on speaking and listening skills
• Real-life communicative scenarios

By the end of this course you'll be able to:
• Communicate effectively in basic German in everyday situations
• Understand and use essential phrases for social interactions
• Navigate common scenarios such as medical consultations and administrative tasks

For more information and to download the app, please visit the official website.`,
      de: `Die App „Einstieg Deutsch“ ist ein kostenloses Deutschlerntool, das vom Deutschen Volkshochschul-Verband (DVV) entwickelt und vom Bundesministerium für Bildung und Forschung (BMBF) gefördert wird. Die App wurde speziell für Flüchtlinge und Einwanderer entwickelt und bietet einen leicht verständlichen Einstieg in die deutsche Sprache mit Schwerpunkt auf wichtigen Redewendungen und Vokabeln für den Alltag. Sie soll Menschen, die auf einen offiziellen Integrationskurs warten oder aufgrund ihres Aufenthaltsstatus oder Herkunftslandes vom Unterricht ausgeschlossen sind, helfen, die Lernlücke zu schließen. Die App nutzt die „Chunk-Learning“-Methode und vermittelt feste Ausdrücke wie „Wie geht es Ihnen?“ und höfliche Bitten wie „Könnten Sie bitte…?“, um den schnellen Erwerb grundlegender Kommunikationsfähigkeiten zu ermöglichen. Mit über 37.000 Downloads seit ihrer Einführung im Jahr 2016 wird die App häufig in Sprachkursen, im Ehrenamt und als selbstgesteuerte Lernressource in Volkshochschulen, Gemeindezentren und öffentlichen Bibliotheken eingesetzt.

Ressourcendetails:
• Niveau: A1
• Online/Offline: Beides (herunterladbar für die Offline-Nutzung)
• Preis: Kostenlos
• Anbieter: Öffentlich (finanziert vom Bund)
• Sprachunterstützung: Arabisch, Dari, Englisch, Farsi, Französisch, Kurmanci, Paschtu, Tigrinya, Türkisch, Urdu

Was Sie lernen:
• Grundlegender deutscher Wortschatz und Redewendungen für Alltagssituationen
• Hörverstehen und mündliche Wiedergabe gängiger Ausdrücke
• Kulturelle Einblicke durch Szenarien mit Personen aus Eritrea, Syrien und Afghanistan

Materialien:
• Diashows mit Untertiteln und Audiounterstützung
• Interaktive Übungen zum Sprechen und Hören
• Reale Kommunikationsszenarien

Am Ende dieses Kurses können Sie:
• Effektiv in einfachen Deutschkenntnissen im Alltag kommunizieren
• Wichtige Ausdrücke im sozialen Umgang verstehen und verwenden
• Häufige Situationen wie Arztbesuche und Verwaltungsaufgaben meistern

Weitere Informationen und die App zum Download finden Sie auf der offiziellen Website.`
    },
    provider: 'Deutscher Volkshochschul-Verband (DVV)',
    contact: {
      website: 'https://www.dvv-international.de/en/our-work/stories/detail/einstieg-deutsch-a-language-learning-app-for-refugees'
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

        {/* Contact Information - Updated with clickable elements */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>
            {getContactInformation(currentLanguage)}
          </Text>

          <View style={styles.contactGrid}>
            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => Linking.openURL(content.contact.website)}
            >
              <MaterialIcons name="language" size={24} color="#3B82F6" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>
                  {currentLanguage === 'de' ? 'Website' : 'Website'}
                </Text>
                <Text style={[styles.contactValue, styles.linkText]}>
                  {currentLanguage === 'de' ? 'Zur Website' : 'Visit website'}
                </Text>
              </View>
              <MaterialIcons name="open-in-new" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>


        {/* Tags - Updated with correct information */}
        <View style={styles.tagsSection}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>A1</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Kostenlos' : 'Free'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Online' : 'Online'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Staatlich' : 'Public'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'App' : 'App'}
            </Text>
          </View>
        </View>

        {/* Enroll Button */}
        <TouchableOpacity style={styles.enrollButton} onPress={handleEnrollPress}>
          <Text style={styles.enrollButtonText}>
            {getEnrollNow(currentLanguage)}
          </Text>
          <MaterialIcons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>

      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        languageCode={language.code}
      />

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
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 16,
  },
  providerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
  },
  providerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginRight: 8,
  },
  providerName: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 32,
  },
  contactSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  contactGrid: {
    gap: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  linkText: {
    color: '#3B82F6',
  },
  tagsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 32,
  },
  tag: {
    backgroundColor: '#e0f2fe',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#0284c7',
  },
  tagText: {
    fontSize: 14,
    color: '#0284c7',
    fontWeight: '500',
  },
  enrollButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  mapSection: {
    marginBottom: 32,
  },
  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
    fontWeight: '500',
  },
  mapLocationText: {
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default DuolingoCourse;

