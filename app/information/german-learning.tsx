import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/languages/common';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import HelpModal from '../../components/HelpModal';
import GermanLearningList from '../../components/GermanLearningList';
import QuizModal from '../../components/QuizModal';
import QuizControls from '../../components/QuizControls';
import FilterSection from '../../components/FilterSection';
import FilterModal from '../../components/FilterModal';
import VirtualAssistantModal from '../../components/VirtualAssistantModal';
import TutorialModal from '../../components/TutorialModal';
import tutorialData from '../../data/tutorial/information/german-learning.json';
import coursesData from '../../data/courses/german-learning-courses.json';
import germanLearningTexts from '../../data/language/information/german-learning.json';

interface GermanCourse {
  id: string;
  title: { en: string; de: string };
  type: 'course' | 'resource' | 'exam';
  level: string[];
  location?: string;
  price: string | number;
  online: boolean;
  duration?: string;
  description: { en: string; de: string };
  provider: string;
  forWomen?: boolean;
  forYoungMigrants?: boolean;
  childcare?: boolean;
  integrationRequirement?: boolean;
}

const GermanLearningPage = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');

  // Filter modal states
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);

  // Filter states for GermanLearningList
  const [filters, setFilters] = useState<Record<string, string>>({});

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Helper function to get translations from the JSON file
  const getTranslation = (key: string, lang: string = currentLanguage): string => {
    const keyParts = key.split('.');
    let value: any = germanLearningTexts;
    
    for (const part of keyParts) {
      value = value?.[part];
    }
    
    return value?.[lang] || value?.['en'] || key;
  };

  // Quiz questions using translations
  const getQuizQuestions = () => [
    {
      question: getTranslation('quizQuestions.type.question'),
      answers: [
        { key: 'course', en: getTranslation('quizQuestions.type.answers.course'), de: getTranslation('quizQuestions.type.answers.course') },
        { key: 'resource', en: getTranslation('quizQuestions.type.answers.resource'), de: getTranslation('quizQuestions.type.answers.resource') },
        { key: 'exam', en: getTranslation('quizQuestions.type.answers.exam'), de: getTranslation('quizQuestions.type.answers.exam') }
      ],
      key: 'supportType'
    },
    {
      question: getTranslation('quizQuestions.level.question'),
      answers: [
        { key: 'A0', label: 'A0 - ' + getTranslation('levelDescriptions.A0') },
        { key: 'A1', label: 'A1 - ' + getTranslation('levelDescriptions.A1') },
        { key: 'A2', label: 'A2 - ' + getTranslation('levelDescriptions.A2') },
        { key: 'B1', label: 'B1 - ' + getTranslation('levelDescriptions.B1') },
        { key: 'B2', label: 'B2 - ' + getTranslation('levelDescriptions.B2') },
        { key: 'C1', label: 'C1 - ' + getTranslation('levelDescriptions.C1') },
        { key: 'C2', label: 'C2 - ' + getTranslation('levelDescriptions.C2') }
      ],
      key: 'level'
    },
    {
      question: getTranslation('quizQuestions.location.question'),
      answers: [
        { key: 'Online', en: getTranslation('quizQuestions.location.answers.online'), de: getTranslation('quizQuestions.location.answers.online') },
        { key: 'Vienna', en: getTranslation('quizQuestions.location.answers.vienna'), de: getTranslation('quizQuestions.location.answers.vienna') },
        { key: 'anywhere', en: getTranslation('quizQuestions.location.answers.anyLocation'), de: getTranslation('quizQuestions.location.answers.anyLocation') }
      ],
      key: 'location'
    }
  ];


  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleQuizAnswer = (answer: string | { key: string; en: string; de: string }) => {
    const quizQuestions = getQuizQuestions();
    const currentQ = quizQuestions[currentQuestion];
    
    // Apply filter based on answer
    const newFilters = { ...filters };
    const answerKey = typeof answer === 'string' ? answer : answer.key;
    
    if (currentQ.key === 'supportType') {
      newFilters.supportType = answerKey;
      setActiveTab(answerKey);
    } else if (currentQ.key === 'level') {
      const levelKey = typeof answer === 'string' ? answer : answer.key;
      newFilters.level = levelKey;
    } else if (currentQ.key === 'location') {
      if (answerKey !== 'anywhere') {
        newFilters.location = answerKey;
      }
    }
    
    setFilters(newFilters);

    // Move to next question or close quiz
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowQuiz(false);
      setCurrentQuestion(0);
    }
  };

  const skipQuestion = () => {
    const quizQuestions = getQuizQuestions();
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowQuiz(false);
      setCurrentQuestion(0);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setShowQuiz(true);
    setFilters({});
    setActiveTab('all');
  };

  const onResetFilters = () => {
    setFilters({});
    setActiveTab('all');
    setSelectedLevels([]);
    setSelectedLocations([]);
    setOnlineOnly(false);
    setFreeOnly(false);
  };

  // Get available locations from course data
  const getAvailableLocations = () => {
    const locations = new Set<string>();
    Object.values(coursesData).forEach((course: any) => {
      if (course.courseDetails?.location) {
        locations.add(course.courseDetails.location);
      }
    });
    return Array.from(locations);
  };

  // Filter toggle functions
  const onToggleLevel = (level: string) => {
    const newLevels = selectedLevels.includes(level) 
      ? selectedLevels.filter(l => l !== level)
      : [...selectedLevels, level];
    setSelectedLevels(newLevels);
    
    const newFilters = { ...filters };
    if (newLevels.length > 0) {
      newFilters.level = newLevels.join(',');
    } else {
      delete newFilters.level;
    }
    setFilters(newFilters);
  };

  const onToggleLocation = (location: string) => {
    const newLocations = selectedLocations.includes(location)
      ? selectedLocations.filter(l => l !== location)
      : [...selectedLocations, location];
    setSelectedLocations(newLocations);
    
    const newFilters = { ...filters };
    if (newLocations.length > 0) {
      newFilters.location = newLocations.join(',');
    } else {
      delete newFilters.location;
    }
    setFilters(newFilters);
  };

  const onToggleOnlineOnly = () => {
    const newOnlineOnly = !onlineOnly;
    setOnlineOnly(newOnlineOnly);
    
    const newFilters = { ...filters };
    if (newOnlineOnly) {
      newFilters.onlineOnly = 'true';
    } else {
      delete newFilters.onlineOnly;
    }
    setFilters(newFilters);
  };

  const onToggleFreeOnly = () => {
    const newFreeOnly = !freeOnly;
    setFreeOnly(newFreeOnly);
    
    const newFilters = { ...filters };
    if (newFreeOnly) {
      newFilters.freeOnly = 'true';
    } else {
      delete newFilters.freeOnly;
    }
    setFilters(newFilters);
  };


  // Tab buttons for filtering by course type
  const renderTabButtons = () => {
    const tabs = [
      { id: 'all', label: getTranslation('tabs.all') },
      { id: 'course', label: getTranslation('tabs.courses') },
      { id: 'resource', label: getTranslation('tabs.resources') },
      { id: 'exam', label: getTranslation('tabs.exams') }
    ];

    return (
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === tab.id && styles.activeTab
            ]}
            onPress={() => {
              setActiveTab(tab.id);
              if (tab.id === 'all') {
                const newFilters = { ...filters };
                delete newFilters.supportType;
                setFilters(newFilters);
              } else {
                setFilters({ ...filters, supportType: tab.id });
              }
            }}
          >
            <Text style={[
              styles.tabButtonText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowTutorial(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {getTranslation('pageTitle')}
        </Text>
        <Text style={styles.subtitle}>
          {getTranslation('pageSubtitle')}
        </Text>

        <QuizControls
          languageCode={currentLanguage}
          onResetQuiz={resetQuiz}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        {/* Tab Buttons */}
        {renderTabButtons()}

        <GermanLearningList
          filters={filters}
          languageCode={currentLanguage}
          onResetFilters={onResetFilters}
          getTranslation={getTranslation}
        />
      </View>

      <QuizModal
        visible={showQuiz}
        currentQuestion={currentQuestion}
        questions={getQuizQuestions()}
        languageCode={currentLanguage}
        onAnswer={handleQuizAnswer}
        onSkip={skipQuestion}
        onClose={() => setShowQuiz(false)}
      />

      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        languageCode={language.code}
      />

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        languageCode={currentLanguage}
        selectedLevels={selectedLevels}
        selectedLocations={selectedLocations}
        onlineOnly={onlineOnly}
        freeOnly={freeOnly}
        locations={getAvailableLocations()}
        onToggleLevel={onToggleLevel}
        onToggleLocation={onToggleLocation}
        onToggleOnlineOnly={onToggleOnlineOnly}
        onToggleFreeOnly={onToggleFreeOnly}
        onClearFilters={onResetFilters}
      />

      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
        languageCode={currentLanguage}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        tutorialData={tutorialData}
        languageCode={currentLanguage}
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
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
    lineHeight: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  tabButtonText: {
    fontSize: 14,
    color: '#64748b',
  },
  activeTabText: {
    color: '#0f172a',
    fontWeight: '600',
  },
  filterGroupTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 4,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  filterChip: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilterChip: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterChipText: {
    fontSize: 12,
    color: '#64748b',
  },
  activeFilterChipText: {
    color: '#fff',
  },
});

export default GermanLearningPage;
