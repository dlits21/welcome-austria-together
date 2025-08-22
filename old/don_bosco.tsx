
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
      en: 'Don Bosco Social Work - Basic and Bridging Courses',
      de: 'Don Bosco Sozialwerk - Basis- und Brückenkurse',
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
      en: 'Free German and educational opportunities for young refugees',
      de: 'Kostenlose Deutsch- und Bildungsangebote für junge Geflüchtete',
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
      en: `The Don Bosco Social Welfare Organization's basic and bridging courses are aimed at young refugees between the ages of 15 and 28 with no prior schooling. The courses begin with German literacy and provide access to advanced educational opportunities starting at level A1. All courses are individually tailored to the needs of the participants, and participants can join at any time.

Course Details:
• Level: A0-A1
• Duration: 11 course blocks per year (entry possible at any time)
• Timeframe: Courses start continuously, entry possible at any time
• Location: Futterknechtgasse 35, 1230 Vienna
• Class Size: Small learning groups of approximately 10 participants
• Childcare: N/A
• Price: Free (donation-funded free places available)
• Provider: NGO (Don Bosco Social Work)
• Language Support: German, English, Arabic, Farsi, French, Kurdish, Pashto, Tigrinya, Turkish, Urdu
• Relevant: No
• Certificate: No

What You Will Learn:
• Basic German Skills (A0-A1)
• Reading and Writing
• Learning Strategies and Self-Organization
• Everyday Mathematics (e.g., Dealing with Money, Time, Measurements)
• Digital Skills (e.g., Using a Smartphone and PC)

By the end of this course, you will be able to:
• Effectively communicate in Communicate in everyday situations in German
• Understand and compose reading and writing simple texts
• Apply basic mathematical skills in everyday life
• Use digital devices safely
• Learn independently and organize your learning processes

For more information and to register, please visit the official website.`,
      de: `Die Basis- und Brückenkurse des Don Bosco Sozialwerks richten sich an junge Geflüchtete zwischen 15 und 28 Jahren ohne schulische Vorbildung. Die Kurse beginnen bei der Alphabetisierung in der deutschen Sprache und vermitteln ab einem Deutschniveau von A1 an weiterführende Bildungsmaßnahmen. Alle Kurse sind individuell auf die Bedürfnisse der Teilnehmer:innen abgestimmt, und Einstiege sind jederzeit möglich.

Kursdetails:
• Level: A0-A1
• Dauer: 11 Kursblöcke pro Jahr (Einstieg jederzeit möglich)
• Zeitraum: Kurse starten fortlaufend, Einstieg jederzeit möglich
• Ort: Futterknechtgasse 35, 1230 Wien
• Klassengröße: Kleine Lerngruppen mit ca. 10 Teilnehmer:innen
• Kinderbetreuung: N/A
• Preis: Kostenlos (spendenfinanzierte Gratisplätze möglich)
• Anbieter: NGO (Don Bosco Sozialwerk)
• Sprachliche Unterstützung: Deutsch, Englisch, Arabisch, Farsi, Französisch, Kurdisch, Paschtu, Tigrinya, Türkisch, Urdu
• Relevant: No
• Zertifikat: No


Was Sie lernen werden:
• Grundlegende Deutschkenntnisse (A0-A1)
• Lesen und Schreiben
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
    provider: 'Don Bosco Sozialwerk',
    contact: {
      phone: '+43 1 665 02 55',
      email: 'leitung.amos@sozialwerk.at',
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
            <Text style={styles.tagText}>A0-A1</Text>
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
              {currentLanguage === 'de' ? 'Für junge Migrant:innen' : 'for young migrants'}
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
