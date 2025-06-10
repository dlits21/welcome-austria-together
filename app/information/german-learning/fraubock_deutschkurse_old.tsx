import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import { getLocation, getEnrollNow, getContactInformation } from '../../../data/languages/common';

const FrauBockDeutschkurse: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => setSoundEnabled(!soundEnabled);

  const handleEnrollPress = () => {
    Linking.openURL('https://www.fraubock.at/de/so-helfen-wir/bildung/deutschkurse');
  };

  const content = {
    title: {
      en: 'Frau Bock - German Courses',
      de: 'Frau Bock - Deutschkurse',
    },
    subtitle: {
      en: 'Supportive German courses for asylum seekers and migrants',
      de: 'Unterstützende Deutschkurse für Asylsuchende und Migrant:innen',
    },
    description: {
      en: `Frau Bock offers free German courses and learning support for people who are excluded from the regular education system. These courses are aimed particularly at asylum seekers and undocumented individuals who want to improve their language skills in a safe and respectful environment.

Course details:
• Level: A1 and up
• Duration: Varies
• Schedule: Flexible; mornings and afternoons
• Location: Vienna
• Price: Free
• Target group: Asylum seekers and people without access to public courses
• Language support: Available
• Certificate: Participation confirmation

The courses not only teach the German language, but also provide information about everyday life in Austria and empower participants in their daily interactions.

Visit the website of Frau Bock for more information and registration.`,
      de: `Frau Bock bietet kostenlose Deutschkurse und Lernhilfe für Menschen an, die vom regulären Bildungssystem ausgeschlossen sind. Die Kurse richten sich besonders an Asylsuchende und undokumentierte Personen, die in einem sicheren und respektvollen Rahmen ihre Sprachkenntnisse verbessern möchten.

Kursdetails:
• Level: A1 und höher
• Dauer: Variiert
• Zeitplan: Flexibel, vormittags und nachmittags
• Ort: Wien
• Preis: Kostenlos
• Zielgruppe: Asylsuchende und Personen ohne Zugang zu öffentlichen Kursen
• Sprachunterstützung: Verfügbar
• Zertifikat: Teilnahmebestätigung

Neben der Sprache vermittelt der Kurs auch Wissen über den Alltag in Österreich und stärkt die Teilnehmenden in ihrer Selbstbestimmung.

Besuchen Sie die Website von Frau Bock für weitere Informationen und zur Anmeldung.`,
    },
    provider: 'Verein Ute Bock',
    contact: {
      phone: '+43 1 929 24 24 - 0',
      email: 'info@fraubock.at',
      website: 'https://www.fraubock.at/de/so-helfen-wir/bildung/deutschkurse',
    },
  };

  const getCurrentContent = (obj: any) => obj[currentLanguage] || obj.en;

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>{getCurrentContent(content.title)}</Text>
        <Text style={styles.subtitle}>{getCurrentContent(content.subtitle)}</Text>

        <View style={styles.providerSection}>
          <Text style={styles.providerLabel}>{currentLanguage === 'de' ? 'Anbieter:' : 'Provider:'}</Text>
          <Text style={styles.providerName}>{content.provider}</Text>
        </View>

        <Text style={styles.description}>{getCurrentContent(content.description)}</Text>

        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>{getContactInformation(currentLanguage)}</Text>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => Linking.openURL(content.contact.website)}
          >
            <MaterialIcons name="language" size={20} color="#3B82F6" />
            <Text style={[styles.contactText, styles.linkText]}>{content.contact.website}</Text>
            <MaterialIcons name="open-in-new" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.mapSection}>
          <Text style={styles.sectionTitle}>{getLocation(currentLanguage)}</Text>
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <MaterialIcons name="location-on" size={48} color="#3B82F6" />
              <Text style={styles.mapPlaceholderText}>
                {currentLanguage === 'de' ? 'Karte wird geladen...' : 'Map loading...'}
              </Text>
              <Text style={styles.mapLocationText}>Frau Bock, Vienna</Text>
            </View>
          </View>
        </View>

        <View style={styles.tagsSection}>
          <View style={styles.tag}><Text style={styles.tagText}>A1</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>{currentLanguage === 'de' ? 'kostenlos' : 'free'}</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>Vienna</Text></View>
        </View>

        <TouchableOpacity style={styles.enrollButton} onPress={handleEnrollPress}>
          <Text style={styles.enrollButtonText}>{getEnrollNow(currentLanguage)}</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>

      <LanguageModal visible={showLanguageModal} onClose={() => setShowLanguageModal(false)} languageCode={language.code} />
      <HelpModal visible={showHelpModal} onClose={() => setShowHelpModal(false)} languageCode={language.code} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default FrauBockDeutschkurse;
