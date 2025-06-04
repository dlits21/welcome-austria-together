import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/languages/common';
import { getNiveaus, getTab } from '../../data/languages/learn';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import HelpModal from '../../components/HelpModal';

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
  
  const router = useRouter();
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Extract unique locations
  const locations = Array.from(new Set(germanCourses
    .filter(course => course.location)
    .map(course => course.location as string)));

  // Apply filters including quiz answers
  useEffect(() => {
    let results = germanCourses;
    
    // Apply quiz filters
    if (quizAnswers.level) {
      const levelMapping: { [key: string]: string } = {
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
      // hybrid shows both online and in-person, so no filter needed
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
        course.level ? selectedLevels.includes(course.level) : false
      );
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

  const handleQuizAnswer = (question: string, answer: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
  };

  const completeQuiz = () => {
    setShowQuiz(false);
  };

  const resetQuiz = () => {
    setQuizAnswers({ level: '', format: '', type: '' });
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

  const handleCoursePress = (courseId: string) => {
    router.push(`/information/german-learning/${courseId}`);
  };

  const pageTitle = language.code === 'de' ? 'Deutsch Lernen' : 'Learn German';
  const pageDescription = language.code === 'de' 
    ? 'Finden Sie Deutschkurse, Übungsmaterialien und Lernressourcen.'
    : 'Find German language courses, practice materials, and learning resources.';

  const renderQuizWindow = () => {
    if (!showQuiz) return null;

    return (
      <View style={styles.quizContainer}>
        <View style={styles.quizHeader}>
          <Text style={styles.quizTitle}>
            {language.code === 'de' ? 'Finden Sie das Richtige für sich' : 'Find What\'s Right for You'}
          </Text>
          <Text style={styles.quizSubtitle}>
            {language.code === 'de' 
              ? 'Beantworten Sie ein paar kurze Fragen, um personalisierte Empfehlungen zu erhalten.'
              : 'Answer a few quick questions to get personalized recommendations.'}
          </Text>
        </View>

        {/* Question 1: Level */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {language.code === 'de' ? 'Wie ist Ihr Niveau?' : 'What\'s your level?'}
          </Text>
          <View style={styles.answersRow}>
            {['A1', 'A2', 'B1', 'B2', 'C1'].map(level => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.answerButton,
                  quizAnswers.level === level && styles.answerButtonSelected
                ]}
                onPress={() => handleQuizAnswer('level', level)}
              >
                <Text style={[
                  styles.answerText,
                  quizAnswers.level === level && styles.answerTextSelected
                ]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Question 2: Format */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {language.code === 'de' 
              ? 'Brauchen Sie es online oder persönlich?' 
              : 'Do you need it online or in-person?'}
          </Text>
          <View style={styles.answersColumn}>
            {[
              { key: 'online-only', en: 'Online only', de: 'Nur online' },
              { key: 'hybrid', en: 'Hybrid', de: 'Hybrid' },
              { key: 'in-person', en: 'In-person', de: 'Persönlich' }
            ].map(format => (
              <TouchableOpacity
                key={format.key}
                style={[
                  styles.answerButton,
                  quizAnswers.format === format.key && styles.answerButtonSelected
                ]}
                onPress={() => handleQuizAnswer('format', format.key)}
              >
                <Text style={[
                  styles.answerText,
                  quizAnswers.format === format.key && styles.answerTextSelected
                ]}>
                  {language.code === 'de' ? format.de : format.en}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Question 3: Type */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {language.code === 'de' 
              ? 'Suchen Sie nach einem Kurs, einer Prüfung oder Ressourcen?' 
              : 'Are you looking for a course, an exam or resources?'}
          </Text>
          <View style={styles.answersColumn}>
            {[
              { key: 'course', en: 'Course', de: 'Kurs' },
              { key: 'exam', en: 'Exam', de: 'Prüfung' },
              { key: 'resource', en: 'Resources', de: 'Ressourcen' }
            ].map(type => (
              <TouchableOpacity
                key={type.key}
                style={[
                  styles.answerButton,
                  quizAnswers.type === type.key && styles.answerButtonSelected
                ]}
                onPress={() => handleQuizAnswer('type', type.key)}
              >
                <Text style={[
                  styles.answerText,
                  quizAnswers.type === type.key && styles.answerTextSelected
                ]}>
                  {language.code === 'de' ? type.de : type.en}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.completeQuizButton} onPress={completeQuiz}>
          <Text style={styles.completeQuizText}>
            {language.code === 'de' ? 'Ergebnisse anzeigen' : 'Show Results'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

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

  const renderFilterModal = () => (
    <Modal
      visible={showFilterModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {language.code === 'de' ? 'Filter' : 'Filters'}
            </Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.filterScrollView}>
            {/* Level filters */}
            <Text style={styles.filterSectionTitle}>
              {language.code === 'de' ? 'Niveau' : 'Level'}
            </Text>
            {['beginner', 'intermediate', 'advanced'].map(level => (
              <TouchableOpacity 
                key={level}
                style={styles.checkboxRow} 
                onPress={() => toggleLevel(level)}
              >
                <View style={[styles.checkbox, selectedLevels.includes(level) && styles.checkboxChecked]}>
                  {selectedLevels.includes(level) && (
                    <MaterialIcons name="check" size={16} color="#fff" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>
                  {getNiveaus(level, language.code)}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Location filters */}
            <Text style={styles.filterSectionTitle}>
              {language.code === 'de' ? 'Standort' : 'Location'}
            </Text>
            {locations.map(location => (
              <TouchableOpacity 
                key={location}
                style={styles.checkboxRow} 
                onPress={() => toggleLocation(location)}
              >
                <View style={[styles.checkbox, selectedLocations.includes(location) && styles.checkboxChecked]}>
                  {selectedLocations.includes(location) && (
                    <MaterialIcons name="check" size={16} color="#fff" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>{location}</Text>
              </TouchableOpacity>
            ))}

            {/* Format and price filters */}
            <Text style={styles.filterSectionTitle}>
              {language.code === 'de' ? 'Weitere Filter' : 'Additional Filters'}
            </Text>
            
            <TouchableOpacity style={styles.checkboxRow} onPress={() => setOnlineOnly(!onlineOnly)}>
              <View style={[styles.checkbox, onlineOnly && styles.checkboxChecked]}>
                {onlineOnly && <MaterialIcons name="check" size={16} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>
                {language.code === 'de' ? 'Nur online' : 'Online only'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.checkboxRow} onPress={() => setFreeOnly(!freeOnly)}>
              <View style={[styles.checkbox, freeOnly && styles.checkboxChecked]}>
                {freeOnly && <MaterialIcons name="check" size={16} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>
                {language.code === 'de' ? 'Nur kostenlos' : 'Free only'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>
                {language.code === 'de' ? 'Zurücksetzen' : 'Clear'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={() => setShowFilterModal(false)}>
              <Text style={styles.applyButtonText}>
                {language.code === 'de' ? 'Anwenden' : 'Apply'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderCourseItem = ({ item }: { item: GermanCourse }) => {
    const getBadgeColor = (type: string) => {
      switch(type) {
        case 'course': return '#3B82F6';
        case 'resource': return '#10B981';
        case 'exam': return '#F97316';
        default: return '#6B7280';
      }
    };
    
    return (
      <TouchableOpacity 
        style={styles.courseCard}
        onPress={() => handleCoursePress(item.id)}
      >
        <View style={styles.courseHeader}>
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>
              {language.code === 'de' ? item.title.de : item.title.en}
            </Text>
            <Text style={styles.courseProvider}>{item.provider}</Text>
          </View>
          
          <View style={[styles.typeBadge, { backgroundColor: getBadgeColor(item.type) }]}>
            <Text style={styles.typeBadgeText}>
              {getTab(item.type === 'course' ? 'courses' : item.type === 'resource' ? 'resources' : 'exams', language.code)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.courseDescription}>
          {language.code === 'de' ? item.description.de : item.description.en}
        </Text>
        
        <View style={styles.tagsContainer}>
          {item.level && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{getNiveaus(item.level, language.code)}</Text>
            </View>
          )}
          
          {item.location && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{item.location}</Text>
            </View>
          )}
          
          {item.online && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>Online</Text>
            </View>
          )}
          
          {item.price !== undefined && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {item.price === 0 
                  ? (language.code === 'de' ? 'Kostenlos' : 'Free') 
                  : `€${item.price}`}
              </Text>
            </View>
          )}
          
          {item.duration && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{item.duration}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
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
        
        {/* Quiz Window */}
        {renderQuizWindow()}
        
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
          filteredCourses.length > 0 ? (
            <FlatList
              data={filteredCourses}
              renderItem={renderCourseItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.courseList}
            />
          ) : (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>
                {language.code === 'de' 
                  ? 'Keine Ergebnisse gefunden.' 
                  : 'No results found.'}
              </Text>
            </View>
          )
        )}
      </View>
      
      {/* Filter Modal */}
      {renderFilterModal()}
      
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
  quizContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quizHeader: {
    marginBottom: 20,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  quizSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  answersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  answersColumn: {
    gap: 8,
  },
  answerButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: 60,
    alignItems: 'center',
  },
  answerButtonSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#eff6ff',
  },
  answerText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  answerTextSelected: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  completeQuizButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  completeQuizText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
  courseList: {
    paddingBottom: 20,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseInfo: {
    flex: 1,
    marginRight: 12,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseProvider: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 70,
    alignItems: 'center',
  },
  typeBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  courseDescription: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 12,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tagText: {
    fontSize: 12,
    color: '#64748b',
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterScrollView: {
    padding: 16,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#0f172a',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#334155',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    marginRight: 8,
  },
  clearButtonText: {
    color: '#64748b',
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default GermanLearningPage;
