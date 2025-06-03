import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const ChildrenRightsPage: React.FC = () => {
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
      en: "Children's Rights in Austria",
      de: 'Kinderrechte in Österreich'
    },
    subtitle: {
      en: 'Protecting and Promoting Child Welfare',
      de: 'Schutz und Förderung des Kindeswohls'
    },
    text: {
      en: `Children's rights in Austria are enshrined in the Constitution and protected by comprehensive laws. The UN Convention on the Rights of the Child is fully implemented.

Fundamental children's rights include:
• Right to life, survival, and development
• Right to education and healthcare
• Protection from violence, abuse, and exploitation
• Right to family life and care
• Freedom of expression and participation
• Right to play and leisure
• Protection of privacy and dignity

Key protections in Austria:
• Mandatory school attendance from age 6
• Child protection services (Kinder- und Jugendhilfe)
• Special courts for juvenile matters
• Prohibition of corporal punishment
• Support for families in need

Children have the right to:
• Be heard in matters affecting them
• Receive support for their development
• Access to social services and benefits
• Protection from discrimination
• Safe and nurturing environments

Austria continuously works to improve child protection and ensure all children can thrive.`,
      de: `Kinderrechte in Österreich sind in der Verfassung verankert und durch umfassende Gesetze geschützt. Die UN-Kinderrechtskonvention wird vollständig umgesetzt.

Grundlegende Kinderrechte sind:
• Recht auf Leben, Überleben und Entwicklung
• Recht auf Bildung und Gesundheitsversorgung
• Schutz vor Gewalt, Missbrauch und Ausbeutung
• Recht auf Familienleben und Betreuung
• Meinungsfreiheit und Partizipation
• Recht auf Spiel und Freizeit
• Schutz der Privatsphäre und Würde

Wichtige Schutzmaßnahmen in Österreich:
• Schulpflicht ab 6 Jahren
• Kinder- und Jugendhilfe
• Spezielle Gerichte für Jugendangelegenheiten
• Verbot körperlicher Züchtigung
• Unterstützung für Familien in Not

Kinder haben das Recht:
• In sie betreffenden Angelegenheiten gehört zu werden
• Unterstützung für ihre Entwicklung zu erhalten
• Zugang zu sozialen Diensten und Leistungen
• Schutz vor Diskriminierung
• Sichere und fördernde Umgebungen

Österreich arbeitet kontinuierlich daran, den Kinderschutz zu verbessern und sicherzustellen, dass alle Kinder gedeihen können.`
    },
    links: [
      {
        title: { en: 'Children\'s Rights Ombudsman', de: 'Kinder- und Jugendanwaltschaft' },
        url: 'https://www.kija.at'
      },
      {
        title: { en: 'Child Protection Services', de: 'Kinder- und Jugendhilfe' },
        url: 'https://www.help.gv.at'
      },
      {
        title: { en: 'UNICEF Austria', de: 'UNICEF Österreich' },
        url: 'https://www.unicef.at'
      }
    ],
    videoTitle: {
      en: 'Understanding Children\'s Rights',
      de: 'Kinderrechte verstehen'
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

export default ChildrenRightsPage;
