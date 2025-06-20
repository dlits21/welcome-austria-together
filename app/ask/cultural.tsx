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
import CulturalSupportList from '../../components/CulturalSupportList';
import VirtualAssistantModal from '../../components/VirtualAssistantModal';
import culturalIntegrationEntitiesData from '../../data/courses/cultural-integration-entities.json';

interface CulturalIntegrationEntity {
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

const CulturalSupportPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  
  // Convert JSON data to array format - handle both structures
  const culturalIntegrationEntities: CulturalIntegrationEntity[] = culturalIntegrationEntitiesData.entities ? 
    Object.values(culturalIntegrationEntitiesData.entities) : 
    Object.values(culturalIntegrationEntitiesData);
  
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

  // Extract unique locations and support types with fallbacks
  const locations = Array.from(new Set(
    culturalIntegrationEntities
      .map(entity => entity.location)
      .filter(location => location) // Filter out undefined/null values
  ));
  
  const supportTypes = Array.from(new Set(
    culturalIntegrationEntities
      .flatMap(entity => entity.supportTypes || [])
      .filter(type => type) // Filter out undefined/null values
  ));

  // Add fallback locations if none found
  const finalLocations = locations.length > 0 ? locations : ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck'];

  // Create filters object for GenericSupportList
  const filters = {
    urgency: quizAnswers.urgency,
    supportType: selectedSupportTypes.length > 0 ? selectedSupportTypes[0] : quizAnswers.supportType,
    location: selectedLocations.length > 0 ? selectedLocations[0] : quizAnswers.location
  };

  // Updated quiz questions for cultural integration
  const quizQuestions = [
    {
      question: language.code === 'de' 
        ? 'Wie dringend benötigen Sie Unterstützung bei der kulturellen Integration?' 
        : 'How urgently do you need cultural integration support?',
      answers: [
        { key: 'immediate', en: 'Immediate/Emergency', de: 'Sofort/Notfall' },
        { key: 'soon', en: 'Within a few weeks', de: 'Innerhalb weniger Wochen' },
        { key: 'planning', en: 'Planning ahead', de: 'Vorausplanung' }
      ],
      key: 'urgency' as keyof typeof quizAnswers
    },
    {
      question: language.code === 'de' 
        ? 'Welche Art von Unterstützung benötigen Sie?' 
        : 'What type of support do you need?',
      answers: [
        { key: 'language-courses', en: 'Language courses', de: 'Sprachkurse' },
        { key: 'legal-advice', en: 'Legal advice', de: 'Rechtsberatung' },
        { key: 'cultural-workshops', en: 'Cultural workshops', de: 'Kulturworkshops' },
        { key: 'networking-events', en: 'Networking events', de: 'Networking-Veranstaltungen' },
        { key: 'translation-services', en: 'Translation services', de: 'Übersetzungsdienste' },
        { key: 'orientation-programs', en: 'Orientation programs', de: 'Orientierungsprogramme' },
        { key: 'community-support', en: 'Community support', de: 'Gemeinschaftliche Unterstützung' }
      ],
      key: 'supportType' as keyof typeof quizAnswers
    },
    {
      question: language.code === 'de' 
        ? 'Wo befinden Sie sich?' 
        : 'What is your location?',
      answers: finalLocations.map(location => ({ key: location.toLowerCase(), en: location, de: location })),
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
      const locationName = finalLocations.find(loc => loc.toLowerCase() === answerValue);
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

  const pageTitle = language.code === 'de' ? 'Kulturelle Integration' : 'Cultural Integration';
  const pageDescription = language.code === 'de' 
    ? 'Finden Sie Unterstützung für die kulturelle Integration in Ihrer Nähe.'
    : 'Find cultural integration support services in your area.';

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
      items: finalLocations,
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
          title={language.code === 'de' ? 'Integrations-Assistent' : 'Cultural Integration Assistant'}
          subtitle={language.code === 'de' 
            ? 'Beantworten Sie ein paar Fragen, um passende Integrationsdienste zu finden.'
            : 'Answer a few questions to find suitable integration services.'}
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
          <CulturalSupportList 
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

export default CulturalSupportPage;
