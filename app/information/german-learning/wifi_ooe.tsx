
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
    Linking.openURL('https://www.wifi-ooe.at/k/deutsch-integrationskurse');
  };

  const content = {
    title: {
      en: 'WIFI Upper Austria - German integration courses',
      de: 'WIFI Oberösterreich - Deutsch Integrationskurse',
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
      en: 'Learning German for integration, residence permits and citizenship',
      de: 'Deutsch lernen für Integration, Aufenthaltstitel und Staatsbürgerschaft',
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
      en: `The German integration courses at WIFI Upper Austria are aimed at people who want to improve their German language skills as part of the integration agreement. The courses cover levels A1 to B2 and include language lessons as well as content on Austrian society and the legal system. Upon successful completion, participants can take the ÖIF integration exam. The courses are offered in various cities in Upper Austria, including Linz, Wels, Steyr and Gmunden.

Course details:
• Level: A1-B2
• Duration: Varies depending on the course level; e.g. A1 course: 52 teaching units
• Schedule: Mon-Thu, 8:00-12:15 (depending on course)
• Location: WIFI Linz, Wiener Straße 150, 4021 Linz (other locations: Wels, Steyr, Gmunden)
• Class size: Small groups for individual support
• Childcare: N/A
• Price: € 490.00 incl. documents; deductible between € 121.00 and € 290.00 (if you meet the eligibility requirements)
• Provider: Public (state-funded by the Austrian Integration Fund)
• Language support: Serbian, Croatian, Turkish, English
• Relevant: Preparation for integration exams
• Certificate: Yes - confirmation of participation with ÖIF certificate


What you will learn:
• Basic to advanced German language skills
• Communication in everyday situations
• Pronunciation and listening comprehension
• Simple to complex grammar and vocabulary
• Preparation for the ÖIF integration exam



At the end of this course you will be able to:
• Communicate confidently in the German language
• Understand and apply the principles of the Austrian legal and social order
• Successfully pass the integration exam

For more information and to register, please visit the official website of WIFI Upper Austria.`,
      de: `Die Deutsch Integrationskurse am WIFI Oberösterreich richten sich an Personen, die ihre Deutschkenntnisse im Rahmen der Integrationsvereinbarung verbessern möchten. Die Kurse decken die Niveaus A1 bis B2 ab und beinhalten sowohl Sprachunterricht als auch Inhalte zur österreichischen Gesellschaft und Rechtsordnung. Mit erfolgreichem Abschluss können Teilnehmer*innen die ÖIF-Integrationsprüfung ablegen. Die Kurse werden in verschiedenen Städten Oberösterreichs angeboten, darunter Linz, Wels, Steyr und Gmunden.

Kursdetails:
• Level: A1-B2
• Dauer: Variiert je nach Kursniveau; z.B. A1-Kurs: 52 Unterrichtseinheiten
• Zeitplan: Mo–Do, 8:00–12:15 Uhr (je nach Kurs)
• Ort: WIFI Linz, Wiener Straße 150, 4021 Linz (weitere Standorte: Wels, Steyr, Gmunden)
• Klassengröße: Kleine Gruppen für individuelle Betreuung
• Kinderbetreuung: N/A
• Preis: 490,00 € inkl. Unterlagen; Selbstbehalt zwischen 121,00 € und 290,00 € (bei Erfüllung der Fördervoraussetzungen)
• Anbieter: Öffentlich (staatlich gefördert durch den Österreichischen Integrationsfonds)
• Sprachliche Unterstützung: Serbisch, Kroatisch, Türkisch, Englisch
• Relevant: Vorbereitung für Integrationsprüfungen
• Zertifikat: Ja – Teilnahmebestätigung mit ÖIF-Zertifikat


Was Sie lernen werden:
•  Grundlegende bis fortgeschrittene Deutschkenntnisse
•  Kommunikation in Alltagssituationen
•  Aussprache und Hörverständnis
•  Einfache bis komplexe Grammatik und Wortschatz
•  Vorbereitung auf die ÖIF-Integrationsprüfung

Am Ende dieses Kurses können Sie:
• Sich sicher in der deutschen Sprache verständigen
• Die Prinzipien der österreichischen Rechts- und Gesellschaftsordnung verstehen und anwenden
• Die Integrationsprüfung erfolgreich ablegen

Für weitere Informationen und zur Anmeldung besuchen Sie bitte die offizielle Website des WIFI Oberösterreich.`,
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
    provider: 'WIFI Oberösterreich',
    contact: {
      phone: '+43 5 7000 7553',
      email: 'Elif.Cevik-Coban@wifi-ooe.at',
      website: 'https://www.wifi-ooe.at/k/deutsch-integrationskurse'
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
