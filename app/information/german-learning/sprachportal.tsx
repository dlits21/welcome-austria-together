
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import {getLocation, getEnrollNow, getContactInformation} from '../../../data/languages/common';

const OIFOfflineCourse: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleEnrollPress = () => {
    Linking.openURL('https://sprachportal.at/en/mein-sprachportal-at-a-glance/');
  };

  const content = {
    title: {
      en: 'Sprachportal - Your Gateway to Learning German and Integrating into Austria',
      de: 'Sprachportal - Ihr Tor zum Deutschlernen und zur Integration in Österreich',
      ru: 'Lorem Ipsum',
      ce: 'Lorem Ipsum',
      pr: 'Lorem Ipsum',
      ps: 'Lorem Ipsum',
      fa: 'Lorem Ipsum',
      ar: 'Lorem Ipsum',
      ku: 'Lorem Ipsum',
      so: 'Lorem Ipsum',
      ka: 'Lorem Ipsum',
      sq: 'Lorem Ipsum'
    },
    subtitle: {
      en: 'Free Online Courses, Exercises, and Resources for German Learners',
      de: 'Kostenlose Online-Kurse, Übungen und Ressourcen für Deutschlernende',
      ru: 'Lorem Ipsum',
      ce: 'Lorem Ipsum',
      pr: 'Lorem Ipsum',
      ps: 'Lorem Ipsum',
      fa: 'Lorem Ipsum',
      ar: 'Lorem Ipsum',
      ku: 'Lorem Ipsum',
      so: 'Lorem Ipsum',
      ka: 'Lorem Ipsum',
      sq: 'Lorem Ipsum'
    },
    description: {
      en: `The Sprachportal is a comprehensive online platform developed by the Austrian Integration Fund (ÖIF) to support individuals in learning German and integrating into Austrian society. It offers a wide range of free resources, including live online courses, interactive exercises, and cultural materials, catering to various proficiency levels from A1 to B2. The platform is designed to assist learners in improving their language skills while gaining insights into everyday life in Austria.

Resource Details:
• Level: A1-B2
• Online/Offline: Online
• Price: Free of charge
• Provider: Public (state-funded)
• Language support: Arabic, Dari/Farsi, English, French, Turkish, and more


What you will learn:
• Basic to intermediate German language skills
• Vocabulary and grammar for everyday situations
• Cultural norms and values in Austria
• Knowledge of Austrian institutions and services

Type of Materials:
• Live online courses with certified instructors
• Interactive vocabulary trainers
• 360° panoramic picture exercises
• Doodle clips (animated learning stories)
• Learning podcasts
• Videos on everyday life and values in Austria
• Interactive learning videos with exercises
• Learning magazine "Deutsch lernen"
• Materials focusing on Austria
• Sample tests and materials for test preparation

At the end of this course you will be able to:
• Communicate effectively in everyday situations in Austria
• Understand and use German vocabulary and grammar appropriate for your proficiency level
• Navigate Austrian institutions and services with greater ease
• Demonstrate knowledge of Austrian cultural norms and values
• Prepare for German language proficiency tests

For more information and to access the resources, please visit the official website.`,
      de: `Das Sprachportal ist eine umfassende Online-Plattform, die vom Österreichischen Integrationsfonds (ÖIF) entwickelt wurde, um Menschen beim Erlernen der deutschen Sprache und bei der Integration in die österreichische Gesellschaft zu unterstützen. Es bietet eine breite Palette an kostenlosen Ressourcen, darunter Live-Online-Kurse, interaktive Übungen und kulturelle Materialien, die für verschiedene Sprachniveaus von A1 bis B2 geeignet sind. Die Plattform soll Lernenden helfen, ihre Sprachkenntnisse zu verbessern und gleichzeitig Einblicke in das Alltagsleben in Österreich zu gewinnen.

Details zur Ressource:
• Niveau: A1-B2
• Online/Offline: Online
• Preis: Kostenfrei
• Anbieter: Öffentlich (staatlich finanziert)
• Unterstützte Sprachen: Arabisch, Dari/Farsi, Englisch, Französisch, Türkisch, und mehr


Was Sie lernen werden:
• Grund- bis Mittelstufenkenntnisse der deutschen Sprache
• Wortschatz und Grammatik für Alltagssituationen
• Kulturelle Normen und Werte in Österreich
• Kenntnisse über österreichische Institutionen und Dienstleistungen

Art der Materialien:
• Live-Online-Kurse mit zertifizierten Lehrkräften
• Interaktive Vokabeltrainer
• 360°-Panoramabilder-Übungen
• Doodle-Clips (animierte Lerngeschichten)
• Lern-Podcasts
• Videos zu Alltag und Werten in Österreich
• Interaktive Lernvideos mit Übungen
• Lernmagazin „Deutsch lernen“
• Materialien zum Thema Österreich
• Beispieltests und Materialien zur Testvorbereitung

Nach Abschluss dieses Kurses können Sie:
• effektiv in Alltagssituationen in Österreich kommunizieren
• deutschen Wortschatz und Grammatik entsprechend Ihrem Sprachniveau verstehen und anwenden
• sich leichter in österreichischen Institutionen und Dienstleistungen zurechtfinden
• Kenntnisse der österreichischen kulturellen Normen und Werte nachweisen
• sich auf Deutschprüfungen vorbereiten

Weitere Informationen und Ressourcen finden Sie auf der offiziellen Website.`,
      ru: 'Lorem Ipsum',
      ce: 'Lorem Ipsum',
      pr: 'Lorem Ipsum',
      ps: 'Lorem Ipsum',
      fa: 'Lorem Ipsum',
      ar: 'Lorem Ipsum',
      ku: 'Lorem Ipsum',
      so: 'Lorem Ipsum',
      ka: 'Lorem Ipsum',
      sq: 'Lorem Ipsum'
    },
    provider: 'Österreichischer Integrations Fond (ÖIF)',
    contact: {
      phone: '+43 1 715 13 13',
      email: 'info@integrationsfonds.at',
      website: 'https://sprachportal.at/en/mein-sprachportal-at-a-glance/'
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
        <Text style={styles.title}>
          {getCurrentContent(content.title)}
        </Text>
        
        <Text style={styles.subtitle}>
          {getCurrentContent(content.subtitle)}
        </Text>
        
        <View style={styles.providerSection}>
          <Text style={styles.providerLabel}>
            {currentLanguage === 'de' ? 'Anbieter:' : 'Provider:'}
          </Text>
          <Text style={styles.providerName}>{content.provider}</Text>
        </View>
        
        <Text style={styles.description}>
          {getCurrentContent(content.description)}
        </Text>
        
        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>
            {getContactInformation(currentLanguage)}
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
            {getLocation(currentLanguage)}
          </Text>
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <MaterialIcons name="location-on" size={48} color="#3B82F6" />
              <Text style={styles.mapPlaceholderText}>
                {currentLanguage === 'de' ? 'Karte wird geladen...' : 'Map loading...'}
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
              {currentLanguage === 'de' ? 'Anfänger' : 'Beginner'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Vienna</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>8 {currentLanguage === 'de' ? 'Wochen' : 'weeks'}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>€200</Text>
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

export default OIFOfflineCourse;
