import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const SecurityPrivacyPage: React.FC = () => {
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

  const handleVideoPress = () => {
    Linking.openURL('https://youtube.com/watch?v=dQw4w9WgXcQ');
  };

  const content = {
    title: {
      en: 'Privacy and Data Protection',
      de: 'Datenschutz und Privatsphäre'
    },
    subtitle: {
      en: 'Protecting your personal information in the digital age',
      de: 'Schutz Ihrer persönlichen Daten im digitalen Zeitalter'
    },
    text: {
      en: `Personal privacy protection is crucial in today's digital world. Understanding how to safeguard your information helps prevent misuse by malicious actors, advertisers, government agencies, and other unauthorized parties.

**Why Privacy Matters:**
Your personal information can be misused in various ways:
• **Identity theft:** Criminals can use your data to commit fraud
• **Targeted advertising:** Companies track your behavior to manipulate purchasing decisions
• **Government surveillance:** Mass data collection can infringe on civil liberties
• **Discrimination:** Personal data can be used unfairly against you in employment, insurance, or housing
• **Social engineering:** Scammers use personal information to gain trust and commit fraud

**European GDPR Protection:**
The **General Data Protection Regulation (GDPR)** gives you strong rights:
• **Right to information:** Know what data is collected and how it's used
• **Right of access:** Request copies of your personal data
• **Right to rectification:** Correct inaccurate personal information
• **Right to erasure:** Request deletion of your data ("right to be forgotten")
• **Right to data portability:** Transfer your data between services
• **Right to object:** Refuse certain types of data processing

**Ad Blocker Protection:**
Use **uBlock Origin** (recommended ad blocker):
• Blocks malicious advertisements and tracking scripts
• Prevents websites from collecting behavioral data
• Improves browsing speed and reduces data usage
• Available for Chrome, Firefox, Safari, and Edge browsers
• Regular updates protect against new tracking methods

**Secure Messaging with Signal:**
**Signal** is recommended for private communication:
• **End-to-end encryption:** Only you and recipient can read messages
• **No data collection:** Signal doesn't store user information
• **Open source:** Code is publicly auditable for security
• **Disappearing messages:** Automatic message deletion options
• **Voice and video calls:** Encrypted audio and video communication
• Free and available on all platforms

**Additional Privacy Tips:**
• Use strong, unique passwords with a password manager
• Enable two-factor authentication on important accounts
• Be careful about what you share on social media
• Read privacy policies of services you use
• Use VPN services for additional privacy protection
• Keep software and apps updated for security patches
• Be skeptical of free services that make money from your data

**Austrian Privacy Organizations:**
**noyb (None of Your Business):** European privacy advocacy organization
• Files complaints against GDPR violations
• Provides resources for understanding privacy rights
• Fights for stronger privacy protection
• Website: noyb.eu

**Prism-break.org Resources:**
Comprehensive guide to privacy-respecting alternatives:
• Secure email providers
• Private search engines
• Encrypted messaging apps
• Anonymous web browsers
• Privacy-focused operating systems

**Protecting Children's Privacy:**
• Monitor children's online activities and teach digital literacy
• Use parental controls and privacy settings
• Explain the importance of not sharing personal information online
• Be aware of data collection by educational apps and platforms`,
      de: `Der Schutz der Privatsphäre ist in der heutigen digitalen Welt von entscheidender Bedeutung. Zu verstehen, wie Sie Ihre Informationen schützen können, hilft dabei, Missbrauch durch böswillige Akteure, Werbetreibende, Regierungsbehörden und andere unbefugte Parteien zu verhindern.

**Warum Datenschutz wichtig ist:**
Ihre persönlichen Informationen können auf verschiedene Weise missbraucht werden:
• **Identitätsdiebstahl:** Kriminelle können Ihre Daten für Betrug verwenden
• **Gezielte Werbung:** Unternehmen verfolgen Ihr Verhalten, um Kaufentscheidungen zu manipulieren
• **Regierungsüberwachung:** Massendatensammlung kann Bürgerrechte verletzen
• **Diskriminierung:** Persönliche Daten können unfair gegen Sie bei Beschäftigung, Versicherung oder Wohnen verwendet werden
• **Social Engineering:** Betrüger nutzen persönliche Informationen, um Vertrauen zu gewinnen und Betrug zu begehen

**Europäischer DSGVO-Schutz:**
Die **Datenschutz-Grundverordnung (DSGVO)** gibt Ihnen starke Rechte:
• **Recht auf Information:** Wissen, welche Daten gesammelt und wie sie verwendet werden
• **Auskunftsrecht:** Kopien Ihrer persönlichen Daten anfordern
• **Recht auf Berichtigung:** Unrichtige persönliche Informationen korrigieren
• **Recht auf Löschung:** Löschung Ihrer Daten verlangen ("Recht auf Vergessenwerden")
• **Recht auf Datenübertragbarkeit:** Ihre Daten zwischen Services übertragen
• **Widerspruchsrecht:** Bestimmte Arten der Datenverarbeitung ablehnen

**Werbeblocker-Schutz:**
Verwenden Sie **uBlock Origin** (empfohlener Werbeblocker):
• Blockiert bösartige Werbung und Tracking-Skripte
• Verhindert, dass Websites Verhaltensdaten sammeln
• Verbessert Browsing-Geschwindigkeit und reduziert Datenverbrauch
• Verfügbar für Chrome, Firefox, Safari und Edge Browser
• Regelmäßige Updates schützen vor neuen Tracking-Methoden

**Sichere Kommunikation mit Signal:**
**Signal** wird für private Kommunikation empfohlen:
• **End-zu-End-Verschlüsselung:** Nur Sie und der Empfänger können Nachrichten lesen
• **Keine Datensammlung:** Signal speichert keine Benutzerinformationen
• **Open Source:** Code ist öffentlich für Sicherheit prüfbar
• **Verschwindende Nachrichten:** Automatische Nachrichten-Löschungsoptionen
• **Sprach- und Videoanrufe:** Verschlüsselte Audio- und Videokommunikation
• Kostenlos und auf allen Plattformen verfügbar

**Zusätzliche Datenschutz-Tipps:**
• Verwenden Sie starke, einzigartige Passwörter mit einem Passwort-Manager
• Aktivieren Sie Zwei-Faktor-Authentifizierung bei wichtigen Konten
• Seien Sie vorsichtig mit dem, was Sie in sozialen Medien teilen
• Lesen Sie Datenschutzrichtlinien der Services, die Sie nutzen
• Verwenden Sie VPN-Services für zusätzlichen Datenschutz
• Halten Sie Software und Apps für Sicherheits-Patches aktuell
• Seien Sie skeptisch gegenüber kostenlosen Services, die mit Ihren Daten Geld verdienen

**Österreichische Datenschutz-Organisationen:**
**noyb (None of Your Business):** Europäische Datenschutz-Advocacy-Organisation
• Reicht Beschwerden gegen DSGVO-Verletzungen ein
• Bietet Ressourcen zum Verständnis von Datenschutzrechten
• Kämpft für stärkeren Datenschutz
• Website: noyb.eu

**Prism-break.org Ressourcen:**
Umfassender Leitfaden zu datenschutzfreundlichen Alternativen:
• Sichere E-Mail-Anbieter
• Private Suchmaschinen
• Verschlüsselte Messaging-Apps
• Anonyme Web-Browser
• Datenschutz-fokussierte Betriebssysteme

**Schutz der Privatsphäre von Kindern:**
• Überwachen Sie Online-Aktivitäten von Kindern und lehren Sie digitale Kompetenz
• Verwenden Sie Kindersicherungen und Datenschutzeinstellungen
• Erklären Sie die Wichtigkeit, keine persönlichen Informationen online zu teilen
• Seien Sie sich der Datensammlung durch Bildungs-Apps und -Plattformen bewusst`
    },
    links: [
      {
        title: { en: 'noyb - European Privacy NGO', de: 'noyb - Europäische Datenschutz-NGO' },
        url: 'https://noyb.eu'
      },
      {
        title: { en: 'Prism Break - Privacy Tools', de: 'Prism Break - Datenschutz-Tools' },
        url: 'https://prism-break.org'
      },
      {
        title: { en: 'Signal Messenger', de: 'Signal Messenger' },
        url: 'https://signal.org'
      },
      {
        title: { en: 'uBlock Origin', de: 'uBlock Origin' },
        url: 'https://ublockorigin.com'
      },
      {
        title: { en: 'Austrian Data Protection Authority', de: 'Österreichische Datenschutzbehörde' },
        url: 'https://www.dsb.gv.at'
      }
    ],
    videoTitle: {
      en: 'Privacy Protection Basics',
      de: 'Grundlagen des Datenschutzes'
    }
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
        
        {/* Parse text to make **text** bold */}
        <Text style={styles.text}>
          {(language.code === 'de' ? content.text.de : content.text.en)
            .split(/(\*\*[^*]+\*\*)/)
            .map((part, index) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <Text key={index} style={styles.boldText}>
                    {part.slice(2, -2)}
                  </Text>
                );
              }
              return part;
            })}
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
        
        <View style={styles.videoSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Video' : 'Video'}
          </Text>
          
          <TouchableOpacity style={styles.videoCard} onPress={handleVideoPress}>
            <View style={styles.videoThumbnail}>
              <MaterialIcons name="play-circle-filled" size={48} color="#fff" />
            </View>
            <Text style={styles.videoTitle}>
              {language.code === 'de' ? content.videoTitle.de : content.videoTitle.en}
            </Text>
          </TouchableOpacity>
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
  videoSection: {
    marginBottom: 32,
  },
  videoCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 24,
  },
  videoThumbnail: {
    width: 120,
    height: 120,
    backgroundColor: '#374151',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

export default SecurityPrivacyPage;