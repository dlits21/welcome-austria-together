
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
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

  // Filter states
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [onlineOnly, setOnlineOnly] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Convert JSON data to course format
  useEffect(() => {
    const convertedCourses: GermanCourse[] = Object.values(coursesData).map((course: any) => ({
      id: course.id,
      title: course.title,
      type: course.isResource ? 'resource' : 'course',
      level: course.courseDetails.level.includes('-') ?
        course.courseDetails.level.split('-').map((l: string) => l.trim()) :
        [course.courseDetails.level],
      location: course.courseDetails.location,
      price: course.courseDetails.price,
      online: course.courseDetails.location === 'Online',
      duration: course.courseDetails.duration,
      description: course.description,
      provider: course.provider,
      forWomen: false,
      forYoungMigrants: false,
      childcare: false,
      integrationRequirement: course.tags?.includes('Integration')
    }));

    setCourses(convertedCourses);
    setFilteredCourses(convertedCourses);
  }, []);

  // Quiz questions
  const quizQuestions = [
    {
      question: currentLanguage === 'de' ? 'Wie ist Ihr aktuelles Deutschniveau?' : 'What is your current German level?',
      answers: ['A0 (No knowledge)', 'A1 (Beginner)', 'A2 (Elementary)', 'B1 (Intermediate)', 'B2 (Upper intermediate)', 'C1 (Advanced)', 'C2 (Proficient)'],
      key: 'level'
    },
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
      question: currentLanguage === 'de' ? 'Wo möchten Sie lernen?' : 'Where would you like to learn?',
      answers: [
        { key: 'online', en: 'Online', de: 'Online' },
        { key: 'vienna', en: 'Vienna', de: 'Wien' },
        { key: 'graz', en: 'Graz', de: 'Graz' },
        { key: 'salzburg', en: 'Salzburg', de: 'Salzburg' },
        { key: 'anywhere', en: 'Any location', de: 'Beliebiger Ort' }
      ],
      key: 'location'
    }
  ];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleQuizAnswer = (answer: string | { key: string; en: string; de: string }) => {
    // Apply quiz-based filtering logic here
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

    applyFilters();
  };

  const applyFilters = () => {
    let filtered = courses;

    if (selectedLevels.length > 0) {
      filtered = filtered.filter(course =>
        course.level.some(level => selectedLevels.includes(level))
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(course => selectedTypes.includes(course.type));
    }

    if (selectedLocations.length > 0) {
      filtered = filtered.filter(course =>
        selectedLocations.includes(course.location || '') ||
        (selectedLocations.includes('online') && course.online)
      );
    }

    if (onlineOnly) {
      filtered = filtered.filter(course => course.online);
    }

    setFilteredCourses(filtered);
  };

  const clearFilters = () => {
    setSelectedLevels([]);
    setSelectedTypes([]);
    setSelectedLocations([]);
    setOnlineOnly(false);
    setFilteredCourses(courses);
  };

  const levels = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const types = ['course', 'resource', 'exam'];
  const locations = ['Vienna', 'Graz', 'Salzburg', 'Online'];

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
});

export default GermanLearningPage;
