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

const RentersRightsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => setSoundEnabled(!soundEnabled);
  const handleLinkPress = (url: string) => Linking.openURL(url);

  const content = {
    title: { en: 'Tenant (Renter) Rights', de: 'Rechte von Mieter:innen' },
    subtitle: { en: 'Know your rights when renting in Austria', de: 'Ihre Rechte beim Mieten in Österreich' },
    text: {
      en: `Tenants in Austria are protected by strong laws, especially the Mietrechtsgesetz (MRG). You are entitled to proper maintenance, transparent operating costs, fair rent, and the return of your deposit (Kaution) after moving out. Keep all communication in writing and document defects with photos.`,
      de: `Mieter:innen in Österreich sind durch starke Gesetze – insbesondere das Mietrechtsgesetz (MRG) – geschützt. Sie haben Anspruch auf ordnungsgemäße Instandhaltung, transparente Betriebskosten, angemessene Miete und die Rückzahlung der Kaution nach dem Auszug. Führen Sie wichtige Kommunikation schriftlich und dokumentieren Sie Mängel mit Fotos.`
    },
    links: [
      { title: { en: 'help.gv.at – Tenancy law (EN)', de: 'oesterreich.gv.at – Mietrecht (DE)' }, url: 'https://www.oesterreich.gv.at/themen/bauen_wohnen_und_umwelt/mietrecht.html' },
      { title: { en: 'Mietervereinigung Österreichs', de: 'Mietervereinigung Österreichs' }, url: 'https://mietervereinigung.at' },
      { title: { en: 'Arbeiterkammer – Housing advice', de: 'Arbeiterkammer – Wohnen & Recht' }, url: 'https://www.arbeiterkammer.at/beratung/wohnen/index.html' }
    ]
  };

  const definitions = {
    MRG: {
      en: 'Austrian tenancy law (Mietrechtsgesetz) that regulates many tenant protections and rules.',
      de: 'Österreichisches Mietrechtsgesetz, das viele Schutzrechte und Regeln für Mieter:innen enthält.',
      terms: { en: ['tenancy law'], de: ['Mietrechtsgesetz'] }
    },
    Kaution: {
      en: 'Refundable deposit (usually 2–3 gross monthly rents) to cover damages or unpaid costs.',
      de: 'Rückzahlbare Sicherheitsleistung (meist 2–3 Bruttomonatsmieten) zur Absicherung gegen Schäden oder offene Kosten.',
      terms: { en: ['deposit'] }
    },
    Kündigungsfrist: {
      en: 'Notice period to end the contract.',
      de: 'Frist, die bei einer Kündigung einzuhalten ist.',
      terms: { en: ['notice period'] }
    },
    Betriebskosten: {
      en: 'Operating costs paid in addition to base rent.',
      de: 'Zusätzliche Kosten zur Miete (Betriebskosten).',
      terms: { en: ['operating costs'] }
    },
    Arbeiterkammer: {
      en: 'Labour Chamber (AK) offers legal advice to workers, including housing issues.',
      de: 'Arbeiterkammer (AK) bietet rechtliche Beratung für Arbeitnehmer:innen, auch zum Wohnen.'
    }
  } as const;

  const keyPoints = {
    en: [
      'Right to proper maintenance and repairs within a reasonable time',
      'Deposit must be returned minus justified costs after move-out',
      'Rent increases must follow the rules in your contract and law',
      'Landlord cannot enter your flat without permission (except emergencies)',
      'Seek help from the Tenant Association or the Labour Chamber (AK)'
    ],
    de: [
      'Anspruch auf ordnungsgemäße Instandhaltung und zeitnahe Reparaturen',
      'Kaution ist nach dem Auszug abzüglich berechtigter Kosten zurückzuzahlen',
      'Mieterhöhungen nur gemäß Vertrag und Gesetz',
      'Vermieter:in darf die Wohnung nicht ohne Zustimmung betreten (außer Notfälle)',
      'Bei Problemen Hilfe bei Mietervereinigung oder Arbeiterkammer (AK) suchen'
    ]
  } as const;

  const faqs = [
    {
      q: { en: 'My landlord won\'t return the deposit—what can I do?', de: 'Vermieter:in zahlt Kaution nicht zurück – was tun?' },
      a: {
        en: 'Request an itemized justification in writing. If unjustified or no response, contact the Tenant Association or AK. As a last step you can pursue legal action.',
        de: 'Schriftlich um eine begründete Aufstellung bitten. Bei Unrechtmäßigkeit oder ohne Antwort Mietervereinigung oder AK kontaktieren. Letztlich ist auch der Rechtsweg möglich.'
      }
    },
    {
      q: { en: 'Can my landlord enter without permission?', de: 'Darf die Vermietung ohne Erlaubnis in die Wohnung?' },
      a: {
        en: 'No. Entry requires your consent, except in emergencies. Inspections should be announced and agreed in advance.',
        de: 'Nein. Ein Betreten erfordert Ihre Zustimmung – außer in Notfällen. Besichtigungen müssen angekündigt und vereinbart werden.'
      }
    },
    {
      q: { en: 'How much notice must I give?', de: 'Welche Kündigungsfrist gilt für mich?' },
      a: {
        en: 'Check your contract. For many unlimited contracts the notice period is around 3 months unless agreed otherwise.',
        de: 'Prüfen Sie Ihren Vertrag. Bei vielen unbefristeten Verträgen beträgt die Kündigungsfrist etwa 3 Monate, sofern nichts anderes vereinbart ist.'
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

export default RentersRightsPage;
