import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const CybersecurityPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const content = {
    title: {
      en: 'Cybersecurity & Online Safety',
      de: 'Cybersicherheit & Online-Sicherheit'
    },
    subtitle: {
      en: 'Protecting yourself in the digital world',
      de: 'Schutz im digitalen Zeitalter'
    },
    text: {
      en: `Cybersecurity and privacy are deeply interconnected - protecting your personal information also protects you from cyber threats. In today's digital world, everyone needs basic cybersecurity knowledge to stay safe online.

**Privacy and Security Connection:**
Your personal information is valuable to cybercriminals. Data breaches, identity theft, and online scams all target your private information. Protecting your privacy is the first line of defense against cyber attacks.

**Essential Online Safety Tools:**
• **Adblocker (uBlock Origin):** Blocks malicious ads and tracking scripts that can contain malware
• **Tor Browser:** Provides anonymous browsing and protects against tracking
• **VPN Services:** Encrypts your internet connection and hides your location
• **Secure Messaging (Signal):** End-to-end encrypted communication that can't be intercepted
• **Password Manager:** Creates and stores strong, unique passwords for all accounts

**Common Online Scams to Avoid:**
• **Housing Scams:** Never transfer money for apartments you haven't seen in person
• **Phishing Emails:** Don't click links from unknown senders or suspicious messages
• **Fake Government Websites:** Always verify official websites before entering personal information
• **Romance Scams:** Be wary of people asking for money or personal information online
• **Tech Support Scams:** Legitimate companies don't call you about computer problems

**Safe Communication Practices:**
Always assume your online communication can be read by others. This includes:
• Email messages (unless encrypted)
• Social media messages and posts
• Text messages and phone calls
• Video calls on unsecure platforms

**Never Share Online:**
• Social security numbers or personal ID numbers
• Banking information or passwords
• Copies of official documents (unless on secure, verified websites)
• Location information or travel plans
• Information about your immigration status to unknown persons

**Cybersecurity Organizations:**
• **Austrian Cyber Security Center (ACSC):** Government cybersecurity information
• **Europe's Digital Rights Organization (EDRi):** Privacy and digital rights advocacy
• **Internet Safety for Immigrants:** Specialized resources for newcomers`,
      de: `Cybersicherheit und Datenschutz sind eng miteinander verbunden - der Schutz Ihrer persönlichen Informationen schützt Sie auch vor Cyber-Bedrohungen. In der heutigen digitalen Welt braucht jeder grundlegende Cybersicherheitskenntnisse, um online sicher zu bleiben.

**Verbindung zwischen Datenschutz und Sicherheit:**
Ihre persönlichen Informationen sind wertvoll für Cyberkriminelle. Datenlecks, Identitätsdiebstahl und Online-Betrug zielen alle auf Ihre privaten Informationen ab. Der Schutz Ihrer Privatsphäre ist die erste Verteidigungslinie gegen Cyber-Angriffe.

**Wichtige Online-Sicherheitstools:**
• **Werbeblocker (uBlock Origin):** Blockiert bösartige Werbung und Tracking-Skripte, die Malware enthalten können
• **Tor Browser:** Bietet anonymes Surfen und schützt vor Tracking
• **VPN-Dienste:** Verschlüsselt Ihre Internetverbindung und verbirgt Ihren Standort
• **Sichere Kommunikation (Signal):** End-zu-End-verschlüsselte Kommunikation, die nicht abgefangen werden kann
• **Passwort-Manager:** Erstellt und speichert starke, einzigartige Passwörter für alle Konten

**Häufige Online-Betrügereien:**
• **Wohnungsbetrug:** Überweisen Sie niemals Geld für Wohnungen, die Sie nicht persönlich besichtigt haben
• **Phishing-E-Mails:** Klicken Sie nicht auf Links von unbekannten Absendern oder verdächtigen Nachrichten
• **Gefälschte Behörden-Websites:** Überprüfen Sie immer offizielle Websites, bevor Sie persönliche Informationen eingeben
• **Liebesbetrug:** Seien Sie vorsichtig bei Personen, die online Geld oder persönliche Informationen verlangen
• **Tech-Support-Betrug:** Seriöse Unternehmen rufen Sie nicht wegen Computerproblemen an

**Sichere Kommunikationspraktiken:**
Gehen Sie immer davon aus, dass Ihre Online-Kommunikation von anderen gelesen werden kann. Dazu gehören:
• E-Mail-Nachrichten (außer verschlüsselt)
• Social Media-Nachrichten und -Posts
• Textnachrichten und Telefonanrufe
• Videoanrufe auf unsicheren Plattformen

**Niemals online teilen:**
• Sozialversicherungsnummern oder persönliche ID-Nummern
• Banking-Informationen oder Passwörter
• Kopien offizieller Dokumente (außer auf sicheren, verifizierten Websites)
• Standortinformationen oder Reisepläne
• Informationen über Ihren Einwanderungsstatus an unbekannte Personen

**Cybersicherheits-Organisationen:**
• **Österreichisches Cyber Security Center (ACSC):** Behördliche Cybersicherheitsinformationen
• **European Digital Rights (EDRi):** Datenschutz- und digitale Rechte-Advocacy
• **Internetsicherheit für Einwanderer:** Spezialisierte Ressourcen für Neuankömmlinge`
    },
    links: [
      {
        title: { en: 'Austrian Cyber Security Center', de: 'Österreichisches Cyber Security Center' },
        url: 'https://www.bundeskanzleramt.gv.at'
      },
      {
        title: { en: 'uBlock Origin Download', de: 'uBlock Origin Download' },
        url: 'https://ublockorigin.com'
      },
      {
        title: { en: 'Signal Messenger', de: 'Signal Messenger' },
        url: 'https://signal.org'
      },
      {
        title: { en: 'Tor Browser', de: 'Tor Browser' },
        url: 'https://www.torproject.org'
      },
      {
        title: { en: 'European Digital Rights', de: 'European Digital Rights' },
        url: 'https://edri.org'
      }
    ]
  };

  const parseMarkdownText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <Text key={index} style={styles.boldText}>
            {part.slice(2, -2)}
          </Text>
        );
      }
      return part;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          {language.code === 'de' ? content.title.de : content.title.en}
        </Text>
        
        <Text style={styles.subtitle}>
          {language.code === 'de' ? content.subtitle.de : content.subtitle.en}
        </Text>
        
        <Text style={styles.text}>
          {parseMarkdownText(language.code === 'de' ? content.text.de : content.text.en)}
        </Text>
        
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
      
      <HelpModal
        visible={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        languageCode={language.code}
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
  boldText: {
    fontWeight: 'bold',
  },
  linksSection: {
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

export default CybersecurityPage;