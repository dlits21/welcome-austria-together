import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const JobSearchPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => setSoundEnabled(!soundEnabled);
  const handleLinkPress = (url: string) => Linking.openURL(url);

  const content = {
    title: { en: 'Job Search', de: 'Jobsuche' },
    subtitle: { en: 'Where to look for jobs in Austria', de: 'Wo man in Österreich Jobs findet' },
    text: {
      en: `Finding a job in Austria can be easier with the right tools and platforms. Create a strong CV, prepare a clear cover letter, and use trusted websites.

Recommended places to look:
• AMS eJob-Room (official job platform)
• Large job portals (karriere.at, stepstone.at, willhaben Jobs)
• Professional networks (LinkedIn)
• Company websites and career pages
• Local newspapers and community boards

Tip: Use filters (location, full-time/part-time, language) and set up job alerts.`,
      de: `Die Jobsuche in Österreich gelingt leichter mit den richtigen Tools und Plattformen. Erstellen Sie einen guten Lebenslauf, ein klares Anschreiben und nutzen Sie vertrauenswürdige Webseiten.

Empfohlene Anlaufstellen:
• AMS eJob-Room (offizielle Jobbörse)
• Große Jobportale (karriere.at, stepstone.at, willhaben Jobs)
• Professionelle Netzwerke (LinkedIn)
• Firmenwebseiten und Karriereseiten
• Lokale Zeitungen und schwarze Bretter

Tipp: Nutzen Sie Filter (Ort, Voll-/Teilzeit, Sprache) und richten Sie Job-Benachrichtigungen ein.`
    },
    links: [
      { title: { en: 'AMS eJob-Room', de: 'AMS eJob-Room' }, url: 'https://jobs.ams.at' },
      { title: { en: 'karriere.at', de: 'karriere.at' }, url: 'https://www.karriere.at' },
      { title: { en: 'StepStone Austria', de: 'StepStone Österreich' }, url: 'https://www.stepstone.at' },
      { title: { en: 'LinkedIn Jobs', de: 'LinkedIn Jobs' }, url: 'https://www.linkedin.com/jobs' },
    ],
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
      <HelpModal visible={showHelpModal} onClose={() => setShowHelpModal(false)} languageCode={language.code} />
    </SafeAreaView>
  );
};

export default JobSearchPage;

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
