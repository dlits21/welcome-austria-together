
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const PoliticalEducation101Page: React.FC = () => {
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
      en: '101 Political Education',
      de: 'Politische Bildung 101'
    },
    subtitle: {
      en: 'Basic Political Knowledge for Everyone',
      de: 'Grundlegendes politisches Wissen für alle'
    },
    text: {
      en: `Political education is essential for active participation in democratic society. This foundational course covers the basics of political systems, civic rights, and responsibilities.

Understanding politics helps you make informed decisions about your life and community. It includes knowledge about government structures, electoral processes, and how policies affect daily life.

Key topics in political education include:
• Understanding different political systems
• How laws are made and enforced
• The role of citizens in democracy
• Political parties and ideologies
• Media literacy and critical thinking
• Civic engagement and participation

Political education empowers individuals to participate meaningfully in democratic processes and understand their role in society.`,
      de: `Politische Bildung ist für die aktive Teilnahme an der demokratischen Gesellschaft unerlässlich. Dieser Grundkurs behandelt die Grundlagen politischer Systeme, Bürgerrechte und -pflichten.

Das Verständnis von Politik hilft Ihnen, fundierte Entscheidungen über Ihr Leben und Ihre Gemeinschaft zu treffen. Es umfasst Wissen über Regierungsstrukturen, Wahlprozesse und wie Politik das tägliche Leben beeinflusst.

Wichtige Themen der politischen Bildung sind:
• Verständnis verschiedener politischer Systeme
• Wie Gesetze gemacht und durchgesetzt werden
• Die Rolle der Bürger in der Demokratie
• Politische Parteien und Ideologien
• Medienkompetenz und kritisches Denken
• Bürgerschaftliches Engagement und Teilhabe

Politische Bildung befähigt Menschen, sinnvoll an demokratischen Prozessen teilzunehmen und ihre Rolle in der Gesellschaft zu verstehen.`
    },
    links: [
      {
        title: { en: 'Austrian Civic Education Center', de: 'Österreichisches Zentrum für politische Bildung' },
        url: 'https://www.politik-lernen.at'
      },
      {
        title: { en: 'Democracy Web Portal', de: 'Demokratie-Webportal' },
        url: 'https://www.demokratiewebstatt.at'
      },
      {
        title: { en: 'Political Education Resources', de: 'Ressourcen für politische Bildung' },
        url: 'https://www.bpb.de'
      }
    ],
    videoTitle: {
      en: 'Introduction to Political Education',
      de: 'Einführung in die politische Bildung'
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

export default PoliticalEducation101Page;
