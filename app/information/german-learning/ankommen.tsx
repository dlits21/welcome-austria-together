
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
    Linking.openURL('https://www.ankommenapp.de/APP/DE/Startseite/startseite-node.html');
  };

  const content = {
    title: {
      en: '"Ankommen" App',
      de: '"Ankommen" App',
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
      en: 'Free Mobile App Offering Information on Life in Germany, Asylum Procedures, and a German Language Course',
      de: 'Kostenlose mobile App mit Informationen zum Leben in Deutschland, Asylverfahren und einem Deutschkurs',
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
      en: `The App "Ankommen" is a free mobile application developed by the Federal Office for Migration and Refugees (BAMF) in collaboration with the Goethe-Institut, the Federal Employment Agency, and the Bavarian Broadcasting Corporation (BR). Designed as a practical companion, the app provides essential information to help individuals integrate into life in Germany. It includes details about everyday life, the asylum process, access to the labor market, and a free, multimedia German language course. The app is available in multiple languages and can be used offline after downloading.

Resource Details:
• Level: A1-B1
• Online/Offline: Both (downloadable for offline use)
• Price: Free
• Provider: Public (funded by the German government)
• Language support: Arabic, English, Farsi, French, German


What you will learn:
• Basic to intermediate German language skills
• Everyday vocabulary and phrases
• Understanding of the asylum process in Germany
• Information on accessing the labor market
• Insights into German culture and society

Type of Materials:
• Interactive language exercises
• Audio and video content
• Text-based information
• Quizzes and assessments

At the end of this course you will be able to:
• Communicate effectively in basic German
• Navigate the asylum process in Germany
• Access information about work and training opportunities
• Understand key aspects of daily life in Germany

For more information and to access the resources, please visit the official website.`,
      de: `Die App „Ankommen“ ist eine kostenlose mobile Anwendung, die vom Bundesamt für Migration und Flüchtlinge (BAMF) in Zusammenarbeit mit dem Goethe-Institut, der Bundesagentur für Arbeit und dem Bayerischen Rundfunk (BR) entwickelt wurde. Als praktischer Begleiter bietet die App wichtige Informationen für die Integration in Deutschland. Sie umfasst Informationen zum Alltag, zum Asylverfahren, zum Zugang zum Arbeitsmarkt sowie einen kostenlosen, multimedialen Deutschkurs. Die App ist mehrsprachig verfügbar und kann nach dem Download auch offline genutzt werden.

Ressourcendetails:
• Niveau: A1–B1
• Online/Offline: Beides
• Preis: Kostenlos
• Anbieter: Öffentlich (finanziert vom Bund)
• Sprachunterstützung: Arabisch, Englisch, Farsi, Französisch, Deutsch

Was Sie lernen:
• Grundkenntnisse bis Mittelstufe Deutsch
• Alltagsvokabular und -phrasen
• Verständnis des Asylverfahrens in Deutschland
• Informationen zum Zugang zum Arbeitsmarkt
• Einblicke in die deutsche Kultur und Gesellschaft

Materialarten:
• Interaktive Sprachübungen
• Audio- und Videoinhalte
• Textbasierte Informationen
• Quizze und Bewertungen

Am Ende dieses Kurses können Sie:
• Effektiv auf Grundkenntnissen Deutsch kommunizieren
• Das Asylverfahren in Deutschland bewältigen
• Informationen über Arbeits- und Ausbildungsmöglichkeiten abrufen
• Wichtige Aspekte des täglichen Lebens in Deutschland verstehen

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
      phone: '+49 30 1815-1111 (ALiD Hotline – Working and Living in Germany)',
      email: 'service@ams.de',
      website: 'https://www.ankommenapp.de/APP/DE/Startseite/startseite-node.html'
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
