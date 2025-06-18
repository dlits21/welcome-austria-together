
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/languages/common';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import HelpModal from '../../components/HelpModal';
import BaseQuizModal from '../../components/BaseQuizModal';
import FilterSection from '../../components/FilterSection';
import QuizControls from '../../components/QuizControls';
import HealthSupportList from '../../components/HealthSupportList';
import VirtualAssistantModal from '../../components/VirtualAssistantModal';
import healthEntitiesData from '../../data/courses/health-support-entities.json';

interface HealthSupportEntity {
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
  specializations: string[];
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

const HealthSupportPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);

  // Convert JSON data to array format
  const healthSupportEntities: HealthSupportEntity[] = healthEntitiesData.entities;
  
  // Quiz states
  const [showQuiz, setShowQuiz] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    urgency: '',
    supportType: '',
    location: ''
  });
  
  // Filter states
  const [selectedSupportTypes, setSelectedSupportTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Extract unique locations and support types
  const locations = Array.from(new Set(healthSupportEntities.map(entity => entity.location)));
  const supportTypes = Array.from(new Set(healthSupportEntities.flatMap(entity => entity.supportTypes)));

  // Create filters object for GenericSupportList
  const filters = {
    urgency: quizAnswers.urgency,
    supportType: selectedSupportTypes.length > 0 ? selectedSupportTypes[0] : quizAnswers.supportType,
    location: selectedLocations.length > 0 ? selectedLocations[0] : quizAnswers.location
  };

  // Updated quiz questions for health support
  const quizQuestions = [
    {
      question: language.code === 'de' 
        ? 'Wie dringend benötigen Sie Gesundheitsunterstützung?' 
        : 'How urgently do you need health support?',
      answers: [
        { key: 'immediate', en: 'Immediate/Emergency', de: 'Sofort/Notfall' },
        { key: 'soon', en: 'Within a few days', de: 'Innerhalb weniger Tage' },
        { key: 'routine', en: 'Routine checkup', de: 'Routineuntersuchung' }
      ],
      key: 'urgency' as keyof typeof quizAnswers
    },
    {
      question: language.code === 'de' 
        ? 'Welche Art von Gesundheitsunterstützung benötigen Sie?' 
        : 'What type of health support do you need?',
      answers: [
        { key: 'general-practice', en: 'General Practice', de: 'Allgemeinmedizin' },
        { key: 'mental-health', en: 'Mental Health Support', de: 'Psychische Gesundheit' },
        { key: 'specialized-care', en: 'Specialized Medical Care', de: 'Spezialisierte medizinische Versorgung' },
        { key: 'emergency', en: 'Emergency Services', de: 'Notfalldienstleistungen' },
        { key: 'women-health', en: 'Women\'s Health', de: 'Frauengesundheit' },
        { key: 'dental', en: 'Dental Care', de: 'Zahnmedizin' },
        { key: 'pharmacy', en: 'Pharmacy Services', de: 'Apothekendienstleistungen' },
        { key: 'community', en: 'Community Health Programs', de: 'Gemeinschaftsgesundheitsprogramme' }
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

    // Sync quiz answers with filter states
    if (questionKey === 'supportType') {
      setSelectedSupportTypes([answerValue]);
    } else if (questionKey === 'location') {
      const locationName = locations.find(loc => loc.toLowerCase() === answerValue);
      if (locationName) {
        setSelectedLocations([locationName]);
      }
    }

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
    setQuizAnswers({ urgency: '', supportType: '', location: '' });
    setCurrentQuestion(0);
    setShowQuiz(true);
  };

  const toggleSupportType = (type: string) => {
    setSelectedSupportTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const clearFilters = () => {
    setSelectedSupportTypes([]);
    setSelectedLocations([]);
  };

  const pageTitle = language.code === 'de' ? 'Gesundheitsunterstützung' : 'Health Support';
  const pageDescription = language.code === 'de' 
    ? 'Finden Sie Gesundheitsdienste und medizinische Unterstützung in Ihrer Nähe.'
    : 'Find health services and medical support in your area.';

  // Filter groups for FilterSection
  const filterGroups = [
    {
      title: language.code === 'de' ? 'Unterstützungstyp' : 'Support Type',
      items: supportTypes,
      selectedItems: selectedSupportTypes,
      onToggle: toggleSupportType,
      displayLabels: supportTypes.reduce((acc, type) => ({
        ...acc,
        [type]: type.replace('-', ' ')
      }), {})
    },
    {
      title: language.code === 'de' ? 'Standort' : 'Location',
      items: locations,
      selectedItems: selectedLocations,
      onToggle: toggleLocation
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{pageTitle}</Text>
        <Text style={styles.description}>{pageDescription}</Text>
        
        <BaseQuizModal
          visible={showQuiz}
          currentQuestion={currentQuestion}
          questions={quizQuestions}
          languageCode={language.code}
          title={language.code === 'de' ? 'Gesundheits-Assistent' : 'Health Support Assistant'}
          subtitle={language.code === 'de' 
            ? 'Beantworten Sie ein paar Fragen, um passende Gesundheitsdienste zu finden.'
            : 'Answer a few questions to find suitable health services.'}
          onAnswer={handleQuizAnswer}
          onSkip={handleSkipQuiz}
          onClose={handleCloseQuiz}
        />
        
        {!showQuiz && (
          <QuizControls
            languageCode={language.code}
            onResetQuiz={resetQuiz}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />
        )}

        <FilterSection
          visible={!showQuiz && showFilters}
          title={language.code === 'de' ? 'Filter' : 'Filters'}
          languageCode={language.code}
          filterGroups={filterGroups}
          onClearFilters={clearFilters}
        />
        
        {!showQuiz && (
          <HealthSupportList 
            filters={filters}
            languageCode={language.code}
            onResetFilters={clearFilters}
          />
        )}
      </View>

      {/* Language Modal */}
      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        languageCode={language.code}
      />

      {/* Help Modal */}
      <HelpModal
        visible={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        languageCode={language.code}
      />

      {/* Virtual Assistant Modal */}
      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
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
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
});

export default HealthSupportPage;
