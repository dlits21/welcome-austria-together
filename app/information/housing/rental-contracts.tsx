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

const RentalContractsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => setSoundEnabled(!soundEnabled);
  const handleLinkPress = (url: string) => Linking.openURL(url);

  const content = {
    title: { en: 'Rental Contracts', de: 'Mietverträge' },
    subtitle: { en: 'What to check before you sign', de: 'Worauf Sie vor der Unterschrift achten sollten' },
    text: {
      en: `A proper Mietvertrag clearly states the parties, address, start date, rent, operating costs (Betriebskosten), deposit (Kaution), contract term (befristet/unbefristet), responsibilities for repairs, and how the rent may change over time. Ask for a written Übergabeprotokoll on move-in and never sign anything you do not understand.`,
      de: `Ein korrekter Mietvertrag enthält die Vertragspartner, Adresse, Beginn, Miete, Betriebskosten, Kaution, Vertragsdauer (befristet/unbefristet), Verantwortlichkeiten bei Reparaturen und Regelungen zur Mietanpassung. Verlangen Sie beim Einzug ein schriftliches Übergabeprotokoll und unterschreiben Sie nichts, was Sie nicht verstehen.`
    },
    links: [
      { title: { en: 'help.gv.at – Rental contracts', de: 'oesterreich.gv.at – Mietvertrag' }, url: 'https://www.oesterreich.gv.at/themen/bauen_wohnen_und_umwelt/mietrecht/mietvertrag.html' },
      { title: { en: 'Tenant Association – Contract check', de: 'Mietervereinigung – Vertragscheck' }, url: 'https://mietervereinigung.at/service/vertraege' }
    ]
  };

  const definitions = {
    Mietvertrag: {
      en: 'The rental agreement between tenant and landlord. It must define rent, operating costs, deposit, rights and obligations.',
      de: 'Der Vertrag zwischen Mieter:in und Vermieter:in. Regelt Miete, Betriebskosten, Kaution, Rechte und Pflichten.'
    },
    Kaution: {
      en: 'Refundable deposit (usually 2–3 gross monthly rents) to cover damages or unpaid costs.',
      de: 'Rückzahlbare Sicherheitsleistung (meist 2–3 Bruttomonatsmieten) zur Absicherung gegen Schäden oder offene Kosten.',
      terms: { en: ['deposit'] }
    },
    Betriebskosten: {
      en: 'Operating costs paid in addition to base rent (e.g., building services, waste, common electricity).',
      de: 'Zusätzliche Kosten zur Miete (z. B. Hausbetrieb, Müll, Allgemeinstrom).',
      terms: { en: ['operating costs'] }
    },
    Befristet: {
      en: 'Limited-term contract. Check the minimum term and how/when it can be extended or terminated.',
      de: 'Befristeter Vertrag. Mindestdauer und Verlängerungs-/Kündigungsregeln prüfen.'
    },
    Unbefristet: {
      en: 'Open-ended contract without a fixed end date.',
      de: 'Unbefristeter Vertrag ohne fixes Enddatum.'
    },
    Kündigungsfrist: {
      en: 'Notice period you must observe to end the contract.',
      de: 'Frist, die bei einer Kündigung einzuhalten ist.',
      terms: { en: ['notice period'] }
    },
    Übergabeprotokoll: {
      en: 'Written handover protocol with meter readings and defects at move-in/out.',
      de: 'Schriftliches Protokoll zur Wohnungsübergabe mit Zählerständen und Mängeln beim Ein-/Auszug.'
    },
    Indexmiete: {
      en: 'Rent indexed to an inflation indicator (e.g., VPI). Check how and when increases can happen.',
      de: 'Miete, die an einen Index (z. B. VPI) gebunden ist. Prüfen, wie und wann Erhöhungen möglich sind.'
    }
  } as const;

  const keyPoints = {
    en: [
      'Get every agreement in writing; avoid cash-only arrangements',
      'Check if the contract is befristet (limited) or unbefristet (open-ended)',
      'Clarify maintenance responsibilities and what counts as wear and tear',
      'Ask how rent increases work (e.g., indexation) and when',
      'Always do a handover protocol with meter readings and photos'
    ],
    de: [
      'Alle Vereinbarungen schriftlich festhalten; Barzahlungen vermeiden',
      'Ist der Vertrag befristet oder unbefristet?',
      'Instandhaltungspflichten und gewöhnliche Abnützung klären',
      'Fragen, wie Mietanpassungen funktionieren (z. B. Index) und wann',
      'Übergabeprotokoll mit Zählerständen und Fotos machen'
    ]
  } as const;

  const faqs = [
    {
      q: { en: 'What must a rental contract include?', de: 'Was muss ein Mietvertrag enthalten?' },
      a: {
        en: 'Names of parties, address, start date, rent and operating costs, deposit amount, term (limited/unlimited), notice periods, responsibilities for repairs, and rules for rent increases.',
        de: 'Vertragspartner, Adresse, Beginn, Miete und Betriebskosten, Kautionshöhe, Vertragsdauer (befristet/unbefristet), Kündigungsfristen, Instandhaltungspflichten sowie Regeln für Mieterhöhungen.'
      }
    },
    {
      q: { en: 'How high can the deposit be?', de: 'Wie hoch darf die Kaution sein?' },
      a: {
        en: 'Commonly 2–3 gross monthly rents. It must be kept safe and returned after move-out minus justified costs.',
        de: 'Üblich sind 2–3 Bruttomonatsmieten. Sie muss sicher verwahrt und nach dem Auszug abzüglich berechtigter Kosten zurückgezahlt werden.'
      }
    },
    {
      q: { en: 'Should I sign if I do not understand a clause?', de: 'Soll ich unterschreiben, wenn ich eine Klausel nicht verstehe?' },
      a: {
        en: 'No. Ask for clarification or advice from a tenant association before signing. Never sign under pressure.',
        de: 'Nein. Vorher erklären lassen oder Beratung (z. B. Mietervereinigung) einholen. Niemals unter Druck unterschreiben.'
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

export default RentalContractsPage;
