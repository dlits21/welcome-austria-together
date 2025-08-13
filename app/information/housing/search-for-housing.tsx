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

const SearchForHousingPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => setSoundEnabled(!soundEnabled);
  const handleLinkPress = (url: string) => Linking.openURL(url);

  const content = {
    title: { en: 'Search for Housing', de: 'Wohnungssuche' },
    subtitle: { en: 'Websites, organizations, and support for finding accommodation', de: 'Websites, Organisationen und Unterstützung bei der Wohnungssuche' },
    text: {
      en: `Finding housing in Austria can be challenging, especially in cities like Vienna, Salzburg, and Innsbruck. Besides commercial platforms, there are specialized organizations that help refugees and migrants find accommodation.

Many charity organizations maintain housing programs specifically for newcomers, offering both temporary and permanent solutions. University cities have student housing services that sometimes accommodate international students and exchange participants. 

Social housing (Gemeindewohnungen) in Vienna and other cities provides affordable options, though waiting lists can be long. Some platforms specialize in immigrant-friendly landlords who are more open to renting to people without extensive Austrian rental history.`,
      de: `Wohnungssuche in Österreich kann herausfordernd sein, besonders in Städten wie Wien, Salzburg und Innsbruck. Neben kommerziellen Plattformen gibt es spezialisierte Organisationen, die Geflüchteten und Migranten bei der Wohnungssuche helfen.

Viele Hilfsorganisationen unterhalten Wohnungsprogramme speziell für Neuankömmlinge und bieten sowohl temporäre als auch dauerhafte Lösungen. Universitätsstädte haben Studentenwohnungsservices, die manchmal auch internationale Studierende und Austauschteilnehmer unterbringen.

Gemeindewohnungen in Wien und anderen Städten bieten erschwingliche Optionen, obwohl die Wartelisten lang sein können. Manche Plattformen spezialisieren sich auf immigrantenfreundliche Vermieter, die eher an Menschen ohne umfassende österreichische Miethistorie vermieten.`
    }
  };

  const definitions = {
    Gemeindewohnungen: {
      en: 'Municipal housing: subsidized apartments provided by city councils, especially common in Vienna.',
      de: 'Gemeindewohnungen: Geförderte Wohnungen der Stadt, besonders verbreitet in Wien.',
      terms: { en: ['municipal housing', 'social housing'], de: ['Gemeindewohnungen'] }
    },
    Genossenschaftswohnungen: {
      en: 'Cooperative housing: non-profit housing associations offering affordable rental apartments.',
      de: 'Genossenschaftswohnungen: Gemeinnützige Wohnungsgenossenschaften mit leistbaren Mietwohnungen.',
      terms: { en: ['cooperative housing'], de: ['Genossenschaftswohnungen'] }
    },
    Kaution: {
      en: 'Security deposit: usually 2-3 monthly rents, paid before moving in and returned after moving out.',
      de: 'Kaution: Meist 2-3 Monatsmieten, vor Einzug zu zahlen und nach Auszug rückzahlbar.',
      terms: { en: ['deposit'], de: ['Kaution'] }
    }
  } as const;

  const keyPoints = {
    en: [
      'Start searching early - housing markets are competitive',
      'Prepare documents: income proof, ID, references if available',
      'Consider temporary accommodation while searching for permanent housing',
      'Check specialized platforms for immigrant-friendly landlords',
      'Contact organizations that specifically help refugees and migrants'
    ],
    de: [
      'Früh mit der Suche beginnen - Wohnungsmärkte sind umkämpft',
      'Unterlagen vorbereiten: Einkommensnachweis, Ausweis, Referenzen falls vorhanden',
      'Zwischenlösungen erwägen während der Suche nach dauerhafter Wohnung',
      'Spezialisierte Plattformen für immigrantenfreundliche Vermieter prüfen',
      'Organisationen kontaktieren, die speziell Geflüchteten und Migranten helfen'
    ]
  } as const;

  const platforms = [
    {
      category: { en: 'General Housing Platforms', de: 'Allgemeine Wohnungsplattformen' },
      sites: [
        {
          name: 'willhaben.at',
          description: { en: 'Austria\'s largest classified ads platform', de: 'Österreichs größte Kleinanzeigenplattform' },
          url: 'https://www.willhaben.at/iad/immobilien/mietwohnungen'
        },
        {
          name: 'immobilienscout24.at',
          description: { en: 'Professional real estate platform', de: 'Professionelle Immobilienplattform' },
          url: 'https://www.immobilienscout24.at'
        },
        {
          name: 'derstandard.at/Immobilien',
          description: { en: 'Newspaper real estate section', de: 'Immobilienteil der Zeitung' },
          url: 'https://immobilien.derstandard.at'
        }
      ]
    },
    {
      category: { en: 'Specialized Support Organizations', de: 'Spezialisierte Hilfsorganisationen' },
      sites: [
        {
          name: 'Caritas Housing Support',
          description: { en: 'Housing assistance for refugees and migrants', de: 'Wohnungshilfe für Geflüchtete und Migranten' },
          url: 'https://www.caritas.at'
        },
        {
          name: 'Diakonie Housing Programs',
          description: { en: 'Temporary and permanent housing assistance', de: 'Temporäre und dauerhafte Wohnungsunterstützung' },
          url: 'https://diakonie.at'
        },
        {
          name: 'Integration Centers',
          description: { en: 'State integration centers with housing support', de: 'Landesintegrationszentren mit Wohnungsunterstützung' },
          url: 'https://www.integrationsfonds.at'
        }
      ]
    },
    {
      category: { en: 'Student & Youth Housing', de: 'Studenten- & Jugendwohnen' },
      sites: [
        {
          name: 'OeAD Student Housing',
          description: { en: 'Student housing for international students', de: 'Studentenwohnheime für internationale Studierende' },
          url: 'https://housing.oead.at'
        },
        {
          name: 'Wihast (Vienna)',
          description: { en: 'Student housing in Vienna', de: 'Studentenwohnheime in Wien' },
          url: 'https://www.wihast.at'
        }
      ]
    },
    {
      category: { en: 'Social & Municipal Housing', de: 'Sozial- & Gemeindewohnungen' },
      sites: [
        {
          name: 'Wien.gv.at Housing',
          description: { en: 'Municipal housing Vienna', de: 'Gemeindewohnungen Wien' },
          url: 'https://www.wien.gv.at/wohnen/gemeindebau/'
        },
        {
          name: 'Sozialbau AG',
          description: { en: 'Non-profit housing association', de: 'Gemeinnützige Wohnungsgenossenschaft' },
          url: 'https://www.sozialbau.at'
        }
      ]
    }
  ];

  const faqs = [
    {
      q: { en: 'What documents do I need to apply for housing?', de: 'Welche Unterlagen brauche ich für die Wohnungsbewerbung?' },
      a: {
        en: 'Typically: ID/passport, income proof (employment contract, bank statements), Meldezettel (registration), references from previous landlords if available, and sometimes a credit report (Bonitätsauskunft).',
        de: 'Typischerweise: Ausweis/Pass, Einkommensnachweis (Arbeitsvertrag, Kontoauszüge), Meldezettel, Referenzen von vorherigen Vermietern falls vorhanden, und manchmal eine Bonitätsauskunft.'
      }
    },
    {
      q: { en: 'How much deposit is typical?', de: 'Wie hoch ist die übliche Kaution?' },
      a: {
        en: 'Usually 2-3 monthly rents as deposit. Some landlords may accept lower amounts, especially through organizations that help refugees and migrants.',
        de: 'Normalerweise 2-3 Monatsmieten als Kaution. Manche Vermieter akzeptieren niedrigere Beträge, besonders über Organisationen, die Geflüchteten und Migranten helfen.'
      }
    },
    {
      q: { en: 'What if I don\'t have a rental history in Austria?', de: 'Was, wenn ich keine Miethistorie in Österreich habe?' },
      a: {
        en: 'Organizations like Caritas can provide guarantees or references. Some platforms specialize in immigrant-friendly landlords. Consider temporary housing initially while building local references.',
        de: 'Organisationen wie Caritas können Bürgschaften oder Referenzen bereitstellen. Manche Plattformen spezialisieren sich auf immigrantenfreundliche Vermieter. Erwägen Sie zunächst Zwischenlösungen, während Sie lokale Referenzen aufbauen.'
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

        {platforms.map((platform, categoryIdx) => (
          <View key={categoryIdx} style={styles.linksSection}>
            <Text style={styles.sectionTitle}>
              {language.code === 'de' ? platform.category.de : platform.category.en}
            </Text>
            {platform.sites.map((site, idx) => (
              <TouchableOpacity key={idx} style={styles.linkItem} onPress={() => handleLinkPress(site.url)}>
                <MaterialIcons name="home" size={20} color="#3B82F6" />
                <View style={styles.linkContent}>
                  <Text style={styles.linkTitle}>{site.name}</Text>
                  <Text style={styles.linkDescription}>
                    {language.code === 'de' ? site.description.de : site.description.en}
                  </Text>
                </View>
                <MaterialIcons name="open-in-new" size={16} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
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

export default SearchForHousingPage;