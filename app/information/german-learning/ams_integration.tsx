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

  const handlePhonePress = () => {
    Linking.openURL(`tel:${content.contact.phone}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${content.contact.email}`);
  };

  const handleEnrollPress = () => {
    Linking.openURL('https://www.ams.at/arbeitsuchende/arbeiten-in-oesterreich-und-der-eu/das-integrationsjahr');
  };

  const content = {
    title: {
      en: 'AMS - Year of Integration',
      de: 'AMS - Integrationsjahr',
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
      en: 'Learning German, professional orientation and integration into the Austrian labor market',
      de: 'Deutsch lernen, berufliche Orientierung und Integration in den österreichischen Arbeitsmarkt',
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
      en: `The Integration Year is a program of the Public Employment Service Austria (AMS) that aims to offer structured support to persons entitled to asylum, subsidiary protection and certain asylum seekers with a high probability of recognition for integration into the Austrian labour market. The program combines language support, professional orientation and practical experience to increase the chances of sustainable employment.

Course details:
• Level: A1-C1
• Duration: Maximum 12 months; measures already started can be completed beyond the year
• Timetable: Various modules, adapted to individual needs
• Location: AMS offices throughout Austria
• Class size: Small groups for individual support
• Childcare: N/A
• Price: Free of charge for participants
• Provider: Public (state-funded)
• Language support: German, English, Arabic, Farsi, French
• Relevant: for integration agreements and language support
• Certificate: Yes - confirmation of participation with integration card


What you will learn:
• German language skills at A2 to C1 level
• Professional orientation and job application training
• Recognizing and using individual skills
• Practical experience in various professional fields
• Integration into the Austrian labor market


At the end of this course you will be able to
• Communicate confidently in the German language
• Develop a clear professional orientation and perspective
• Successfully write job applications and conduct job interviews
• Gain practical experience in a professional field
• Achieve sustainable integration into the labor market

For further information and to register, please contact your responsible AMS advisor. Together we will check the requirements and draw up an individual schedule for your integration year.`,
      de: `Das Integrationsjahr ist ein Programm des Arbeitsmarktservice Österreich (AMS), das darauf abzielt, Asylberechtigten, subsidiär Schutzberechtigten und bestimmten Asylwerber*innen mit hoher Anerkennungswahrscheinlichkeit eine strukturierte Unterstützung bei der Integration in den österreichischen Arbeitsmarkt zu bieten. Das Programm kombiniert Sprachförderung, berufliche Orientierung und praktische Erfahrungen, um die Chancen auf eine nachhaltige Erwerbstätigkeit zu erhöhen.

Kursdetails:
• Level: A1-C1
• Dauer: Maximal 12 Monate; bereits begonnene Maßnahmen können über das Jahr hinaus abgeschlossen werden
• Zeitplan: Verschiedene Module, angepasst an individuelle Bedürfnisse
• Ort: AMS Geschäftsstellen in ganz Österreich
• Klassengröße: Kleine Gruppen für individuelle Betreuung
• Kinderbetreuung: N/A
• Preis: Kostenlos für Teilnehmer*innen
• Anbieter: Öffentlich (staatlich gefördert)
• Sprachliche Unterstützung: Deutsch, Englisch, Arabisch, Farsi, Französisch
• Relevant: für Integrationsvereinbarungen und Sprachförderung
• Zertifikat: Ja – Teilnahmebestätigung mit Integrationskarte


Was Sie lernen werden:
•  Deutschkenntnisse auf A2 bis C1 Niveau
•  Berufliche Orientierung und Bewerbungstraining
•  Erkennen und Nutzen individueller Kompetenzen
•  Praktische Erfahrungen in verschiedenen Berufsfeldern
•  Integration in den österreichischen Arbeitsmarkt

Am Ende dieses Kurses können Sie:
• Sich sicher in der deutschen Sprache verständigen
• Eine klare berufliche Orientierung und Perspektive entwickeln
• Erfolgreich Bewerbungen verfassen und Vorstellungsgespräche führen
• Praktische Erfahrungen in einem Berufsfeld sammeln
• Eine nachhaltige Integration in den Arbeitsmarkt erreichen

Für weitere Informationen und zur Anmeldung wenden Sie sich bitte an Ihre zuständige AMS Beraterin oder Ihren zuständigen AMS Berater. Gemeinsam werden die Voraussetzungen geprüft und ein individueller Ablaufplan für Ihr Integrationsjahr erstellt.`,
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
    provider: 'Arbeitsmarktservice (AMS)',
    contact: {
      phone: '+43 50 904 222 (AMS Serviceline)',
      email: 'service@ams.at',
      website: 'https://www.ams.at/arbeitsuchende/arbeiten-in-oesterreich-und-der-eu/das-integrationsjahr'
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
            <Text style={styles.tagText}>A1-C1</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Kostenlos' : 'Free'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Österreichweit' : 'Nationwide'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Bis zu 12 Monate' : 'Up to 12 months'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Mit Zertifikat' : 'With certificate'}
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
