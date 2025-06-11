
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/languages/common';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import HelpModal from '../../components/HelpModal';
import CourseList from '../../components/CourseList';
import QuizModal from '../../components/QuizModal';
import QuizControls from '../../components/QuizControls';
import FilterSection from '../../components/FilterSection';
import coursesData from '../../data/courses/german-learning-courses.json';

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

const GermanLearningPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [courses, setCourses] = useState<GermanCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<GermanCourse[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');

  // Filter states
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [forWomen, setForWomen] = useState(false);
  const [forYoungMigrants, setForYoungMigrants] = useState(false);
  const [childcare, setChildcare] = useState(false);
  const [integrationRequirement, setIntegrationRequirement] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Convert JSON data to course format
  useEffect(() => {
    const convertedCourses: GermanCourse[] = Object.values(coursesData).map((course: any) => ({
      id: course.id,
      title: course.title,
      type: course.isResource ? 'resource' : (course.courseDetails.type === 'exam' ? 'exam' : 'course'),
      level: course.courseDetails.level.includes('-') ?
        course.courseDetails.level.split('-').map((l: string) => l.trim()) :
        [course.courseDetails.level],
      location: course.courseDetails.location,
      price: course.courseDetails.price,
      online: course.courseDetails.location === 'Online',
      duration: course.courseDetails.duration,
      description: course.description,
      provider: course.provider,
      forWomen: course.forWomen || false,
      forYoungMigrants: course.forYoungMigrants || false,
      childcare: course.childcare || false,
      integrationRequirement: course.tags?.includes('Integration') || false
    }));

    setCourses(convertedCourses);
    setFilteredCourses(convertedCourses);
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    let filtered = courses;

    // Apply tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(course => course.type === activeTab);
    }

    // Apply level filter
    if (selectedLevels.length > 0) {
      filtered = filtered.filter(course =>
        course.level.some(level => selectedLevels.includes(level))
      );
    }

    // Apply type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(course => selectedTypes.includes(course.type));
    }

    // Apply location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(course =>
        selectedLocations.includes(course.location || '') ||
        (selectedLocations.includes('Online') && course.online)
      );
    }

    // Apply additional filters
    if (onlineOnly) {
      filtered = filtered.filter(course => course.online);
    }

    if (forWomen) {
      filtered = filtered.filter(course => course.forWomen);
    }

    if (forYoungMigrants) {
      filtered = filtered.filter(course => course.forYoungMigrants);
    }

    if (childcare) {
      filtered = filtered.filter(course => course.childcare);
    }

    if (integrationRequirement) {
      filtered = filtered.filter(course => course.integrationRequirement);
    }

    setFilteredCourses(filtered);
  }, [courses, activeTab, selectedLevels, selectedTypes, selectedLocations, onlineOnly, forWomen, forYoungMigrants, childcare, integrationRequirement]);

  // Quiz questions - updated order: type, level, location
  const quizQuestions = [
    {
      question: currentLanguage === 'de' ? 'Welche Art von Kurs bevorzugen Sie?' : 'What type of course do you prefer?',
      answers: [
        { key: 'course', en: 'Structured course', de: 'Strukturierter Kurs' },
        { key: 'resource', en: 'Self-study resources', de: 'Selbststudium-Ressourcen' },
        { key: 'exam', en: 'Exam preparation', de: 'Prüfungsvorbereitung' }
      ],
      key: 'type'
    },
    {
      question: currentLanguage === 'de' ? 'Wie ist Ihr aktuelles Deutschniveau?' : 'What is your current German level?',
      answers: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      key: 'level'
    },
    {
      question: currentLanguage === 'de' ? 'Wo möchten Sie lernen?' : 'Where would you like to learn?',
      answers: [
        { key: 'Online', en: 'Online', de: 'Online' },
        { key: 'Vienna', en: 'Vienna', de: 'Wien' },
        { key: 'Graz', en: 'Graz', de: 'Graz' },
        { key: 'Salzburg', en: 'Salzburg', de: 'Salzburg' },
        { key: 'anywhere', en: 'Any location', de: 'Beliebiger Ort' }
      ],
      key: 'location'
    }
  ];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleQuizAnswer = (answer: string | { key: string; en: string; de: string }) => {
    const currentQ = quizQuestions[currentQuestion];
    
    // Apply filter based on answer
    if (currentQ.key === 'type') {
      const typeKey = typeof answer === 'string' ? answer : answer.key;
      setSelectedTypes([typeKey]);
      setActiveTab(typeKey);
    } else if (currentQ.key === 'level') {
      const level = typeof answer === 'string' ? answer : answer.key;
      setSelectedLevels([level]);
    } else if (currentQ.key === 'location') {
      const location = typeof answer === 'string' ? answer : answer.key;
      if (location !== 'anywhere') {
        setSelectedLocations([location]);
      }
    }

    // Move to next question or close quiz
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowQuiz(false);
      setCurrentQuestion(0);
    }
  };

  const skipQuestion = () => {
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
    // Reset filters
    setSelectedLevels([]);
    setSelectedTypes([]);
    setSelectedLocations([]);
    setOnlineOnly(false);
    setForWomen(false);
    setForYoungMigrants(false);
    setChildcare(false);
    setIntegrationRequirement(false);
    setActiveTab('all');
    setFilteredCourses(courses);
  };

  const toggleFilter = (filterType: string, value: string) => {
    let newFilters: string[] = [];

    switch (filterType) {
      case 'level':
        newFilters = selectedLevels.includes(value)
          ? selectedLevels.filter(l => l !== value)
          : [...selectedLevels, value];
        setSelectedLevels(newFilters);
        break;
      case 'type':
        newFilters = selectedTypes.includes(value)
          ? selectedTypes.filter(t => t !== value)
          : [...selectedTypes, value];
        setSelectedTypes(newFilters);
        break;
      case 'location':
        newFilters = selectedLocations.includes(value)
          ? selectedLocations.filter(l => l !== value)
          : [...selectedLocations, value];
        setSelectedLocations(newFilters);
        break;
    }
  };

  const clearFilters = () => {
    setSelectedLevels([]);
    setSelectedTypes([]);
    setSelectedLocations([]);
    setOnlineOnly(false);
    setForWomen(false);
    setForYoungMigrants(false);
    setChildcare(false);
    setIntegrationRequirement(false);
    setActiveTab('all');
    setFilteredCourses(courses);
  };

  const levels = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const types = ['course', 'resource', 'exam'];
  const locations = ['Vienna', 'Graz', 'Salzburg', 'Online'];

  // Tab buttons for filtering by course type
  const renderTabButtons = () => {
    const tabs = [
      { id: 'all', label: currentLanguage === 'de' ? 'Alle' : 'All' },
      { id: 'course', label: currentLanguage === 'de' ? 'Kurse' : 'Courses' },
      { id: 'resource', label: currentLanguage === 'de' ? 'Ressourcen' : 'Resources' },
      { id: 'exam', label: currentLanguage === 'de' ? 'Prüfungen' : 'Exams' }
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
            onPress={() => setActiveTab(tab.id)}
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

  // Additional filters component
  const AdditionalFilters = () => (
    <View>
      <Text style={styles.filterGroupTitle}>
        {currentLanguage === 'de' ? 'Zusätzliche Filter' : 'Additional Filters'}
      </Text>
      <View style={styles.filterChips}>
        <TouchableOpacity
          style={[styles.filterChip, forWomen && styles.activeFilterChip]}
          onPress={() => setForWomen(!forWomen)}
        >
          <Text style={[styles.filterChipText, forWomen && styles.activeFilterChipText]}>
            {currentLanguage === 'de' ? 'Für Frauen' : 'For Women'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterChip, forYoungMigrants && styles.activeFilterChip]}
          onPress={() => setForYoungMigrants(!forYoungMigrants)}
        >
          <Text style={[styles.filterChipText, forYoungMigrants && styles.activeFilterChipText]}>
            {currentLanguage === 'de' ? 'Für junge Migrant:innen' : 'For Young Migrants'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterChip, childcare && styles.activeFilterChip]}
          onPress={() => setChildcare(!childcare)}
        >
          <Text style={[styles.filterChipText, childcare && styles.activeFilterChipText]}>
            {currentLanguage === 'de' ? 'Kinderbetreuung' : 'Childcare'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterChip, integrationRequirement && styles.activeFilterChip]}
          onPress={() => setIntegrationRequirement(!integrationRequirement)}
        >
          <Text style={[styles.filterChipText, integrationRequirement && styles.activeFilterChipText]}>
            {currentLanguage === 'de' ? 'Integrationsanforderung' : 'Integration Requirement'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterChip, onlineOnly && styles.activeFilterChip]}
          onPress={() => setOnlineOnly(!onlineOnly)}
        >
          <Text style={[styles.filterChipText, onlineOnly && styles.activeFilterChipText]}>
            {currentLanguage === 'de' ? 'Nur Online' : 'Online Only'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          {currentLanguage === 'de' ? 'Deutsch lernen' : 'Learning German'}
        </Text>
        <Text style={styles.subtitle}>
          {currentLanguage === 'de'
            ? 'Finden Sie den perfekten Deutschkurs oder die perfekten Ressourcen für Ihre Bedürfnisse'
            : 'Find the perfect German course or resources for your needs'}
        </Text>

        <QuizControls
          languageCode={currentLanguage}
          onResetQuiz={resetQuiz}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        {/* Tab Buttons */}
        {renderTabButtons()}

        <FilterSection
          visible={showFilters}
          title={currentLanguage === 'de' ? 'Filter' : 'Filters'}
          languageCode={currentLanguage}
          scrollable={true}
          filterGroups={[
            {
              title: currentLanguage === 'de' ? 'Niveau' : 'Level',
              items: levels,
              selectedItems: selectedLevels,
              onToggle: (item) => toggleFilter('level', item)
            },
            {
              title: currentLanguage === 'de' ? 'Typ' : 'Type',
              items: types,
              selectedItems: selectedTypes,
              onToggle: (item) => toggleFilter('type', item),
              displayLabels: {
                'course': currentLanguage === 'de' ? 'Kurs' : 'Course',
                'resource': currentLanguage === 'de' ? 'Ressource' : 'Resource',
                'exam': currentLanguage === 'de' ? 'Prüfung' : 'Exam'
              }
            },
            {
              title: currentLanguage === 'de' ? 'Ort' : 'Location',
              items: locations,
              selectedItems: selectedLocations,
              onToggle: (item) => toggleFilter('location', item)
            }
          ]}
          additionalFilters={<AdditionalFilters />}
          onClearFilters={clearFilters}
        />

        <CourseList courses={filteredCourses} languageCode={currentLanguage} />
      </ScrollView>

      <QuizModal
        visible={showQuiz}
        currentQuestion={currentQuestion}
        questions={quizQuestions}
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
