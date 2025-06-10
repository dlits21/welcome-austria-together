
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
    Linking.openURL('https://www.integrationsfonds.at/sprache/pruefungen/');
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${content.contact.phone}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${content.contact.email}`);
  };

  const content = {
    title: {
      en: 'ÖIF - Official German Exam',
      de: 'ÖIF - Offizieller Deutsch Test',
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
      en: 'Recognized examinations for German language skills and value orientation in Austria',
      de: 'Anerkannte Prüfungen für Deutschkenntnisse und Werteorientierung in Österreich',
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
      en: `The ÖIF examinations provide official proof of German language skills and value orientation, which are necessary for integration in Austria. They are recognized by law and serve as a prerequisite for fulfilling the integration agreement as well as for obtaining a residence permit or citizenship. The examinations are held at certified examination centers throughout Austria and cover various levels from A1 to C1.

Course details:
• Level: A1-C1
• Duration: 90-240min
• Schedule: Dates are offered regularly; exact dates can be found on the website
• Location: Over 500 certified exam centers throughout Austria
• Class size: Varies depending on exam center
• Childcare: N/A
• Price: €165-€189
• Provider: Public (government funded)
• Language support: Dari/Farsi, Arabic, English (depending on exam center)
• Relevant: Yes - required for integration agreement, residence permit and citizenship
• Certificate: Yes - digitally signed result notification


What you must be able to do:
• German language skills at the respective level (A1 to C1)
• Knowledge of values and orientation according to the Austrian legal and social order
• Practical use of the language in everyday situations

For more information, exam dates and registration, please visit the official website of the ÖIF.`,
      de: `Die ÖIF-Prüfungen bieten offizielle Nachweise für Deutschkenntnisse und Werteorientierung, die für die Integration in Österreich erforderlich sind. Sie sind gesetzlich anerkannt und dienen als Voraussetzung für die Erfüllung der Integrationsvereinbarung sowie für die Erlangung eines Aufenthaltstitels oder der Staatsbürgerschaft. Die Prüfungen werden bundesweit an zertifizierten Prüfungszentren durchgeführt und umfassen verschiedene Niveaustufen von A1 bis C1.

Kursdetails:
• Level: A1-C1
• Dauer: 90-240min
• Zeitplan: Termine werden regelmäßig angeboten; genaue Daten sind auf der Website einsehbar
• Ort: Über 500 zertifizierte Prüfungszentren in ganz Österreich
• Klassengröße: Variiert je nach Prüfungszentrum
• Kinderbetreuung: N/A
• Preis: €165-€189
• Anbieter: Öffentlich (staatlich gefördert)
• Sprachliche Unterstützung: Dari/Farsi, Arabisch, Englisch (abhängig vom Prüfungszentrum)
• Relevant: Ja – erforderlich für Integrationsvereinbarung, Aufenthaltstitel und Staatsbürgerschaft
• Zertifikat: Ja – digital signierte Ergebnismitteilung


Was Sie können müssen:
•  Deutschkenntnisse auf dem jeweiligen Niveau (A1 bis C1)
•  Werte- und Orientierungswissen gemäß österreichischer Rechts- und Gesellschaftsordnung
•  Praktische Anwendung der Sprache in Alltagssituationen

Für weitere Informationen, Prüfungstermine und Anmeldung besuchen Sie bitte die offizielle Website des ÖIF.`,
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
      phone: '+43 1 715 13 15',
      email: 'info@integrationsfonds.at',
      website: 'https://sprachportal.at/kurse-und-pruefungen/kursangebote/online-kurse/'
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
              {currentLanguage === 'de' ? 'Kostenpflichtig' : 'Paid'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Österreichweit' : 'Nationwide'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Erfüllt Integrationsvereinbarung' : 'Fulfills integration requirments'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Staatlich' : 'Public'}
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
