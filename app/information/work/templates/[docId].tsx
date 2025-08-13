import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { languages } from '../../../../data/languages/common';
import PageNavigation from '../../../../components/PageNavigation';
import LanguageModal from '../../../../components/LanguageModal';
import VirtualAssistantModal from '../../../../components/VirtualAssistantModal';
import TutorialModal from '../../../../components/TutorialModal';

const TEMPLATE_CONTENT = {
  'cv': {
    title: { en: 'CV (Lebenslauf)', de: 'Lebenslauf (CV)' },
    sections: {
      en: [
        'Personal Information',
        'Professional Summary (2-3 sentences)',
        'Work Experience (job title, company, dates, key achievements)',
        'Education (degree, institution, dates)',
        'Skills (languages, software, technical skills)',
        'Certificates and Trainings',
        'References (optional)'
      ],
      de: [
        'Persönliche Daten',
        'Kurzprofil (2-3 Sätze)',
        'Berufserfahrung (Position, Unternehmen, Zeitraum, Erfolge)',
        'Ausbildung (Abschluss, Institution, Zeitraum)',
        'Fähigkeiten (Sprachen, Software, technische Fähigkeiten)',
        'Zertifikate und Schulungen',
        'Referenzen (optional)'
      ]
    }
  },
  'cover-letter': {
    title: { en: 'Cover Letter', de: 'Anschreiben' },
    sections: {
      en: [
        'Introduction: Who you are and the role you are applying for',
        'Motivation: Why you are interested in this position/company',
        'Fit: Your relevant experience and skills',
        'Closing: Availability and thanks',
      ],
      de: [
        'Einleitung: Wer Sie sind und für welche Stelle Sie sich bewerben',
        'Motivation: Warum Sie an Position/Unternehmen interessiert sind',
        'Eignung: Relevante Erfahrungen und Fähigkeiten',
        'Schluss: Verfügbarkeit und Dank',
      ]
    }
  },
  'resignation-letter': {
    title: { en: 'Resignation Letter', de: 'Kündigungsschreiben' },
    sections: {
      en: [
        'Formal greeting',
        'Statement of resignation and last working day',
        'Thanks for the opportunity',
        'Offer to support handover',
      ],
      de: [
        'Formelle Anrede',
        'Aussage zur Kündigung und letzter Arbeitstag',
        'Dank für die Zusammenarbeit',
        'Angebot zur Unterstützung der Übergabe',
      ]
    }
  },
  'job-contract': {
    title: { en: 'Job Contract Sample', de: 'Arbeitsvertrag Muster' },
    sections: {
      en: [
        'Employer and employee details',
        'Job title and responsibilities',
        'Working hours and location',
        'Salary and benefits',
        'Probation period and termination terms',
      ],
      de: [
        'Daten von Arbeitgeber und Arbeitnehmer',
        'Stellenbezeichnung und Aufgaben',
        'Arbeitszeiten und -ort',
        'Gehalt und Zusatzleistungen',
        'Probezeit und Kündigungsbedingungen',
      ]
    }
  },
  'reference-letter': {
    title: { en: 'Reference Letter', de: 'Arbeitszeugnis' },
    sections: {
      en: [
        'Employee details and employment period',
        'Duties and achievements',
        'Skills and conduct',
        'Overall assessment and closing',
      ],
      de: [
        'Mitarbeiterdaten und Beschäftigungszeitraum',
        'Aufgaben und Leistungen',
        'Fähigkeiten und Verhalten',
        'Gesamtbewertung und Schluss',
      ]
    }
  },
  'salary-negotiation': {
    title: { en: 'Salary Negotiation Email', de: 'Gehaltverhandlungs-E-Mail' },
    sections: {
      en: [
        'Thanks for the offer and enthusiasm',
        'Your value and market range',
        'Specific salary request',
        'Flexibility and next steps',
      ],
      de: [
        'Dank für das Angebot und Motivation',
        'Ihr Mehrwert und Marktspanne',
        'Konkrete Gehaltsvorstellung',
        'Flexibilität und nächste Schritte',
      ]
    }
  },
} as const;

type TemplateKey = keyof typeof TEMPLATE_CONTENT;

const TemplateDetailPage: React.FC = () => {
  const { docId } = useLocalSearchParams();
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const language = languages.find(l => l.code === currentLanguage) || languages[1];

  const id = Array.isArray(docId) ? docId[0] : docId;
  const data = id && (TEMPLATE_CONTENT as any)[id as TemplateKey];

  const [showLanguageModal, setShowLanguageModal] = React.useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  if (!id || !data) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <Text style={styles.title}>Not found</Text>
          <Text style={styles.subtitle}>Template "{id}" does not exist.</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>{language.code === 'de' ? 'Zurück' : 'Back'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const sections = language.code === 'de' ? data.sections.de : data.sections.en;

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{language.code === 'de' ? data.title.de : data.title.en}</Text>

        <Text style={styles.lead}>
          {language.code === 'de'
            ? 'Diese Vorlage zeigt die üblichen Abschnitte. Passen Sie die Inhalte an Ihre Situation an.'
            : 'This template shows the common sections. Adapt the content to your situation.'}
        </Text>

        <View style={styles.section}>
          {sections.map((s, idx) => (
            <View key={idx} style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.itemText}>{s}</Text>
            </View>
          ))}
        </View>

        <View style={styles.linksSection}>
          <Text style={styles.sectionTitle}>{language.code === 'de' ? 'Nützliche Links' : 'Useful Links'}</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://europa.eu/europass/en/create-europass-cv')} style={styles.linkItem}>
            <Text style={styles.linkText}>Europass CV</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.karriere.at/lebenslauf')} style={styles.linkItem}>
            <Text style={styles.linkText}>karriere.at CV Tools</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <LanguageModal visible={showLanguageModal} onClose={() => setShowLanguageModal(false)} languageCode={language.code} />
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

export default TemplateDetailPage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: '#1f2937' },
  subtitle: { fontSize: 16, color: '#6b7280', marginBottom: 20 },
  lead: { fontSize: 16, color: '#374151', lineHeight: 24, marginBottom: 16 },
  section: { marginBottom: 24 },
  bulletItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  bullet: { fontSize: 18, lineHeight: 22, marginRight: 8, color: '#1f2937' },
  itemText: { flex: 1, fontSize: 16, lineHeight: 22, color: '#374151' },
  backBtn: { marginTop: 8, paddingVertical: 10 },
  backBtnText: { color: '#3B82F6', fontSize: 16 },
  linksSection: { marginTop: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#1f2937', marginBottom: 12 },
  linkItem: { paddingVertical: 8 },
  linkText: { color: '#3B82F6', fontSize: 16 },
});
