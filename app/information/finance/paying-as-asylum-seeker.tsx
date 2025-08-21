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

const PayingAsAsylumSeekerPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const definitions = {
    'payment card': {
      en: 'A prepaid card system used to provide monthly allowances to asylum seekers instead of cash payments.',
      de: 'Ein Prepaid-Kartensystem zur Bereitstellung monatlicher Beihilfen für Asylwerber anstelle von Bargeld.',
      terms: {
        en: ['prepaid card', 'allowance card'],
        de: ['Bezahlkarte', 'Leistungskarte', 'Prepaid-Karte']
      }
    },
    'basic care': {
      en: 'Support system providing accommodation, food, healthcare, and monthly allowance for asylum seekers.',
      de: 'Unterstützungssystem, das Unterkunft, Verpflegung, Gesundheitsversorgung und monatliche Beihilfe für Asylwerber bietet.',
      terms: {
        en: ['basic assistance', 'basic provision'],
        de: ['Grundversorgung', 'Basisversorgung']
      }
    },
    'work permit': {
      en: 'Official authorization allowing asylum seekers to work legally in Austria under specific conditions.',
      de: 'Offizielle Genehmigung, die es Asylwerbern ermöglicht, unter bestimmten Bedingungen legal in Österreich zu arbeiten.',
      terms: {
        en: ['employment permit'],
        de: ['Arbeitserlaubnis', 'Beschäftigungsbewilligung']
      }
    },
    'Asylwerber': {
      en: 'Person who has applied for asylum in Austria and is waiting for a decision on their application.',
      de: 'Person, die in Österreich um Asyl angesucht hat und auf eine Entscheidung über ihren Antrag wartet.',
      terms: {
        en: ['asylum seeker', 'asylum applicant'],
        de: ['Asylwerber', 'Asylsuchender']
      }
    }
  };

  const content = {
    title: {
      en: 'Finance - Paying as an Asylum Seeker',
      de: 'Finanzen - Bezahlung als Asylwerber'
    },
    subtitle: {
      en: 'Payment System and Allowances for Asylum Seekers',
      de: 'Zahlungssystem und Beihilfen für Asylwerber'
    },
    text: {
      en: `Austria uses a payment card system to provide financial support to asylum seekers. This system ensures basic needs are met while providing structure and support during the asylum process.

Payment Card System:
Since recent policy changes, many Austrian states use prepaid payment cards instead of cash for asylum seeker allowances. These cards are loaded monthly with your basic care allowance.

Monthly Allowances by State (approximate):
• Vienna: €40-50 per person (plus accommodation and meals)
• Lower Austria: €40-50 per person
• Upper Austria: €40-50 per person  
• Styria: €40-50 per person
• Salzburg: €40-50 per person
• Tyrol: €40-50 per person
• Carinthia: €40-50 per person
• Vorarlberg: €40-50 per person
• Burgenland: €40-50 per person

Note: Amounts may vary based on accommodation type and individual circumstances.

Where You Can Use Payment Cards:
• Grocery stores and supermarkets
• Pharmacies for medications
• Public transportation
• Essential goods and services
• Some clothing stores
• Basic personal care items

What You Cannot Buy:
• Alcohol and tobacco products
• Cash withdrawals (limited or not allowed)
• Online purchases (restrictions may apply)
• Luxury items
• Services not related to basic needs

Additional Income - Work Opportunities:
Asylum seekers may work under specific conditions:
• After 3 months of residence
• With valid work permit from the employment service
• Seasonal work (agriculture, tourism) often available
• Self-employment generally not permitted
• Earnings may affect basic care allowance

Work Restrictions:
• Must register any employment
• Limited to certain job sectors initially
• Maximum working hours may apply
• Income reporting required

Basic Care Coverage Includes:
• Accommodation (shared or individual)
• Basic meals or cooking facilities
• Healthcare and medical treatment
• German language courses
• Legal support and counseling
• School access for children

Financial Planning Tips:
• Budget your monthly allowance carefully
• Keep track of card balance
• Report lost or damaged cards immediately
• Understand what purchases are allowed
• Save receipts for important purchases
• Ask case workers about additional support programs

Emergency Financial Support:
Contact your assigned case worker or local authorities if you face financial emergencies or urgent needs not covered by the basic care system.`,
      de: `Österreich verwendet ein Bezahlkartensystem zur finanziellen Unterstützung von Asylwerbern. Dieses System stellt sicher, dass Grundbedürfnisse erfüllt werden und bietet Struktur und Unterstützung während des Asylverfahrens.

Bezahlkartensystem:
Seit den jüngsten politischen Änderungen verwenden viele österreichische Bundesländer Prepaid-Bezahlkarten anstelle von Bargeld für Asylwerber-Beihilfen. Diese Karten werden monatlich mit Ihrer Grundversorgungsbeihilfe aufgeladen.

Monatliche Beihilfen nach Bundesland (ungefähr):
• Wien: €40-50 pro Person (plus Unterkunft und Verpflegung)
• Niederösterreich: €40-50 pro Person
• Oberösterreich: €40-50 pro Person
• Steiermark: €40-50 pro Person
• Salzburg: €40-50 pro Person
• Tirol: €40-50 pro Person
• Kärnten: €40-50 pro Person
• Vorarlberg: €40-50 pro Person
• Burgenland: €40-50 pro Person

Hinweis: Beträge können je nach Unterkunftsart und individuellen Umständen variieren.

Wo Sie Bezahlkarten verwenden können:
• Lebensmittelgeschäfte und Supermärkte
• Apotheken für Medikamente
• Öffentliche Verkehrsmittel
• Grundlegende Waren und Dienstleistungen
• Einige Bekleidungsgeschäfte
• Grundlegende Körperpflegeartikel

Was Sie nicht kaufen können:
• Alkohol und Tabakprodukte
• Bargeldabhebungen (begrenzt oder nicht erlaubt)
• Online-Käufe (Einschränkungen können gelten)
• Luxusartikel
• Dienstleistungen, die nicht mit Grundbedürfnissen zusammenhängen

Zusätzliches Einkommen - Arbeitsmöglichkeiten:
Asylwerber können unter bestimmten Bedingungen arbeiten:
• Nach 3 Monaten Aufenthalt
• Mit gültiger Arbeitserlaubnis vom Arbeitsmarktservice
• Saisonarbeit (Landwirtschaft, Tourismus) oft verfügbar
• Selbstständigkeit generell nicht erlaubt
• Einkommen kann Grundversorgungsbeihilfe beeinflussen

Arbeitseinschränkungen:
• Jede Beschäftigung muss angemeldet werden
• Zunächst begrenzt auf bestimmte Arbeitssektoren
• Maximale Arbeitsstunden können gelten
• Einkommensmeldung erforderlich

Grundversorgung umfasst:
• Unterkunft (geteilt oder individuell)
• Grundverpflegung oder Kochmöglichkeiten
• Gesundheitsversorgung und medizinische Behandlung
• Deutschkurse
• Rechtsberatung und Betreuung
• Schulzugang für Kinder

Tipps zur Finanzplanung:
• Planen Sie Ihre monatliche Beihilfe sorgfältig
• Behalten Sie den Kartensaldo im Auge
• Melden Sie verlorene oder beschädigte Karten sofort
• Verstehen Sie, welche Käufe erlaubt sind
• Bewahren Sie Belege für wichtige Käufe auf
• Fragen Sie Betreuer nach zusätzlichen Unterstützungsprogrammen

Finanzielle Nothilfe:
Kontaktieren Sie Ihren zugewiesenen Betreuer oder örtliche Behörden, wenn Sie finanzielle Notfälle oder dringende Bedürfnisse haben, die nicht vom Grundversorgungssystem abgedeckt werden.`
    },
    links: [
      {
        title: { en: 'Basic Care Information', de: 'Grundversorgung Information' },
        url: 'https://www.bmi.gv.at/312/start.aspx'
      },
      {
        title: { en: 'Work for Asylum Seekers', de: 'Arbeit für Asylwerber' },
        url: 'https://www.ams.at'
      },
      {
        title: { en: 'Legal Aid for Asylum Seekers', de: 'Rechtshilfe für Asylwerber' },
        url: 'https://www.rechtsberatung.at'
      },
      {
        title: { en: 'Integration Austria', de: 'Integration Österreich' },
        url: 'https://www.integrationsfonds.at'
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

export default PayingAsAsylumSeekerPage;