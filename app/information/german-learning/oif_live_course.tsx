import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const GermanA1ViennaPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleEnrollPress = () => {
    Linking.openURL('https://sprachportal.at/kurse-und-pruefungen/kursangebote/online-kurse/');
  };

  const content = {
    title: {
      en: 'ÖIF Live Online German Courses',
      de: 'ÖIF Live Online Deutsch Kurse'
    },
    subtitle: {
      en: 'Free German courses for beginners and advanced learners (A1-B2) - Daily from Monday to Saturday with qualified trainers',
      de: 'Kostenlose Deutschkurse für Anfänger und Fortgeschrittene (A1-B2) – Täglich von Montag bis Samstag mit qualifizierten Trainerinnen und Trainern'
    },
    description: {
      en: `The ÖIF online courses offer an excellent opportunity for German learners to improve their language skills to A1 level. With daily live sessions and a variety of learning materials, the course supports the introduction to the German language and promotes integration in Austria.

           Course details:
           • Level: A1-B2
           • Duration: Flexible, depending on individual learning progress
           • Schedule: Monday to Saturday, different times depending on the course room
           • Location: Online (Zoom platform)
           • Class size: Varies, usually small groups for individual attention
           • Childcare: N/A
           • Price: Free of charge
           • Provider: Public (state funded)
           • Language support: Dari/Farsi, Arabic, English, Ukrainian
           • Relevant: for integration agreements and language support
           • Certificate: Yes - confirmation of participation for regular attendance


           What you will learn:
           • Basic German language skills for everyday life
           • Communication in simple everyday situations
           • Pronunciation and listening comprehension
           • Simple grammar and vocabulary
           • Preparation for integration exams

           At the end of this course you will be able to
           • Communicate in basic everyday situations in German
           • Hold simple conversations and exchange information
           • Understand German texts at a basic level
           • Compose simple written messages
           • Prepare for integration and language exams.

           For more information and to register, please visit the official website of the language portal.`,
      de: `Die ÖIF-Online-Kurse bieten eine ausgezeichnete Gelegenheit für Deutschlernende, ihre Sprachkenntnisse auf A1-Niveau zu verbessern. Mit täglichen Live-Sitzungen und vielfältigen Lernmaterialien unterstützt der Kurs den Einstieg in die deutsche Sprache und fördert die Integration in Österreich.

Kursdetails:
• Level: A1-B2
• Flexibel, je nach individuellem Lernfortschritt
• Zeitplan: Montag bis Samstag, verschiedene Zeiten je nach Kursraum
• Ort: Online (Zoom-Plattform)
• Klassengröße: Variiert, in der Regel kleine Gruppen für individuelle Betreuung
• Kinderbetreuung: N/A
• Preis: Kostenlos
• Anbieter: Öffentlich (staatlich gefördert)
• Sprachliche Unterstützung: Dari/Farsi, Arabisch, Englisch, Ukrainisch
• Relevant: für Integrationsvereinbarungen und Sprachförderung
• Zertifikat: Ja – Teilnahmebestätigung bei regelmäßiger Teilnahme


Was Sie lernen werden:
• Grundlegende Deutschkenntnisse für den Alltag
• Kommunikation in einfachen Alltagssituationen
• Aussprache und Hörverständnis
• Einfache Grammatik und Wortschatz
• Vorbereitung auf Integrationsprüfungen

Am Ende dieses Kurses können Sie:
• Sich in grundlegenden Alltagssituationen auf Deutsch verständigen
• Einfache Gespräche führen und Informationen austauschen
• Deutsche Texte auf einfachem Niveau verstehen
• Einfache schriftliche Mitteilungen verfassen
• Sich auf Integrations- und Sprachprüfungen vorbereiten.

Für weitere Informationen und zur Anmeldung besuchen Sie bitte die offizielle Website des Sprachportals.`
    },
    provider: 'Österreichischer Integrations Fond (ÖIF)',
    contact: {
      phone: '+43 5 0468-0',
      email: 'info@integrationsfonds.at',
      website: 'https://sprachportal.at/kurse-und-pruefungen/kursangebote/online-kurse/'
    }
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
        <Text style={styles.title}>
          {language.code === 'de' ? content.title.de : content.title.en}
        </Text>
        
        <Text style={styles.subtitle}>
          {language.code === 'de' ? content.subtitle.de : content.subtitle.en}
        </Text>
        
        <View style={styles.providerSection}>
          <Text style={styles.providerLabel}>
            {language.code === 'de' ? 'Anbieter:' : 'Provider:'}
          </Text>
          <Text style={styles.providerName}>{content.provider}</Text>
        </View>
        
        <Text style={styles.description}>
          {language.code === 'de' ? content.description.de : content.description.en}
        </Text>
        
        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Kontaktinformationen' : 'Contact Information'}
          </Text>
          
          <View style={styles.contactItem}>
            <MaterialIcons name="phone" size={20} color="#3B82F6" />
            <Text style={styles.contactText}>{content.contact.phone}</Text>
          </View>
          
          <View style={styles.contactItem}>
            <MaterialIcons name="email" size={20} color="#3B82F6" />
            <Text style={styles.contactText}>{content.contact.email}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => Linking.openURL(content.contact.website)}
          >
            <MaterialIcons name="language" size={20} color="#3B82F6" />
            <Text style={[styles.contactText, styles.linkText]}>{content.contact.website}</Text>
            <MaterialIcons name="open-in-new" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Location Map */}
        <View style={styles.mapSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Standort' : 'Location'}
          </Text>
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <MaterialIcons name="location-on" size={48} color="#3B82F6" />
              <Text style={styles.mapPlaceholderText}>
                {language.code === 'de' ? 'Karte wird geladen...' : 'Map loading...'}
              </Text>
              <Text style={styles.mapLocationText}>VHS Vienna, Urania Building</Text>
            </View>
          </View>
        </View>
        
        {/* Tags */}
        <View style={styles.tagsSection}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>A1</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {language.code === 'de' ? 'Anfänger' : 'Beginner'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Vienna</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>8 {language.code === 'de' ? 'Wochen' : 'weeks'}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>€200</Text>
          </View>
        </View>
        
        {/* Enroll Button */}
        <TouchableOpacity style={styles.enrollButton} onPress={handleEnrollPress}>
          <Text style={styles.enrollButtonText}>
            {language.code === 'de' ? 'Jetzt anmelden' : 'Enroll Now'}
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
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  linkText: {
    color: '#3B82F6',
    textDecorationLine: 'underline',
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

export default GermanA1ViennaPage;
