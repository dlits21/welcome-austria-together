import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';
import HighlightedText from '../../../components/HighlightedText';

const FinancialSupportPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const definitions = {
    'Mindestsicherung': {
      en: 'Basic guaranteed minimum income support provided by Austrian states for those in financial need.',
      de: 'Grundlegende garantierte Mindesteinkommensunterstützung, die von österreichischen Bundesländern für Bedürftige bereitgestellt wird.',
      terms: {
        en: ['basic income support', 'minimum income'],
        de: ['Bedarfsorientierte Mindestsicherung', 'BMS']
      }
    },
    'Familienbeihilfe': {
      en: 'Family allowance paid by the Austrian government to support families with children.',
      de: 'Familienbeihilfe, die von der österreichischen Regierung zur Unterstützung von Familien mit Kindern gezahlt wird.',
      terms: {
        en: ['family allowance', 'child benefit'],
        de: ['Kinderbeihilfe']
      }
    },
    'Arbeitslosengeld': {
      en: 'Unemployment benefit paid by the Austrian Employment Service (AMS) to eligible unemployed individuals.',
      de: 'Arbeitslosengeld, das vom Arbeitsmarktservice (AMS) an berechtigte Arbeitslose gezahlt wird.',
      terms: {
        en: ['unemployment benefit', 'unemployment insurance'],
        de: ['AMS-Unterstützung']
      }
    },
    'Wohnbeihilfe': {
      en: 'Housing assistance provided by Austrian states to help with rent and housing costs.',
      de: 'Wohnbeihilfe, die von österreichischen Bundesländern zur Unterstützung bei Miete und Wohnkosten bereitgestellt wird.',
      terms: {
        en: ['housing allowance', 'rent assistance'],
        de: ['Mietzuschuss']
      }
    }
  };

  const content = {
    title: {
      en: 'Financial Support Programs',
      de: 'Finanzielle Unterstützungsprogramme'
    },
    subtitle: {
      en: 'Available Financial Assistance in Austria',
      de: 'Verfügbare finanzielle Hilfe in Österreich'
    },
    text: {
      en: `Austria offers various financial support programs to help residents meet their basic needs and support their families. Understanding these programs and how to apply for them is crucial for financial stability.

**Basic Income Support (Mindestsicherung):**
The Bedarfsorientierte Mindestsicherung provides basic income for those who cannot meet their essential living costs. Each Austrian state has its own implementation with slightly different rules and amounts.

**Family Support:**
• Familienbeihilfe (Family Allowance): Monthly payments for children up to age 24 (if in education)
• Kinderbetreuungsgeld: Childcare allowance for parents
• Multiple child bonus: Additional support for families with multiple children
• School transport and meal subsidies

**Unemployment Support:**
• Arbeitslosengeld: Unemployment benefit (55% of previous net income)
• Notstandshilfe: Emergency assistance after unemployment benefit expires
• AMS training and job search support programs

**Housing Support:**
• Wohnbeihilfe: State-provided housing allowance to reduce rent burden
• Social housing access: Subsidized rental apartments
• Energy cost assistance: Help with heating and utility bills

**Healthcare Support:**
• E-Card coverage for basic medical needs
• Prescription medication subsidies
• Dental care assistance programs

**Education Support:**
• Student grants (Studienbeihilfe)
• School books and supplies assistance
• Free or reduced-cost school meals
• Transportation support for students

**Emergency Financial Aid:**
• Food banks and charitable organizations
• Emergency housing assistance
• Utility payment support
• Debt counseling services`,
      de: `Österreich bietet verschiedene finanzielle Unterstützungsprogramme, um Einwohnern zu helfen, ihre Grundbedürfnisse zu erfüllen und ihre Familien zu unterstützen. Das Verständnis dieser Programme und wie man sich dafür bewirbt, ist für finanzielle Stabilität von entscheidender Bedeutung.

**Grundeinkommen (Mindestsicherung):**
Die Bedarfsorientierte Mindestsicherung bietet Grundeinkommen für diejenigen, die ihre wesentlichen Lebenshaltungskosten nicht decken können. Jedes österreichische Bundesland hat seine eigene Umsetzung mit leicht unterschiedlichen Regeln und Beträgen.

**Familienunterstützung:**
• Familienbeihilfe: Monatliche Zahlungen für Kinder bis 24 Jahre (wenn in Ausbildung)
• Kinderbetreuungsgeld: Kinderbetreuungsbeihilfe für Eltern
• Mehrkindzuschlag: Zusätzliche Unterstützung für Familien mit mehreren Kindern
• Schultransport und Essenssubventionen

**Arbeitslosenunterstützung:**
• Arbeitslosengeld: Arbeitslosenunterstützung (55% des vorherigen Nettoeinkommens)
• Notstandshilfe: Nothilfe nach Ablauf des Arbeitslosengeldes
• AMS-Schulungs- und Jobsuchprogramme

**Wohnungsunterstützung:**
• Wohnbeihilfe: Staatlich bereitgestellte Wohnbeihilfe zur Reduzierung der Mietbelastung
• Zugang zu Sozialwohnungen: Subventionierte Mietwohnungen
• Energiekostenhilfe: Hilfe bei Heiz- und Nebenkosten

**Gesundheitsunterstützung:**
• E-Card-Abdeckung für grundlegende medizinische Bedürfnisse
• Verschreibungspflichtige Medikamentensubventionen
• Zahnpflegehilfsprogramme

**Bildungsunterstützung:**
• Studienbeihilfe
• Schulbuch- und Materialhilfe
• Kostenloses oder reduziertes Schulessen
• Transportunterstützung für Schüler

**Finanzielle Nothilfe:**
• Lebensmittelbanken und Wohltätigkeitsorganisationen
• Notunterkunftshilfe
• Unterstützung bei Nebenkosten
• Schuldnerberatung`
    },
    supportTypes: [
      {
        name: { en: 'Basic Income Support', de: 'Mindestsicherung' },
        description: { 
          en: 'Monthly basic income for essential living costs',
          de: 'Monatliches Grundeinkommen für wesentliche Lebenshaltungskosten'
        },
        contact: { en: 'Contact your local social services office', de: 'Kontaktieren Sie Ihr örtliches Sozialamt' },
        website: 'https://www.sozialministerium.at'
      },
      {
        name: { en: 'Family Allowance', de: 'Familienbeihilfe' },
        description: { 
          en: 'Monthly support for families with children',
          de: 'Monatliche Unterstützung für Familien mit Kindern'
        },
        contact: { en: 'Apply at local tax office (Finanzamt)', de: 'Beantragen beim örtlichen Finanzamt' },
        website: 'https://www.bmf.gv.at'
      },
      {
        name: { en: 'Unemployment Benefit', de: 'Arbeitslosengeld' },
        description: { 
          en: 'Financial support during unemployment',
          de: 'Finanzielle Unterstützung während der Arbeitslosigkeit'
        },
        contact: { en: 'Register at AMS (Employment Service)', de: 'Anmeldung beim AMS (Arbeitsmarktservice)' },
        website: 'https://www.ams.at'
      },
      {
        name: { en: 'Housing Allowance', de: 'Wohnbeihilfe' },
        description: { 
          en: 'State assistance with housing costs',
          de: 'Staatliche Hilfe bei Wohnkosten'
        },
        contact: { en: 'Apply at state housing department', de: 'Beantragen bei der Landeswohnungsabteilung' },
        website: 'https://www.help.gv.at'
      }
    ],
    links: [
      {
        title: { en: 'Social Ministry Austria', de: 'Sozialministerium Österreich' },
        url: 'https://www.sozialministerium.at'
      },
      {
        title: { en: 'AMS - Employment Service', de: 'AMS - Arbeitsmarktservice' },
        url: 'https://www.ams.at'
      },
      {
        title: { en: 'Help.gv.at - Official Guide', de: 'Help.gv.at - Offizieller Leitfaden' },
        url: 'https://www.help.gv.at'
      },
      {
        title: { en: 'Caritas Austria', de: 'Caritas Österreich' },
        url: 'https://www.caritas.at'
      }
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          {language.code === 'de' ? content.title.de : content.title.en}
        </Text>
        
        <Text style={styles.subtitle}>
          {language.code === 'de' ? content.subtitle.de : content.subtitle.en}
        </Text>
        
        <HighlightedText 
          definitions={definitions}
          language={language.code}
        >
          <Text style={styles.text}>
            {language.code === 'de' ? content.text.de : content.text.en}
          </Text>
        </HighlightedText>
        
        <View style={styles.supportSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Unterstützungsarten' : 'Types of Support'}
          </Text>
          
          {content.supportTypes.map((support, index) => (
            <View key={index} style={styles.supportCard}>
              <Text style={styles.supportName}>
                {language.code === 'de' ? support.name.de : support.name.en}
              </Text>
              <Text style={styles.supportDescription}>
                {language.code === 'de' ? support.description.de : support.description.en}
              </Text>
              <Text style={styles.supportContact}>
                {language.code === 'de' ? support.contact.de : support.contact.en}
              </Text>
              <TouchableOpacity 
                style={styles.websiteButton}
                onPress={() => handleLinkPress(support.website)}
              >
                <MaterialIcons name="link" size={16} color="#3B82F6" />
                <Text style={styles.websiteText}>
                  {language.code === 'de' ? 'Weitere Informationen' : 'More Information'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        <View style={styles.linksSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Nützliche Links' : 'Useful Links'}
          </Text>
          
          {content.links.map((link, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.linkItem}
              onPress={() => handleLinkPress(link.url)}
            >
              <MaterialIcons name="link" size={20} color="#3B82F6" />
              <Text style={styles.linkText}>
                {language.code === 'de' ? link.title.de : link.title.en}
              </Text>
              <MaterialIcons name="open-in-new" size={16} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <LanguageModal 
        visible={showLanguageModal} 
        onClose={() => setShowLanguageModal(false)} 
        languageCode={language.code}
      />
      
      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
        languageCode={language.code}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={language.code}
        tutorialData="finance"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 32,
  },
  supportSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  supportCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  supportName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  supportDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  supportContact: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 12,
    fontWeight: '500',
  },
  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  websiteText: {
    fontSize: 14,
    color: '#3B82F6',
    marginLeft: 4,
    fontWeight: '500',
  },
  linksSection: {
    marginBottom: 32,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    color: '#3B82F6',
    marginLeft: 12,
    fontWeight: '500',
  },
});

export default FinancialSupportPage;