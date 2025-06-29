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
import LegalSupportList from '../../components/LegalSupportList';
import VirtualAssistantModal from '../../components/VirtualAssistantModal';
import TutorialModal from '../../components/TutorialModal';
import legalSupportEntitiesData from '../../data/courses/legal-support-entities.json';

// Import legal support translations
import legalSupportTranslations from '../../data/language/ask/legal-support.json';

const getLegalSupportText = (key: string, languageCode: string): string => {
  const translation = legalSupportTranslations[key as keyof typeof legalSupportTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.en || key;
};

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

const LegalSupportPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // Convert JSON data to array format
  const legalSupportEntities: LegalSupportEntity[] = Object.values(legalSupportEntitiesData);
  
  // Quiz states
  const [showQuiz, setShowQuiz] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    supportType: '',
    location: ''
  });
  
  // Filter states
  const [selectedSupportTypes, setSelectedSupportTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Extract unique locations and support types
  const locations = Array.from(new Set(legalSupportEntities.map(entity => entity.location)));
  const supportTypes = Array.from(new Set(legalSupportEntities.flatMap(entity => entity.supportTypes)));

  // Create filters object for GenericSupportList
  const filters = {
    supportType: selectedSupportTypes.length > 0 ? selectedSupportTypes[0] : '',
    location: selectedLocations.length > 0 ? selectedLocations[0] : '',
    urgency: ''
  };

  // Quiz questions with multi-lingual support
  const quizQuestions = [
    {
      question: getLegalSupportText('whatLegalSupportNeeded', currentLanguage),
      answers: [
        { key: 'general', en: getLegalSupportText('general', 'en'), de: getLegalSupportText('general', 'de') },
        { key: 'asylum-procedures', en: getLegalSupportText('asylumProcedures', 'en'), de: getLegalSupportText('asylumProcedures', 'de') },
        { key: 'appeals', en: getLegalSupportText('appeals', 'en'), de: getLegalSupportText('appeals', 'de') },
        { key: 'residence-permits', en: getLegalSupportText('residencePermits', 'en'), de: getLegalSupportText('residencePermits', 'de') },
        { key: 'family-reunification', en: getLegalSupportText('familyReunification', 'en'), de: getLegalSupportText('familyReunification', 'de') },
        { key: 'citizenship', en: getLegalSupportText('citizenship', 'en'), de: getLegalSupportText('citizenship', 'de') },
        { key: 'detention', en: getLegalSupportText('detention', 'en'), de: getLegalSupportText('detention', 'de') },
        { key: 'discrimination', en: getLegalSupportText('discrimination', 'en'), de: getLegalSupportText('discrimination', 'de') },
        { key: 'work-rights', en: getLegalSupportText('workRights', 'en'), de: getLegalSupportText('workRights', 'de') },
        { key: 'legal-representation', en: getLegalSupportText('legalRepresentation', 'en'), de: getLegalSupportText('legalRepresentation', 'de') }
      ],
      key: 'supportType' as keyof typeof quizAnswers
    },
    {
      question: getLegalSupportText('whereAreYouLocated', currentLanguage),
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
    setQuizAnswers({ supportType: '', location: '' });
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

  const pageTitle = getLegalSupportText('legalSupport', currentLanguage);
  const pageDescription = getLegalSupportText('findLegalCounseling', currentLanguage);

  // Filter groups for FilterSection with multi-lingual labels
  const filterGroups = [
    {
      title: getLegalSupportText('supportType', currentLanguage),
      items: supportTypes,
      selectedItems: selectedSupportTypes,
      onToggle: toggleSupportType,
      displayLabels: supportTypes.reduce((acc, type) => ({
        ...acc,
        [type]: type.replace('-', ' ')
      }), {})
    },
    {
      title: getLegalSupportText('location', currentLanguage),
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
        showTutorial={() => setShowTutorial(true)}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{pageTitle}</Text>
        <Text style={styles.description}>{pageDescription}</Text>
        
        <BaseQuizModal
          visible={showQuiz}
          currentQuestion={currentQuestion}
          questions={quizQuestions}
          languageCode={language.code}
          title={getLegalSupportText('legalSupportAssistant', currentLanguage)}
          subtitle={getLegalSupportText('answerQuestionsForLegalCounseling', currentLanguage)}
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
          title={getLegalSupportText('filters', currentLanguage)}
          languageCode={language.code}
          filterGroups={filterGroups}
          onClearFilters={clearFilters}
        />
        
        {!showQuiz && (
          <LegalSupportList 
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

      {/* Tutorial Modal */}
      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={language.code}
        tutorialData="ask-legal-support"
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

export default LegalSupportPage;
