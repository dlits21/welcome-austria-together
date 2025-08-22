
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import {getLocation, getEnrollNow, getContactInformation} from '../../../data/language/common';

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
    Linking.openURL('https://www.integrationshaus.at/de/projekte-programme/bildung/projekt-baju-basisbildung-für-jugendliche-und-junge-erwachsene-mit-migrationshintergrund');
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${content.contact.phone}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${content.contact.email}`);
  };

  const content = {
    title: {
      en: 'BAJU – Basic education for adolescents and young adults with a migration background',
      de: 'BAJU – Basisbildung für Jugendliche und junge Erwachsene mit Migrationshintergrund',
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
      en: 'Free educational opportunities to promote German language skills and basic competencies',
      de: 'Kostenlose Bildungsangebote zur Förderung von Deutschkenntnissen und Grundkompetenzen',
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
      en: `The BAJU project is aimed at adolescents and young adults with a migration background aged 15 to 25 whose German language skills and basic competencies are not yet sufficient to participate in further education programs such as compulsory school leaving certificate courses. The focus is on developing language skills, particularly in reading and writing, consolidating basic arithmetic, and teaching basic English and digital skills. The goal is to optimally prepare participants for further education opportunities.

Course Details:
• Level: A1-B1
• Duration: Various programs, e.g., completing compulsory school in 10 months
• Schedule: Various time models, including childcare
• Location: Multiple locations in Vienna
• Class Size: Small groups
• Childcare: Yes
• Price: Free
• Provider: NGO (Integrationshaus Wien)
• Language Support: English, Arabic, Farsi, French, Kurdish, Pashto, Tigrinya, Turkish, Urdu
• Relevant: Yes – relevant for integration requirements in Austria
• Certificate: Yes – confirmation of participation; Preparation for the ÖIF Integration Exam A2

What you will learn:
• Basic German language skills (A1–B1)
• Reading and writing
• English language skills at A1–B1 level
• Basic mathematical skills
• Use of digital media and basic computer skills
• Career orientation and application training

By the end of this course, you will be able to:
• Communicate effectively in everyday German situations
• Read and write at a basic level
• Use English in school or at work
• Apply basic mathematical skills
• Develop career prospects and write applications

For more information and to register, please visit the official website.`,
      de: `Das Projekt BAJU richtet sich an Jugendliche und junge Erwachsene mit Migrationshintergrund im Alter von 15 bis 25 Jahren, deren Deutschkenntnisse und Grundkompetenzen noch nicht ausreichen, um an weiterführenden Bildungsmaßnahmen wie Pflichtschulabschlusskursen teilzunehmen. Im Vordergrund stehen der Ausbau der sprachlichen Kompetenzen, insbesondere im Lesen und Schreiben, die Festigung der Grundrechenarten sowie die Vermittlung von Grundkenntnissen in Englisch und digitalen Kompetenzen. Das Ziel ist es, die Teilnehmenden optimal auf weiterführende Bildungsangebote vorzubereiten.

Kursdetails:
• Level: A1-B1
• Dauer: Verschiedene Programme, z.B. Pflichtschulabschluss in 10 Monaten
• Zeitplan: Verschiedene Zeitmodelle, auch mit Kinderbetreuung
• Ort: Mehrere Standorte in Wien
• Klassengröße: Kleine Gruppen
• Kinderbetreuung: Ja
• Preis: Kostenlos
• Anbieter: NGO (Integrationshaus Wien)
• Sprachliche Unterstützung: Englisch, Arabisch, Farsi, Französisch, Kurdisch, Paschtu, Tigrinya, Türkisch, Urdu
• Relevant: Ja – relevant für Integrationsanforderungen in Österreich
• Zertifikat: Ja – Teilnahmebestätigung; Vorbereitung auf die ÖIF Integrationsprüfung A2


Was Sie lernen werden:
• Grundlegende Deutschkenntnisse (A1–B1)
• Lesen und Schreiben
• Englischkenntnisse auf A1–B1 Niveau
• Mathematische Grundkompetenzen
• Umgang mit digitalen Medien und Computergrundlagen
• Berufsorientierung und Bewerbungstraining


Am Ende dieses Kurses können Sie:
• Effektiv in Alltagssituationen auf Deutsch zu kommunizieren
• Lesen und Schreiben auf einem grundlegenden Niveau
• Englisch in Schule oder Beruf anzuwenden
• Mathematische Grundkenntnisse anzuwenden
• Berufliche Perspektiven zu entwickeln und Bewerbungen zu verfassen

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
    provider: 'BAJU - Integrationshaus',
    contact: {
      phone: '+43-699-12 12 36 47',
      email: 'bildung@integrationshaus.at',
      website: 'https://www.integrationshaus.at/de/projekte-programme/bildung/projekt-baju-basisbildung-für-jugendliche-und-junge-erwachsene-mit-migrationshintergrund'
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
        
        {/* Contact Information - Updated with clickable elements */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>
            {getContactInformation(currentLanguage)}
          </Text>

          <View style={styles.contactGrid}>
            <TouchableOpacity
              style={styles.contactCard}
              onPress={handlePhonePress}
            >
              <MaterialIcons name="phone" size={24} color="#3B82F6" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>
                  {currentLanguage === 'de' ? 'Telefon' : 'Phone'}
                </Text>
                <Text style={[styles.contactValue, styles.linkText]}>{content.contact.phone}</Text>
              </View>
              <MaterialIcons name="open-in-new" size={16} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactCard}
              onPress={handleEmailPress}
            >
              <MaterialIcons name="email" size={24} color="#3B82F6" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>
                  {currentLanguage === 'de' ? 'E-Mail' : 'Email'}
                </Text>
                <Text style={[styles.contactValue, styles.linkText]}>{content.contact.email}</Text>
              </View>
              <MaterialIcons name="open-in-new" size={16} color="#666" />
            </TouchableOpacity>

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
              <Text style={styles.mapLocationText}>AMS Offices throughout Austria</Text>
            </View>
          </View>
        </View>

        {/* Tags - Updated with correct information */}
        <View style={styles.tagsSection}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>A1-B1</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Kostenlos' : 'Free'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Wien' : 'Vienna'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Kinderbetreuung' : 'childcare'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'NGO' : 'NGO'}
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

export default OIFOfflineCourse;
