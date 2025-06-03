
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const CivicDutiesPage: React.FC = () => {
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
      en: 'Civic Duties in Austria',
      de: 'Bürgerpflichten in Österreich'
    },
    subtitle: {
      en: 'Your Responsibilities as a Resident',
      de: 'Ihre Verantwortungen als Einwohner'
    },
    text: {
      en: `Living in Austria comes with certain civic duties and responsibilities. Understanding these obligations helps you be a responsible member of society and avoid legal issues.

Key civic duties include:
• Registration with authorities (Meldezettel)
• Tax obligations and timely payments
• Military service or civilian service (for Austrian males)
• Jury duty when called upon
• Following laws and regulations
• Respecting the rights of others

Legal obligations for residents:
• Register your address within 3 days of moving
• Obtain necessary permits and licenses
• Pay income tax, social security contributions
• Maintain valid identification documents
• Comply with traffic laws and regulations
• Respect environmental protection laws

Social responsibilities:
• Integration and language learning efforts
• Respect for Austrian values and democracy
• Contributing to community well-being
• Participating in democratic processes when eligible
• Supporting social cohesion and tolerance

Benefits of fulfilling civic duties:
• Legal protection and security
• Access to public services and benefits
• Full participation in society
• Building trust with authorities and neighbors
• Contributing to a functioning democracy

Failure to meet civic duties can result in fines, legal consequences, or restrictions on certain rights and services.`,
      de: `Das Leben in Österreich bringt bestimmte Bürgerpflichten und Verantwortungen mit sich. Das Verständnis dieser Verpflichtungen hilft Ihnen, ein verantwortliches Mitglied der Gesellschaft zu sein und rechtliche Probleme zu vermeiden.

Wichtige Bürgerpflichten sind:
• Anmeldung bei den Behörden (Meldezettel)
• Steuerpflichten und rechtzeitige Zahlungen
• Militär- oder Zivildienst (für österreichische Männer)
• Schöffendienst bei Berufung
• Befolgen von Gesetzen und Vorschriften
• Respektierung der Rechte anderer

Rechtliche Verpflichtungen für Einwohner:
• Adresse innerhalb von 3 Tagen nach Umzug anmelden
• Notwendige Genehmigungen und Lizenzen erhalten
• Einkommensteuer, Sozialversicherungsbeiträge zahlen
• Gültige Ausweisdokumente führen
• Verkehrsgesetze und -vorschriften befolgen
• Umweltschutzgesetze respektieren

Soziale Verantwortungen:
• Integrations- und Sprachlernbemühungen
• Respekt für österreichische Werte und Demokratie
• Beitrag zum Gemeinschaftswohl
• Teilnahme an demokratischen Prozessen bei Berechtigung
• Unterstützung sozialer Kohäsion und Toleranz

Vorteile der Erfüllung von Bürgerpflichten:
• Rechtlicher Schutz und Sicherheit
• Zugang zu öffentlichen Diensten und Leistungen
• Vollständige Teilhabe an der Gesellschaft
• Vertrauensbildung mit Behörden und Nachbarn
• Beitrag zu einer funktionierenden Demokratie

Die Nichterfüllung von Bürgerpflichten kann zu Geldstrafen, rechtlichen Konsequenzen oder Einschränkungen bestimmter Rechte und Leistungen führen.`
    },
    links: [
      {
        title: { en: 'Registration Requirements', de: 'Meldepflicht' },
        url: 'https://www.help.gv.at'
      },
      {
        title: { en: 'Tax Information Service', de: 'Steuerservice' },
        url: 'https://www.bmf.gv.at'
      },
      {
        title: { en: 'Civic Service Information', de: 'Zivildienst Information' },
        url: 'https://www.zivildienst.gv.at'
      }
    ],
    videoTitle: {
      en: 'Understanding Your Civic Responsibilities',
      de: 'Ihre Bürgerpflichten verstehen'
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
        
        <Text style={styles.text}>
          {language.code === 'de' ? content.text.de : content.text.en}
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

export default CivicDutiesPage;
