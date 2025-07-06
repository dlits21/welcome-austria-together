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
import FinancialSupportList from '../../components/FinancialSupportList';
import VirtualAssistantModal from '../../components/VirtualAssistantModal';
import TutorialModal from '../../components/TutorialModal';
import financialLiteracyEntitiesData from '../../data/courses/financial-literacy-entities.json';
import { getAskFinancialText, getGlobalText } from '../../utils/languageUtils';

interface FinancialSupportEntity {
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

const FinancialSupportPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Convert JSON data to array format
  const financialSupportEntities: FinancialSupportEntity[] = Object.values(financialLiteracyEntitiesData);
  
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
  const locations = Array.from(new Set(financialSupportEntities.map(entity => entity.location)));
  const supportTypes = Array.from(new Set(financialSupportEntities.flatMap(entity => entity.supportTypes)));

  // Create filters object for GenericSupportList
  const filters = {
    urgency: quizAnswers.urgency,
    supportType: selectedSupportTypes.length > 0 ? selectedSupportTypes[0] : quizAnswers.supportType,
    location: selectedLocations.length > 0 ? selectedLocations[0] : quizAnswers.location
  };

  // Quiz questions with multi-lingual support
  const quizQuestions = [
    {
      question: getAskFinancialText('howUrgentlyNeedSupport', currentLanguage),
      answers: [
        { key: 'immediate', value: getAskFinancialText('immediate', currentLanguage) },
        { key: 'soon', value: getAskFinancialText('soon', currentLanguage) },
        { key: 'planning', value: getAskFinancialText('planning', currentLanguage) }
      ],
      key: 'urgency' as keyof typeof quizAnswers
    },
    {
      question: getAskFinancialText('whatTypeFinancialSupport', currentLanguage),
      answers: [
        { key: 'budgeting', value: getAskFinancialText('budgeting', currentLanguage) },
        { key: 'debt-counseling', value: getAskFinancialText('debtCounseling', currentLanguage) },
        { key: 'financial-planning', value: getAskFinancialText('financialPlanning', currentLanguage) },
        { key: 'investment-courses', value: getAskFinancialText('investmentCourses', currentLanguage) },
        { key: 'banking-basics', value: getAskFinancialText('bankingBasics', currentLanguage) },
        { key: 'emergency-aid', value: getAskFinancialText('emergencyAid', currentLanguage) },
        { key: 'financial-education', value: getAskFinancialText('financialEducation', currentLanguage) }
      ],
      key: 'supportType' as keyof typeof quizAnswers
    },
    {
      question: getAskFinancialText('whereAreYouLocated', currentLanguage),
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

  const pageTitle = getAskFinancialText('financialSupport', currentLanguage);
  const pageDescription = getAskFinancialText('findFinancialServices', currentLanguage);

  // Filter groups for FilterSection with multi-lingual labels
  const filterGroups = [
    {
      title: getAskFinancialText('supportType', currentLanguage),
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
          title={getAskFinancialText('financialSupportAssistant', currentLanguage)}
          subtitle={getAskFinancialText('answerQuestionsForFinancialServices', currentLanguage)}
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
          getTranslation={getAskFinancialText}
        />
        
        {!showQuiz && (
          <FinancialSupportList 
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
        tutorialData="ask-financial"
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

export default FinancialSupportPage;
