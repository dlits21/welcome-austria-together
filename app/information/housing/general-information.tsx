import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import HighlightedText from '../../../components/HighlightedText';
import FAQItem from '../../../components/FAQItem';

const HousingGeneralInfoPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => setSoundEnabled(!soundEnabled);
  const handleLinkPress = (url: string) => Linking.openURL(url);

  const content = {
    title: { en: 'Housing: General Information', de: 'Wohnen: Allgemeine Informationen' },
    subtitle: { en: 'Basics of renting, living, and community life in Austria', de: 'Grundlagen zum Mieten, Wohnen und Gemeinschaftsleben in Österreich' },
    text: {
      en: `In Austria, most people rent their homes. When you move into a flat you typically pay a deposit (Kaution), monthly rent and operating costs (Betriebskosten). Within 3 days you must register your new address using the Meldezettel.

Understanding the difference between main tenancy (Hauptmiete), subletting (Untermiete) and shared flats (WG) helps you choose the right contract and avoid problems. Always ask for a written handover protocol with meter readings and visible defects. Keep all payments traceable (bank transfer) and file every document.

Austria has strict recycling and waste disposal rules. Most buildings have separate bins for paper (Altpapier), yellow bags for plastic/metal (Gelber Sack), glass containers, and general waste (Restmüll). Quiet hours (Ruhezeiten) are typically from 22:00-06:00 and all day Sunday. Being considerate with noise, greeting neighbors, and following house rules helps build good relationships. Many buildings have communal areas and shared responsibilities.`,
      de: `In Österreich werden die meisten Wohnungen gemietet. Beim Einzug zahlen Sie in der Regel eine Kaution, monatliche Miete und Betriebskosten. Innerhalb von 3 Tagen müssen Sie Ihre neue Adresse mit dem Meldezettel anmelden.

Der Unterschied zwischen Hauptmiete, Untermiete und Wohngemeinschaft (WG) ist wichtig, um den richtigen Vertrag zu wählen und Probleme zu vermeiden. Verlangen Sie ein schriftliches Übergabeprotokoll mit Zählerständen und sichtbaren Mängeln. Zahlen Sie nach Möglichkeit nicht bar und heben Sie alle Unterlagen gut auf.

Österreich hat strenge Regeln für Mülltrennung und Entsorgung. Die meisten Gebäude haben getrennte Behälter für Altpapier, Gelbe Säcke für Plastik/Metall, Glascontainer und Restmüll. Ruhezeiten sind normalerweise von 22:00-06:00 und sonntags ganztägig. Rücksichtnahme bei Lärm, Grüßen der Nachbarn und Befolgen der Hausordnung hilft beim Aufbau guter Beziehungen.`
    },
    links: [
      { title: { en: 'help.gv.at – Moving and registration', de: 'oesterreich.gv.at – Umzug & Meldung' }, url: 'https://www.oesterreich.gv.at/themen/leben_in_oesterreich/wohnen.html' },
      { title: { en: 'City info (Vienna): Housing', de: 'Stadt Wien: Wohnen' }, url: 'https://www.wien.gv.at/wohnen/' },
      { title: { en: 'Find language exchange partners', de: 'Sprachtandem finden' }, url: 'https://www.tandem.net' },
      { title: { en: 'Conversation cafe Vienna', de: 'Gesprächscafé Wien' }, url: 'https://www.wien.gv.at/bildung/erwachsenenbildung/deutschkurse/' },
      { title: { en: 'Neighborly help platforms', de: 'Nachbarschaftshilfe-Plattformen' }, url: 'https://www.fragnebenan.com' }
    ]
  };

  const definitions = {
    Kaution: {
      en: 'Refundable security deposit (usually 2–3 gross monthly rents) held as safety for damages or unpaid costs. Must be returned after proper move-out minus justified costs.',
      de: 'Rückzahlbare Sicherheitsleistung (meist 2–3 Bruttomonatsmieten) als Absicherung für Schäden oder offene Kosten. Nach korrektem Auszug abzüglich berechtigter Kosten zurückzuzahlen.',
      terms: { en: ['deposit'], de: ['Kaution'] }
    },
    Meldezettel: {
      en: 'Official address registration form you must submit shortly after moving to a new address.',
      de: 'Amtliches Formular zur Anmeldung der Wohnadresse, das kurz nach dem Einzug abgegeben werden muss.'
    },
    Hauptmiete: {
      en: 'Main tenancy: you are the primary tenant with a direct contract with the landlord.',
      de: 'Hauptmiete: Sie sind Hauptmieter:in mit direktem Vertrag mit der Vermietung.'
    },
    Untermiete: {
      en: 'Subletting: you rent from the main tenant, not directly from the landlord. Requires permission in many cases.',
      de: 'Untermiete: Sie mieten von der Hauptmieter:in und nicht direkt von der Vermietung. Oft zustimmungspflichtig.'
    },
    WG: {
      en: 'Shared flat (WG): several people share a flat and costs; contracts can be joint or separate.',
      de: 'Wohngemeinschaft (WG): mehrere Personen teilen sich eine Wohnung und Kosten; Verträge können gemeinsam oder getrennt sein.',
      terms: { en: ['shared flat', 'flatshare', 'shared apartment'], de: ['WG', 'Wohngemeinschaft'] }
    },
    Betriebskosten: {
      en: 'Operating costs (e.g., building services, waste, common electricity) paid in addition to base rent.',
      de: 'Betriebskosten (z. B. Hausbetrieb, Müll, Allgemeinstrom), die zusätzlich zur Miete zu zahlen sind.',
      terms: { en: ['operating costs'] }
    },
    Ruhezeiten: {
      en: 'Quiet hours when noise should be minimized, typically 22:00-06:00 weekdays and all day Sunday.',
      de: 'Ruhezeiten, in denen Lärm vermieden werden soll, typischerweise 22:00-06:00 unter der Woche und sonntags ganztägig.',
      terms: { en: ['quiet hours'], de: ['Ruhezeiten'] }
    },
    Altpapier: {
      en: 'Paper recycling bin for newspapers, magazines, cardboard, and clean paper waste.',
      de: 'Papiermüll-Container für Zeitungen, Zeitschriften, Karton und sauberes Altpapier.',
      terms: { en: ['paper recycling'], de: ['Altpapier'] }
    },
    'Gelber Sack': {
      en: 'Yellow bag for plastic packaging, metal cans, and composite materials.',
      de: 'Gelber Sack für Plastikverpackungen, Metalldosen und Verbundmaterialien.',
      terms: { en: ['yellow bag'], de: ['Gelber Sack'] }
    }
  } as const;

  const keyPoints = {
    en: [
      'Register your address (Meldezettel) within 3 days of moving in',
      'Request a written handover protocol with meter readings and defects',
      'Separate waste: paper, yellow bag (plastic/metal), glass, general waste',
      'Observe quiet hours (22:00-06:00 weekdays, all day Sunday)',
      'Greet neighbors and follow house rules to build good relationships',
      'Join language exchange or community groups to practice German'
    ],
    de: [
      'Adresse innerhalb von 3 Tagen mit dem Meldezettel anmelden',
      'Schriftliches Übergabeprotokoll mit Zählerständen und Mängeln verlangen',
      'Müll trennen: Altpapier, Gelber Sack, Glas, Restmüll',
      'Ruhezeiten beachten (22:00-06:00 wochentags, sonntags ganztägig)',
      'Nachbarn grüßen und Hausordnung befolgen für gute Beziehungen',
      'Sprachtandem oder Gemeinschaftsgruppen beitreten für Deutsch-Praxis'
    ]
  } as const;

  const faqs = [
    {
      q: { en: 'What do I need immediately after moving in?', de: 'Was brauche ich direkt nach dem Einzug?' },
      a: {
        en: 'Register your address (Meldezettel), read and record all meter readings, put your name on the mailbox, set up electricity/gas/internet if needed, and keep the signed handover protocol.',
        de: 'Adresse anmelden (Meldezettel), alle Zählerstände ablesen und notieren, Namen am Postkasten anbringen, Strom/Gas/Internet anmelden und das unterschriebene Übergabeprotokoll aufbewahren.'
      }
    },
    {
      q: { en: 'How high is a typical deposit?', de: 'Wie hoch ist die übliche Kaution?' },
      a: {
        en: 'Commonly 2–3 gross monthly rents. It must be returned after move-out minus justified costs (e.g., open bills or damages).',
        de: 'Üblich sind 2–3 Bruttomonatsmieten. Nach dem Auszug muss sie abzüglich berechtigter Kosten (z. B. offene Rechnungen oder Schäden) zurückgezahlt werden.'
      }
    },
    {
      q: { en: 'Can I sublet my room?', de: 'Darf ich mein Zimmer untervermieten?' },
      a: {
        en: 'Often possible but may require written permission from the landlord and a proper sublet agreement. Always clarify in advance.',
        de: 'Oft möglich, aber häufig zustimmungspflichtig. Holen Sie sich vorab eine schriftliche Zustimmung und schließen Sie einen Untermietvertrag.'
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

export default HousingGeneralInfoPage;
