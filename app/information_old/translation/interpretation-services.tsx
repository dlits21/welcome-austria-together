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
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';
import QuizModal from '../../../components/QuizModal';
import GenericSupportList from '../../../components/GenericSupportList';

const InterpretationServicesPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showQuiz, setShowQuiz] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [filters, setFilters] = useState<Record<string, any>>({});
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const content = {
    en: {
      title: "Interpretation Services",
      subtitle: "Find Professional Interpreters in Your Area",
      description: "Connect with professional interpreters for **medical appointments**, **legal proceedings**, **business meetings**, and **personal consultations**.",
      startQuiz: "Find Interpretation Services",
      results: "services found"
    },
    de: {
      title: "Dolmetscherdienste",
      subtitle: "Finden Sie professionelle Dolmetscher in Ihrer Nähe",
      description: "Verbinden Sie sich mit professionellen Dolmetschern für **medizinische Termine**, **Gerichtsverfahren**, **Geschäftstreffen** und **persönliche Beratungen**.",
      startQuiz: "Dolmetscherdienste finden",
      results: "Dienste gefunden"
    }
  };

  const currentContent = content[language.code as keyof typeof content] || content.en;

  const quizQuestions = [
    {
      question: language.code === 'de' ? 
        'In welcher Region benötigen Sie Dolmetscherdienste?' : 
        'In which region do you need interpretation services?',
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
        'Für welche Art von Termin benötigen Sie einen Dolmetscher?' : 
        'What type of appointment do you need an interpreter for?',
      answers: [
        language.code === 'de' ? 'Medizinische Termine' : 'Medical Appointments',
        language.code === 'de' ? 'Gerichtsverfahren' : 'Legal Proceedings', 
        language.code === 'de' ? 'Geschäftstreffen' : 'Business Meetings',
        language.code === 'de' ? 'Behördentermine' : 'Government Appointments',
        language.code === 'de' ? 'Bildungsberatung' : 'Educational Counseling',
        language.code === 'de' ? 'Persönliche Beratung' : 'Personal Consultation'
      ],
      key: 'serviceType'
    }
  ];

  // Mock interpretation services data
  const interpretationServices = [
    {
      id: '1',
      name: { en: 'Vienna Medical Interpreters', de: 'Wiener Medizinische Dolmetscher' },
      category: 'medical',
      urgency: 'urgent',
      supportType: 'interpretation',
      location: 'Vienna',
      description: { 
        en: 'Specialized medical interpreters available 24/7 for emergency and scheduled medical appointments.',
        de: 'Spezialisierte medizinische Dolmetscher rund um die Uhr für Notfall- und geplante Arzttermine verfügbar.'
      },
      supportTypes: ['Medical Appointments', 'Emergency Services'],
      specializations: ['Emergency interpretation', 'Hospital services', 'Specialist consultations'],
      contact: {
        phone: '+43 1 234 5678',
        email: 'emergency@vienna-interpreters.at',
        website: 'https://vienna-interpreters.at',
        address: 'Währinger Straße 25, 1090 Vienna'
      },
      languages: ['German', 'English', 'Arabic', 'Turkish'],
      cost: 'paid',
      openingHours: '24/7 Emergency Service'
    },
    {
      id: '2', 
      name: { en: 'Legal Interpretation Austria', de: 'Gerichtsdolmetscher Österreich' },
      category: 'legal',
      urgency: 'non-urgent',
      supportType: 'interpretation',
      location: 'Nationwide',
      description: {
        en: 'Certified court interpreters for legal proceedings, police interviews, and official hearings.',
        de: 'Zertifizierte Gerichtsdolmetscher für Gerichtsverfahren, Polizeiverhöre und offizielle Anhörungen.'
      },
      supportTypes: ['Legal Proceedings', 'Government Appointments'],
      specializations: ['Court certified', 'Police interviews', 'Legal consultations'],
      contact: {
        phone: '+43 1 567 8901',
        email: 'court@legal-interpreters.at',
        website: 'https://legal-interpreters.at',
        address: 'Available nationwide'
      },
      languages: ['German', 'English', 'French', 'Russian'],
      cost: 'paid',
      openingHours: 'Mon-Fri 8:00-18:00'
    },
    {
      id: '3',
      name: { en: 'Business Communication Services', de: 'Geschäftskommunikationsdienste' },
      category: 'business',
      urgency: 'non-urgent', 
      supportType: 'interpretation',
      location: 'Online',
      description: {
        en: 'Professional interpreters for business meetings, conferences, and corporate events.',
        de: 'Professionelle Dolmetscher für Geschäftstreffen, Konferenzen und Firmenveranstaltungen.'
      },
      supportTypes: ['Business Meetings', 'Conferences'],
      specializations: ['Conference interpretation', 'Business negotiations', 'Video conferencing'],
      contact: {
        phone: '+43 2 123 4567',
        email: 'business@comm-services.com',
        website: 'https://business-comm.com',
        address: 'Online and on-site services'
      },
      languages: ['German', 'English', 'Spanish', 'Italian'],
      cost: 'paid',
      openingHours: 'Mon-Fri 9:00-17:00'
    },
    {
      id: '4',
      name: { en: 'Community Integration Support', de: 'Gemeinde-Integrationshilfe' },
      category: 'community',
      urgency: 'non-urgent',
      supportType: 'interpretation', 
      location: 'Salzburg',
      description: {
        en: 'Community-based interpretation services for personal consultations, educational counseling, and social services.',
        de: 'Gemeinde-basierte Dolmetscherdienste für persönliche Beratungen, Bildungsberatung und Sozialdienste.'
      },
      supportTypes: ['Personal Consultation', 'Educational Counseling'],
      specializations: ['Social services', 'Educational support', 'Community integration'],
      contact: {
        phone: '+43 662 789 012',
        email: 'community@integration-support.at',
        website: 'https://integration-support.at', 
        address: 'Mirabellplatz 4, 5020 Salzburg'
      },
      languages: ['German', 'English', 'Dari', 'Arabic'],
      cost: 'free',
      openingHours: 'Mon-Thu 9:00-16:00, Fri 9:00-14:00'
    },
    {
      id: '5',
      name: { en: 'Remote Interpretation Network', de: 'Fern-Dolmetschnetzwerk' },
      category: 'remote',
      urgency: 'urgent',
      supportType: 'interpretation',
      location: 'Online',
      description: {
        en: 'On-demand remote interpretation services via phone and video for immediate language support.',
        de: 'On-Demand-Fernmündliche Dolmetscherdienste per Telefon und Video für sofortige Sprachunterstützung.'
      },
      supportTypes: ['Emergency Services', 'Medical Appointments', 'Government Appointments'],
      specializations: ['Immediate availability', 'Phone interpretation', 'Video calls'],
      contact: {
        phone: '+43 800 111 222',
        email: 'support@remote-interpret.at',
        website: 'https://remote-interpret.at',
        address: 'Available 24/7 online'
      },
      languages: ['German', 'English', 'Turkish', 'Bosnian', 'Serbian'],
      cost: 'paid',
      openingHours: '24/7 On-Demand Service'
    }
  ];

  const categoryConfig = {
    medical: { icon: 'local-hospital', color: '#EF4444' },
    legal: { icon: 'gavel', color: '#3B82F6' },
    business: { icon: 'business', color: '#10B981' },
    community: { icon: 'people', color: '#F59E0B' },
    remote: { icon: 'videocam', color: '#8B5CF6' },
    government: { icon: 'account-balance', color: '#06B6D4' }
  };

  const getTranslation = (key: string, languageCode: string) => {
    const translations: Record<string, Record<string, string>> = {
      'Medical Appointments': { en: 'Medical Appointments', de: 'Medizinische Termine' },
      'Legal Proceedings': { en: 'Legal Proceedings', de: 'Gerichtsverfahren' },
      'Business Meetings': { en: 'Business Meetings', de: 'Geschäftstreffen' },
      'Government Appointments': { en: 'Government Appointments', de: 'Behördentermine' },
      'Educational Counseling': { en: 'Educational Counseling', de: 'Bildungsberatung' },
      'Personal Consultation': { en: 'Personal Consultation', de: 'Persönliche Beratung' },
      'Emergency Services': { en: 'Emergency Services', de: 'Notdienste' },
      'Conferences': { en: 'Conferences', de: 'Konferenzen' },
      medical: { en: 'Medical', de: 'Medizin' },
      legal: { en: 'Legal', de: 'Recht' },
      business: { en: 'Business', de: 'Geschäft' },
      community: { en: 'Community', de: 'Gemeinde' },
      remote: { en: 'Remote', de: 'Fernmündlich' },
      government: { en: 'Government', de: 'Behörden' }
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
            entities={interpretationServices}
            filters={filters}
            languageCode={language.code}
            onResetFilters={resetFilters}
            getTranslation={getTranslation}
            routePrefix="/information/translation/interpretation-services"
            categoryConfig={categoryConfig}
            noResultsText={language.code === 'de' ? 
              'Keine Dolmetscherdienste gefunden. Versuchen Sie, Ihre Filter zu ändern.' :
              'No interpretation services found. Try adjusting your filters.'
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

export default InterpretationServicesPage;