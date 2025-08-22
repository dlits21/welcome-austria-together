import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import HighlightedText from '../../../components/HighlightedText';
import FAQItem from '../../../components/FAQItem';

const MovingChecklistPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => setSoundEnabled(!soundEnabled);
  const handleLinkPress = (url: string) => Linking.openURL(url);

  const content = {
    title: { en: 'Moving Checklist', de: 'Umzugs-Checkliste' },
    subtitle: { en: 'Step-by-step guide for your move', de: 'Schritt-für-Schritt-Anleitung für Ihren Umzug' },
    text: {
      en: `Moving in Austria involves a few legal and practical steps. Before moving, give notice on time and plan logistics. At handover, take meter readings and sign the Übergabeprotokoll. After moving, register your address (Meldezettel), set up utilities, and update important institutions (bank, insurance).`,
      de: `Ein Umzug in Österreich umfasst einige rechtliche und praktische Schritte. Vor dem Umzug rechtzeitig kündigen und die Logistik planen. Bei der Übergabe Zählerstände ablesen und das Übergabeprotokoll unterschreiben. Nach dem Einzug Adresse (Meldezettel) anmelden, Versorger einrichten und wichtige Stellen (Bank, Versicherung) informieren.`
    },
    links: [
      { title: { en: 'help.gv.at – Moving house', de: 'oesterreich.gv.at – Umzug' }, url: 'https://www.oesterreich.gv.at/themen/leben_in_oesterreich/wohnen/Seite.260433.html' },
      { title: { en: 'Registration (Meldezettel)', de: 'Meldezettel – Anmeldung' }, url: 'https://www.oesterreich.gv.at/themen/dokumente_und_recht/meldezettel.html' }
    ]
  };

  const definitions = {
    Übergabeprotokoll: {
      en: 'Written handover protocol listing meter readings and defects when you move in/out.',
      de: 'Schriftliches Protokoll zur Wohnungsübergabe mit Zählerständen und Mängeln beim Ein-/Auszug.'
    },
    Meldezettel: {
      en: 'Official address registration form to submit shortly after moving.',
      de: 'Amtliches Formular zur Adressanmeldung, das kurz nach dem Einzug abzugeben ist.'
    },
    Zählerstände: {
      en: 'Meter readings (electricity, gas, water) recorded at handover.',
      de: 'Zählerstände (Strom, Gas, Wasser), die bei der Übergabe dokumentiert werden.'
    },
    Haushaltsversicherung: {
      en: 'Household insurance that can cover damages and liability in your flat.',
      de: 'Haushaltsversicherung, die Schäden und Haftung in der Wohnung abdecken kann.'
    }
  } as const;

  const keyPoints = {
    en: [
      'Before: cancel old contracts and give notice in time; plan transport',
      'Handover: record meter readings and defects with photos',
      'After: register address (Meldezettel) and set up utilities quickly',
      'Label your mailbox and doorbell with your name',
      'Consider household/liability insurance'
    ],
    de: [
      'Vorher: alte Verträge kündigen und rechtzeitig abmelden; Transport planen',
      'Übergabe: Zählerstände und Mängel mit Fotos dokumentieren',
      'Nachher: Adresse (Meldezettel) anmelden und Versorger rasch einrichten',
      'Namen am Postkasten und an der Klingel anbringen',
      'Haushalts-/Haftpflichtversicherung prüfen'
    ]
  } as const;

  const faqs = [
    {
      q: { en: 'What are the first steps right after moving?', de: 'Was sind die ersten Schritte direkt nach dem Einzug?' },
      a: {
        en: 'Register your address (Meldezettel), read meters, put your name on the mailbox, set up electricity/gas/internet, and inform bank/insurance/employer of your new address.',
        de: 'Adresse anmelden (Meldezettel), Zähler ablesen, Namen am Postkasten anbringen, Strom/Gas/Internet einrichten und Bank/Versicherung/Arbeitgeber über die neue Adresse informieren.'
      }
    },
    {
      q: { en: 'What should I photograph at handover?', de: 'Was sollte ich bei der Übergabe fotografieren?' },
      a: {
        en: 'All rooms, existing defects, and each meter display. Keep photos with the signed handover protocol.',
        de: 'Alle Räume, vorhandene Mängel und jede Zähleranzeige. Fotos zusammen mit dem unterschriebenen Übergabeprotokoll aufbewahren.'
      }
    },
    {
      q: { en: 'How do I change my address officially?', de: 'Wie ändere ich meine Adresse offiziell?' },
      a: {
        en: 'Fill in and submit the Meldezettel at the registration office (e.g., in your city/municipality). Some cities offer online forms.',
        de: 'Meldezettel ausfüllen und beim Meldeamt (z. B. Ihrer Stadt/Gemeinde) abgeben. Manche Städte bieten Online-Formulare.'
      }
    }
  ] as const;

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
        <HighlightedText language={language.code} definitions={definitions}>
          {language.code === 'de' ? content.text.de : content.text.en}
        </HighlightedText>

        <View style={styles.linksSection}>
          <Text style={styles.sectionTitle}>{language.code === 'de' ? 'Wichtig auf einen Blick' : 'Key points'}</Text>
          {(language.code === 'de' ? keyPoints.de : keyPoints.en).map((item, idx) => (
            <View key={idx} style={styles.bulletItem}>
              <MaterialIcons name="check-circle" size={18} color="#10B981" />
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>{language.code === 'de' ? 'Häufige Fragen' : 'Most pressing questions'}</Text>
          {(faqs as any[]).map((f, idx) => (
            <FAQItem
              key={idx}
              question={language.code === 'de' ? f.q.de : f.q.en}
              answer={language.code === 'de' ? f.a.de : f.a.en}
              expanded={expandedFaq === idx}
              onPress={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
            />
          ))}
        </View>

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
  text: { fontSize: 16, lineHeight: 24, color: '#374151', marginBottom: 16 },
  linksSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#1f2937', marginBottom: 12 },
  bulletItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  bulletText: { fontSize: 16, color: '#374151', marginLeft: 8, flex: 1 },
  faqSection: { marginBottom: 24 },
  linkItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', padding: 16, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  linkText: { flex: 1, fontSize: 16, color: '#3B82F6', marginLeft: 12, fontWeight: '500' },
});

export default MovingChecklistPage;
