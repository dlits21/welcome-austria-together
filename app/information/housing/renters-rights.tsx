import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const RentersRightsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => setSoundEnabled(!soundEnabled);
  const handleLinkPress = (url: string) => Linking.openURL(url);

  const content = {
    title: { en: 'Tenant (Renter) Rights', de: 'Rechte von Mieter:innen' },
    subtitle: { en: 'Know your rights when renting in Austria', de: 'Ihre Rechte beim Mieten in Österreich' },
    text: {
      en: `Tenants in Austria are protected by strong laws (MRG). Key protections include: fair rent, proper maintenance, deposit (Kaution) return, and clear termination rules. Always request a written handover protocol and keep all communication in writing. If you face issues, contact tenant associations or the Labour Chamber (AK).`,
      de: `Mieter:innen in Österreich sind durch starke Gesetze (MRG) geschützt. Wichtige Schutzrechte sind: angemessene Miete, ordnungsgemäße Instandhaltung, Rückzahlung der Kaution und klare Kündigungsregeln. Fordern Sie ein schriftliches Übergabeprotokoll an und bewahren Sie Korrespondenz schriftlich auf. Bei Problemen helfen Mietervereine oder die Arbeiterkammer (AK).`
    },
    links: [
      { title: { en: 'help.gv.at – Tenancy law (EN)', de: 'oesterreich.gv.at – Mietrecht (DE)' }, url: 'https://www.oesterreich.gv.at/themen/bauen_wohnen_und_umwelt/mietrecht.html' },
      { title: { en: 'Mietervereinigung Österreichs', de: 'Mietervereinigung Österreichs' }, url: 'https://mietervereinigung.at' },
      { title: { en: 'Arbeiterkammer – Housing advice', de: 'Arbeiterkammer – Wohnen & Recht' }, url: 'https://www.arbeiterkammer.at/beratung/wohnen/index.html' }
    ]
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
          {content.links.map((link, idx) => (
            <TouchableOpacity key={idx} style={styles.linkItem} onPress={() => handleLinkPress(link.url)}>
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

export default RentersRightsPage;
