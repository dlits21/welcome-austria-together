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
import DocumentSupportList from '../../components/DocumentSupportList';
import VirtualAssistantModal from '../../components/VirtualAssistantModal';
import documentCertificationEntitiesData from '../../data/courses/document-certification-entities.json';
import { getAskDocumentText, getGlobalText } from '../../utils/languageUtils';

interface DocumentSupportEntity {
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

const DocumentSupportPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  
  // Convert JSON data to array format
  const documentSupportEntities: DocumentSupportEntity[] = documentCertificationEntitiesData.entities || [];
  
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

  // Extract unique locations and support types with safety checks
  const locations = Array.from(new Set(documentSupportEntities.map(entity => entity.location).filter(Boolean)));
  const supportTypes = Array.from(new Set(documentSupportEntities.flatMap(entity => entity.supportTypes || []).filter(Boolean)));

  // Create filters object for GenericSupportList
  const filters = {
    urgency: quizAnswers.urgency,
    supportType: selectedSupportTypes.length > 0 ? selectedSupportTypes[0] : quizAnswers.supportType,
    location: selectedLocations.length > 0 ? selectedLocations[0] : quizAnswers.location
  };

  // Quiz questions for document and certification support
  const quizQuestions = [
    {
      question: getAskDocumentText('howUrgentlyNeedDocumentAssistance', currentLanguage),
      answers: [
        { key: 'immediate', value: getGlobalText('immediate', currentLanguage) },
        { key: 'soon', value: getGlobalText('soon', currentLanguage) },
        { key: 'planning', value: getGlobalText('planning', currentLanguage) }
      ],
      key: 'urgency' as keyof typeof quizAnswers
    },
    {
      question: getAskDocumentText('whatTypeDocumentAssistance', currentLanguage),
      answers: [
        { key: 'document-translation', value: getAskDocumentText('documentTranslation', currentLanguage) },
        { key: 'credential-recognition', value: getAskDocumentText('credentialRecognition', currentLanguage) },
        { key: 'legal-translation', value: getAskDocumentText('legalTranslation', currentLanguage) },
        { key: 'professional-certification', value: getAskDocumentText('professionalCertification', currentLanguage) },
        { key: 'document-assistance', value: getAskDocumentText('documentAssistance', currentLanguage) },
        { key: 'application-support', value: getAskDocumentText('applicationSupport', currentLanguage) },
        { key: 'academic-evaluation', value: getAskDocumentText('academicEvaluation', currentLanguage) }
      ],
      key: 'supportType' as keyof typeof quizAnswers
    },
    {
      question: getGlobalText('whereAreYouLocated', currentLanguage),
      answers: locations.length > 0 
        ? locations.map(location => ({ 
            key: location.toLowerCase(), 
            value: getGlobalText(location.toLowerCase().replace(" ", ""), currentLanguage) 
          }))
        : [{ key: 'nationwide', value: getGlobalText('nationwide', currentLanguage) }],
      key: 'location' as keyof typeof quizAnswers
    }
  ];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

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

  const pageTitle = getAskDocumentText('documentsAndCertification', currentLanguage);
  const pageDescription = getAskDocumentText('findDocumentServices', currentLanguage);

  // Filter groups for FilterSection
  const filterGroups = [
    {
      title: getGlobalText('supportType', currentLanguage),
      items: supportTypes,
      selectedItems: selectedSupportTypes,
      onToggle: toggleSupportType,
      displayLabels: supportTypes.reduce((acc, type) => ({
        ...acc,
        [type]: getAskDocumentText(type.replace('-', '').replace(' ', ''), currentLanguage)
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
          title={getAskDocumentText('documentSupportAssistant', currentLanguage)}
          subtitle={getAskDocumentText('answerQuestionsForDocumentServices', currentLanguage)}
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
          getTranslation={getAskDocumentText}
        />
        
        {!showQuiz && (
          <DocumentSupportList 
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

export default DocumentSupportPage;
