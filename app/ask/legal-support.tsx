import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/language/common';
import { useTranslation } from 'react-i18next';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import BaseQuizModal from '../../components/BaseQuizModal';
import FilterSection from '../../components/FilterSection';
import QuizControls from '../../components/QuizControls';
import LegalSupportList from '../../components/LegalSupportList';
import VirtualAssistantModal from '../../components/VirtualAssistantModal';
import TutorialModal from '../../components/TutorialModal';
import legalSupportEntitiesData from '../../data/courses/legal-support-entities.json';


interface LegalSupportEntity {
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

const LegalSupportPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(['askLegal', 'common']);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
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
      question: t('askLegal:whatLegalSupportNeeded'),
      answers: [
        { key: 'general', value: t('askLegal:general')},
        { key: 'asylum-procedures', value: t('askLegal:asylumProcedures')},
        { key: 'appeals', value: t('askLegal:appeals')},
        { key: 'residence-permits', value: t('askLegal:residencePermits')},
        { key: 'family-reunification', value: t('askLegal:familyReunification')},
        { key: 'citizenship', value: t('askLegal:citizenship')},
        { key: 'detention', value: t('askLegal:detention')},
        { key: 'discrimination', value: t('askLegal:discrimination')},
        { key: 'work-rights', value: t('askLegal:workRights')},
        { key: 'legal-representation', value: t('askLegal:legalRepresentation')}
      ],
      key: 'supportType' as keyof typeof quizAnswers
    },
    {
      question: t('askLegal:whereAreYouLocated'),
      answers: locations.map(location => ({ key: location.toLowerCase(), value: t(`common:${location.toLowerCase().replace(" ", "")}`)})),
      key: 'location' as keyof typeof quizAnswers
    }
  ];

  const handleQuizAnswer = (answer: any) => {
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

  const pageTitle = t('askLegal:legalSupport');
  const pageDescription = t('askLegal:findLegalCounseling');

  // Filter groups for FilterSection with multi-lingual labels
  const filterGroups = [
    {
      title: t('askLegal:supportType'),
      items: supportTypes,
      selectedItems: selectedSupportTypes,
      onToggle: toggleSupportType,
      displayLabels: supportTypes.reduce((acc, type) => ({
        ...acc,
        [type]: type.replace('-', ' ')
      }), {})
    },
    {
      title: t('common:location'),
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
          title={t('askLegal:legalSupportAssistant')}
          subtitle={t('askLegal:answerQuestionsForLegalCounseling')}
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
          title={t('common:filters')}
          languageCode={language.code}
          filterGroups={filterGroups}
          onClearFilters={clearFilters}
          getTranslation={(key: string) => t(`askLegal:${key}`)}
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
