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

const GeneralInformationPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const definitions = {
    'Euro': {
      en: 'The official currency of Austria and most European Union countries, divided into 100 cents.',
      de: 'Die offizielle Währung Österreichs und der meisten Länder der Europäischen Union, unterteilt in 100 Cent.',
      terms: {
        en: ['EUR', '€'],
        de: ['EUR', '€', 'Euro']
      }
    },
    'credit card': {
      en: 'A payment card that allows you to borrow money from a bank to make purchases, which must be repaid later.',
      de: 'Eine Zahlungskarte, mit der Sie Geld von einer Bank leihen können, um Einkäufe zu tätigen, das später zurückgezahlt werden muss.',
      terms: {
        en: ['credit cards'],
        de: ['Kreditkarte', 'Kreditkarten']
      }
    },
    'debit card': {
      en: 'A payment card linked directly to your bank account, using your own money for transactions.',
      de: 'Eine Zahlungskarte, die direkt mit Ihrem Bankkonto verbunden ist und Ihr eigenes Geld für Transaktionen verwendet.',
      terms: {
        en: ['debit cards', 'EC card'],
        de: ['Bankomatkarte', 'EC-Karte', 'Debitkarte']
      }
    },
    'IBAN': {
      en: 'International Bank Account Number - a standardized international numbering system for bank accounts.',
      de: 'Internationale Bankkontonummer - ein standardisiertes internationales Nummerierungssystem für Bankkonten.',
      terms: {
        en: ['bank account number'],
        de: ['Kontonummer', 'Bankkontonummer']
      }
    }
  };

  const content = {
    title: {
      en: 'Finance - General Information',
      de: 'Finanzen - Allgemeine Informationen'
    },
    subtitle: {
      en: 'Understanding Austrian Financial Basics',
      de: 'Verstehen der österreichischen Finanzgrundlagen'
    },
    text: {
      en: `Understanding the financial system in Austria is essential for managing your daily life and planning your future. This guide covers the fundamental aspects of money and banking in Austria.

Currency and Cash:
Austria uses the Euro (€) as its official currency. Coins come in denominations of 1, 2, 5, 10, 20, and 50 cents, plus 1 and 2 Euro coins. Banknotes are available in 5, 10, 20, 50, 100, 200, and 500 Euro denominations.

Payment Methods:
• Cash is still widely used, especially for small purchases
• Debit cards (Bankomatkarte) are accepted almost everywhere
• Credit cards are less common but increasingly accepted
• Contactless payments are becoming standard
• Mobile payment apps are growing in popularity

Banking Basics:
Every Austrian bank account has an IBAN (International Bank Account Number) for transfers. Austrian IBANs start with "AT" followed by numbers. You'll need your IBAN for salary payments, rent, and other regular transactions.

Common Financial Terms:
• Girokonto: Current/checking account
• Sparbuch: Savings account  
• Überweisung: Bank transfer
• Lastschrift: Direct debit
• Kontostand: Account balance

Important Notes:
• Banks typically charge monthly account fees
• ATM withdrawals from your own bank are usually free
• Cross-border EU transfers are treated like domestic transfers
• Most bills can be paid via bank transfer or direct debit`,
      de: `Das Verständnis des Finanzsystems in Österreich ist für die Bewältigung Ihres täglichen Lebens und die Planung Ihrer Zukunft unerlässlich. Dieser Leitfaden behandelt die grundlegenden Aspekte von Geld und Banking in Österreich.

Währung und Bargeld:
Österreich verwendet den Euro (€) als offizielle Währung. Münzen gibt es in Stückelungen von 1, 2, 5, 10, 20 und 50 Cent sowie 1 und 2 Euro-Münzen. Banknoten sind in 5, 10, 20, 50, 100, 200 und 500 Euro-Denominationen verfügbar.

Zahlungsmethoden:
• Bargeld wird noch weit verbreitet verwendet, insbesondere für kleine Einkäufe
• Bankomatkarten werden fast überall akzeptiert
• Kreditkarten sind weniger verbreitet, werden aber zunehmend akzeptiert
• Kontaktlose Zahlungen werden zum Standard
• Mobile Payment-Apps werden immer beliebter

Banking-Grundlagen:
Jedes österreichische Bankkonto hat eine IBAN (Internationale Bankkontonummer) für Überweisungen. Österreichische IBANs beginnen mit "AT" gefolgt von Zahlen. Sie benötigen Ihre IBAN für Gehaltszahlungen, Miete und andere regelmäßige Transaktionen.

Häufige Finanzbegriffe:
• Girokonto: Laufendes Konto
• Sparbuch: Sparkonto
• Überweisung: Banküberweisung
• Lastschrift: Bankeinzug
• Kontostand: Kontostand

Wichtige Hinweise:
• Banken erheben normalerweise monatliche Kontoführungsgebühren
• Bargeldabhebungen von der eigenen Bank sind meist kostenlos
• Grenzüberschreitende EU-Überweisungen werden wie inländische behandelt
• Die meisten Rechnungen können per Überweisung oder Lastschrift bezahlt werden`
    },
    links: [
      {
        title: { en: 'Austrian National Bank', de: 'Österreichische Nationalbank' },
        url: 'https://www.oenb.at'
      },
      {
        title: { en: 'Consumer Protection Banking', de: 'Konsumentenschutz Banking' },
        url: 'https://www.konsument.at'
      },
      {
        title: { en: 'EU Banking Information', de: 'EU Banking Informationen' },
        url: 'https://europa.eu/youreurope/citizens/consumers/financial-products-and-services/'
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
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 32,
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

export default GeneralInformationPage;