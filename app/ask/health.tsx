
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/language/common';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import BaseQuizModal from '../../components/BaseQuizModal';
import FilterSection from '../../components/FilterSection';
import QuizControls from '../../components/QuizControls';
import HealthSupportList from '../../components/HealthSupportList';
import VirtualAssistantModal from '../../components/VirtualAssistantModal';
import TutorialModal from '../../components/TutorialModal';
import healthEntitiesData from '../../data/courses/health-support-entities.json';
import { getAskHealthText, getGlobalText } from '../../utils/languageUtils';

interface HealthSupportEntity {
  id: string;
  title: any;
  subtitle: any;
  location: string;
  supportTypes: string[];
  specializations: string[];
  description: any;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
}

const HealthSupportPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

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

  // Quiz questions with multi-lingual support
  const quizQuestions = [
    {
      question: getAskHealthText('howUrgentlyNeedSupport', currentLanguage),
      answers: [
        { key: 'immediate', value: getGlobalText('immediate', currentLanguage) },
        { key: 'soon', value: getGlobalText('soon', currentLanguage) },
        { key: 'routine', value: getAskHealthText('routine', currentLanguage) }
      ],
      key: 'urgency' as keyof typeof quizAnswers
    },
    {
      question: getAskHealthText('whatTypeHealthSupport', currentLanguage),
      answers: [
        { key: 'generalPractice', value: getAskHealthText('generalPractice', currentLanguage) },
        { key: 'mentalHealth', value: getAskHealthText('mentalHealth', currentLanguage) },
        { key: 'specializedCare', value: getAskHealthText('specializedCare', currentLanguage) },
        { key: 'emergency', value: getAskHealthText('emergency', currentLanguage) },
        { key: 'womenHealth', value: getAskHealthText('womenHealth', currentLanguage) },
        { key: 'dental', value: getAskHealthText('dental', currentLanguage) },
        { key: 'pharmacy', value: getAskHealthText('pharmacy', currentLanguage) },
        { key: 'community', value: getAskHealthText('community', currentLanguage) }
      ],
      key: 'supportType' as keyof typeof quizAnswers
    },
    {
      question: getAskHealthText('whereAreYouLocated', currentLanguage),
      answers: locations.map(location => ({ key: location.toLowerCase(), value: getGlobalText(location.toLowerCase().replace(" ", ""), currentLanguage) })),
      key: 'location' as keyof typeof quizAnswers
    }
  ];

  const handleQuizAnswer = (answer: string | { key: string, value: string }) => {
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

  const pageTitle = getAskHealthText('healthSupport', currentLanguage);
  const pageDescription = getAskHealthText('findHealthServices', currentLanguage);

  // Filter groups for FilterSection with multi-lingual labels
  const filterGroups = [
    {
      title: getAskHealthText('supportType', currentLanguage),
      items: supportTypes,
      selectedItems: selectedSupportTypes,
      onToggle: toggleSupportType,
      displayLabels: supportTypes.reduce((acc, type) => ({
        ...acc,
        [type]: type.replace('-', ' ')
      }), {})
    },
    {
      title: getGlobalText('location', currentLanguage),
      items: locations,
      selectedItems: selectedLocations,
      onToggle: toggleLocation
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
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
          title={getAskHealthText('healthSupportAssistant', currentLanguage)}
          subtitle={getAskHealthText('answerQuestionsForHealthServices', currentLanguage)}
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
          title={getGlobalText('filters', currentLanguage)}
          languageCode={language.code}
          filterGroups={filterGroups}
          onClearFilters={clearFilters}
          getTranslation={getAskHealthText}
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
        tutorialData="ask-health"
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
