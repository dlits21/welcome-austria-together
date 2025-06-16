
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
} from 'react-native';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import BaseQuizModal from '../../../components/BaseQuizModal';
import FilterSection from '../../../components/FilterSection';
import QuizControls from '../../../components/QuizControls';
import LegalSupportList from '../../../components/LegalSupportList';
import legalSupportData from '../../../data/courses/legal-support-entities.json';

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
  coordinates?: {
    lat: number;
    lng: number;
  };
  address?: string;
  services?: string[];
}

const LegalSupportIndexPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [entities, setEntities] = useState<LegalSupportEntity[]>([]);
  const [filteredEntities, setFilteredEntities] = useState<LegalSupportEntity[]>([]);
  
  // Quiz states
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // Filter states
  const [selectedSupportTypes, setSelectedSupportTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Convert JSON data to entity format
  useEffect(() => {
    const convertedEntities: LegalSupportEntity[] = Object.values(legalSupportData).map((entity: any) => ({
      id: entity.id,
      title: entity.title,
      subtitle: entity.subtitle,
      location: entity.location,
      supportTypes: entity.supportTypes,
      specializations: entity.specializations,
      description: entity.description,
      contact: entity.contact,
      coordinates: entity.coordinates,
      address: entity.address,
      services: entity.services
    }));

    setEntities(convertedEntities);
    setFilteredEntities(convertedEntities);
  }, []);

  // Extract unique locations and support types
  const locations = Array.from(new Set(entities.map(entity => entity.location)));
  const supportTypes = Array.from(new Set(entities.flatMap(entity => entity.supportTypes)));

  // Quiz questions
  const quizQuestions = [
    {
      question: language.code === 'de' 
        ? 'Wofür benötigen Sie Rechtsunterstützung?' 
        : 'What do you need legal support for?',
      answers: [
        { key: 'general', en: 'General', de: 'Allgemein' },
        { key: 'asylum-procedures', en: 'Asylum Procedures', de: 'Asylverfahren' },
        { key: 'appeals', en: 'Appeals', de: 'Berufungen' },
        { key: 'residence-permits', en: 'Residence Permits', de: 'Aufenthaltstitel' },
        { key: 'family-reunification', en: 'Family Reunification', de: 'Familienzusammenführung' },
        { key: 'citizenship', en: 'Citizenship', de: 'Staatsbürgerschaft' },
        { key: 'detention', en: 'Detention', de: 'Haft' },
        { key: 'discrimination', en: 'Discrimination', de: 'Diskriminierung' },
        { key: 'work-rights', en: 'Work Rights', de: 'Arbeitsrechte' },
        { key: 'legal-representation', en: 'Legal Representation', de: 'Rechtsvertretung' }
      ],
      key: 'supportType'
    },
    {
      question: language.code === 'de' 
        ? 'Wo befinden Sie sich?' 
        : 'What is your location?',
      answers: locations.map(location => ({ key: location.toLowerCase(), en: location, de: location })),
      key: 'location'
    }
  ];

  // Apply filters
  useEffect(() => {
    let filtered = entities;
    
    if (selectedSupportTypes.length > 0) {
      filtered = filtered.filter(entity => 
        entity.supportTypes.some(type => selectedSupportTypes.includes(type))
      );
    }
    
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(entity => 
        selectedLocations.includes(entity.location) || entity.location === 'Nationwide'
      );
    }
    
    setFilteredEntities(filtered);
  }, [entities, selectedSupportTypes, selectedLocations]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleQuizAnswer = (answer: string | { key: string, en: string, de: string }) => {
    const answerValue = typeof answer === 'string' ? answer : answer.key;
    const questionKey = quizQuestions[currentQuestion].key;
    
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
    setSelectedSupportTypes([]);
    setSelectedLocations([]);
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

  const pageTitle = language.code === 'de' ? 'Rechtsunterstützung' : 'Legal Support';
  const pageDescription = language.code === 'de' 
    ? 'Finden Sie Rechtsberatung und Unterstützung in Ihrer Nähe.'
    : 'Find legal counseling and support in your area.';

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
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{pageTitle}</Text>
        <Text style={styles.description}>{pageDescription}</Text>
        
        <BaseQuizModal
          visible={showQuiz}
          currentQuestion={currentQuestion}
          questions={quizQuestions}
          languageCode={language.code}
          title={language.code === 'de' ? 'Rechtshilfe-Assistent' : 'Legal Support Assistant'}
          subtitle={language.code === 'de' 
            ? 'Beantworten Sie ein paar Fragen, um passende Rechtsberatung zu finden.'
            : 'Answer a few questions to find suitable legal counseling.'}
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
          <LegalSupportList 
            entities={filteredEntities}
            languageCode={language.code}
          />
        )}
      </View>
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

export default LegalSupportIndexPage;
