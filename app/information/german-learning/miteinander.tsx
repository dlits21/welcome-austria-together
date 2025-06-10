
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
    Linking.openURL('https://miteinlernen.at/basisbildung-deutsch');
  };

  const content = {
    title: {
      en: 'Basic German education – language support for women with a migration background',
      de: 'Basisbildung Deutsch – Sprachförderung für Frauen mit Migrationshintergrund',
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
      en: 'Free German courses from A1 to A2 with childcare and exam preparation',
      de: 'Kostenlose Deutschkurse von A1 bis A2 mit Kinderbetreuung und Prüfungsvorbereitung',
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
      en: `"Miteinander Lernen – Birlikte Öğrenelim" is a Viennese association specializing in the educational support of women with a migrant background. Since 1984, the association has offered customized educational programs tailored to the individual needs of participants. The "Basic German Education" program is aimed at women who want to improve their German language skills from the ground up. The courses cover reading, writing, listening comprehension, and speaking, as well as mathematical and digital skills. Learning skills, excursions, workshops, and educational counseling are also offered. Particular emphasis is placed on the integration of participants into Austrian society.

Course Details:
• Level: A1-A2
• Duration: Winter Semester: September–December/January; Summer Semester: February–June
• Schedule: 4 course units per week (216 teaching units)
• Location: Koppstrasse 38/8, 1160 Vienna
• Class size: 5–10 women
• Childcare: Yes
• Price: Free
• Provider: NGO
• Language support: Turkish, Kurdish, English
• Relevant: Preparation for integration requirements
• Certificate: Preparation for the ÖIF Integration Exam A2

What you will learn:
• Basic German language skills (A1–A2)
• Reading, writing, listening comprehension, and speaking
• Mathematical and digital skills
• Learning strategies and self-organization
• Cultural integration through excursions and workshops

By the end of this course, you will be able to:
• Communicate effectively in everyday German situations
• Complete basic mathematical and digital tasks
• Learn and organize independently
• Find your way better in Austrian society
• Successfully pass the ÖIF Integration Exam A2

For more information and to register, visit please visit the official website.`,
      de: `"Miteinander Lernen – Birlikte Öğrenelim" ist ein Wiener Verein, der sich auf die Bildungsförderung von Frauen mit Migrationshintergrund spezialisiert hat. Seit 1984 bietet der Verein maßgeschneiderte Bildungsangebote an, die auf die individuellen Bedürfnisse der Teilnehmerinnen abgestimmt sind. Das "Basisbildung Deutsch"-Programm richtet sich an Frauen, die ihre Deutschkenntnisse von Grund auf verbessern möchten. Die Kurse umfassen Lesen, Schreiben, Hörverstehen und Sprechen sowie mathematische und digitale Kompetenzen. Zusätzlich werden Lernkompetenzen, Exkursionen, Workshops und Bildungsberatung angeboten. Ein besonderes Augenmerk liegt auf der Integration der Teilnehmerinnen in die österreichische Gesellschaft.

Kursdetails:
• Level: A1-A2
• Dauer:  Wintersemester: September–Dezember/Jänner; Sommersemester: Februar–Juni
• Zeitplan: 4 Kurseinheiten pro Woche (216 Unterrichtseinheiten)
• Ort: Koppstrasse 38/8, 1160 Wien
• Klassengröße: 5–10 Frauen
• Kinderbetreuung: Ja
• Preis: Kostenlos
• Anbieter: NGO
• Sprachliche Unterstützung: Türkisch, Kurdisch, Englisch
• Relevant: Vorbereitung für Integrationsanforderung
• Zertifikat: Vorbereitung auf die ÖIF Integrationsprüfung A2


Was Sie lernen werden:
•  Grundlegende Deutschkenntnisse (A1–A2)
•  Lesen, Schreiben, Hörverstehen und Sprechen
•  Mathematische und digitale Kompetenzen
•  Lernstrategien und Selbstorganisation
•  Kulturelle Integration durch Exkursionen und Workshops

Am Ende dieses Kurses können Sie:
• Effektiv in Alltagssituationen auf Deutsch kommunizieren
• Grundlegende mathematische und digitale Aufgaben bewältigen
• Selbstständig lernen und organisieren
• Sich in der österreichischen Gesellschaft besser zurechtfinden
• Die ÖIF Integrationsprüfung A2 erfolgreich ablegen

Für weitere Informationen und zur Anmeldung besuchen Sie bitte die offizielle Website.`,
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
    provider: 'Miteinander Lernen – Birlikte Öğrenelim',
    contact: {
      phone: '+43 1 493 16 08',
      email: 'mlaktuna@miteinlernen.at',
      website: 'https://miteinlernen.at/basisbildung-deutsch'
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
