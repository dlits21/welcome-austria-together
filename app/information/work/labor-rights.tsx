import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import HighlightedText from '../../../components/HighlightedText';

const LaborRightsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
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
    'overtime': {
      en: 'Work performed beyond normal working hours, typically compensated with extra pay or time off.',
      de: 'Arbeit, die über die normalen Arbeitszeiten hinaus geleistet wird, normalerweise mit Überstundenlohn oder Zeitausgleich kompensiert.',
      terms: {
        en: [],
        de: ['Überstunden']
      }
    },
    'termination notice': {
      en: 'Advance warning required by law before ending an employment contract.',
      de: 'Gesetzlich vorgeschriebene Vorankündigung vor Beendigung eines Arbeitsvertrags.',
      terms: {
        en: ['notice period'],
        de: ['Kündigungsfrist', 'Kündigungsfristen']
      }
    },
    'works council': {
      en: "Employee representatives who protect workers' rights and interests within a company.",
      de: 'Arbeitnehmervertreter, die die Rechte und Interessen der Arbeiter in einem Unternehmen schützen.',
      terms: {
        en: [],
        de: ['Betriebsrat']
      }
    },
    'discrimination': {
      en: 'Unfair treatment based on personal characteristics like gender, age, religion, or nationality.',
      de: 'Unfaire Behandlung aufgrund persönlicher Eigenschaften wie Geschlecht, Alter, Religion oder Nationalität.',
      terms: {
        en: [],
        de: ['Diskriminierung']
      }
    }
  };

  const content = {
    title: {
      en: 'Labor Rights in Austria',
      de: 'Arbeitsrechte in Österreich'
    },
    subtitle: {
      en: 'Know Your Rights as an Employee',
      de: 'Kennen Sie Ihre Rechte als Arbeitnehmer'
    },
    text: {
      en: `Austrian labor law provides comprehensive protection for workers. Understanding your rights helps ensure fair treatment and protects you from exploitation.

Key labor rights in Austria include:

Working Time Regulations:
• Maximum 40 hours per week (38.5 hours in many collective agreements)
• Overtime compensation at 50% premium rate
• Daily rest period of at least 11 hours
• Weekly rest period of at least 36 hours
• Maximum 10 hours per day including overtime

Vacation and Leave:
• Minimum 5 weeks paid vacation per year (6 weeks after 25 years with same employer)
• Paid sick leave when ill
• Maternity and paternity leave
• Educational leave options

Fair Treatment:
• Equal pay for equal work regardless of gender
• Protection from discrimination based on religion, ethnicity, age, or sexual orientation
• Right to join trade unions and works council
• Protection from unfair dismissal

Termination Rights:
• Proper termination notice periods based on length of employment
• Severance pay in certain circumstances
• Right to challenge unfair dismissals

Safety and Health:
• Safe working conditions and equipment
• Regular health and safety training
• Accident insurance coverage
• Right to refuse dangerous work

If your rights are violated, you can contact:
• Austrian Chamber of Labor (Arbeiterkammer)
• Trade unions in your sector
• Labor courts for legal disputes
• Employment tribunals for discrimination cases

Documentation is important - keep records of working hours, pay slips, and any communications about workplace issues.`,
      de: `Das österreichische Arbeitsrecht bietet umfassenden Schutz für Arbeitnehmer. Das Verständnis Ihrer Rechte hilft, faire Behandlung sicherzustellen und schützt Sie vor Ausbeutung.

Wichtige Arbeitsrechte in Österreich umfassen:

Arbeitszeitregelungen:
• Maximal 40 Stunden pro Woche (38,5 Stunden in vielen Kollektivverträgen)
• Überstundenvergütung mit 50% Zuschlag
• Tägliche Ruhezeit von mindestens 11 Stunden
• Wöchentliche Ruhezeit von mindestens 36 Stunden
• Maximal 10 Stunden pro Tag einschließlich Überstunden

Urlaub und Freistellung:
• Mindestens 5 Wochen bezahlter Urlaub pro Jahr (6 Wochen nach 25 Jahren beim selben Arbeitgeber)
• Bezahlter Krankenstand bei Krankheit
• Mutterschutz und Vaterschaftsurlaub
• Bildungskarenz-Optionen

Faire Behandlung:
• Gleicher Lohn für gleiche Arbeit unabhängig vom Geschlecht
• Schutz vor Diskriminierung aufgrund von Religion, Ethnizität, Alter oder sexueller Orientierung
• Recht auf Gewerkschaftsbeitritt und Betriebsrat
• Schutz vor ungerechtfertigter Kündigung

Kündigungsrechte:
• Ordnungsgemäße Kündigungsfristen basierend auf Beschäftigungsdauer
• Abfertigung unter bestimmten Umständen
• Recht, ungerechtfertigte Kündigungen anzufechten

Sicherheit und Gesundheit:
• Sichere Arbeitsbedingungen und Ausrüstung
• Regelmäßige Gesundheits- und Sicherheitsschulungen
• Unfallversicherungsschutz
• Recht, gefährliche Arbeit zu verweigern

Wenn Ihre Rechte verletzt werden, können Sie kontaktieren:
• Österreichische Arbeiterkammer
• Gewerkschaften in Ihrem Sektor
• Arbeitsgerichte für rechtliche Streitigkeiten
• Gleichbehandlungskommission für Diskriminierungsfälle

Dokumentation ist wichtig - führen Sie Aufzeichnungen über Arbeitszeiten, Lohnabrechnungen und jegliche Kommunikation über Arbeitsplatzprobleme.`
    },
    links: [
      {
        title: { en: 'Austrian Chamber of Labor', de: 'Österreichische Arbeiterkammer' },
        url: 'https://www.arbeiterkammer.at'
      },
      {
        title: { en: 'Labor Law Information', de: 'Arbeitsrecht Informationen' },
        url: 'https://www.help.gv.at/Portal.Node/hlpd/public/content/12/Seite.120000.html'
      },
      {
        title: { en: 'Equal Treatment Office', de: 'Gleichbehandlungsanwaltschaft' },
        url: 'https://www.gleichbehandlungsanwaltschaft.gv.at'
      }
    ],
    videoTitle: {
      en: 'Understanding Your Labor Rights',
      de: 'Ihre Arbeitsrechte verstehen'
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

export default LaborRightsPage;