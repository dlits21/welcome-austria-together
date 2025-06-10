
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
    Linking.openURL('https://www.stationwien.org/projekte/mama-lernt-deutsch.html');
  };

  const content = {
    title: {
      en: 'Mama lernt Deutsch – German Language Courses for Women',
      de: 'Mama lernt Deutsch – Deutschkurse für Frauen',
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
      en: 'Empowering Women Through Basic Education and Language Skills',
      de: 'Stärkt Frauen durch Grundbildung und Sprachkenntnisse',
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
      en: `The "Mama lernt Deutsch" program is a free educational initiative by Station Wien, designed specifically for women who have had limited or no formal schooling. The courses aim to provide foundational skills in reading, writing, and German language proficiency, catering to women from diverse backgrounds, including refugees and migrants. The program also includes basic mathematics, digital literacy, and cultural excursions, enhancing the learning experience. Childcare services are provided during classes, ensuring that mothers can participate without concerns about their children's care. The courses are funded by the EU, the Austrian Ministry of Education, and the City of Vienna, making them accessible at no cost to participants.
           
Course details:
• Level: A1 to B1 (German language proficiency)
• Duration: Varies; typically several months
• Schedule: Morning courses: Monday to Friday, 8:20–12:00; Afternoon courses: Monday to Wednesday, 12:30–15:15
• Location: Einsiedlerplatz 5, 1050 Vienna, Austria
• Class size: Small groups to ensure personalized attention
• Childcare: Yes
• Price: Free of charge
• Provider: NGO (Station Vienna)
• Language support:  Information available in multiple languages; specific language support may vary
• Relevant: relevant for integration requirements in Austria
• Certificate: No formal certificate

What you will learn:
• Basic German language skills (A1 to B1 level)
• Reading and writing fundamentals (Alphabetisierung)
• Basic mathematics
• Digital literacy (using mobile phones and computers)
• Effective learning strategies
• Cultural integration through excursions and community activities

At the end of this course you will be able to:
• Communicate effectively in everyday situations in German
• Read and write basic German texts
• Use digital tools for communication and information
• Understand and apply basic mathematical concepts
• Navigate German society with greater confidence.

For more information and to register, please contact:
    Magdalena Niklas-Kujabi, BA
    Email: magdalena.niklas-@-stationwien.com
    Phone: +43 (0)676 36 22 760
    Address: Einsiedlerplatz 5, 1050 Vienna, Austria

This program is an excellent opportunity for women seeking to improve their German language skills and integrate more fully into Austrian society.`,
      de: `Das Programm „Mama lernt Deutsch“ ist eine kostenlose Bildungsinitiative der Station Wien, die sich speziell an Frauen mit eingeschränkter oder keiner Schulbildung richtet. Die Kurse vermitteln grundlegende Lese-, Schreib- und Deutschkenntnisse und richten sich an Frauen mit unterschiedlichem Hintergrund, darunter auch Geflüchtete und Migrantinnen. Das Programm umfasst außerdem grundlegende Mathematik, digitale Kompetenzen und kulturelle Exkursionen, die das Lernerlebnis bereichern. Während des Unterrichts wird eine Kinderbetreuung angeboten, damit Mütter ohne Sorgen um die Betreuung ihrer Kinder teilnehmen können. Die Kurse werden von der EU, dem österreichischen Bildungsministerium und der Stadt Wien gefördert und sind für die Teilnehmerinnen kostenlos.

Kursdetails:
• Niveau: A1 bis B1 (Deutschkenntnisse)
• Dauer: Variiert; in der Regel mehrere Monate
• Zeitplan: Vormittagskurse: Montag bis Freitag, 8:20–12:00 Uhr; Nachmittagskurse: Montag bis Mittwoch, 12:30–15:15 Uhr
• Ort: Einsiedlerplatz 5, 1050 Wien, Österreich
• Kursgröße: Kleine Gruppen für individuelle Betreuung
• Kinderbetreuung: Ja
• Preis: Kostenlos
• Anbieter: NGO (Station Vienna)
• Sprachförderung: Informationen in mehreren Sprachen verfügbar; die spezifische Sprachförderung kann variieren
• Relevanz: Relevant für Integrationsanforderungen in Österreich
• Zertifikat: Kein formales Zertifikat

Was Sie lernen werden:
• Grundlegende Deutschkenntnisse (Niveau A1 bis B1)
• Alphabetisierung (Grundlagen des Lesens und Schreibens)
• Grundlegende Mathematikkenntnisse
• Digitale Kompetenz (Nutzung von Mobiltelefonen und Computern)
• Effektive Lernstrategien
• Kulturelle Integration durch Ausflüge und Gemeinschaftsaktivitäten

Am Ende dieses Kurses können Sie:
• Effektiv in Alltagssituationen auf Deutsch kommunizieren
• Einfache deutsche Texte lesen und schreiben
• Digitale Werkzeuge für Kommunikation und Information nutzen
• Grundlegende mathematische Konzepte verstehen und anwenden
• Sich sicherer in der deutschen Gesellschaft bewegen

Für weitere Informationen und zur Anmeldung wenden Sie sich bitte an:
Magdalena Niklas-Kujabi, BA
E-Mail: magdalena.niklas-@-stationwien.com
Telefon: +43 (0)676 36 22 760
Adresse: Einsiedlerplatz 5, 1050 Wien, Österreich

Dieses Programm ist eine hervorragende Gelegenheit für Frauen, ihre Deutschkenntnisse zu verbessern und sich besser in die österreichische Gesellschaft zu integrieren.`,
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
    provider: 'Station Wien',
    contact: {
      phone: '+43 676 36 22 760',
      email: ' magdalena.niklas@stationwien.com',
      website: 'https://www.stationwien.org/projekte/mama-lernt-deutsch.html/'
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
