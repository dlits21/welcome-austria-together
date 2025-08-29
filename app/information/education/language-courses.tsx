import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import GermanLearningList from '../../../components/GermanLearningList';
import QuizModal from '../../../components/QuizModal';
import QuizControls from '../../../components/QuizControls';
import FilterSection from '../../../components/FilterSection';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';
import coursesData from '../../../data/courses/german-learning-courses.json';
import { getInformationGermanLearningText, getGlobalText } from '../../../utils/languageUtils';

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
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const germanCourseEntities: GermanCourse[] = Object.values(coursesData);

  // Quiz states
  const [showQuiz, setShowQuiz] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [filterAnswers, setFilterAnswers] = useState({
    courseType: '',
    additionalFilter: '',
    level: '',
    location: '',
  });

  const [selectedCourseType, setSelectedCourseType] = useState<string>('all');
  const [selectedAdditionalFilters, setSelectedAdditionalFilters] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const locations = Array.from(new Set(germanCourseEntities.map(entity => entity.courseDetails.location.toLowerCase())));
  const tabs = [
    'all',
    'course',
    'resource',
    'exam',
  ]

  const additionalFilters = [
    'forWomen',
    'childcare',
    'forYoungMigrants',
    'onlineOnly',
    'integrationRequirement',
  ]


  const filters = {
    additionalFilters: selectedAdditionalFilters,
    courseTypes: selectedCourseType,
    location: selectedLocations.length > 0 ? selectedLocations[0] : '',
    level: selectedLevel,
  };

  // Quiz questions using translations
  const quizQuestions = [
    {
      question: getInformationGermanLearningText('courseTypeQuestion', currentLanguage),
      answers: [
        { key: 'course', value: getInformationGermanLearningText('courses', currentLanguage) },
        { key: 'resource', value: getInformationGermanLearningText('resources', currentLanguage) },
        { key: 'exam', value: getInformationGermanLearningText('exams', currentLanguage) }
      ],
      key: 'courseType'
    },
    {
      question: getInformationGermanLearningText('levelQuestion', currentLanguage),
      answers: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      key: 'level'
    },
    {
      question: getInformationGermanLearningText('locationQuestion', currentLanguage),
      answers: locations.map(location => ({ key: location.toLowerCase(), value: getGlobalText(location.toLowerCase().replace(" ", ""), currentLanguage)})),
      key: 'location'
    },
    {
      question: getInformationGermanLearningText('additionalFiltersQuestion', currentLanguage),
      answers: [
        { key: 'forWomen', value: getInformationGermanLearningText('forWomen', currentLanguage) },
        { key: 'childcare', value: getInformationGermanLearningText('childcare', currentLanguage) },
        { key: 'forYoungMigrants', value: getInformationGermanLearningText('forYoungMigrants', currentLanguage) },
        { key: 'onlineOnly', value: getInformationGermanLearningText('onlineOnly', currentLanguage) },
        { key: 'integrationRequirement', value: getInformationGermanLearningText('integrationRequirement', currentLanguage) },
      ],
      key: 'additionalFilter'
    }
  ];

  const handleFilters = (key: string, value: string) => {
    if (key === 'courseType') {
        console.log("Handle courseType", value)
      setSelectedCourseType(value);
    } else if (key === 'level') {
      setSelectedLevel([value]);
    } else if (key === 'additionalFilter') {
      setSelectedAdditionalFilters([value]);
    } else if (key === 'location') {
      const locationName = locations.find(loc => loc.toLowerCase() === value);
      if (locationName) {
        setSelectedLocations([locationName]);
      }
    }
  }

  const handleQuizAnswer = (answer: any) => {
    const answerValue = typeof answer === 'string' ? answer : answer.key;
    const questionKey = quizQuestions[currentQuestion].key;
    
    // Apply filter based on answer
    setFilterAnswers(prev => ({
      ...prev,
      [questionKey]: answerValue
    }));
    
    handleFilters(questionKey, answerValue)

    // Move to next question or close quiz
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
    setFilterAnswers({ courseType: '', location: '', level: '', additionalFilters: '' });
    setCurrentQuestion(0);
    setShowQuiz(true);
    setSelectedCourseType('all');
  };

  const toggleCourseType = (type: string) => {
    setSelectedCourseType(type);
  };

  const toggleAdditionalFilters = (type: string) => {
    setSelectedAdditionalFilters(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleLevel = (type: string) => {
    setSelectedLevel(prev =>
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
    setSelectedAdditionalFilters([]);
    setSelectedLocations([]);
    setSelectedLevel([]);
    setSelectedCourseType('all');
  };

 // Filter groups for FilterSection with multi-lingual labels
  const filterGroups = [

    {
      title: getGlobalText('courseType', currentLanguage),
      items: tabs,
      selectedItems: selectedCourseType,
      displayLabels: tabs.reduce((acc, type) => ({
         ...acc,
         [type]: type.replace('-', ' ')
       }), {}),
      onToggle: toggleCourseType
    },
    {
      title: getGlobalText('location', currentLanguage),
      items: locations,
      selectedItems: selectedLocations,
      onToggle: toggleLocation
    },
    {
      title: getInformationGermanLearningText('AdditionalFilterTitle', currentLanguage),
      items: additionalFilters,
      selectedItems: selectedAdditionalFilters,
      onToggle: toggleAdditionalFilters,
      displayLabels: additionalFilters.reduce((acc, type) => ({
        ...acc,
        [type]: type.replace('-', ' ')
      }), {})
    },
  ];

  // Tab buttons for filtering by course type
  const renderTabButtons = () => {
    const tabs = [
      { id: 'all', label: getInformationGermanLearningText('all', currentLanguage) },
      { id: 'course', label: getInformationGermanLearningText('course', currentLanguage) },
      { id: 'resource', label: getInformationGermanLearningText('resource', currentLanguage) },
      { id: 'exam', label: getInformationGermanLearningText('exam', currentLanguage) }
    ];

    return (
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              selectedCourseType === tab.id && styles.activeTab
            ]}
            onPress={() => {
              setSelectedCourseType(tab.id);
              if (tab.id === 'all') {
                setSelectedCourseType('all');
              }
            }}
          >
            <Text style={[
              styles.tabButtonText,
              selectedCourseType === tab.id && styles.activeTabText
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
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {getInformationGermanLearningText('pageTitle', currentLanguage)}
        </Text>
        <Text style={styles.subtitle}>
          {getInformationGermanLearningText('pageSubtitle', currentLanguage)}
        </Text>

        {!showQuiz && (
          <QuizControls
            languageCode={currentLanguage}
            onResetQuiz={resetQuiz}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />
        )}

        {/* Tab Buttons */}
        {renderTabButtons()}

        <FilterSection
          visible={!showQuiz && showFilters}
          title={getGlobalText('filters', currentLanguage)}
          languageCode={language.code}
          filterGroups={filterGroups}
          onClearFilters={clearFilters}
          getTranslation={getInformationGermanLearningText}
        />

        {!showQuiz && (
          <GermanLearningList
            filters={filters}
            languageCode={currentLanguage}
            onResetFilters={clearFilters}
            getTranslation={getInformationGermanLearningText}
          />
        )}
      </View>

      <QuizModal
        visible={showQuiz}
        currentQuestion={currentQuestion}
        questions={quizQuestions}
        languageCode={currentLanguage}
        onAnswer={handleQuizAnswer}
        onSkip={handleSkipQuiz}
        onClose={handleCloseQuiz}
      />

      {/* Language Modal */}
      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        languageCode={language.code}
      />

      {/* Tutorial Modal */}
      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={language.code}
        tutorialData="german-learning"
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
