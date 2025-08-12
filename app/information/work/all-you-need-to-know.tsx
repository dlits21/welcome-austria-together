import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import HighlightedText from '../../../components/HighlightedText';

const AllYouNeedToKnowPage: React.FC = () => {
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

  const definitions = {
    'employment contract': {
      en: 'A legal agreement between employer and employee that defines working conditions, salary, and responsibilities.',
      de: 'Ein rechtlicher Vertrag zwischen Arbeitgeber und Arbeitnehmer, der Arbeitsbedingungen, Gehalt und Verantwortlichkeiten definiert.'
    },
    'work permit': {
      en: 'Official authorization allowing non-EU citizens to work legally in Austria.',
      de: 'Offizielle Genehmigung, die Nicht-EU-Bürgern erlaubt, legal in Österreich zu arbeiten.'
    },
    'social insurance': {
      en: 'Mandatory insurance covering health, pension, unemployment, and accident benefits.',
      de: 'Pflichtversicherung, die Gesundheit, Rente, Arbeitslosigkeit und Unfallleistungen abdeckt.'
    },
    'collective agreement': {
      en: 'Agreement between unions and employers setting minimum wages and working conditions for specific industries.',
      de: 'Vereinbarung zwischen Gewerkschaften und Arbeitgebern über Mindestlöhne und Arbeitsbedingungen für bestimmte Branchen.'
    }
  };

  const content = {
    title: {
      en: 'All You Need to Know About Working in Austria',
      de: 'Alles was Sie über das Arbeiten in Österreich wissen müssen'
    },
    subtitle: {
      en: 'Essential Information for Starting Your Career',
      de: 'Wichtige Informationen für den Start Ihrer Karriere'
    },
    text: {
      en: `Working in Austria requires understanding several key aspects of the Austrian employment system. Whether you're an EU citizen or from outside the EU, there are important steps to take.

First, you need to understand the work permit requirements. EU citizens can work freely, while non-EU citizens need a valid work permit before starting employment.

Every employee in Austria must have an employment contract that outlines wages, working hours, vacation time, and job responsibilities. Austrian law provides strong worker protections.

Social insurance is mandatory for all employees and covers health insurance, pension contributions, unemployment insurance, and accident insurance. Your employer will handle the registration.

Most industries in Austria are covered by collective agreement that set minimum wages and working conditions. These agreements ensure fair treatment across different sectors.

Key documents you'll need:
• Valid ID or passport
• Work permit (if non-EU)
• Bank account for salary
• Address registration (Meldezettel)
• Tax number (Steuerummer)

Understanding Austrian workplace culture is also important. Punctuality, direct communication, and respect for hierarchy are valued in most Austrian workplaces.`,
      de: `Das Arbeiten in Österreich erfordert das Verständnis mehrerer wichtiger Aspekte des österreichischen Beschäftigungssystems. Ob Sie EU-Bürger sind oder von außerhalb der EU kommen, es gibt wichtige Schritte zu beachten.

Zunächst müssen Sie die Arbeitsgenehmigungsbestimmungen verstehen. EU-Bürger können frei arbeiten, während Nicht-EU-Bürger eine gültige Arbeitsgenehmigung benötigen, bevor sie eine Beschäftigung aufnehmen.

Jeder Arbeitnehmer in Österreich muss einen Arbeitsvertrag haben, der Löhne, Arbeitszeiten, Urlaubszeit und Arbeitsverantwortlichkeiten festlegt. Das österreichische Recht bietet starken Arbeitnehmerschutz.

Die Sozialversicherung ist für alle Arbeitnehmer obligatorisch und umfasst Krankenversicherung, Rentenbeiträge, Arbeitslosenversicherung und Unfallversicherung. Ihr Arbeitgeber übernimmt die Anmeldung.

Die meisten Branchen in Österreich sind von Kollektivverträgen abgedeckt, die Mindestlöhne und Arbeitsbedingungen festlegen. Diese Vereinbarungen gewährleisten faire Behandlung in verschiedenen Sektoren.

Wichtige Dokumente, die Sie benötigen:
• Gültiger Ausweis oder Reisepass
• Arbeitsgenehmigung (falls nicht EU)
• Bankkonto für Gehalt
• Adressanmeldung (Meldezettel)
• Steuernummer

Das Verständnis der österreichischen Arbeitsplatzkultur ist ebenfalls wichtig. Pünktlichkeit, direkte Kommunikation und Respekt vor der Hierarchie werden in den meisten österreichischen Arbeitsplätzen geschätzt.`
    },
    links: [
      {
        title: { en: 'Austrian Employment Service (AMS)', de: 'Arbeitsmarktservice (AMS)' },
        url: 'https://www.ams.at'
      },
      {
        title: { en: 'Social Insurance Information', de: 'Sozialversicherungsinformationen' },
        url: 'https://www.sozialversicherung.at'
      },
      {
        title: { en: 'Work Permits and Visas', de: 'Arbeitsgenehmigungen und Visa' },
        url: 'https://www.migration.gv.at'
      }
    ],
    videoTitle: {
      en: 'Working in Austria: Complete Guide',
      de: 'Arbeiten in Österreich: Vollständiger Leitfaden'
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

export default AllYouNeedToKnowPage;