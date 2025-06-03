
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const VotingSystemPage: React.FC = () => {
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
      en: 'Austrian Voting System',
      de: 'Österreichisches Wahlsystem'
    },
    subtitle: {
      en: 'How Elections Work in Austria',
      de: 'Wie Wahlen in Österreich funktionieren'
    },
    text: {
      en: `Austria has a comprehensive democratic voting system with elections at federal, state, and local levels. Understanding how voting works is essential for civic participation.

Types of elections in Austria:
• Federal elections (Nationalrat) - every 5 years
• Presidential elections - every 6 years
• State elections (Landtag) - varying schedules
• Local elections (Gemeinderat) - every 5-6 years
• European Parliament elections - every 5 years

Voting eligibility:
• Austrian citizenship required for most elections
• Age 16+ for federal and state elections
• Age 18+ for European Parliament elections
• EU citizens can vote in local and European elections

The electoral system:
• Proportional representation system
• Secret ballot voting
• Postal voting available for certain circumstances
• Voting typically held on Sundays
• Results are binding and determine government composition

How to vote:
• Register on the electoral roll
• Receive voting notification by mail
• Bring valid ID to polling station
• Mark ballot paper according to instructions
• Place ballot in sealed box

Your vote matters for determining representation and government policies that affect daily life.`,
      de: `Österreich hat ein umfassendes demokratisches Wahlsystem mit Wahlen auf Bundes-, Landes- und Gemeindeebene. Das Verständnis der Funktionsweise von Wahlen ist für die bürgerliche Teilhabe unerlässlich.

Arten von Wahlen in Österreich:
• Bundeswahlen (Nationalrat) - alle 5 Jahre
• Präsidentschaftswahlen - alle 6 Jahre
• Landtagswahlen - unterschiedliche Termine
• Gemeindewahlen (Gemeinderat) - alle 5-6 Jahre
• Europawahlen - alle 5 Jahre

Wahlberechtigung:
• Österreichische Staatsbürgerschaft für die meisten Wahlen erforderlich
• Ab 16 Jahren für Bundes- und Landtagswahlen
• Ab 18 Jahren für Europawahlen
• EU-Bürger können bei Gemeinde- und Europawahlen wählen

Das Wahlsystem:
• Verhältniswahlsystem
• Geheime Stimmabgabe
• Briefwahl unter bestimmten Umständen möglich
• Wahlen finden meist sonntags statt
• Ergebnisse sind bindend und bestimmen Regierungszusammensetzung

Wie man wählt:
• Eintragung in die Wählerevidenz
• Wahlbenachrichtigung per Post erhalten
• Gültigen Ausweis zum Wahllokal mitbringen
• Stimmzettel entsprechend den Anweisungen ausfüllen
• Stimmzettel in versiegelte Urne einwerfen

Ihre Stimme ist wichtig für die Bestimmung der Vertretung und Regierungspolitik, die das tägliche Leben beeinflusst.`
    },
    links: [
      {
        title: { en: 'Federal Ministry of Interior - Elections', de: 'Bundesministerium für Inneres - Wahlen' },
        url: 'https://www.bmi.gv.at'
      },
      {
        title: { en: 'Austrian Electoral Commission', de: 'Österreichische Wahlkommission' },
        url: 'https://www.wahlen.gv.at'
      },
      {
        title: { en: 'Voting Information Portal', de: 'Wahlinfo-Portal' },
        url: 'https://www.help.gv.at'
      }
    ],
    videoTitle: {
      en: 'Step-by-Step Guide to Voting in Austria',
      de: 'Schritt-für-Schritt-Anleitung zum Wählen in Österreich'
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

export default VotingSystemPage;
