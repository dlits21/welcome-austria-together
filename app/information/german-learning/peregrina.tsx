
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
    Linking.openURL('https://www.peregrina.at/kurse/basisbildungskurse/');
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${content.contact.phone}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${content.contact.email}`);
  };

  const content = {
    title: {
      en: 'Peregrina – Basic German Courses',
      de: 'Peregrina – Basisbildungskurse Deutsch',
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
      en: 'Language support for women with a migration background',
      de: 'Sprachförderung für Frauen mit Migrationshintergrund',
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
      en: `Peregrina's basic German courses are aimed at women with a migration background who want to improve their German language skills from the ground up. As part of the "Level Up – Adult Education" project, courses are offered at levels A1 to B1+. The focus is on German as a second language, particularly in the areas of reading and writing, learning skills, everyday mathematics, and digital skills. The courses are taught by experienced instructors and also include one-on-one instruction. Free childcare is provided for children ages 1 to 6 during the course.

Course Details:
• Level: A1-B1+
• Duration: 111 to 222 teaching units (including private lessons)
• Schedule: February to June and September to December/January
• Course Times: 2 to 4 times per week
• Location: Wilhelm-Weber-Weg 1/2/1+2, A-1110 Vienna
• Class Size: Small groups, 2 to 4 times per week
• Childcare: Yes, for children ages 1 to 6
• Price: Free
• Provider: NGO (Peregrina – Association for Women)
• Language Support: German, Turkish, Kurdish
• Relevant: Yes – relevant for integration requirements in Austria
• Certificate: Yes – confirmation of participation; Preparation for the ÖSD Exam

What you will learn:
• Basic German language skills (A1–B1+)
• Reading and writing in everyday life
• Learning strategies and self-organization
• Everyday mathematics (e.g., dealing with money, time, measurements)
• Digital skills (e.g., using a smartphone and PC)

By the end of this course, you will be able to:
• Communicate effectively in everyday German situations
• Understand and compose simple texts
• Apply basic mathematical skills in everyday life
• Use digital devices safely
• Learn independently and organize your learning processes

For more information and to register, please visit the official website.`,
      de: `Die Basisbildungskurse Deutsch von Peregrina richten sich an Frauen mit Migrationshintergrund, die ihre Deutschkenntnisse von Grund auf verbessern möchten. Im Rahmen des Projekts „Level Up – Erwachsenenbildung“ werden Kurse auf den Niveaus A1 bis B1+ angeboten. Der Fokus liegt auf Deutsch als Zweitsprache, insbesondere auf den Bereichen Lesen und Schreiben, Lernkompetenzen, Alltagsmathematik und digitale Kompetenzen. Die Kurse werden von erfahrenen Kursleiterinnen durchgeführt und beinhalten auch Einzelunterrichtseinheiten. Für die Dauer der Kurse wird kostenlose Kinderbetreuung für Kinder von 1 bis 6 Jahren angeboten.

Kursdetails:
• Level: A1-B1+
• Dauer: 111 bis 222 Unterrichtseinheiten (inkl. Einzelunterricht)
• Zeitplan: Februar bis Juni und September bis Dezember/Jänner
• Kurszeiten: 2 bis 4 mal wöchentlich
• Ort: Wilhelm-Weber-Weg 1/2/1+2, A-1110 Wien
• Klassengröße: Kleine Gruppen2 bis 4 mal wöchentlich
• Kinderbetreuung: Ja, für Kinder von 1 bis 6 Jahren
• Preis: Kostenlos
• Anbieter: NGO (Peregrina – Verein für Frauen)
• Sprachliche Unterstützung: Deutsch, Türkisch, Kurdisch
• Relevant: Ja – relevant für Integrationsanforderungen in Österreich
• Zertifikat: Ja – Teilnahmebestätigung; Vorbereitung auf die ÖSD-Prüfung


Was Sie lernen werden:
• Grundlegende Deutschkenntnisse (A1–B1+)
• Lesen und Schreiben im Alltag
• Lernstrategien und Selbstorganisation
• Alltagsmathematik (z.B. Umgang mit Geld, Zeit, Maße)
• Digitale Kompetenzen (z.B. Nutzung von Smartphone und PC)


Am Ende dieses Kurses können Sie:
• Effektiv in Alltagssituationen auf Deutsch zu kommunizieren
• Lesen und Schreiben von einfachen Texten zu verstehen und zu verfassen
• Mathematische Grundkenntnisse im Alltag anzuwenden
• Digitale Geräte sicher zu nutzen
• Selbstständig zu lernen und Ihre Lernprozesse zu organisieren

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
    provider: 'Peregrina – Verein für Frauen',
    contact: {
      phone: '+43 1 408 61 19',
      email: 'krauck@peregrina.at',
      website: 'https://www.peregrina.at/kurse/basisbildungskurse/'
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
              {currentLanguage === 'de' ? 'NGO' : 'NGO'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Für Frauen' : 'For Women'}
            </Text>
          </View>
           <View style={styles.tag}>
          <Text style={styles.tagText}>
            {currentLanguage === 'de' ? 'Kinderbetreuung' : 'Childcare'}
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
