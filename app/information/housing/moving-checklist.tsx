import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const MovingChecklistPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => setSoundEnabled(!soundEnabled);
  const handleLinkPress = (url: string) => Linking.openURL(url);

  const content = {
    title: { en: 'Moving Checklist', de: 'Umzugs-Checkliste' },
    subtitle: { en: 'Step-by-step guide for your move', de: 'Schritt-für-Schritt-Anleitung für Ihren Umzug' },
    text: {
      en: `Before moving: give notice on time, arrange handover date, and start packing. During move-in: take meter readings, sign handover protocol, and check for defects. After moving: register address (Meldezettel), set up utilities (electricity, gas, internet), update insurance and bank, and put your name on the mailbox.`,
      de: `Vor dem Umzug: rechtzeitig kündigen, Übergabetermin vereinbaren und mit dem Packen beginnen. Beim Einzug: Zählerstände ablesen, Übergabeprotokoll unterschreiben und Mängel prüfen. Nach dem Umzug: Adresse melden (Meldezettel), Strom/Gas/Internet anmelden, Versicherung und Bank informieren und Namen am Postkasten anbringen.`
    },
    links: [
      { title: { en: 'help.gv.at – Moving house', de: 'oesterreich.gv.at – Umzug' }, url: 'https://www.oesterreich.gv.at/themen/leben_in_oesterreich/wohnen/Seite.260433.html' },
      { title: { en: 'Registration (Meldezettel)', de: 'Meldezettel – Anmeldung' }, url: 'https://www.oesterreich.gv.at/themen/dokumente_und_recht/meldezettel.html' }
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

export default MovingChecklistPage;
