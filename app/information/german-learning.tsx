import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity,
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/languages/common';
import { getTab } from '../../data/languages/learn';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import HelpModal from '../../components/HelpModal';
import BaseQuizModal from '../../components/BaseQuizModal';
import FilterSection from '../../components/FilterSection';
import QuizControls from '../../components/QuizControls';
import CourseList from '../../components/CourseList';

const GermanLearningPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
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

  interface GermanCourse {
    id: string;
    title: {
      en: string;
      de: string;
      fa: string;
      ar: string;
      uk: string;
      ru: string;
      tr: string;
      so: string;
      fr: string;
      es: string;
      pl: string;
      sr: string;
    };
    type: 'course' | 'resource' | 'exam';
    level: string[];
    location?: string;
    price: string | number;
    online: boolean;
    description: {
      en: string;
      de: string;
      fa: string;
      ar: string;
      uk: string;
      ru: string;
      tr: string;
      so: string;
      fr: string;
      es: string;
      pl: string;
      sr: string;
    };
    provider: string;
    forWomen?: boolean;
    forYoungMigrants?: boolean;
    childcare?: boolean;
    integrationRequirement?: boolean;
  }
  
  // Filter states
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [freeOnly, setFreeOnly] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Extract unique locations
  const locations = Array.from(new Set(germanCourses
    .filter(course => course.location)
    .map(course => course.location as string)));

  // Available types and formats
  const courseTypes = ['course', 'resource', 'exam'];
  const formatTypes = ['online-only', 'hybrid', 'in-person'];

  // Quiz questions
  const quizQuestions = [
    {
      question: language.code === 'de' 
        ? 'Suchen Sie nach einem Kurs, einer Prüfung oder Ressourcen?' 
        : 'Are you looking for a course, an exam or resources?',
      answers: [
        { key: 'course', en: 'Course', de: 'Kurs' },
        { key: 'resource', en: 'Resources', de: 'Ressourcen' },
        { key: 'exam', en: 'Exam', de: 'Prüfung' }
      ],
      key: 'type' as keyof typeof quizAnswers
    },
    {
      question: language.code === 'de' ? 'Wie ist Ihr Niveau?' : 'What\'s your level?',
      answers: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
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
    }
  ];

  const getLevelDescription = (level: string) => {
    const descriptions: { [key: string]: { en: string; de: string } } = {
      'A0': { en: 'Complete beginner', de: 'Kompletter Anfänger' },
      'A1': { en: 'Beginner', de: 'Anfänger' },
      'A2': { en: 'Elementary', de: 'Grundkenntnisse' },
      'B1': { en: 'Intermediate', de: 'Mittelstufe' },
      'B2': { en: 'Upper intermediate', de: 'Obere Mittelstufe' },
      'C1': { en: 'Advanced', de: 'Fortgeschritten' },
      'C2': { en: 'Proficient', de: 'Sehr fortgeschritten' }
    };
    return descriptions[level] ? descriptions[level][language.code as 'en' | 'de'] : level;
  };

  // Apply filters including quiz answers
  useEffect(() => {
    let results = germanCourses;
    
    // Apply quiz filters
    if (quizAnswers.level) {
      const levelCode = quizAnswers.level.split(' ')[0];
      results = results.filter(course => course.level.includes(levelCode));
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
      results = results.filter(course => 
        course.level.some(level => selectedLevels.includes(level))
      );
    }
    
    // Updated location filter logic: include 'Nationwide' and 'Online' when specific states are selected
    if (selectedLocations.length > 0) {
      results = results.filter(course => {
        if (!course.location) return false;
        
        // If 'Nationwide' or 'Online' locations are selected, show them for any location filter
        const hasNationwideOrOnline = course.location === 'Nationwide' || course.location === 'Online';
        const hasSelectedLocation = selectedLocations.includes(course.location);
        
        return hasSelectedLocation || hasNationwideOrOnline;
      });
    }

    if (selectedTypes.length > 0) {
      results = results.filter(course => selectedTypes.includes(course.type));
    }

    if (selectedFormats.length > 0) {
      if (selectedFormats.includes('online-only')) {
        results = results.filter(course => course.online);
      } else if (selectedFormats.includes('in-person')) {
        results = results.filter(course => !course.online);
      }
    }
    
    if (freeOnly) {
      results = results.filter(course => 
        course.price === 'Free' || course.price === 'Kostenlos'
      );
    }
    
    setFilteredCourses(results);
  }, [quizAnswers, activeTab, selectedLevels, selectedLocations, selectedTypes, selectedFormats, freeOnly]);

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
    if (questionKey === 'level') {
      const levelCode = typeof answer === 'string' ? answer.split(' ')[0] : answer.key;
      setSelectedLevels([levelCode]);
    } else if (questionKey === 'format') {
      setSelectedFormats([answerValue]);
    } else if (questionKey === 'type') {
      setSelectedTypes([answerValue]);
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
    setSelectedLevels([]);
    setSelectedTypes([]);
    setSelectedFormats([]);
    setCurrentQuestion(0);
    setShowQuiz(true);
  };

  // Filter toggle functions
  const toggleLevel = (level: string) => {
    setSelectedLevels(prev => {
      const newLevels = prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level];
      
      if (newLevels.length === 1) {
        setQuizAnswers(prev => ({ ...prev, level: newLevels[0] }));
      } else if (newLevels.length === 0) {
        setQuizAnswers(prev => ({ ...prev, level: '' }));
      }
      
      return newLevels;
    });
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleFormat = (format: string) => {
    setSelectedFormats(prev => 
      prev.includes(format) 
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  const clearFilters = () => {
    setSelectedLevels([]);
    setSelectedLocations([]);
    setSelectedTypes([]);
    setSelectedFormats([]);
    setFreeOnly(false);
    setQuizAnswers({ level: '', format: '', type: '' });
  };

  const pageTitle = language.code === 'de' ? 'Deutsch Lernen' : 'Learn German';
  const pageDescription = language.code === 'de' 
    ? 'Finden Sie Deutschkurse, Übungsmaterialien und Lernressourcen.'
    : 'Find German language courses, practice materials, and learning resources.';

  // Filter groups for FilterSection
  const filterGroups = [
    {
      title: language.code === 'de' ? 'Niveau' : 'Level',
      items: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      selectedItems: selectedLevels,
      onToggle: toggleLevel
    },
    {
      title: language.code === 'de' ? 'Typ' : 'Type',
      items: courseTypes,
      selectedItems: selectedTypes,
      onToggle: toggleType,
      displayLabels: {
        'course': getTab('courses', language.code),
        'resource': getTab('resources', language.code),
        'exam': getTab('exams', language.code)
      }
    },
    {
      title: language.code === 'de' ? 'Format' : 'Format',
      items: formatTypes,
      selectedItems: selectedFormats,
      onToggle: toggleFormat,
      displayLabels: {
        'online-only': language.code === 'de' ? 'Nur online' : 'Online only',
        'in-person': language.code === 'de' ? 'Persönlich' : 'In-person',
        'hybrid': 'Hybrid'
      }
    },
    {
      title: language.code === 'de' ? 'Standort' : 'Location',
      items: locations,
      selectedItems: selectedLocations,
      onToggle: toggleLocation
    }
  ];

  const additionalFilters = (
    <View>
      <Text style={styles.filterGroupTitle}>
        {language.code === 'de' ? 'Weitere Filter' : 'Additional Filters'}
      </Text>
      <View style={styles.filterChips}>
        <TouchableOpacity
          style={[
            styles.filterChip,
            freeOnly && styles.activeFilterChip
          ]}
          onPress={() => setFreeOnly(!freeOnly)}
        >
          <Text style={[
            styles.filterChipText,
            freeOnly && styles.activeFilterChipText
          ]}>
            {language.code === 'de' ? 'Nur kostenlos' : 'Free only'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filterChip,
            // Add state for women filter when implemented
          ]}
          onPress={() => {/* TODO: Implement women filter */}}
        >
          <Text style={styles.filterChipText}>
            {language.code === 'de' ? 'Für Frauen' : 'For women'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filterChip,
            // Add state for young migrants filter when implemented
          ]}
          onPress={() => {/* TODO: Implement young migrants filter */}}
        >
          <Text style={styles.filterChipText}>
            {language.code === 'de' ? 'Für junge Migrant:innen' : 'For young migrants'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filterChip,
            // Add state for childcare filter when implemented
          ]}
          onPress={() => {/* TODO: Implement childcare filter */}}
        >
          <Text style={styles.filterChipText}>
            {language.code === 'de' ? 'Kinderbetreuung verfügbar' : 'Childcare available'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filterChip,
            // Add state for integration requirement filter when implemented
          ]}
          onPress={() => {/* TODO: Implement integration requirement filter */}}
        >
          <Text style={styles.filterChipText}>
            {language.code === 'de' ? 'Erfüllt Integrationsanforderung' : 'Fulfills integration requirement'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
        
        <BaseQuizModal
          visible={showQuiz}
          currentQuestion={currentQuestion}
          questions={quizQuestions}
          languageCode={language.code}
          title={language.code === 'de' ? 'Finden Sie das Richtige für sich' : 'Find What\'s Right for You'}
          subtitle={language.code === 'de' 
            ? 'Beantworten Sie ein paar kurze Fragen, um personalisierte Empfehlungen zu erhalten.'
            : 'Answer a few quick questions to get personalized recommendations.'}
          onAnswer={handleQuizAnswer}
          onSkip={handleSkipQuiz}
          onClose={handleCloseQuiz}
          getLevelDescription={getLevelDescription}
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
          additionalFilters={additionalFilters}
          onClearFilters={clearFilters}
          scrollable={true}
        />
        
        {!showQuiz && renderTabButtons()}
        
        {!showQuiz && (
          <CourseList 
            courses={filteredCourses}
            languageCode={language.code}
          />
        )}
      </View>
      
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
  controlsContainer: {
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
  filterSection: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  filterGroupTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 12,
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
  clearFiltersButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  clearFiltersText: {
    color: '#64748b',
    fontSize: 14,
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
