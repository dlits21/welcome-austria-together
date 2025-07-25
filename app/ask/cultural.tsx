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
import BaseQuizModal from '../../components/BaseQuizModal';
import FilterSection from '../../components/FilterSection';
import QuizControls from '../../components/QuizControls';
import TutorialModal from '../../components/TutorialModal';
import CulturalSupportList from '../../components/CulturalSupportList';
import VirtualAssistantModal from '../../components/VirtualAssistantModal';
import culturalIntegrationEntitiesData from '../../data/courses/cultural-integration-entities.json';
import { getAskCulturalText, getGlobalText } from '../../utils/languageUtils';

interface CulturalIntegrationEntity {
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

const CulturalSupportPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
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

  // Updated quiz questions with multi-lingual support
  const quizQuestions = [
    {
      question: getAskCulturalText('howUrgentlyNeedSupport', currentLanguage),
      answers: [
        { key: 'immediate', value: getGlobalText('immediate', currentLanguage) },
        { key: 'soon', value: getGlobalText('soon', currentLanguage) },
        { key: 'planning', value: getGlobalText('planning', currentLanguage) }
      ],
      key: 'urgency' as keyof typeof quizAnswers
    },
    {
      question: getAskCulturalText('whatTypeIntegrationSupport', currentLanguage),
      answers: [
        { key: 'language-courses', value: getAskCulturalText('languageCourses', currentLanguage) },
        { key: 'legal-advice', value: getAskCulturalText('legalAdvice', currentLanguage) },
        { key: 'cultural-workshops', value: getAskCulturalText('culturalWorkshops', currentLanguage) },
        { key: 'networking-events', value: getAskCulturalText('networkingEvents', currentLanguage) },
        { key: 'translation-services', value: getAskCulturalText('translationServices', currentLanguage) },
        { key: 'orientation-programs', value: getAskCulturalText('orientationPrograms', currentLanguage) },
        { key: 'community-support', value: getAskCulturalText('communitySupport', currentLanguage) }
      ],
      key: 'supportType' as keyof typeof quizAnswers
    },
    {
      question: getAskCulturalText('whereAreYouLocated', currentLanguage),
      answers: finalLocations.map(location => ({ 
        key: location.toLowerCase(), 
        value: getGlobalText(location.toLowerCase().replace(" ", ""), currentLanguage) 
      })),
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

  const pageTitle = getAskCulturalText('culturalIntegration', currentLanguage);
  const pageDescription = getAskCulturalText('findCulturalIntegrationServices', currentLanguage);

  // Filter groups for FilterSection with multi-lingual labels
  const filterGroups = [
    {
      title: getAskCulturalText('supportType', currentLanguage),
      items: supportTypes,
      selectedItems: selectedSupportTypes,
      onToggle: toggleSupportType,
      displayLabels: supportTypes.reduce((acc, type) => ({
        ...acc,
        [type]: getAskCulturalText(type.replace('-', '').replace(' ', ''), currentLanguage)
      }), {})
    },
    {
      title: getGlobalText('location', currentLanguage),
      items: finalLocations,
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
          title={getAskCulturalText('culturalIntegrationAssistant', currentLanguage)}
          subtitle={getAskCulturalText('answerQuestionsForIntegrationServices', currentLanguage)}
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
          getTranslation={getAskCulturalText}
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
        tutorialData="ask-cultural"
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
