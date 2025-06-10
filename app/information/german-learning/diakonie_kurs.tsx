
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
    Linking.openURL('https://www.diakonie.at/unsere-themen/flucht-und-integration/ausbildung-und-bildungsangebote-fuer-fluechtlinge');
  };

  const content = {
    title: {
      en: 'Diakonie Austria - Training and educational opportunities for refugees',
      de: 'Diakonie Österreich - Ausbildung und Bildungsangebote für Flüchtlinge',
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
      en: 'Free German courses, basic education and career advice for refugees',
      de: 'Kostenlose Deutschkurse, Basisbildung und Berufsberatung für geflüchtete Menschen',
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
      en: `Diakonie Austria offers a comprehensive range of educational programs for refugees to facilitate their access to the Austrian education and vocational system. The program includes free literacy and German language courses up to level B2, basic education courses in German, English, and mathematics, as well as the opportunity to complete compulsory schooling. Educational and career counseling and advanced training programs are also offered. The courses are tailored to the needs of adults, single parents, slow learners, and women. Childcare is also offered during course hours at some locations. All programs are free of charge for participants.

Course Details:
• Level: A1–B2
• Duration: Various programs, e.g., completing compulsory school in 10 months
• Schedule: Various time models
• Location: Multiple locations throughout Austria
• Course Size: Small groups
• Childcare: Yes (at some locations)
• Price: Free
• Provider: NGO (Diakonie Austria)
• Language support: German, English, Arabic, Farsi, French, Kurdish, Pashto, Tigrinya, Turkish, Urdu
• Relevance: Yes – relevant for integration requirements in Austria
• Certificate: Completion of compulsory school or certificate of participation

What you will learn:
• Basic German language skills (A1–B2)
• Reading and writing (literacy)
• English language skills at A1–B1 level
• Basic mathematical skills
• Use of digital media and computer basics
• Career orientation and application training

By the end of this course, you will be able to:
• Communicate effectively in everyday German situations
• Read and write at a basic level
• Apply basic mathematical skills
• Obtain a compulsory school leaving certificate
• Develop career prospects and write applications

For further information and to register, please visit the official Diakonie Austria website.`,
      de: `Diakonie Österreich bietet ein umfassendes Bildungsangebot für geflüchtete Menschen, um ihnen den Zugang zum österreichischen Bildungs- und Berufssystem zu erleichtern. Das Programm umfasst kostenlose Alphabetisierungs- und Deutschkurse bis zum Niveau B2, Basisbildungskurse in Deutsch, Englisch und Mathematik, sowie die Möglichkeit, den Pflichtschulabschluss nachzuholen. Zusätzlich werden Bildungs- und Berufsberatung sowie Maßnahmen zur Höherqualifizierung angeboten. Die Kurse sind auf die Bedürfnisse von Erwachsenen, Alleinerziehenden, Menschen mit langsamem Lerntempo und Frauen abgestimmt. An einigen Standorten wird auch Kinderbetreuung während der Kurszeiten angeboten. Alle Angebote sind für die Teilnehmer:innen kostenlos.

Kursdetails:
• Niveau: A1–B2
• Dauer: Verschiedene Programme, z.B. Pflichtschulabschluss in 10 Monaten
• Zeitplan: Verschiedene Zeitmodelle
• Ort: Mehrere Standorte in ganz Österreich
• Kursgröße: Kleine Gruppen
• Kinderbetreuung: Ja (an einigen Standorten)
• Preis: Kostenlos
• Anbieter: NGO (Diakonie Österreich)
• Sprachförderung: Deutsch, Englisch, Arabisch, Farsi, Französisch, Kurdisch, Paschtu, Tigrinya, Türkisch, Urdu
• Relevanz: Ja – relevant für Integrationsanforderungen in Österreich
• Zertifikat: Pflichtschulabschluss oder Teilnahmebestätigungen

Was Sie lernen werden:
• Grundlegende Deutschkenntnisse (A1–B2)
• Lesen und Schreiben (Alphabetisierung)
• Englischkenntnisse auf A1–B1 Niveau
• Mathematische Grundkompetenzen
• Umgang mit digitalen Medien und Computergrundlagen
• Berufsorientierung und Bewerbungstraining

Am Ende dieses Kurses können Sie:
• Effektiv in Alltagssituationen auf Deutsch kommunizieren
• Lesen und Schreiben auf einem grundlegenden Niveau
• Mathematische Grundkenntnisse anwenden
• Einen Pflichtschulabschluss erwerben
• Berufliche Perspektiven entwickeln und Bewerbungen verfassen

Für weitere Informationen und zur Anmeldung besuchen Sie bitte die offizielle Website der Diakonie Österreich.`,
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
    provider: 'Diakonie Österreich',
    contact: {
      phone: '+43 2236 8686 801',
      email: ' bach@diakonie.at',
      website: 'https://www.diakonie.at/unsere-themen/flucht-und-integration/ausbildung-und-bildungsangebote-fuer-fluechtlinge'
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
              <Text style={styles.mapLocationText}>CarBiz – Caritas Bildungszentrum, Nobilegasse 23–25 / 2. Stock, 1150 Wien</Text>
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
