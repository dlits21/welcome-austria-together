import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';
import HighlightedText from '../../../components/HighlightedText';

const GeneralInformationPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const handleVideoPress = () => {
    Linking.openURL('https://youtube.com/watch?v=dQw4w9WgXcQ');
  };

  const definitions = {
    'job market': {
      en: 'The supply and demand for employment in the economy, including available positions and job seekers.',
      de: 'Das Angebot und die Nachfrage nach Arbeitsplätzen in der Wirtschaft, einschließlich verfügbarer Stellen und Arbeitssuchenden.',
      terms: {
        en: ['labor market', 'labour market'],
        de: ['Arbeitsmarkt']
      }
    },
    'networking': {
      en: 'Building professional relationships to create career opportunities and exchange knowledge.',
      de: 'Aufbau professioneller Beziehungen zur Schaffung von Karrieremöglichkeiten und Wissensaustausch.',
      terms: {
        en: [],
        de: ['Networking']
      }
    },
    'freelancing': {
      en: 'Working independently for multiple clients rather than being employed by a single company.',
      de: 'Selbstständige Arbeit für mehrere Kunden anstatt bei einem einzigen Unternehmen angestellt zu sein.',
      terms: {
        en: ['self-employment'],
        de: ['Freelancing', 'Selbstständigkeit', 'Selbstständiger', 'Einzelunternehmer']
      }
    },
    'qualification recognition': {
      en: 'The process of having foreign educational credentials officially recognized in Austria.',
      de: 'Der Prozess der offiziellen Anerkennung ausländischer Bildungsabschlüsse in Österreich.',
      terms: {
        en: ['recognition of qualifications'],
        de: ['Qualifikationsanerkennung', 'Anerkennung von Qualifikationen']
      }
    }
  };

  const content = {
    title: {
      en: 'General Information on Jobs in Austria',
      de: 'Allgemeine Informationen zu Jobs in Österreich'
    },
    subtitle: {
      en: 'Overview of the Austrian Job Market',
      de: 'Überblick über den österreichischen Arbeitsmarkt'
    },
    text: {
      en: `The Austrian job market offers diverse opportunities across various sectors. Understanding the landscape can help you navigate your career path effectively.

Austria has a strong economy with low unemployment rates. Key industries include tourism, manufacturing, technology, healthcare, and finance. Vienna, Salzburg, and Linz are major business centers.

Popular job sectors:
• Information Technology and Software Development
• Healthcare and Social Services
• Engineering and Manufacturing
• Tourism and Hospitality
• Finance and Banking
• Education and Research

The job market values both German language skills and professional qualifications. Many international companies operate in Austria, offering opportunities for multilingual professionals.

For foreign qualifications, qualification recognition may be required. This process ensures your education and experience are properly valued by Austrian employers.

Networking plays a crucial role in job hunting. Professional associations, industry events, and online platforms like XING and LinkedIn are valuable for connecting with potential employers.

Many Austrians also pursue freelancing opportunities, especially in creative and consulting fields. This requires registering as a self-employed person (Einzelunternehmer).

Work-life balance is highly valued in Austrian culture, with standard working weeks of 38.5-40 hours and generous vacation policies.`,
      de: `Der österreichische Arbeitsmarkt bietet vielfältige Möglichkeiten in verschiedenen Branchen. Das Verständnis der Landschaft kann Ihnen helfen, Ihren Karriereweg effektiv zu navigieren.

Österreich hat eine starke Wirtschaft mit niedrigen Arbeitslosenquoten. Wichtige Industrien umfassen Tourismus, Fertigung, Technologie, Gesundheitswesen und Finanzen. Wien, Salzburg und Linz sind wichtige Geschäftszentren.

Beliebte Jobsektoren:
• Informationstechnologie und Softwareentwicklung
• Gesundheitswesen und Soziale Dienste
• Ingenieurwesen und Fertigung
• Tourismus und Gastgewerbe
• Finanzen und Banking
• Bildung und Forschung

Der Arbeitsmarkt schätzt sowohl deutsche Sprachkenntnisse als auch berufliche Qualifikationen. Viele internationale Unternehmen sind in Österreich tätig und bieten Möglichkeiten für mehrsprachige Fachkräfte.

Für ausländische Qualifikationen kann eine Qualifikationsanerkennung erforderlich sein. Dieser Prozess stellt sicher, dass Ihre Bildung und Erfahrung von österreichischen Arbeitgebern richtig bewertet werden.

Networking spielt eine entscheidende Rolle bei der Jobsuche. Berufsverbände, Branchenveranstaltungen und Online-Plattformen wie XING und LinkedIn sind wertvoll für die Verbindung mit potenziellen Arbeitgebern.

Viele Österreicher verfolgen auch Freelancing-Möglichkeiten, besonders in kreativen und beratenden Bereichen. Dies erfordert die Anmeldung als Selbstständiger (Einzelunternehmer).

Work-Life-Balance wird in der österreichischen Kultur hoch geschätzt, mit Standard-Arbeitswochen von 38,5-40 Stunden und großzügigen Urlaubsregelungen.`
    },
    links: [
      {
        title: { en: 'Job Portal Austria', de: 'Jobportal Österreich' },
        url: 'https://www.jobs.at'
      },
      {
        title: { en: 'XING Professional Network', de: 'XING Berufliches Netzwerk' },
        url: 'https://www.xing.com'
      },
      {
        title: { en: 'Qualification Recognition', de: 'Qualifikationsanerkennung' },
        url: 'https://www.berufsanerkennung.at'
      }
    ],
    videoTitle: {
      en: 'Austrian Job Market Overview',
      de: 'Überblick über den österreichischen Arbeitsmarkt'
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
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
      
      {/* Virtual Assistant Modal */}
      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
        languageCode={language.code}
      />

      {/* Tutorial Modal */}
      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={language.code}
        tutorialData="home"
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

export default GeneralInformationPage;