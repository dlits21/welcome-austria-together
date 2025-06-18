
import React, { useState } from 'react';
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
import documentCertificationEntitiesData from '../../data/courses/document-certification-entities.json';

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
      question: language.code === 'de' 
        ? 'Wie dringend benötigen Sie Dokumentenhilfe?' 
        : 'How urgently do you need document assistance?',
      answers: [
        { key: 'immediate', en: 'Immediate/Urgent', de: 'Sofort/Dringend' },
        { key: 'soon', en: 'Within a few weeks', de: 'Innerhalb weniger Wochen' },
        { key: 'planning', en: 'Planning ahead', de: 'Vorausplanung' }
      ],
      key: 'urgency' as keyof typeof quizAnswers
    },
    {
      question: language.code === 'de' 
        ? 'Welche Art von Dokumentenhilfe benötigen Sie?' 
        : 'What type of document assistance do you need?',
      answers: [
        { key: 'document-translation', en: 'Document Translation', de: 'Dokumentenübersetzung' },
        { key: 'credential-recognition', en: 'Credential Recognition', de: 'Anerkennung von Qualifikationen' },
        { key: 'legal-translation', en: 'Legal Document Translation', de: 'Rechtsdokumentenübersetzung' },
        { key: 'professional-certification', en: 'Professional Certification', de: 'Berufliche Zertifizierung' },
        { key: 'document-assistance', en: 'General Document Assistance', de: 'Allgemeine Dokumentenhilfe' },
        { key: 'application-support', en: 'Application Support', de: 'Antragsunterstützung' },
        { key: 'academic-evaluation', en: 'Academic Evaluation', de: 'Akademische Bewertung' }
      ],
      key: 'supportType' as keyof typeof quizAnswers
    },
    {
      question: language.code === 'de' 
        ? 'Wo befinden Sie sich?' 
        : 'What is your location?',
      answers: locations.length > 0 
        ? locations.map(location => ({ key: location.toLowerCase(), en: location, de: location }))
        : [{ key: 'nationwide', en: 'Nationwide', de: 'Österreichweit' }],
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

  const pageTitle = language.code === 'de' ? 'Dokumente & Zertifizierung' : 'Documents & Certification';
  const pageDescription = language.code === 'de' 
    ? 'Finden Sie Unterstützung bei Dokumentenübersetzung, Anerkennung und Zertifizierung.'
    : 'Find support for document translation, recognition and certification services.';

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
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{pageTitle}</Text>
        <Text style={styles.description}>{pageDescription}</Text>
        
        <BaseQuizModal
          visible={showQuiz}
          currentQuestion={currentQuestion}
          questions={quizQuestions}
          languageCode={language.code}
          title={language.code === 'de' ? 'Dokumenten-Assistent' : 'Document Support Assistant'}
          subtitle={language.code === 'de' 
            ? 'Beantworten Sie ein paar Fragen, um passende Dokumentendienste zu finden.'
            : 'Answer a few questions to find suitable document services.'}
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
