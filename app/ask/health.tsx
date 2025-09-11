
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import BaseQuizModal from '../../components/BaseQuizModal';
import FilterSection from '../../components/FilterSection';
import QuizControls from '../../components/QuizControls';
import HealthSupportList from '../../components/HealthSupportList';
import VirtualAssistantModal from '../../components/VirtualAssistantModal';
import TutorialModal from '../../components/TutorialModal';
import healthEntitiesData from '../../data/courses/health-support-entities.json';


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
  const { t } = useTranslation(['askHealth', 'common']);
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
      question: t('askHealth:howUrgentlyNeedSupport'),
      answers: [
        { key: 'immediate', value: t('common:immediate') },
        { key: 'soon', value: t('common:soon') },
        { key: 'routine', value: t('askHealth:routine') }
      ],
      key: 'urgency' as keyof typeof quizAnswers
    },
    {
      question: t('askHealth:whatTypeHealthSupport'),
      answers: [
        { key: 'generalPractice', value: t('askHealth:generalPractice') },
        { key: 'mentalHealth', value: t('askHealth:mentalHealth') },
        { key: 'specializedCare', value: t('askHealth:specializedCare') },
        { key: 'emergency', value: t('askHealth:emergency') },
        { key: 'womenHealth', value: t('askHealth:womenHealth') },
        { key: 'dental', value: t('askHealth:dental') },
        { key: 'pharmacy', value: t('askHealth:pharmacy') },
        { key: 'community', value: t('askHealth:community') }
      ],
      key: 'supportType' as keyof typeof quizAnswers
    },
    {
      question: t('askHealth:whereAreYouLocated'),
      answers: locations.map(location => ({ key: location.toLowerCase(), value: t(`common:${location.toLowerCase().replace(" ", "")}`) })),
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

  const pageTitle = t('askHealth:healthSupport');
  const pageDescription = t('askHealth:findHealthServices');

  // Filter groups for FilterSection with multi-lingual labels
  const filterGroups = [
    {
      title: t('askHealth:supportType'),
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
          languageCode={currentLanguage}
          title={t('askHealth:healthSupportAssistant')}
          subtitle={t('askHealth:answerQuestionsForHealthServices')}
          onAnswer={handleQuizAnswer}
          onSkip={handleSkipQuiz}
          onClose={handleCloseQuiz}
        />
        
        {!showQuiz && (
          <QuizControls
            languageCode={currentLanguage}
            onResetQuiz={resetQuiz}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />
        )}

        <FilterSection
          visible={!showQuiz && showFilters}
          title={t('common:filters')}
          languageCode={currentLanguage}
          filterGroups={filterGroups}
          onClearFilters={clearFilters}
          getTranslation={(key: string) => t(`askHealth:${key}`)}
        />
        
        {!showQuiz && (
          <HealthSupportList 
            filters={filters}
            languageCode={currentLanguage}
            onResetFilters={clearFilters}
          />
        )}
      </View>

      {/* Language Modal */}
      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        languageCode={currentLanguage}
      />

      {/* Virtual Assistant Modal */}
      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
        languageCode={currentLanguage}
      />

      {/* Tutorial Modal */}
      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={currentLanguage}
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
