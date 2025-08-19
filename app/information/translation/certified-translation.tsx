import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';
import QuizModal from '../../../components/QuizModal';
import GenericSupportList from '../../../components/GenericSupportList';

const CertifiedTranslationPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showQuiz, setShowQuiz] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const router = useRouter();
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const content = {
    en: {
      title: "Certified Translation",
      subtitle: "Find Certified Translators in Your Area",
      description: "Connect with certified professional translators for official documents, legal papers, and important communications.",
      startQuiz: "Find Certified Translators",
      results: "results found"
    },
    de: {
      title: "Beglaubigte Übersetzung",
      subtitle: "Finden Sie zertifizierte Übersetzer in Ihrer Nähe",
      description: "Verbinden Sie sich mit zertifizierten professionellen Übersetzern für offizielle Dokumente, Rechtspapiere und wichtige Kommunikation.",
      startQuiz: "Zertifizierte Übersetzer finden",
      results: "Ergebnisse gefunden"
    }
  };

  const currentContent = content[language.code as keyof typeof content] || content.en;

  const quizQuestions = [
    {
      question: language.code === 'de' ? 
        'In welcher Region suchen Sie einen zertifizierten Übersetzer?' : 
        'In which region are you looking for a certified translator?',
      answers: [
        'Vienna',
        'Salzburg', 
        'Innsbruck',
        'Graz',
        'Linz',
        'Online',
        'Nationwide'
      ],
      key: 'location'
    },
    {
      question: language.code === 'de' ? 
        'Welche Art von Dokument möchten Sie übersetzen lassen?' : 
        'What type of document do you need translated?',
      answers: [
        language.code === 'de' ? 'Rechtsdokumente' : 'Legal Documents',
        language.code === 'de' ? 'Medizinische Dokumente' : 'Medical Documents', 
        language.code === 'de' ? 'Bildungszeugnisse' : 'Educational Certificates',
        language.code === 'de' ? 'Geschäftsdokumente' : 'Business Documents',
        language.code === 'de' ? 'Persönliche Dokumente' : 'Personal Documents',
        language.code === 'de' ? 'Technische Dokumente' : 'Technical Documents'
      ],
      key: 'documentType'
    }
  ];

  // Mock certified translator data
  const certifiedTranslators = [
    {
      id: '1',
      name: { en: 'Dr. Maria Schmidt Translation Services', de: 'Dr. Maria Schmidt Übersetzungsdienste' },
      category: 'legal',
      urgency: 'non-urgent',
      supportType: 'translation',
      location: 'Vienna',
      description: { 
        en: 'Certified court translator with 15+ years experience in legal and medical translations.',
        de: 'Beglaubigte Gerichtsdolmetscherin mit 15+ Jahren Erfahrung in juristischen und medizinischen Übersetzungen.'
      },
      supportTypes: ['Legal Documents', 'Medical Documents'],
      specializations: ['Court certified', 'Sworn translator', 'Legal expertise'],
      contact: {
        phone: '+43 1 123 4567',
        email: 'maria.schmidt@translations.at',
        website: 'https://schmidt-translations.at',
        address: 'Mariahilfer Straße 45, 1060 Vienna'
      },
      languages: ['German', 'English', 'French'],
      cost: 'paid',
      openingHours: 'Mon-Fri 9:00-17:00'
    },
    {
      id: '2', 
      name: { en: 'Academic Translations Austria', de: 'Akademische Übersetzungen Österreich' },
      category: 'educational',
      urgency: 'non-urgent',
      supportType: 'translation',
      location: 'Salzburg',
      description: {
        en: 'Specialized in educational certificates and academic document translation.',
        de: 'Spezialisiert auf Bildungszeugnisse und akademische Dokumentenübersetzung.'
      },
      supportTypes: ['Educational Certificates', 'Business Documents'],
      specializations: ['University certificates', 'Diploma recognition', 'Academic credentials'],
      contact: {
        phone: '+43 662 111 222',
        email: 'info@academic-translations.at',
        website: 'https://academic-translations.at',
        address: 'Getreidegasse 12, 5020 Salzburg'
      },
      languages: ['German', 'English', 'Spanish'],
      cost: 'paid',
      openingHours: 'Mon-Fri 8:30-16:30'
    },
    {
      id: '3',
      name: { en: 'TechDoc Translations', de: 'TechDoc Übersetzungen' },
      category: 'technical',
      urgency: 'non-urgent', 
      supportType: 'translation',
      location: 'Online',
      description: {
        en: 'Technical document specialists with certified translators for engineering and IT documentation.',
        de: 'Technische Dokumentenspezialisten mit zertifizierten Übersetzern für Ingenieur- und IT-Dokumentation.'
      },
      supportTypes: ['Technical Documents', 'Business Documents'],
      specializations: ['Engineering documents', 'IT translations', 'Patent translations'],
      contact: {
        phone: '+43 1 999 8888',
        email: 'contact@techdoc-translations.com',
        website: 'https://techdoc-translations.com',
        address: 'Online service available nationwide'
      },
      languages: ['German', 'English', 'Italian'],
      cost: 'paid',
      openingHours: '24/7 online service'
    },
    {
      id: '4',
      name: { en: 'Personal Document Services', de: 'Persönliche Dokumentendienste' },
      category: 'personal',
      urgency: 'urgent',
      supportType: 'translation', 
      location: 'Graz',
      description: {
        en: 'Fast and reliable certified translations for personal documents including birth certificates, marriage certificates.',
        de: 'Schnelle und zuverlässige beglaubigte Übersetzungen für persönliche Dokumente einschließlich Geburtsurkunden, Heiratsurkunden.'
      },
      supportTypes: ['Personal Documents', 'Legal Documents'],
      specializations: ['Birth certificates', 'Marriage certificates', 'Identity documents'],
      contact: {
        phone: '+43 316 123 456',
        email: 'service@personal-docs.at',
        website: 'https://personal-docs.at', 
        address: 'Hauptplatz 8, 8010 Graz'
      },
      languages: ['German', 'English', 'Turkish'],
      cost: 'paid',
      openingHours: 'Mon-Sat 9:00-18:00'
    }
  ];

  const categoryConfig = {
    legal: { icon: 'gavel', color: '#EF4444' },
    educational: { icon: 'school', color: '#3B82F6' },
    technical: { icon: 'engineering', color: '#10B981' },
    personal: { icon: 'person', color: '#F59E0B' },
    medical: { icon: 'local-hospital', color: '#8B5CF6' },
    business: { icon: 'business', color: '#06B6D4' }
  };

  const getTranslation = (key: string, languageCode: string) => {
    const translations: Record<string, Record<string, string>> = {
      'Legal Documents': { en: 'Legal Documents', de: 'Rechtsdokumente' },
      'Medical Documents': { en: 'Medical Documents', de: 'Medizinische Dokumente' },
      'Educational Certificates': { en: 'Educational Certificates', de: 'Bildungszeugnisse' },
      'Business Documents': { en: 'Business Documents', de: 'Geschäftsdokumente' },
      'Personal Documents': { en: 'Personal Documents', de: 'Persönliche Dokumente' },
      'Technical Documents': { en: 'Technical Documents', de: 'Technische Dokumente' },
      legal: { en: 'Legal', de: 'Recht' },
      educational: { en: 'Education', de: 'Bildung' },
      technical: { en: 'Technical', de: 'Technisch' },
      personal: { en: 'Personal', de: 'Persönlich' },
      medical: { en: 'Medical', de: 'Medizin' },
      business: { en: 'Business', de: 'Geschäft' }
    };
    return translations[key]?.[languageCode] || key;
  };

  const handleQuizAnswer = (answer: string | { key: string; value: string }) => {
    const currentQ = quizQuestions[currentQuestion];
    const answerValue = typeof answer === 'string' ? answer : answer.value;
    
    setFilters(prev => ({
      ...prev,
      [currentQ.key]: answerValue
    }));

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowQuiz(false);
    }
  };

  const handleQuizSkip = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowQuiz(false);
    }
  };

  const resetFilters = () => {
    setFilters({});
    setCurrentQuestion(0);
    setShowQuiz(true);
  };

  const parseMarkdownText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <Text key={index} style={styles.boldText}>
            {part.slice(2, -2)}
          </Text>
        );
      }
      return part;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />
      
      <ScrollView style={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← {language.code === 'de' ? 'Zurück' : 'Back'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{currentContent.title}</Text>
        <Text style={styles.subtitle}>{currentContent.subtitle}</Text>
        <Text style={styles.description}>{parseMarkdownText(currentContent.description)}</Text>

        {showQuiz ? (
          <View style={styles.quizContainer}>
            <TouchableOpacity 
              style={styles.startQuizButton}
              onPress={() => setShowQuiz(true)}
            >
              <Text style={styles.startQuizText}>{currentContent.startQuiz}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <GenericSupportList
            entities={certifiedTranslators}
            filters={filters}
            languageCode={language.code}
            onResetFilters={resetFilters}
            getTranslation={getTranslation}
            routePrefix="/information/translation/certified-translation"
            categoryConfig={categoryConfig}
            noResultsText={language.code === 'de' ? 
              'Keine zertifizierten Übersetzer gefunden. Versuchen Sie, Ihre Filter zu ändern.' :
              'No certified translators found. Try adjusting your filters.'
            }
            resetFiltersText={language.code === 'de' ? 'Filter zurücksetzen' : 'Reset Filters'}
            resultsFoundText={currentContent.results}
          />
        )}
      </ScrollView>
      
      <QuizModal
        visible={showQuiz}
        currentQuestion={currentQuestion}
        questions={quizQuestions}
        languageCode={language.code}
        onAnswer={handleQuizAnswer}
        onSkip={handleQuizSkip}
        onClose={() => setShowQuiz(false)}
      />
      
      <LanguageModal 
        visible={showLanguageModal} 
        onClose={() => setShowLanguageModal(false)} 
        languageCode={language.code}
      />
      
      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
        languageCode={language.code}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={language.code}
        tutorialData="translation"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: '#3B82F6',
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
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6B7280',
    marginBottom: 24,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
  quizContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  startQuizButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startQuizText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CertifiedTranslationPage;