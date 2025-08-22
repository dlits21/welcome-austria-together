
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const LegalSystemPage: React.FC = () => {
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
      en: 'Austrian Legal System',
      de: 'Österreichisches Rechtssystem'
    },
    subtitle: {
      en: 'Understanding Law and Justice in Austria',
      de: 'Recht und Gerechtigkeit in Österreich verstehen'
    },
    text: {
      en: `The Austrian legal system is based on civil law principles and provides comprehensive legal protection for all residents. Understanding how the legal system works helps you navigate legal issues and protect your rights.

Structure of Austrian courts:
• District Courts (Bezirksgerichte) - local civil and criminal matters
• Regional Courts (Landesgerichte) - more serious civil and criminal cases
• Higher Regional Courts (Oberlandesgerichte) - appeals court
• Supreme Court (Oberster Gerichtshof) - highest civil and criminal court
• Administrative Courts - for administrative law matters
• Constitutional Court (Verfassungsgerichtshof) - constitutional issues

Areas of law:
• Civil law - contracts, property, family matters
• Criminal law - crimes and punishments
• Administrative law - government and public administration
• Constitutional law - fundamental rights and state structure
• Labor law - employment relationships
• Commercial law - business and trade

Legal rights and protections:
• Right to legal representation
• Presumption of innocence in criminal cases
• Right to a fair trial and due process
• Protection from arbitrary detention
• Right to appeal court decisions
• Access to legal aid for those who qualify

Getting legal help:
• Consult with qualified lawyers (Rechtsanwälte)
• Legal aid (Verfahrenshilfe) for financial hardship
• Public legal information services
• Mediation services for dispute resolution
• Consumer protection agencies

The legal system ensures equal treatment under law regardless of nationality, religion, or social status.`,
      de: `Das österreichische Rechtssystem basiert auf zivilrechtlichen Prinzipien und bietet umfassenden Rechtsschutz für alle Einwohner. Das Verständnis der Funktionsweise des Rechtssystems hilft Ihnen, rechtliche Probleme zu bewältigen und Ihre Rechte zu schützen.

Struktur der österreichischen Gerichte:
• Bezirksgerichte - örtliche Zivil- und Strafsachen
• Landesgerichte - schwerwiegendere Zivil- und Strafsachen
• Oberlandesgerichte - Berufungsgerichte
• Oberster Gerichtshof - höchstes Zivil- und Strafgericht
• Verwaltungsgerichte - für Verwaltungsrechtsangelegenheiten
• Verfassungsgerichtshof - Verfassungsangelegenheiten

Rechtsbereiche:
• Zivilrecht - Verträge, Eigentum, Familienangelegenheiten
• Strafrecht - Verbrechen und Strafen
• Verwaltungsrecht - Regierung und öffentliche Verwaltung
• Verfassungsrecht - Grundrechte und Staatsstruktur
• Arbeitsrecht - Arbeitsverhältnisse
• Handelsrecht - Geschäft und Handel

Rechtliche Rechte und Schutzmaßnahmen:
• Recht auf rechtliche Vertretung
• Unschuldsvermutung in Strafsachen
• Recht auf ein faires Verfahren und ordentliches Verfahren
• Schutz vor willkürlicher Verhaftung
• Recht auf Berufung gegen Gerichtsentscheidungen
• Zugang zu Rechtshilfe für Berechtigte

Rechtshilfe erhalten:
• Konsultation mit qualifizierten Anwälten (Rechtsanwälte)
• Verfahrenshilfe bei finanziellen Schwierigkeiten
• Öffentliche Rechtsinformationsdienste
• Mediationsdienste zur Streitbeilegung
• Verbraucherschutzagenturen

Das Rechtssystem gewährleistet Gleichbehandlung vor dem Gesetz unabhängig von Nationalität, Religion oder sozialem Status.`
    },
    links: [
      {
        title: { en: 'Austrian Courts', de: 'Österreichische Gerichte' },
        url: 'https://www.justiz.gv.at'
      },
      {
        title: { en: 'Legal Aid Information', de: 'Verfahrenshilfe Information' },
        url: 'https://www.help.gv.at'
      },
      {
        title: { en: 'Austrian Bar Association', de: 'Österreichische Rechtsanwaltskammer' },
        url: 'https://www.rechtsanwaelte.at'
      }
    ],
    videoTitle: {
      en: 'Navigating the Austrian Legal System',
      de: 'Das österreichische Rechtssystem verstehen'
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

export default LegalSystemPage;
