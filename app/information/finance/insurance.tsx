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

const InsurancePage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const definitions = {
    'health insurance': {
      en: 'Mandatory insurance in Austria that covers medical costs, including doctor visits, hospital stays, and medications.',
      de: 'Pflichtversicherung in Österreich, die medizinische Kosten einschließlich Arztbesuche, Krankenhausaufenthalte und Medikamente abdeckt.',
      terms: {
        en: ['medical insurance'],
        de: ['Krankenversicherung', 'Gesundheitsversicherung']
      }
    },
    'liability insurance': {
      en: 'Insurance that covers damages you accidentally cause to others or their property.',
      de: 'Versicherung, die Schäden abdeckt, die Sie versehentlich anderen oder deren Eigentum zufügen.',
      terms: {
        en: ['third-party insurance'],
        de: ['Haftpflichtversicherung', 'Privathaftpflicht']
      }
    },
    'E-card': {
      en: 'The Austrian health insurance card that gives you access to medical services.',
      de: 'Die österreichische Krankenversicherungskarte, die Ihnen Zugang zu medizinischen Dienstleistungen gewährt.',
      terms: {
        en: ['health insurance card'],
        de: ['Gesundheitskarte', 'Krankenversicherungskarte']
      }
    },
    'Sozialversicherung': {
      en: 'The Austrian social security system that includes health, pension, and unemployment insurance.',
      de: 'Das österreichische Sozialversicherungssystem, das Kranken-, Renten- und Arbeitslosenversicherung umfasst.',
      terms: {
        en: ['social security', 'social insurance'],
        de: ['Sozialversicherung']
      }
    }
  };

  const content = {
    title: {
      en: 'Finance - Insurance',
      de: 'Finanzen - Versicherung'
    },
    subtitle: {
      en: 'Understanding Austrian Insurance System',
      de: 'Das österreichische Versicherungssystem verstehen'
    },
    text: {
      en: `Insurance is crucial for financial protection in Austria. Some insurances are mandatory, while others are highly recommended for comprehensive coverage.

Mandatory Insurance:
• Health Insurance (Krankenversicherung): Required for all residents
• Social Security (Sozialversicherung): Includes pension and unemployment insurance
• Workers' Compensation: Covered through employment

Health Insurance Coverage:
Your E-card provides access to:
• General practitioners and specialists
• Hospital treatments
• Emergency services
• Basic dental care
• Prescription medications (with small co-payments)
• Maternity care

What Health Insurance Doesn't Cover:
• Private hospital rooms
• Cosmetic treatments
• Some dental procedures
• Alternative medicine (usually)
• Glasses and contact lenses (partial coverage only)

Highly Recommended Insurance:
• Liability Insurance (Haftpflichtversicherung): €50-100/year
  Covers accidental damage to others' property
• Household Contents Insurance: €100-300/year
  Covers theft, fire, and water damage to your belongings
• Legal Protection Insurance: €200-400/year
  Covers legal costs for disputes

Additional Insurance Options:
• Life Insurance
• Disability Insurance
• Travel Insurance
• Car Insurance (mandatory if you own a car)

Children and Family:
• Children are automatically covered under parents' health insurance
• Family insurance rates may apply
• Childcare benefits (Kinderbetreuungsgeld) are available

Cost Information:
• Health insurance: Approximately 7.65% of gross salary (shared with employer)
• Additional insurances vary widely based on coverage and provider
• Compare providers annually for best rates`,
      de: `Versicherung ist für den finanziellen Schutz in Österreich von entscheidender Bedeutung. Einige Versicherungen sind obligatorisch, während andere für umfassenden Schutz sehr empfohlen werden.

Pflichtversicherungen:
• Krankenversicherung: Erforderlich für alle Einwohner
• Sozialversicherung: Umfasst Renten- und Arbeitslosenversicherung
• Unfallversicherung: Über die Beschäftigung abgedeckt

Krankenversicherungsleistungen:
Ihre E-card bietet Zugang zu:
• Allgemeinärzten und Fachärzten
• Krankenhausbehandlungen
• Notfalldiensten
• Grundlegende Zahnpflege
• Verschreibungspflichtige Medikamente (mit kleinen Zuzahlungen)
• Schwangerschaftsbetreuung

Was die Krankenversicherung nicht abdeckt:
• Private Krankenzimmer
• Kosmetische Behandlungen
• Einige zahnärztliche Eingriffe
• Alternative Medizin (normalerweise)
• Brillen und Kontaktlinsen (nur teilweise Abdeckung)

Sehr empfohlene Versicherungen:
• Haftpflichtversicherung: €50-100/Jahr
  Deckt versehentliche Schäden an fremdem Eigentum ab
• Haushaltsversicherung: €100-300/Jahr
  Deckt Diebstahl, Feuer und Wasserschäden an Ihrem Eigentum ab
• Rechtsschutzversicherung: €200-400/Jahr
  Deckt Rechtskosten für Streitigkeiten ab

Zusätzliche Versicherungsoptionen:
• Lebensversicherung
• Berufsunfähigkeitsversicherung
• Reiseversicherung
• Autoversicherung (obligatorisch bei Autobesitz)

Kinder und Familie:
• Kinder sind automatisch in der Krankenversicherung der Eltern mitversichert
• Familienversicherungstarife können gelten
• Kinderbetreuungsgeld ist verfügbar

Kosteninformationen:
• Krankenversicherung: Etwa 7,65% des Bruttogehalts (geteilt mit Arbeitgeber)
• Zusätzliche Versicherungen variieren stark je nach Abdeckung und Anbieter
• Anbieter jährlich vergleichen für beste Tarife`
    },
    links: [
      {
        title: { en: 'Austrian Health Insurance', de: 'Österreichische Gesundheitskasse' },
        url: 'https://www.gesundheitskasse.at'
      },
      {
        title: { en: 'Insurance Comparison Austria', de: 'Versicherungsvergleich Österreich' },
        url: 'https://www.durchblicker.at'
      },
      {
        title: { en: 'Social Security Information', de: 'Sozialversicherung Information' },
        url: 'https://www.sozialversicherung.at'
      },
      {
        title: { en: 'Consumer Insurance Guide', de: 'Konsumenten Versicherungsratgeber' },
        url: 'https://www.arbeiterkammer.at'
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
          {language.code === 'de' ? content.text.de : content.text.en}
        </HighlightedText>
        
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
  linksSection: {
    marginTop: 32,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
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

export default InsurancePage;