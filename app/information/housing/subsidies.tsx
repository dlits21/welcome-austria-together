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

const HousingSubsidiesPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => setSoundEnabled(!soundEnabled);
  const handleLinkPress = (url: string) => Linking.openURL(url);

  const content = {
    title: { en: 'Housing Subsidies & Financial Support', de: 'Wohnbeihilfen & Finanzielle Unterstützung' },
    subtitle: { en: 'Financial help for housing costs in Austria', de: 'Finanzielle Hilfe bei Wohnkosten in Österreich' },
    text: {
      en: `Austria offers various housing subsidies (Wohnbeihilfe) and emergency assistance for people struggling with rent payments. Each federal state has its own housing support programs with different eligibility criteria and application procedures. 

Emergency assistance is available through Caritas, Volkshilfe, and other charity organizations that provide immediate help with little bureaucracy. Many programs specifically support refugees, asylum seekers, and newcomers. Municipality social services (Sozialamt) also offer one-time assistance for urgent housing costs.

For larger cities like Vienna, Graz, and Salzburg there are additional local support programs. Some organizations provide help regardless of legal status and ask minimal questions - they focus on preventing homelessness.`,
      de: `Österreich bietet verschiedene Wohnbeihilfen und Notfallhilfen für Menschen mit Problemen bei der Mietzahlung. Jedes Bundesland hat eigene Wohnförderungsprogramme mit unterschiedlichen Voraussetzungen und Antragsverfahren.

Notfallhilfe gibt es über Caritas, Volkshilfe und andere Hilfsorganisationen, die sofortige Hilfe mit wenig Bürokratie anbieten. Viele Programme unterstützen speziell Geflüchtete, Asylsuchende und Neuankömmlinge. Das Sozialamt der Gemeinde bietet auch einmalige Hilfe bei dringenden Wohnkosten.

Für größere Städte wie Wien, Graz und Salzburg gibt es zusätzliche lokale Unterstützungsprogramme. Manche Organisationen helfen unabhängig vom Aufenthaltsstatus und stellen wenig Fragen - sie konzentrieren sich darauf, Obdachlosigkeit zu verhindern.`
    }
  };

  const definitions = {
    Wohnbeihilfe: {
      en: 'Housing allowance provided by federal states to help with rent costs for people with low income.',
      de: 'Wohnbeihilfe der Bundesländer zur Unterstützung bei Mietkosten für Menschen mit geringem Einkommen.',
      terms: { en: ['housing allowance', 'housing subsidy'], de: ['Wohnbeihilfe'] }
    },
    Sozialamt: {
      en: 'Municipal social services office that provides emergency assistance and social benefits.',
      de: 'Gemeindesozialamt, das Notfallhilfe und Sozialleistungen bereitstellt.',
      terms: { en: ['social services'], de: ['Sozialamt'] }
    },
    Notfallhilfe: {
      en: 'Emergency assistance for urgent housing costs, available through charities and social services.',
      de: 'Notfallhilfe für dringende Wohnkosten, verfügbar über Hilfsorganisationen und Sozialämter.',
      terms: { en: ['emergency assistance'], de: ['Notfallhilfe'] }
    }
  } as const;

  const keyPoints = {
    en: [
      'Each federal state has its own housing allowance program',
      'Caritas and Volkshilfe offer emergency assistance with minimal bureaucracy',
      'Municipality social services provide one-time emergency help',
      'Some organizations help regardless of legal status',
      'Apply early - processing can take several weeks'
    ],
    de: [
      'Jedes Bundesland hat ein eigenes Wohnbeihilfeprogramm',
      'Caritas und Volkshilfe bieten Notfallhilfe mit minimaler Bürokratie',
      'Gemeinde-Sozialämter bieten einmalige Notfallhilfe',
      'Manche Organisationen helfen unabhängig vom Aufenthaltsstatus',
      'Früh beantragen - Bearbeitung kann mehrere Wochen dauern'
    ]
  } as const;

  const supportOrganizations = [
    {
      name: 'Caritas Austria',
      description: { en: 'Emergency assistance and counseling', de: 'Notfallhilfe und Beratung' },
      url: 'https://www.caritas.at'
    },
    {
      name: 'Volkshilfe',
      description: { en: 'Social support and emergency aid', de: 'Soziale Unterstützung und Notfallhilfe' },
      url: 'https://www.volkshilfe.at'
    },
    {
      name: 'Wohnbeihilfe Vienna',
      description: { en: 'Housing allowance Vienna', de: 'Wohnbeihilfe Wien' },
      url: 'https://www.wien.gv.at/wohnen/wohnbaufoerderung/wohnbeihilfe/'
    },
    {
      name: 'Diakonie Austria',
      description: { en: 'Support for refugees and migrants', de: 'Hilfe für Geflüchtete und Migranten' },
      url: 'https://diakonie.at'
    }
  ];

  const faqs = [
    {
      q: { en: 'Who is eligible for housing allowance?', de: 'Wer hat Anspruch auf Wohnbeihilfe?' },
      a: {
        en: 'Requirements vary by federal state but generally include: low income, legal residence status, Austrian or EU citizenship (or comparable status), and rent payments that exceed a certain percentage of income.',
        de: 'Voraussetzungen variieren je Bundesland, umfassen aber meist: geringes Einkommen, legaler Wohnsitz, österreichische oder EU-Staatsbürgerschaft (oder vergleichbarer Status), und Mietkosten über einem bestimmten Einkommensanteil.'
      }
    },
    {
      q: { en: 'How quickly can I get emergency help?', de: 'Wie schnell bekomme ich Notfallhilfe?' },
      a: {
        en: 'Emergency assistance through charities like Caritas can often be provided within 24-48 hours. Municipal social services may take 1-2 weeks. Bring all documentation of your situation.',
        de: 'Notfallhilfe über Hilfsorganisationen wie Caritas kann oft binnen 24-48 Stunden bereitgestellt werden. Gemeinde-Sozialämter brauchen möglicherweise 1-2 Wochen. Bringen Sie alle Unterlagen zu Ihrer Situation mit.'
      }
    },
    {
      q: { en: 'What if I don\'t have legal status yet?', de: 'Was, wenn ich noch keinen legalen Status habe?' },
      a: {
        en: 'Some organizations like Caritas provide emergency assistance regardless of legal status to prevent homelessness. Contact them directly to discuss your specific situation.',
        de: 'Manche Organisationen wie Caritas bieten Notfallhilfe unabhängig vom Aufenthaltsstatus, um Obdachlosigkeit zu verhindern. Kontaktieren Sie sie direkt, um Ihre spezielle Situation zu besprechen.'
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
          <Text style={styles.sectionTitle}>{language.code === 'de' ? 'Hilfsorganisationen' : 'Support Organizations'}</Text>
          {supportOrganizations.map((org, idx) => (
            <TouchableOpacity key={idx} style={styles.linkItem} onPress={() => handleLinkPress(org.url)}>
              <MaterialIcons name="help" size={20} color="#3B82F6" />
              <View style={styles.linkContent}>
                <Text style={styles.linkTitle}>{org.name}</Text>
                <Text style={styles.linkDescription}>
                  {language.code === 'de' ? org.description.de : org.description.en}
                </Text>
              </View>
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
  linkContent: { flex: 1, marginLeft: 12 },
  linkTitle: { fontSize: 16, color: '#3B82F6', fontWeight: '500', marginBottom: 4 },
  linkDescription: { fontSize: 14, color: '#666' },
});

export default HousingSubsidiesPage;