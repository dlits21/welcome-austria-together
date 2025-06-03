
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const ConstitutionPage: React.FC = () => {
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
      en: 'Austrian Constitution',
      de: 'Österreichische Verfassung'
    },
    subtitle: {
      en: 'The Foundation of Austrian Democracy',
      de: 'Die Grundlage der österreichischen Demokratie'
    },
    text: {
      en: `The Austrian Constitution is the supreme law of Austria, establishing the framework for government and protecting fundamental rights. Understanding the constitution helps you know your rights and the limits of government power.

Key aspects of the Austrian Constitution:
• Federal Constitutional Law (Bundes-Verfassungsgesetz, B-VG)
• Separation of powers between legislative, executive, and judicial branches
• Federal structure with nine states (Bundesländer)
• Protection of fundamental rights and freedoms
• Rule of law principle (Rechtsstaat)

Structure of government:
• Federal President as head of state
• Federal Chancellor as head of government
• National Council (Nationalrat) and Federal Council (Bundesrat)
• Constitutional Court for constitutional matters
• Independent judiciary system

Constitutional principles:
• Democracy and republicanism
• Federalism and state autonomy
• Protection of minorities
• Social welfare state
• European integration

Your constitutional rights include:
• Right to life and human dignity
• Freedom of expression, religion, and assembly
• Right to fair trial and legal protection
• Protection from discrimination
• Right to privacy and data protection

The constitution can only be changed through special constitutional laws requiring broad parliamentary support.`,
      de: `Die österreichische Verfassung ist das oberste Gesetz Österreichs und schafft den Rahmen für die Regierung sowie den Schutz der Grundrechte. Das Verständnis der Verfassung hilft Ihnen, Ihre Rechte und die Grenzen der Regierungsmacht zu kennen.

Wesentliche Aspekte der österreichischen Verfassung:
• Bundes-Verfassungsgesetz (B-VG)
• Gewaltenteilung zwischen Legislative, Exekutive und Judikative
• Föderale Struktur mit neun Bundesländern
• Schutz der Grundrechte und Freiheiten
• Rechtsstaatsprinzip

Staatsstruktur:
• Bundespräsident als Staatsoberhaupt
• Bundeskanzler als Regierungschef
• Nationalrat und Bundesrat
• Verfassungsgerichtshof für Verfassungsangelegenheiten
• Unabhängiges Justizwesen

Verfassungsprinzipien:
• Demokratie und Republikanismus
• Föderalismus und Länderautonomie
• Minderheitenschutz
• Sozialer Rechtsstaat
• Europäische Integration

Ihre Verfassungsrechte umfassen:
• Recht auf Leben und Menschenwürde
• Meinungs-, Religions- und Versammlungsfreiheit
• Recht auf faires Verfahren und Rechtsschutz
• Schutz vor Diskriminierung
• Recht auf Privatsphäre und Datenschutz

Die Verfassung kann nur durch spezielle Verfassungsgesetze geändert werden, die breite parlamentarische Unterstützung erfordern.`
    },
    links: [
      {
        title: { en: 'Austrian Constitution (B-VG)', de: 'Österreichische Verfassung (B-VG)' },
        url: 'https://www.ris.bka.gv.at'
      },
      {
        title: { en: 'Constitutional Court', de: 'Verfassungsgerichtshof' },
        url: 'https://www.vfgh.gv.at'
      },
      {
        title: { en: 'Parliament - Constitution', de: 'Parlament - Verfassung' },
        url: 'https://www.parlament.gv.at'
      }
    ],
    videoTitle: {
      en: 'Understanding the Austrian Constitution',
      de: 'Die österreichische Verfassung verstehen'
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

export default ConstitutionPage;
