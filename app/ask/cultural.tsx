
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/languages/common';
import PageNavigation from '../../components/PageNavigation';
import BaseQuizModal from '../../components/BaseQuizModal';
import CulturalSupportList from '../../components/CulturalSupportList';
import LanguageModal from '../../components/LanguageModal';
import HelpModal from '../../components/HelpModal';

interface QuizQuestion {
  question: string;
  answers: (string | { key: string; en: string; de: string })[];
  key: string;
}

const CulturalOrientation: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const [showQuiz, setShowQuiz] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, any>>({});
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const questions: QuizQuestion[] = language.code === 'de' ? [
    {
      key: 'urgency',
      question: 'Wie dringend benötigen Sie Unterstützung?',
      answers: [
        { key: 'urgent', en: 'Urgent - I need help immediately', de: 'Dringend - Ich brauche sofort Hilfe' },
        { key: 'non-urgent', en: 'Non-urgent - I can wait', de: 'Nicht dringend - Ich kann warten' }
      ]
    },
    {
      key: 'supportType',
      question: 'Welche Art von kultureller Unterstützung benötigen Sie?',
      answers: [
        { key: 'integration-courses', en: 'Integration Courses', de: 'Integrationskurse' },
        { key: 'cultural-orientation', en: 'Cultural Orientation', de: 'Kulturelle Orientierung' },
        { key: 'comprehensive-integration', en: 'Comprehensive Integration', de: 'Umfassende Integration' },
        { key: 'cultural-education', en: 'Cultural Education', de: 'Kulturelle Bildung' },
        { key: 'refugee-integration', en: 'Refugee Integration', de: 'Flüchtlingsintegration' },
        { key: 'community-integration', en: 'Community Integration', de: 'Gemeinschaftsintegration' }
      ]
    },
    {
      key: 'location',
      question: 'Wo befinden Sie sich?',
      answers: [
        { key: 'vienna', en: 'Vienna', de: 'Wien' },
        { key: 'lower-austria', en: 'Lower Austria', de: 'Niederösterreich' },
        { key: 'upper-austria', en: 'Upper Austria', de: 'Oberösterreich' },
        { key: 'salzburg', en: 'Salzburg', de: 'Salzburg' },
        { key: 'tyrol', en: 'Tyrol', de: 'Tirol' },
        { key: 'vorarlberg', en: 'Vorarlberg', de: 'Vorarlberg' },
        { key: 'carinthia', en: 'Carinthia', de: 'Kärnten' },
        { key: 'styria', en: 'Styria', de: 'Steiermark' },
        { key: 'burgenland', en: 'Burgenland', de: 'Burgenland' },
        { key: 'all-austria', en: 'All Austria', de: 'Ganz Österreich' }
      ]
    }
  ] : [
    {
      key: 'urgency',
      question: 'How urgently do you need support?',
      answers: [
        { key: 'urgent', en: 'Urgent - I need help immediately', de: 'Dringend - Ich brauche sofort Hilfe' },
        { key: 'non-urgent', en: 'Non-urgent - I can wait', de: 'Nicht dringend - Ich kann warten' }
      ]
    },
    {
      key: 'supportType',
      question: 'What type of cultural support do you need?',
      answers: [
        { key: 'integration-courses', en: 'Integration Courses', de: 'Integrationskurse' },
        { key: 'cultural-orientation', en: 'Cultural Orientation', de: 'Kulturelle Orientierung' },
        { key: 'comprehensive-integration', en: 'Comprehensive Integration', de: 'Umfassende Integration' },
        { key: 'cultural-education', en: 'Cultural Education', de: 'Kulturelle Bildung' },
        { key: 'refugee-integration', en: 'Refugee Integration', de: 'Flüchtlingsintegration' },
        { key: 'community-integration', en: 'Community Integration', de: 'Gemeinschaftsintegration' }
      ]
    },
    {
      key: 'location',
      question: 'Where are you located?',
      answers: [
        { key: 'vienna', en: 'Vienna', de: 'Wien' },
        { key: 'lower-austria', en: 'Lower Austria', de: 'Niederösterreich' },
        { key: 'upper-austria', en: 'Upper Austria', de: 'Oberösterreich' },
        { key: 'salzburg', en: 'Salzburg', de: 'Salzburg' },
        { key: 'tyrol', en: 'Tyrol', de: 'Tirol' },
        { key: 'vorarlberg', en: 'Vorarlberg', de: 'Vorarlberg' },
        { key: 'carinthia', en: 'Carinthia', de: 'Kärnten' },
        { key: 'styria', en: 'Styria', de: 'Steiermark' },
        { key: 'burgenland', en: 'Burgenland', de: 'Burgenland' },
        { key: 'all-austria', en: 'All Austria', de: 'Ganz Österreich' }
      ]
    }
  ];

  const handleAnswer = (answer: string | { key: string; en: string; de: string }) => {
    const currentQ = questions[currentQuestion];
    const answerKey = typeof answer === 'string' ? answer : answer.key;
    
    setQuizAnswers(prev => ({
      ...prev,
      [currentQ.key]: answerKey
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowQuiz(false);
    }
  };

  const handleSkip = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowQuiz(false);
    }
  };

  const resetQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setQuizAnswers({});
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>
          {language.code === 'de' ? 'Kulturelle Orientierung und Integration' : 'Cultural Orientation and Integration'}
        </Text>
        <Text style={styles.description}>
          {language.code === 'de' 
            ? 'Finden Sie Unterstützung für kulturelle Integration und Orientierung in Österreich'
            : 'Find support for cultural integration and orientation in Austria'}
        </Text>

        {!showQuiz ? (
          <CulturalSupportList 
            filters={quizAnswers}
            languageCode={language.code}
            onResetFilters={resetQuiz}
          />
        ) : null}
      </View>

      <BaseQuizModal
        visible={showQuiz}
        currentQuestion={currentQuestion}
        questions={questions}
        languageCode={language.code}
        title={language.code === 'de' ? 'Finden Sie die richtige kulturelle Unterstützung' : 'Find the Right Cultural Support'}
        subtitle={language.code === 'de' 
          ? 'Beantworten Sie ein paar Fragen, um passende Integrationsprogramme zu finden'
          : 'Answer a few questions to find suitable integration programs'}
        onAnswer={handleAnswer}
        onSkip={handleSkip}
        onClose={() => setShowQuiz(false)}
      />

      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        languageCode={language.code}
      />

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

export default CulturalOrientation;
