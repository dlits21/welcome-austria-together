
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const IntegrationProcessPage: React.FC = () => {
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
      en: 'Integration Process in Austria',
      de: 'Integrationsprozess in Österreich'
    },
    subtitle: {
      en: 'Your Path to Becoming Part of Austrian Society',
      de: 'Ihr Weg zur Teilhabe an der österreichischen Gesellschaft'
    },
    text: {
      en: `Integration in Austria is a mutual process that involves both newcomers and society. The Austrian integration system provides structured support to help you participate fully in social, economic, and civic life.

Key components of integration:
• German language learning (A1-C2 levels)
• Values and orientation courses
• Civic education and political knowledge
• Professional qualification recognition
• Social participation and networking
• Cultural understanding and respect

Integration Agreement (Integrationsvereinbarung):
• Mandatory for certain visa categories
• Language requirements (usually A2 level)
• Values and orientation course completion
• Regular progress monitoring
• Support and counseling available

Steps in the integration process:
1. Initial counseling and assessment
2. Individual integration plan development
3. Language course enrollment
4. Values and orientation course participation
5. Professional skills assessment
6. Job search and career guidance
7. Civic participation encouragement

Support services available:
• Free German courses for eligible participants
• Integration centers and counseling services
• Recognition procedures for foreign qualifications
• Mentoring and buddy programs
• Cultural orientation activities
• Family integration support

Successful integration benefits everyone by creating stronger, more cohesive communities.`,
      de: `Integration in Österreich ist ein wechselseitiger Prozess, der sowohl Neuzuwanderer als auch die Gesellschaft einbezieht. Das österreichische Integrationssystem bietet strukturierte Unterstützung, um Ihnen die volle Teilhabe am gesellschaftlichen, wirtschaftlichen und bürgerlichen Leben zu ermöglichen.

Wichtige Komponenten der Integration:
• Deutschlernen (A1-C2 Niveaus)
• Werte- und Orientierungskurse
• Politische Bildung und staatsbürgerliches Wissen
• Anerkennung beruflicher Qualifikationen
• Gesellschaftliche Teilhabe und Vernetzung
• Kulturelles Verständnis und Respekt

Integrationsvereinbarung:
• Verpflichtend für bestimmte Visa-Kategorien
• Sprachanforderungen (meist A2-Niveau)
• Abschluss von Werte- und Orientierungskursen
• Regelmäßige Fortschrittskontrolle
• Unterstützung und Beratung verfügbar

Schritte im Integrationsprozess:
1. Erstberatung und Bewertung
2. Entwicklung eines individuellen Integrationsplans
3. Anmeldung zu Sprachkursen
4. Teilnahme an Werte- und Orientierungskursen
5. Bewertung beruflicher Fähigkeiten
6. Jobsuche und Karriereberatung
7. Förderung bürgerlicher Teilhabe

Verfügbare Unterstützungsdienste:
• Kostenlose Deutschkurse für Berechtigte
• Integrationszentren und Beratungsdienste
• Anerkennungsverfahren für ausländische Qualifikationen
• Mentoring- und Buddy-Programme
• Kulturelle Orientierungsaktivitäten
• Familienintegrationsunterstützung

Erfolgreiche Integration kommt allen zugute, indem sie stärkere, kohärentere Gemeinschaften schafft.`
    },
    links: [
      {
        title: { en: 'Austrian Integration Fund', de: 'Österreichischer Integrationsfonds' },
        url: 'https://www.integrationsfonds.at'
      },
      {
        title: { en: 'Integration Centers', de: 'Integrationszentren' },
        url: 'https://www.migration.gv.at'
      },
      {
        title: { en: 'Qualification Recognition', de: 'Qualifikationsanerkennung' },
        url: 'https://www.berufsanerkennung.at'
      }
    ],
    videoTitle: {
      en: 'Your Integration Journey in Austria',
      de: 'Ihre Integrationsreise in Österreich'
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

export default IntegrationProcessPage;
