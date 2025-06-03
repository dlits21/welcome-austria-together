
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const OnlineWorkshopsPage: React.FC = () => {
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
      en: 'Online Workshops',
      de: 'Online-Workshops'
    },
    subtitle: {
      en: 'Digital Learning for Political Education',
      de: 'Digitales Lernen für politische Bildung'
    },
    text: {
      en: `Online workshops provide flexible and accessible opportunities to learn about Austrian politics and civic life from anywhere. These digital learning formats offer interactive content and expert guidance.

Available online workshop formats include:
• Live webinars with expert speakers
• Interactive virtual classrooms
• Self-paced learning modules
• Video conferences with Q&A sessions
• Online discussion forums
• Digital resource libraries

Topics covered in online workshops:
• Austrian political system overview
• Voting procedures and rights
• Integration pathways and requirements
• Legal rights and responsibilities
• Cultural orientation sessions
• Language support for political participation

Benefits of online workshops:
• Flexible scheduling around work and family
• Access from anywhere with internet connection
• Recorded sessions for later review
• Multi-language support available
• Interactive elements and peer discussion
• Certificate completion options

Many workshops are offered free of charge by government agencies, NGOs, and educational institutions.`,
      de: `Online-Workshops bieten flexible und zugängliche Möglichkeiten, von überall aus über österreichische Politik und Bürgerleben zu lernen. Diese digitalen Lernformate bieten interaktive Inhalte und fachkundige Anleitung.

Verfügbare Online-Workshop-Formate sind:
• Live-Webinare mit Fachexperten
• Interaktive virtuelle Klassenzimmer
• Selbstbestimmte Lernmodule
• Videokonferenzen mit Frage-Antwort-Runden
• Online-Diskussionsforen
• Digitale Ressourcenbibliotheken

In Online-Workshops behandelte Themen:
• Überblick über das österreichische politische System
• Wahlverfahren und -rechte
• Integrationswege und -anforderungen
• Rechtliche Rechte und Pflichten
• Kulturelle Orientierungssitzungen
• Sprachunterstützung für politische Teilhabe

Vorteile von Online-Workshops:
• Flexible Terminplanung um Arbeit und Familie
• Zugang von überall mit Internetverbindung
• Aufgezeichnete Sitzungen zur späteren Überprüfung
• Mehrsprachige Unterstützung verfügbar
• Interaktive Elemente und Peer-Diskussion
• Zertifikat-Abschlussoptionen

Viele Workshops werden kostenlos von Regierungsbehörden, NGOs und Bildungseinrichtungen angeboten.`
    },
    links: [
      {
        title: { en: 'Democracy Webshop Online', de: 'Demokratie-Webshop Online' },
        url: 'https://www.demokratiewebstatt.at'
      },
      {
        title: { en: 'VHS Online Courses', de: 'VHS Online-Kurse' },
        url: 'https://www.vhs.at'
      },
      {
        title: { en: 'Integration Platform', de: 'Integrationsplattform' },
        url: 'https://www.integrationsfonds.at'
      }
    ],
    videoTitle: {
      en: 'How to Join Online Political Education Workshops',
      de: 'Wie man an Online-Workshops für politische Bildung teilnimmt'
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

export default OnlineWorkshopsPage;
