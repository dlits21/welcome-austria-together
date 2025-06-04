
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/languages/common';
import PageNavigation from '../../components/PageNavigation';
import LegalSupportQuizModal from '../../components/LegalSupportQuizModal';
import LegalSupportList from '../../components/LegalSupportList';

interface LegalSupportEntity {
  id: string;
  title: {
    en: string;
    de: string;
  };
  subtitle: {
    en: string;
    de: string;
  };
  location: string;
  supportTypes: string[];
  description: {
    en: string;
    de: string;
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
}

const legalSupportEntities: LegalSupportEntity[] = [
  {
    id: 'bbu-gmbh',
    title: { 
      en: 'BBU GmbH (Federal Agency for Care and Support Services)', 
      de: 'BBU GmbH (Bundesagentur für Betreuungs- und Unterstützungsleistungen)' 
    },
    subtitle: { 
      en: 'Free legal counseling for asylum seekers, including appeals and detention cases.', 
      de: 'Kostenlose Rechtsberatung für Asylsuchende, einschließlich Berufungen und Haftfälle.' 
    },
    location: 'Nationwide',
    supportTypes: ['asylum-procedures', 'appeals', 'detention'],
    description: {
      en: 'BBU provides comprehensive legal support for asylum seekers throughout Austria.',
      de: 'BBU bietet umfassende Rechtsunterstützung für Asylsuchende in ganz Österreich.'
    },
    contact: {
      phone: '+43 1 234 5678',
      email: 'info@bbu.gv.at',
      website: 'https://www.bbu.gv.at'
    }
  },
  {
    id: 'rechtsberatung-wien',
    title: { 
      en: 'Legal Counseling Vienna', 
      de: 'Rechtsberatung Wien' 
    },
    subtitle: { 
      en: 'Specialized legal advice for residence permits and family reunification.', 
      de: 'Spezialisierte Rechtsberatung für Aufenthaltstitel und Familienzusammenführung.' 
    },
    location: 'Vienna',
    supportTypes: ['residence-permits', 'family-reunification', 'general'],
    description: {
      en: 'Providing expert legal guidance for immigration matters in Vienna.',
      de: 'Expertenberatung für Einwanderungsangelegenheiten in Wien.'
    },
    contact: {
      phone: '+43 1 987 6543',
      email: 'beratung@wien.gv.at',
      address: 'Rathaus, 1010 Wien'
    }
  },
  {
    id: 'citizenship-support-graz',
    title: { 
      en: 'Citizenship Support Center Graz', 
      de: 'Staatsbürgerschaftsberatung Graz' 
    },
    subtitle: { 
      en: 'Assistance with citizenship applications and procedures.', 
      de: 'Unterstützung bei Staatsbürgerschaftsanträgen und -verfahren.' 
    },
    location: 'Graz',
    supportTypes: ['citizenship', 'general'],
    description: {
      en: 'Specialized support for citizenship applications in Styria.',
      de: 'Spezialisierte Unterstützung für Staatsbürgerschaftsanträge in der Steiermark.'
    },
    contact: {
      phone: '+43 316 123 456',
      email: 'citizenship@graz.at'
    }
  },
  {
    id: 'work-rights-linz',
    title: { 
      en: 'Work Rights Legal Aid Linz', 
      de: 'Arbeitsrechtsberatung Linz' 
    },
    subtitle: { 
      en: 'Legal support for work permits and employment rights.', 
      de: 'Rechtsunterstützung für Arbeitserlaubnisse und Arbeitsrechte.' 
    },
    location: 'Linz',
    supportTypes: ['work-rights', 'general'],
    description: {
      en: 'Expert advice on work permits and employment law for migrants.',
      de: 'Expertenberatung zu Arbeitserlaubnissen und Arbeitsrecht für Migranten.'
    },
    contact: {
      phone: '+43 732 789 012',
      email: 'work@linz.at'
    }
  },
  {
    id: 'discrimination-support',
    title: { 
      en: 'Anti-Discrimination Legal Service', 
      de: 'Antidiskriminierungs-Rechtsdienst' 
    },
    subtitle: { 
      en: 'Legal representation for discrimination cases.', 
      de: 'Rechtsvertretung bei Diskriminierungsfällen.' 
    },
    location: 'Vienna',
    supportTypes: ['discrimination', 'legal-representation'],
    description: {
      en: 'Specialized legal service for cases of discrimination and equal rights.',
      de: 'Spezialisierter Rechtsdienst für Diskriminierungsfälle und Gleichberechtigung.'
    },
    contact: {
      phone: '+43 1 456 789',
      email: 'discrimination@equalrights.at'
    }
  }
];

const LegalSupportPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filteredEntities, setFilteredEntities] = useState<LegalSupportEntity[]>(legalSupportEntities);
  
  // Quiz states
  const [showQuiz, setShowQuiz] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    supportType: '',
    location: ''
  });
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Extract unique locations
  const locations = Array.from(new Set(legalSupportEntities.map(entity => entity.location)));

  // Quiz questions
  const quizQuestions = [
    {
      question: language.code === 'de' 
        ? 'Wofür benötigen Sie Rechtsunterstützung?' 
        : 'What do you need legal support for?',
      answers: [
        { key: 'general', en: 'General', de: 'Allgemein' },
        { key: 'asylum-procedures', en: 'Asylum Procedures', de: 'Asylverfahren' },
        { key: 'appeals', en: 'Appeals', de: 'Berufungen' },
        { key: 'residence-permits', en: 'Residence Permits', de: 'Aufenthaltstitel' },
        { key: 'family-reunification', en: 'Family Reunification', de: 'Familienzusammenführung' },
        { key: 'citizenship', en: 'Citizenship', de: 'Staatsbürgerschaft' },
        { key: 'detention', en: 'Detention', de: 'Haft' },
        { key: 'voluntary-return', en: 'Voluntary Return', de: 'Freiwillige Rückkehr' },
        { key: 'discrimination', en: 'Discrimination', de: 'Diskriminierung' },
        { key: 'work-rights', en: 'Work Rights', de: 'Arbeitsrechte' },
        { key: 'legal-representation', en: 'Legal Representation', de: 'Rechtsvertretung' }
      ],
      key: 'supportType' as keyof typeof quizAnswers
    },
    {
      question: language.code === 'de' 
        ? 'Wo befinden Sie sich?' 
        : 'What is your location?',
      answers: locations.map(location => ({ key: location.toLowerCase(), en: location, de: location })),
      key: 'location' as keyof typeof quizAnswers
    }
  ];

  // Apply filters based on quiz answers
  useEffect(() => {
    let results = legalSupportEntities;
    
    if (quizAnswers.supportType) {
      results = results.filter(entity => 
        entity.supportTypes.includes(quizAnswers.supportType)
      );
    }
    
    if (quizAnswers.location) {
      const selectedLocation = locations.find(loc => 
        loc.toLowerCase() === quizAnswers.location
      );
      if (selectedLocation) {
        results = results.filter(entity => 
          entity.location === selectedLocation || entity.location === 'Nationwide'
        );
      }
    }
    
    setFilteredEntities(results);
  }, [quizAnswers]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleQuizAnswer = (answer: string | { key: string, en: string, de: string }) => {
    const answerValue = typeof answer === 'string' ? answer : answer.key;
    const questionKey = quizQuestions[currentQuestion].key;
    
    setQuizAnswers(prev => ({
      ...prev,
      [questionKey]: answerValue
    }));

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowQuiz(false);
    }
  };

  const handleSkipQuiz = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowQuiz(false);
    }
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  const resetQuiz = () => {
    setQuizAnswers({ supportType: '', location: '' });
    setCurrentQuestion(0);
    setShowQuiz(true);
  };

  const pageTitle = language.code === 'de' ? 'Rechtsunterstützung' : 'Legal Support';
  const pageDescription = language.code === 'de' 
    ? 'Finden Sie Rechtsberatung und Unterstützung in Ihrer Nähe.'
    : 'Find legal counseling and support in your area.';

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{pageTitle}</Text>
        <Text style={styles.description}>{pageDescription}</Text>
        
        {/* Quiz Modal */}
        <LegalSupportQuizModal
          visible={showQuiz}
          currentQuestion={currentQuestion}
          questions={quizQuestions}
          languageCode={language.code}
          onAnswer={handleQuizAnswer}
          onSkip={handleSkipQuiz}
          onClose={handleCloseQuiz}
        />
        
        {/* Show reset quiz button when quiz is completed */}
        {!showQuiz && (
          <View style={styles.resetQuizContainer}>
            <TouchableOpacity style={styles.resetQuizButton} onPress={resetQuiz}>
              <MaterialIcons name="refresh" size={20} color="#3B82F6" />
              <Text style={styles.resetQuizText}>
                {language.code === 'de' ? 'Quiz zurücksetzen' : 'Reset Quiz'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Legal Support List */}
        {!showQuiz && (
          <LegalSupportList 
            entities={filteredEntities}
            languageCode={language.code}
          />
        )}
      </View>
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
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  resetQuizContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  resetQuizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  resetQuizText: {
    color: '#3B82F6',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
});

export default LegalSupportPage;
