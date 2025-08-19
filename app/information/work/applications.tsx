import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';
import HighlightedText from '../../../components/HighlightedText';

const ApplicationsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);;
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const handleVideoPress = () => {
    Linking.openURL('https://youtube.com/watch?v=dQw4w9WgXcQ');
  };

  const definitions = {
    'CV': {
      en: 'Curriculum Vitae - a document summarizing your education, work experience, and skills.',
      de: 'Lebenslauf - ein Dokument, das Ihre Ausbildung, Berufserfahrung und Fähigkeiten zusammenfasst.',
      terms: {
        en: ['resume', 'résumé'],
        de: ['Lebenslauf']
      }
    },
    'cover letter': {
      en: 'A letter accompanying your CV that explains your motivation and qualifications for a specific job.',
      de: 'Ein Brief, der Ihren Lebenslauf begleitet und Ihre Motivation und Qualifikationen für eine bestimmte Stelle erklärt.',
      terms: {
        en: ['motivation letter'],
        de: ['Motivationsschreiben', 'Anschreiben']
      }
    },
    'references': {
      en: 'Contact information of previous employers or colleagues who can vouch for your work performance.',
      de: 'Kontaktdaten früherer Arbeitgeber oder Kollegen, die für Ihre Arbeitsleistung bürgen können.',
      terms: {
        en: [],
        de: ['Referenzen']
      }
    },
    'portfolio': {
      en: 'A collection of work samples demonstrating your skills and achievements in your field.',
      de: 'Eine Sammlung von Arbeitsproben, die Ihre Fähigkeiten und Erfolge in Ihrem Bereich demonstrieren.',
      terms: {
        en: [],
        de: ['Portfolio']
      }
    }
  };

  const content = {
    title: {
      en: 'Job Applications in Austria',
      de: 'Bewerbungen in Österreich'
    },
    subtitle: {
      en: 'How to Create Successful Applications',
      de: 'Wie man erfolgreiche Bewerbungen erstellt'
    },
    text: {
      en: `Creating effective job applications is crucial for success in the Austrian job market. Understanding local expectations and standards will significantly improve your chances.

A complete Austrian job application typically includes:
• CV (Lebenslauf) - comprehensive overview of your background
• Cover letter (Motivationsschreiben) - personalized for each position
• Certificates and diplomas
• References from previous employers
• Portfolio (for creative or technical roles)

Your CV should follow the European format and include:
- Personal information with photo
- Professional experience in reverse chronological order
- Education and qualifications
- Languages and proficiency levels
- Computer skills and certifications
- Hobbies and interests (briefly)

The cover letter must be tailored to each specific job and company. Address the hiring manager by name when possible, explain your motivation, highlight relevant experience, and demonstrate knowledge of the company.

Professional formatting is important. Use clean, simple layouts with consistent fonts. Ensure all documents are error-free and professionally presented.

Online applications are increasingly common. Create profiles on job platforms and company websites. Upload high-quality PDF documents and follow specific instructions carefully.

Interview preparation is equally important. Research the company, practice common questions in German, and prepare questions about the role and company culture.

Follow up appropriately after submitting applications, but avoid being pushy. A polite email after one week is generally acceptable.`,
      de: `Das Erstellen effektiver Bewerbungen ist entscheidend für den Erfolg auf dem österreichischen Arbeitsmarkt. Das Verständnis lokaler Erwartungen und Standards wird Ihre Chancen erheblich verbessern.

Eine vollständige österreichische Bewerbung umfasst normalerweise:
• Lebenslauf - umfassender Überblick über Ihren Hintergrund
• Motivationsschreiben - personalisiert für jede Position
• Zeugnisse und Diplome
• Referenzen von früheren Arbeitgebern
• Portfolio (für kreative oder technische Rollen)

Ihr Lebenslauf sollte dem europäischen Format folgen und enthalten:
- Persönliche Informationen mit Foto
- Berufserfahrung in umgekehrt chronologischer Reihenfolge
- Bildung und Qualifikationen
- Sprachen und Kenntnisstufen
- Computerkenntnisse und Zertifikate
- Hobbys und Interessen (kurz)

Das Motivationsschreiben muss für jeden spezifischen Job und jedes Unternehmen angepasst werden. Sprechen Sie den Personalverantwortlichen wenn möglich mit Namen an, erklären Sie Ihre Motivation, heben Sie relevante Erfahrungen hervor und zeigen Sie Wissen über das Unternehmen.

Professionelle Formatierung ist wichtig. Verwenden Sie saubere, einfache Layouts mit einheitlichen Schriftarten. Stellen Sie sicher, dass alle Dokumente fehlerfrei und professionell präsentiert sind.

Online-Bewerbungen werden immer häufiger. Erstellen Sie Profile auf Jobplattformen und Unternehmenswebsites. Laden Sie hochwertige PDF-Dokumente hoch und befolgen Sie spezifische Anweisungen sorgfältig.

Vorbereitung auf Vorstellungsgespräche ist ebenso wichtig. Recherchieren Sie das Unternehmen, üben Sie häufige Fragen auf Deutsch und bereiten Sie Fragen zur Rolle und Unternehmenskultur vor.

Folgen Sie angemessen nach dem Einreichen von Bewerbungen nach, aber vermeiden Sie es, aufdringlich zu sein. Eine höfliche E-Mail nach einer Woche ist allgemein akzeptabel.`
    },
    links: [
      {
        title: { en: 'CV Templates Austria', de: 'Lebenslauf Vorlagen Österreich' },
        url: 'https://www.karriere.at/blog/lebenslauf-muster'
      },
      {
        title: { en: 'Job Interview Tips', de: 'Tipps für Vorstellungsgespräche' },
        url: 'https://www.ams.at/arbeitsuchende/arbeitslos-was-tun/bewerbung'
      },
      {
        title: { en: 'Application Documents Guide', de: 'Leitfaden für Bewerbungsunterlagen' },
        url: 'https://www.help.gv.at/Portal.Node/hlpd/public/content/12/Seite.120210.html'
      }
    ],
    videoTitle: {
      en: 'Perfect Job Application in Austria',
      de: 'Perfekte Bewerbung in Österreich'
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

export default ApplicationsPage;