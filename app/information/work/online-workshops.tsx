import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';

const WorkOnlineWorkshopsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => Linking.openURL(url);

  const content = {
    title: { en: 'Online Workshops & Certificates', de: 'Online-Workshops & Zertifikate' },
    subtitle: { en: 'Build job skills and get recognized certificates', de: 'Berufliche Fähigkeiten aufbauen und anerkannte Zertifikate erhalten' },
    text: {
      en: `Online learning can help you qualify for jobs in Austria. Many institutions offer courses with certificates that employers recognize.

Useful areas:
• German for work (Deutsch am Arbeitsplatz)
• Digital skills (Office, Excel, coding)
• Safety and hygiene certificates
• Industry-specific basics (logistics, retail, care)

Tip: Ask the AMS or your local VHS if a course can be funded.`,
      de: `Online-Lernen kann helfen, sich für Jobs in Österreich zu qualifizieren. Viele Einrichtungen bieten Kurse mit Zertifikaten an, die Arbeitgeber anerkennen.

Nützliche Bereiche:
• Deutsch am Arbeitsplatz
• Digitale Kompetenzen (Office, Excel, Programmierung)
• Sicherheits- und Hygieneschulungen
• Branchenspezifische Grundlagen (Logistik, Handel, Pflege)

Tipp: Fragen Sie das AMS oder Ihre lokale VHS nach Fördermöglichkeiten.`,
    },
    links: [
      { title: { en: 'VHS Online Courses', de: 'VHS Online-Kurse' }, url: 'https://www.vhs.at' },
      { title: { en: 'AMS Training', de: 'AMS Schulungen' }, url: 'https://www.ams.at' },
      { title: { en: 'Coursera', de: 'Coursera' }, url: 'https://www.coursera.org' },
      { title: { en: 'edX', de: 'edX' }, url: 'https://www.edx.org' },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>{language.code === 'de' ? content.title.de : content.title.en}</Text>
        <Text style={styles.subtitle}>{language.code === 'de' ? content.subtitle.de : content.subtitle.en}</Text>
        <Text style={styles.text}>{language.code === 'de' ? content.text.de : content.text.en}</Text>

        <View style={styles.linksSection}>
          <Text style={styles.sectionTitle}>{language.code === 'de' ? 'Nützliche Links' : 'Useful Links'}</Text>
          {content.links.map((link, i) => (
            <TouchableOpacity key={i} style={styles.linkItem} onPress={() => handleLinkPress(link.url)}>
              <MaterialIcons name="link" size={20} color="#3B82F6" />
              <Text style={styles.linkText}>{language.code === 'de' ? link.title.de : link.title.en}</Text>
              <MaterialIcons name="open-in-new" size={16} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <LanguageModal visible={showLanguageModal} onClose={() => setShowLanguageModal(false)} languageCode={language.code} />
      {/* Virtual Assistant Modal */}
      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
        languageCode={language.code}
      />

      {/* Tutorial Modal */}
      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={language.code}
        tutorialData="home"
      />
    </SafeAreaView>
  );
};

export default WorkOnlineWorkshopsPage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: '#1f2937' },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#4b5563', marginBottom: 20 },
  text: { fontSize: 16, lineHeight: 24, color: '#374151', marginBottom: 32 },
  linksSection: { marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#1f2937', marginBottom: 16 },
  linkItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', padding: 16, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  linkText: { flex: 1, fontSize: 16, color: '#3B82F6', marginLeft: 12, fontWeight: '500' },
});
