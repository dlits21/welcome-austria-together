import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/languages/common';
import { getTab } from '../../data/languages/learn';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import HelpModal from '../../components/HelpModal';
import QuizModal from '../../components/QuizModal';
import CourseList from '../../components/CourseList';
import FilterModal from '../../components/FilterModal';

interface GermanCourse {
  id: string;
  title: {
    en: string;
    de: string;
  };
  type: 'course' | 'resource' | 'exam';
  level?: 'beginner' | 'intermediate' | 'advanced';
  location?: string;
  price?: number;
  online: boolean;
  duration?: string;
  description: {
    en: string;
    de: string;
  };
  provider: string;
}

const germanCourses: GermanCourse[] = [
  {
    id: 'german-a1-vienna',
    title: { en: 'German A1 Course - Vienna', de: 'Deutschkurs A1 - Wien' },
    type: 'course',
    level: 'beginner',
    location: 'Vienna',
    price: 200,
    online: false,
    duration: '8 weeks',
    description: {
      en: 'Foundation German language course for complete beginners',
      de: 'Grundlegender Deutschkurs für absolute Anfänger'
    },
    provider: 'VHS Vienna'
  },
  {
    id: 'german-a2-graz',
    title: { en: 'German A2 Course - Graz', de: 'Deutschkurs A2 - Graz' },
    type: 'course',
    level: 'beginner',
    location: 'Graz',
    price: 220,
    online: false,
    duration: '10 weeks',
    description: {
      en: 'Elementary German language course',
      de: 'Elementarer Deutschkurs'
    },
    provider: 'VHS Graz'
  },
  {
    id: 'german-b1-online',
    title: { en: 'German B1 Online Course', de: 'Deutschkurs B1 Online' },
    type: 'course',
    level: 'intermediate',
    price: 150,
    online: true,
    duration: '12 weeks',
    description: {
      en: 'Intermediate German course available online',
      de: 'Mittlerer Deutschkurs online verfügbar'
    },
    provider: 'Deutsch Akademie'
  },
  {
    id: 'german-b2-salzburg',
    title: { en: 'German B2 Course - Salzburg', de: 'Deutschkurs B2 - Salzburg' },
    type: 'course',
    level: 'intermediate',
    location: 'Salzburg',
    price: 280,
    online: false,
    duration: '14 weeks',
    description: {
      en: 'Upper intermediate German language course',
      de: 'Oberer mittlerer Deutschkurs'
    },
    provider: 'VHS Salzburg'
  },
  {
    id: 'german-practice-app',
    title: { en: 'German Practice App', de: 'Deutsche Übungs-App' },
    type: 'resource',
    level: 'beginner',
    price: 0,
    online: true,
    description: {
      en: 'Mobile app for practicing German vocabulary and grammar',
      de: 'Mobile App zum Üben von deutschem Wortschatz und Grammatik'
    },
    provider: 'Language Learning Hub'
  },
  {
    id: 'oeif-exam',
    title: { en: 'ÖIF Integration Exam', de: 'ÖIF Integrationsprüfung' },
    type: 'exam',
    location: 'Multiple Locations',
    price: 150,
    online: false,
    description: {
      en: 'Official Austrian integration exam',
      de: 'Offizielle österreichische Integrationsprüfung'
    },
    provider: 'ÖIF'
  },
  {
    id: 'german-conversation',
    title: { en: 'German Conversation Club', de: 'Deutscher Konversationsclub' },
    type: 'resource',
    level: 'intermediate',
    location: 'Vienna',
    price: 0,
    online: false,
    description: {
      en: 'Weekly meetup to practice German conversation',
      de: 'Wöchentliches Treffen zum Üben der deutschen Konversation'
    },
    provider: 'Language Exchange Vienna'
  },
  {
    id: 'german-c1-innsbruck',
    title: { en: 'German C1 Course - Innsbruck', de: 'Deutschkurs C1 - Innsbruck' },
    type: 'course',
    level: 'advanced',
    location: 'Innsbruck',
    price: 320,
    online: false,
    duration: '16 weeks',
    description: {
      en: 'Advanced German language course for proficient speakers',
      de: 'Fortgeschrittener Deutschkurs für erfahrene Sprecher'
    },
    provider: 'VHS Innsbruck'
  }
];

const GermanLearningPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<GermanCourse[]>(germanCourses);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Quiz states
  const [showQuiz, setShowQuiz] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    level: '',
    format: '',
    type: ''
  });
  
  // Filter states
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [onlineOnly, setOnlineOnly] = useState<boolean>(false);
  const [freeOnly, setFreeOnly] = useState<boolean>(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Extract unique locations
  const locations = Array.from(new Set(germanCourses
    .filter(course => course.location)
    .map(course => course.location as string)));

  // Quiz questions
  const quizQuestions = [
    {
      question: language.code === 'de' ? 'Wie ist Ihr Niveau?' : 'What\'s your level?',
      answers: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1'],
      key: 'level' as keyof typeof quizAnswers
    },
    {
      question: language.code === 'de' 
        ? 'Brauchen Sie es online oder persönlich?' 
        : 'Do you need it online or in-person?',
      answers: [
        { key: 'online-only', en: 'Online only', de: 'Nur online' },
        { key: 'hybrid', en: 'Hybrid', de: 'Hybrid' },
        { key: 'in-person', en: 'In-person', de: 'Persönlich' }
      ],
      key: 'format' as keyof typeof quizAnswers
    },
    {
      question: language.code === 'de' 
        ? 'Suchen Sie nach einem Kurs, einer Prüfung oder Ressourcen?' 
        : 'Are you looking for a course, an exam or resources?',
      answers: [
        { key: 'course', en: 'Course', de: 'Kurs' },
        { key: 'exam', en: 'Exam', de: 'Prüfung' },
        { key: 'resource', en: 'Resources', de: 'Ressourcen' }
      ],
      key: 'type' as keyof typeof quizAnswers
    }
  ];

  // Apply filters including quiz answers
  useEffect(() => {
    let results = germanCourses;
    
    // Apply quiz filters
    if (quizAnswers.level) {
      const levelMapping: { [key: string]: string } = {
        'A0': 'beginner',
        'A1': 'beginner',
        'A2': 'beginner', 
        'B1': 'intermediate',
        'B2': 'intermediate',
        'C1': 'advanced'
      };
      const mappedLevel = levelMapping[quizAnswers.level];
      if (mappedLevel) {
        results = results.filter(course => course.level === mappedLevel);
      }
    }
    
    if (quizAnswers.format) {
      if (quizAnswers.format === 'online-only') {
        results = results.filter(course => course.online);
      } else if (quizAnswers.format === 'in-person') {
        results = results.filter(course => !course.online);
      }
    }
    
    if (quizAnswers.type && quizAnswers.type !== 'all') {
      results = results.filter(course => course.type === quizAnswers.type);
    }
    
    // Apply tab filter
    if (activeTab !== 'all') {
      results = results.filter(course => {
        if (activeTab === 'courses') return course.type === 'course';
        if (activeTab === 'resources') return course.type === 'resource';
        if (activeTab === 'exams') return course.type === 'exam';
        return true;
      });
    }
    
    // Apply manual filter states
    if (selectedLevels.length > 0) {
      results = results.filter(course => {
        if (!course.level) return false;
        const levelMapping: { [key: string]: string[] } = {
          'beginner': ['A0', 'A1', 'A2'],
          'intermediate': ['B1', 'B2'],
          'advanced': ['C1']
        };
        const courseLevels = levelMapping[course.level] || [];
        return selectedLevels.some(level => courseLevels.includes(level));
      });
    }
    
    if (selectedLocations.length > 0) {
      results = results.filter(course => 
        course.location ? selectedLocations.includes(course.location) : false
      );
    }
    
    if (onlineOnly) {
      results = results.filter(course => course.online);
    }
    
    if (freeOnly) {
      results = results.filter(course => course.price === 0);
    }
    
    setFilteredCourses(results);
  }, [quizAnswers, activeTab, selectedLevels, selectedLocations, onlineOnly, freeOnly]);

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
    if (questionKey === 'level' && typeof answer === 'string') {
      setSelectedLevels([answer]);
    } else if (questionKey === 'format') {
      if (answerValue === 'online-only') {
        setOnlineOnly(true);
      } else if (answerValue === 'in-person') {
        setOnlineOnly(false);
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
    setQuizAnswers({ level: '', format: '', type: '' });
    setCurrentQuestion(0);
    setShowQuiz(true);
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
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
    setSelectedLevels([]);
    setSelectedLocations([]);
    setOnlineOnly(false);
    setFreeOnly(false);
  };

  const pageTitle = language.code === 'de' ? 'Deutsch Lernen' : 'Learn German';
  const pageDescription = language.code === 'de' 
    ? 'Finden Sie Deutschkurse, Übungsmaterialien und Lernressourcen.'
    : 'Find German language courses, practice materials, and learning resources.';

  const renderTabButtons = () => {
    const tabs = [
      { id: 'all', label: getTab('all', language.code) },
      { id: 'courses', label: getTab('courses', language.code) },
      { id: 'resources', label: getTab('resources', language.code) },
      { id: 'exams', label: getTab('exams', language.code) }
    ];

    return (
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabButton, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabButtonText, activeTab === tab.id && styles.activeTabText]}>
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
        showHelpModal={() => setShowHelpModal(true)}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{pageTitle}</Text>
        <Text style={styles.description}>{pageDescription}</Text>
        
        {/* Quiz Modal */}
        <QuizModal
          visible={showQuiz}
          currentQuestion={currentQuestion}
          questions={quizQuestions}
          languageCode={language.code}
          onAnswer={handleQuizAnswer}
          onSkip={handleSkipQuiz}
          onClose={handleCloseQuiz}
        />
        
        {/* Show reset quiz button when quiz is completed */}
        {!showQuiz && (
          <View style={styles.resetQuizContainer}>
            <TouchableOpacity style={styles.resetQuizButton} onPress={resetQuiz}>
              <MaterialIcons name="refresh" size={20} color="#3B82F6" />
              <Text style={styles.resetQuizText}>
                {language.code === 'de' ? 'Quiz zurücksetzen' : 'Reset Quiz'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => setShowFilterModal(true)}
            >
              <MaterialIcons name="filter-list" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        )}
        
        {/* Tab Buttons */}
        {!showQuiz && renderTabButtons()}
        
        {/* Course List */}
        {!showQuiz && (
          <CourseList 
            courses={filteredCourses}
            languageCode={language.code}
          />
        )}
      </View>
      
      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        languageCode={language.code}
        selectedLevels={selectedLevels}
        selectedLocations={selectedLocations}
        onlineOnly={onlineOnly}
        freeOnly={freeOnly}
        locations={locations}
        onToggleLevel={toggleLevel}
        onToggleLocation={toggleLocation}
        onToggleOnlineOnly={() => setOnlineOnly(!onlineOnly)}
        onToggleFreeOnly={() => setFreeOnly(!freeOnly)}
        onClearFilters={clearFilters}
      />
      
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
  resetQuizContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resetQuizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  resetQuizText: {
    color: '#3B82F6',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
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
});

export default GermanLearningPage;
