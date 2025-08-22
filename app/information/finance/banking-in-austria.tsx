import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';
import HighlightedText from '../../../components/HighlightedText';

const BankingInAustriaPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const definitions = {
    'Meldezettel': {
      en: 'Official residence registration document required for opening a bank account in Austria.',
      de: 'Offizielles Anmeldedokument, das für die Eröffnung eines Bankkontos in Österreich erforderlich ist.',
      terms: {
        en: ['residence registration', 'registration certificate'],
        de: ['Anmeldebescheinigung']
      }
    },
    'Reisepass': {
      en: 'Passport - official travel document required as identity verification for banking.',
      de: 'Reisepass - offizielles Reisedokument, das als Identitätsnachweis für das Banking erforderlich ist.',
      terms: {
        en: ['passport'],
        de: ['Pass']
      }
    },
    'Personalausweis': {
      en: 'Identity card - official government-issued identification document.',
      de: 'Personalausweis - offizielles von der Regierung ausgestelltes Identitätsdokument.',
      terms: {
        en: ['ID card', 'national ID'],
        de: ['Ausweis']
      }
    },
    'Einkommensnachweis': {
      en: 'Proof of income - documentation showing your salary or financial means.',
      de: 'Einkommensnachweis - Dokumente, die Ihr Gehalt oder Ihre finanziellen Mittel belegen.',
      terms: {
        en: ['income proof', 'salary proof'],
        de: ['Gehaltsnachweis', 'Lohnzettel']
      }
    }
  };

  const content = {
    title: {
      en: 'Banking in Austria',
      de: 'Banking in Österreich'
    },
    subtitle: {
      en: 'Guide to Austrian Banks and Account Opening',
      de: 'Leitfaden zu österreichischen Banken und Kontoeröffnung'
    },
    text: {
      en: `Opening a bank account is one of the first essential steps when moving to Austria. Understanding the banking system, required documents, and different types of accounts will help you get started with your financial life in Austria.

**Required Documents for Account Opening:**
• Valid passport or EU identity card (Reisepass/Personalausweis)
• Meldezettel (residence registration certificate)
• Proof of income (Einkommensnachweis) - employment contract or salary slips
• Student confirmation if applicable
• Some banks may require minimum deposit (€25-100)

**Account Opening Process:**
1. Choose a bank and visit a local branch
2. Schedule an appointment (recommended)
3. Bring all required documents
4. Fill out application forms
5. Make initial deposit
6. Receive your debit card and PIN by mail (5-10 days)
7. Set up online banking

**Types of Bank Accounts:**
• Girokonto (Current Account): For daily transactions and salary
• Sparkonto (Savings Account): For saving money with interest
• Jugendkonto (Youth Account): For people under 27, often with reduced fees
• Studentenkonto (Student Account): Special accounts for students
• Geschäftskonto (Business Account): For self-employed and businesses

**Account Fees and Costs:**
Most Austrian banks charge monthly account maintenance fees ranging from €2-15. Students and young people often get reduced rates or fee-free accounts. Compare different banks for the best conditions.

**Getting Credit and Debit Cards:**
Debit cards (Bankomatkarte) are included with most accounts and work throughout Europe. Credit cards are available but require separate application and credit check. Many stores prefer debit cards over credit cards.`,
      de: `Die Eröffnung eines Bankkontos ist einer der ersten wesentlichen Schritte beim Umzug nach Österreich. Das Verständnis des Bankensystems, der erforderlichen Dokumente und verschiedener Kontotypen hilft Ihnen, mit Ihrem Finanzleben in Österreich zu beginnen.

**Erforderliche Dokumente für Kontoeröffnung:**
• Gültiger Reisepass oder EU-Personalausweis
• Meldezettel (Anmeldebescheinigung)
• Einkommensnachweis - Arbeitsvertrag oder Lohnzettel
• Studienbestätigung falls zutreffend
• Einige Banken können eine Mindesteinzahlung erfordern (€25-100)

**Kontoeröffnungsprozess:**
1. Bank auswählen und Filiale besuchen
2. Termin vereinbaren (empfohlen)
3. Alle erforderlichen Dokumente mitbringen
4. Antragsformulare ausfüllen
5. Ersteinzahlung vornehmen
6. Bankomatkarte und PIN per Post erhalten (5-10 Tage)
7. Online-Banking einrichten

**Arten von Bankkonten:**
• Girokonto: Für tägliche Transaktionen und Gehalt
• Sparkonto: Zum Sparen mit Zinsen
• Jugendkonto: Für Personen unter 27, oft mit reduzierten Gebühren
• Studentenkonto: Spezielle Konten für Studenten
• Geschäftskonto: Für Selbstständige und Unternehmen

**Kontogebühren und Kosten:**
Die meisten österreichischen Banken erheben monatliche Kontoführungsgebühren von €2-15. Studenten und junge Menschen erhalten oft reduzierte Tarife oder gebührenfreie Konten. Vergleichen Sie verschiedene Banken für die besten Konditionen.

**Kredit- und Bankomatkarten erhalten:**
Bankomatkarten sind bei den meisten Konten inbegriffen und funktionieren in ganz Europa. Kreditkarten sind verfügbar, erfordern aber separate Beantragung und Bonitätsprüfung. Viele Geschäfte bevorzugen Bankomatkarten gegenüber Kreditkarten.`
    },
    banks: [
      {
        name: 'Erste Bank',
        description: { 
          en: 'Large Austrian bank with extensive branch network and digital services',
          de: 'Große österreichische Bank mit umfangreichem Filialnetz und digitalen Services'
        },
        features: { 
          en: 'Student accounts, English support, online banking',
          de: 'Studentenkonten, englischer Support, Online-Banking'
        },
        website: 'https://www.erstebank.at'
      },
      {
        name: 'Bank Austria',
        description: { 
          en: 'Major Austrian bank, part of UniCredit Group, international services',
          de: 'Große österreichische Bank, Teil der UniCredit Group, internationale Services'
        },
        features: { 
          en: 'International transfers, premium services, mobile app',
          de: 'Internationale Überweisungen, Premium-Services, Mobile App'
        },
        website: 'https://www.bankaustria.at'
      },
      {
        name: 'Raiffeisen Bank',
        description: { 
          en: 'Austria\'s largest banking group with cooperative structure',
          de: 'Österreichs größte Bankengruppe mit genossenschaftlicher Struktur'
        },
        features: { 
          en: 'Local focus, agricultural banking, regional branches',
          de: 'Lokaler Fokus, Agrarbanking, regionale Filialen'
        },
        website: 'https://www.raiffeisen.at'
      },
      {
        name: 'BAWAG P.S.K.',
        description: { 
          en: 'Austrian bank known for competitive rates and digital banking',
          de: 'Österreichische Bank bekannt für wettbewerbsfähige Zinsen und Digital Banking'
        },
        features: { 
          en: 'Competitive fees, modern online platform, quick account opening',
          de: 'Wettbewerbsfähige Gebühren, moderne Online-Plattform, schnelle Kontoeröffnung'
        },
        website: 'https://www.bawagpsk.com'
      },
      {
        name: 'Sparkasse',
        description: { 
          en: 'Regional savings banks with local presence across Austria',
          de: 'Regionale Sparkassen mit lokaler Präsenz in ganz Österreich'
        },
        features: { 
          en: 'Local service, savings focus, traditional banking',
          de: 'Lokaler Service, Spar-Fokus, traditionelles Banking'
        },
        website: 'https://www.sparkasse.at'
      },
      {
        name: 'N26',
        description: { 
          en: 'Digital-only bank with mobile-first approach, no physical branches',
          de: 'Reine Digital-Bank mit Mobile-First-Ansatz, keine Filialen'
        },
        features: { 
          en: 'No fees, instant notifications, English interface',
          de: 'Keine Gebühren, sofortige Benachrichtigungen, englische Oberfläche'
        },
        website: 'https://www.n26.com'
      }
    ],
    links: [
      {
        title: { en: 'Austrian National Bank', de: 'Österreichische Nationalbank' },
        url: 'https://www.oenb.at'
      },
      {
        title: { en: 'Bank Comparison Austria', de: 'Bankvergleich Österreich' },
        url: 'https://www.durchblicker.at'
      },
      {
        title: { en: 'Consumer Banking Guide', de: 'Konsumenten Banking Guide' },
        url: 'https://www.konsument.at'
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
        
        <View style={styles.banksSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Hauptbanken in Österreich' : 'Major Banks in Austria'}
          </Text>
          
          {content.banks.map((bank, index) => (
            <View key={index} style={styles.bankCard}>
              <Text style={styles.bankName}>{bank.name}</Text>
              <Text style={styles.bankDescription}>
                {language.code === 'de' ? bank.description.de : bank.description.en}
              </Text>
              <Text style={styles.bankFeatures}>
                {language.code === 'de' ? bank.features.de : bank.features.en}
              </Text>
              <TouchableOpacity 
                style={styles.websiteButton}
                onPress={() => handleLinkPress(bank.website)}
              >
                <MaterialIcons name="link" size={16} color="#3B82F6" />
                <Text style={styles.websiteText}>
                  {language.code === 'de' ? 'Website besuchen' : 'Visit Website'}
                </Text>
                <MaterialIcons name="open-in-new" size={14} color="#3B82F6" />
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
  banksSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  bankCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  bankName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  bankDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  bankFeatures: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  websiteText: {
    fontSize: 14,
    color: '#3B82F6',
    marginLeft: 4,
    marginRight: 4,
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

export default BankingInAustriaPage;